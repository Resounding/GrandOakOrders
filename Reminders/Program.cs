using System;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Exceptions;
using Nito.AsyncEx;
using Reminders.Data;
using SendGrid;

namespace Reminders
{
    class Program
    {
        static int Main(string[] args)
        {
            try {
                return AsyncContext.Run(MainAsync);
            } catch (Exception ex) {
                Console.Error.WriteLine(ex);
                return -1;
            }
        }

        static async Task<int> MainAsync()
        {
            using (var ctx = new ReminderDbContext()) {
                var reminders = ctx.Reminders
                    .Include(r => r.Order.Inquiry)
                    .Where(r => !r.Done && r.ReminderTime < DateTimeOffset.Now)
                    .ToList();

                var toAddress = new MailAddress(ConfigurationManager.AppSettings["EmailToAddress"]);
                var fromAddress = new MailAddress(ConfigurationManager.AppSettings["EmailFromAddress"]);

                foreach (var reminder in reminders) {
                    try {
                        var inquiry = reminder.Order.Inquiry;
                        var time = string.Empty;
                        if (inquiry.EventDate.HasValue) {
                            time = $" on {inquiry.EventDate.Value:MMM d, yyyy}";
                        }
                        if (inquiry.EventTime.HasValue) {
                            time += $" at {inquiry.EventTime}";
                        }
                        var body = $"This is a reminder that there is a catering order {time}.\n" +
                            $"Summary: {inquiry.Summary}\n" + 
                            $"Link: https://grandoakorders.azurewebsites.net/#/orders/{reminder.OrderId}";

                        var mailMessage = new SendGridMessage {
                            Subject = "Grand Oak Orders Reminder",
                            To = new [] {toAddress},
                            From = fromAddress,
                            Text = body,
                            Html = body.Replace("\n", "<br>")
                        };

                        var apiKey = ConfigurationManager.AppSettings["SendGridApiKey"];
                        var transportWeb = new Web(apiKey);
                        await transportWeb.DeliverAsync(mailMessage);

                        reminder.Done = true;
                        await ctx.SaveChangesAsync();

                    } catch (InvalidApiRequestException ex) {
                        var errorMessage = string.Join(", ", ex.Errors);
                        Exception error = ex;
                        while (error != null) {
                            errorMessage += $",{error.Message}";
                            error = error.InnerException;
                        }
                        throw new ApplicationException(errorMessage);

                    } catch (Exception ex) {
                        var errorMessage = string.Empty;
                        var error = ex;
                        while (error != null) {
                            errorMessage += $",{error.Message}";
                            error = error.InnerException;
                        }                        
                        throw new ApplicationException(errorMessage);
                    }
                }                
            }

            return 0;
        }
    }
}
