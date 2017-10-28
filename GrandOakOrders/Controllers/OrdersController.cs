using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using Exceptions;
using GrandOakOrders.Data.Entities;
using GrandOakOrders.Data.Repositories;
using GrandOakOrders.Models;
using GrandOakOrders.Reports;
using GrapeCity.ActiveReports;
using GrapeCity.ActiveReports.Export.Pdf.Section;
using SendGrid;

namespace GrandOakOrders.Controllers
{
    [RoutePrefix("API/Orders")]
    public class OrdersController : ApiController
    {
        private readonly OrderRepository _repo = new OrderRepository();

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> Orders(bool all = false)
        {
            var orders = await _repo.GetOrders(all);
            return Ok(orders);
        }

        [Route("{id:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> Order(int id)
        {
            var order = await _repo.Get(id);
            if (order == null) {
                return NotFound();
            }

            return Ok(order);
        }

        [Route("{id:int}")]
        [HttpPatch]
        public async Task<IHttpActionResult> Update(Order order)
        {
            var user = Request.GetOwinContext().Request.User;
            var edited = await _repo.Edit(order, user.Identity.Name);

            return Ok(edited);
        }

        [Route("{id:int}/EmailInvoice")]
        [HttpPost]
        public async Task<IHttpActionResult> EmailInvoice(EmailInputModel model)
        {
            var fromAddress = ConfigurationManager.AppSettings["EmailFromAddress"];
            var user = Request.GetOwinContext().Request.User;

            var order = await _repo.Get(model.OrderId);
            var report = new InvoiceReport(order) as SectionReport;
            report.Run();
            var memStream = new MemoryStream();
            var pdfExport = new PdfExport();
            pdfExport.Export(report.Document, memStream);
            memStream.Position = 0;
            var attachments = new Dictionary<string, MemoryStream> {
                {$"Invoice {order.Id.ToString("0000")}.pdf", memStream  }
            };

            var mailMessage = new SendGridMessage {
                Subject = model.Subject,
                From = new MailAddress(fromAddress, user.Identity.Name),
                Text = model.Body,
                Html = model.Body.Replace("\n", "<br>"),
                StreamedAttachments = attachments
            };
            var to = model.Address.Where(a => !string.IsNullOrWhiteSpace(a)).ToList();

            if (to.Any()) {
                mailMessage.AddTo(to);

                model.Bcc.ToList().ForEach(bcc => {
                    if (!string.IsNullOrWhiteSpace(bcc)) {
                        mailMessage.AddBcc(bcc);
                    }
                });
            } else {
                to = model.Bcc.Where(a => !string.IsNullOrWhiteSpace(a)).ToList();
                mailMessage.AddTo(to);
            }

            var delivery = await _repo.RecordInvoiceEmail(mailMessage, order.Id, user.Identity.Name);

            mailMessage.AddUniqueArgs(new Dictionary<string, string> {
                ["order_id"] = order.Id.ToString(),
                ["delivery_id"] = delivery.Id.ToString()
            });

            try {
                var apiKey = ConfigurationManager.AppSettings["SendGridApiKey"];
                var transportWeb = new Web(apiKey);
                await transportWeb.DeliverAsync(mailMessage);

            } catch (InvalidApiRequestException ex) {
                var errorMessage = string.Join(", ", ex.Errors);
                Exception error = ex;
                while (error != null) {
                    errorMessage += $",{error.Message}";
                    error = error.InnerException;
                }
                await _repo.LogEmailDeliveryError(delivery.Id, errorMessage);
                throw;

            } catch (Exception ex) {
                var errorMessage = string.Empty;
                var error = ex;
                while (error != null) {
                    errorMessage += $",{error.Message}";
                    error = error.InnerException;
                }
                await _repo.LogEmailDeliveryError(delivery.Id, errorMessage);
                throw;
            }

            var email = string.Join(";", model.Address);
            if (!string.IsNullOrWhiteSpace(email)) {
                order.Inquiry.Email = email;
            }
            if (order.InvoiceDate == null) {
                order.InvoiceDate = DateTime.Now;
            }
            await _repo.Edit(order, user.Identity.Name);

            return Ok(delivery);
        }

        [Route("{id:int}/EmailQuote")]
        [HttpPost]
        public async Task<IHttpActionResult> EmailQuote(EmailInputModel model)
        {
            var fromAddress = ConfigurationManager.AppSettings["EmailFromAddress"];
            var user = Request.GetOwinContext().Request.User;

            var order = await _repo.Get(model.OrderId);
            var report = new QuoteReport(order) as SectionReport;
            report.Run();
            var memStream = new MemoryStream();
            var pdfExport = new PdfExport();
            pdfExport.Export(report.Document, memStream);
            memStream.Position = 0;
            var attachments = new Dictionary<string, MemoryStream> {
                {$"Quote {order.Id.ToString("0000")}.pdf", memStream  }
            };

            var mailMessage = new SendGridMessage {
                Subject = model.Subject,
                From = new MailAddress(fromAddress, user.Identity.Name),
                Text = model.Body,
                Html = model.Body.Replace("\n", "<br>"),
                StreamedAttachments = attachments
            };
            var to = model.Address.Where(a => !string.IsNullOrWhiteSpace(a)).ToList();

            if (to.Any()) {
                mailMessage.AddTo(to);

                model.Bcc.ToList().ForEach(bcc => {
                    if (!string.IsNullOrWhiteSpace(bcc)) {
                        mailMessage.AddBcc(bcc);
                    }
                });
            } else {
                to = model.Bcc.Where(a => !string.IsNullOrWhiteSpace(a)).ToList();
                mailMessage.AddTo(to);
            }

            var delivery = await _repo.RecordInvoiceEmail(mailMessage, order.Id, user.Identity.Name);

            mailMessage.AddUniqueArgs(new Dictionary<string, string> {
                ["order_id"] = order.Id.ToString(),
                ["delivery_id"] = delivery.Id.ToString()
            });

            try {
                var apiKey = ConfigurationManager.AppSettings["SendGridApiKey"];
                var transportWeb = new Web(apiKey);
                await transportWeb.DeliverAsync(mailMessage);

            } catch (InvalidApiRequestException ex) {
                var errorMessage = string.Join(", ", ex.Errors);
                Exception error = ex;
                while (error != null) {
                    errorMessage += $",{error.Message}";
                    error = error.InnerException;
                }
                await _repo.LogEmailDeliveryError(delivery.Id, errorMessage);
                throw;

            } catch (Exception ex) {
                var errorMessage = string.Empty;
                var error = ex;
                while (error != null) {
                    errorMessage += $",{error.Message}";
                    error = error.InnerException;
                }
                await _repo.LogEmailDeliveryError(delivery.Id, errorMessage);
                throw;
            }

            var email = string.Join(";", model.Address);
            if (!string.IsNullOrWhiteSpace(email)) {
                order.Inquiry.Email = email;
            }
            if (order.InvoiceDate == null) {
                order.InvoiceDate = DateTime.Now;
            }
            await _repo.Edit(order, user.Identity.Name);

            return Ok(delivery);
        }

        [Route("{id:int}/Reminders")]
        [HttpPut]
        public async Task<IHttpActionResult> AddReminders(int id)
        {
            var order = await _repo.Get(id);
            if (order?.Inquiry == null) {
                return NotFound();
            }

            var reminderRepo = new ReminderRepository();

            if (order.Inquiry.EventDate.HasValue) {
                var easternZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
                var date = DateTime.Parse(order.Inquiry.EventDate.Value.AddDays(-1).ToString("yyyy-MM-dd") + " 8:00 AM");
                var offset = new DateTimeOffset(date, easternZone.BaseUtcOffset);

                var reminder = new Reminder {
                    OrderId = id,
                    ReminderTime = offset
                };
                await reminderRepo.CreateReminder(reminder);

                if (order.Inquiry.EventTime.HasValue) {
                    var time = new DateTime(order.Inquiry.EventTime.Value.Ticks).AddHours(-2).ToString("hh:mm tt");
                    date = DateTime.Parse(order.Inquiry.EventDate.Value.ToString("yyyy-MM-dd ") + time);
                    offset = new DateTimeOffset(date, easternZone.BaseUtcOffset);
                    reminder = new Reminder {
                        OrderId = id,
                        ReminderTime = offset
                    };
                    await reminderRepo.CreateReminder(reminder);
                }
            }

            return Ok();
        }

        [Route("{id:int}/Reminders")]
        [HttpDelete]
        public async Task<IHttpActionResult> RemoveReminders(int id)
        {
            var reminderRepo = new ReminderRepository();
            await reminderRepo.RemoveReminders(id);
            return Ok();
        }
    }
}