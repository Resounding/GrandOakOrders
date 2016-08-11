using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using GrandOakOrders.Data.Repositories;
using Newtonsoft.Json;
using SendGrid;

namespace GrandOakOrders.Controllers
{
    [OverrideExceptionFilters]
    [OverrideAuthentication]
    [OverrideAuthorization]
    [AllowAnonymous]
    [RoutePrefix("API/Incoming")]
    public class WebhooksController : ApiController
    {
        private readonly Web _transportWeb;
        private readonly OrderRepository _orderRepository;

        public WebhooksController()
        {

            var apiKey = ConfigurationManager.AppSettings["SendGridApiKey"];
            _transportWeb = new Web(apiKey);

            _orderRepository = new OrderRepository();
        }

        [Route("SendGrid")]
        [HttpPost]
        public async Task<IHttpActionResult> SendGrid()
        {
            try {                
                var posts = await Request.Content.ReadAsAsync<ICollection<SendgridPost>>();

                if (posts != null) {

                    var events = posts
                        .Where(
                            e =>
                                (e.Event == "delivered" || e.Event == "bounce" || e.Event == "dropped" || e.Event == "open") &&
                                e.OrderId.HasValue
                        )
                        .ToList();

                    if (events.Any()) {
                        var sendEmail = "true".Equals(ConfigurationManager.AppSettings["SendWebhooksEmail"], StringComparison.InvariantCultureIgnoreCase);
                        var toAddress = ConfigurationManager.AppSettings["DefaultInvoiceBccAddress"];
                        var fromAddress = ConfigurationManager.AppSettings["EmailFromAddress"];

                        foreach (var email in events) {
                            // Don't send a notification every time they open it.
                            if (email.Event != "open") {
                                if (sendEmail && email.Email != toAddress && email.Email != fromAddress) {
                                    // ReSharper disable once PossibleInvalidOperationException
                                    var id = email.OrderId.Value.ToString("0000");
                                    var body =
                                        $"A {email.Event} notification was received for the email sent to {email.Email} regarding  Order # {id}.";

                                    var mailMessage = new SendGridMessage {
                                        Subject = "Grand Oak Orders email " + email.Event,
                                        From = new MailAddress(fromAddress, "Grand Oak Orders"),
                                        Text = body,
                                        Html = body
                                    };
                                    mailMessage.AddTo(toAddress);

                                    await _transportWeb.DeliverAsync(mailMessage);
                                }
                            }

                            if (!email.DeliveryId.HasValue || email.Email == toAddress && email.Email == fromAddress) continue;

                            if (email.Event == "delivered") {
                                await _orderRepository.RecordEmailDelivery(email.DeliveryId.Value);
                            } else if (email.Event == "bounce" || email.Event == "dropped") {
                                await _orderRepository.RecordEmailBounce(email.DeliveryId.Value);
                            } else if (email.Event == "open") {
                                await _orderRepository.RecordEmailOpen(email.DeliveryId.Value);
                            }
                        }
                    }
                }

            } catch (Exception) {
                // ignored
            }

            return Ok();
        }

        public class SendgridPost
        {
            [JsonProperty("sg_message_id")]
            public string SendgridMessageId { get; set; }
            [JsonProperty("email")]
            public string Email { get; set; }
            [JsonProperty("timestamp")]
            public int? Timestamp { get; set; }
            [JsonProperty("category")]
            public string Category { get; set; }
            [JsonProperty("event")]
            public string Event { get; set; }
            [JsonProperty("url")]
            public string Url { get; set; }
            [JsonProperty("smtp-id")]
            public string SmtpId { get; set; }
            [JsonProperty("order_id")]
            public int? OrderId { get; set; }
            [JsonProperty("delivery_id")]
            public int? DeliveryId { get; set; }
        }
    }
}