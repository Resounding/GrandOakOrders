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
            var wait = new InquiryOutcome {
                Id = InquiryOutcome.WaitId,
                Name = "Wait for Confirmation"
            };
            var close = new InquiryOutcome {
                Id = InquiryOutcome.ClosedId,
                Name = "Close Inquiry"
            };

            context.InquiryOutcomes.AddOrUpdate(o => o.Id, order, wait, close);
        }
    }
}
