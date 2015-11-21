using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
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
            mailMessage.AddTo(to);

            model.Bcc.ToList().ForEach(bcc => {
                if (!string.IsNullOrWhiteSpace(bcc)) {
                    mailMessage.AddBcc(bcc);
                }
            });

            var username = ConfigurationManager.AppSettings["SendGridUserName"];
            var password = ConfigurationManager.AppSettings["SendGridPassword"];
            var credentials = new NetworkCredential(username, password);

            var transportWeb = new Web(credentials);
            await transportWeb.DeliverAsync(mailMessage);
            var delivery = await _repo.RecordInvoiceEmail(mailMessage, order.Id, user.Identity.Name);

            order.Inquiry.Email = string.Join(";", model.Address);
            if (order.InvoiceDate == null) {
                order.InvoiceDate = DateTime.Now;
            }
            await _repo.Edit(order, user.Identity.Name);

            return Ok(delivery);
        }
    }
}