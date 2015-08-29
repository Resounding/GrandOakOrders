namespace GrandOakOrders.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Data;
    using Data.Entities;

    internal sealed class Configuration : DbMigrationsConfiguration<GrandOakOrders.Data.GrandOakDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(GrandOakDbContext context)
        {
            var order = new InquiryOutcome {
                Id = InquiryOutcome.OrderId,
                Name = "Create Order"
            };
            var quote = new InquiryOutcome {
                Id = InquiryOutcome.QuoteId,
                Name = "Create Quote"
            };
            var close = new InquiryOutcome {
                Id = InquiryOutcome.ClosedId,
                Name = "Close Inquiry"
            };

            context.InquiryOutcomes.AddOrUpdate(o => o.Id, order, quote, close);
        }
    }
}
