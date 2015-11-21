using System.Data.Entity.ModelConfiguration;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Maps
{
    public class EmailDeliveryMap : EntityTypeConfiguration<EmailDelivery>
    {
        public EmailDeliveryMap()
        {
            HasOptional(d => d.Order).WithMany(o => o.EmailDeliveries).HasForeignKey(d => d.OrderId);
        }
    }
}