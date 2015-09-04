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
            var close = new InquiryOutcome {
                Id = InquiryOutcome.ClosedId,
                Name = "Close Inquiry"
            };
            context.InquiryOutcomes.AddOrUpdate(o => o.Id, order, close);

            var hst = new Tax {
                Id = "HST",
                Rate = 0.13M
            };
            context.Taxes.AddOrUpdate(t => t.Id, hst);
        }
    }
}
