using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
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
        [Route("SendGrid")]
        [HttpPost]
        public async Task<IHttpActionResult> SendGrid()
        {
            try {
                var events = await Request.Content.ReadAsAsync<ICollection<SendgridPost>>();

                var toAddress = ConfigurationManager.AppSettings["DefaultInvoiceBccAddress"];
                var fromAddress = ConfigurationManager.AppSettings["EmailFromAddress"];
                var username = ConfigurationManager.AppSettings["SendGridUserName"];
                var password = ConfigurationManager.AppSettings["SendGridPassword"];
                var credentials = new NetworkCredential(username, password);

                var transportWeb = new Web(credentials);

                foreach (
                    var email in events.Where(e => (e.Event == "delivered" || e.Event == "bounce" || e.Event == "open") && e.OrderId.HasValue)) {
                    var id = email.OrderId?.ToString("0000") ?? "Unknown";
                    var body =
                        $"A {email.Event} notification was received for the email sent to {email.Email} regarding  Order # {id}.";

                    var mailMessage = new SendGridMessage {
                        Subject = "Grand Oak Orders email " + email.Event,
                        From = new MailAddress(fromAddress, "Grand Oak Orders"),
                        Text = body,
                        Html = body
                    };
                    mailMessage.AddTo(toAddress);

                    await transportWeb.DeliverAsync(mailMessage);
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
        }
    }
}