using System.Data.Entity.ModelConfiguration;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Maps
{
    public class OrderItemMap : EntityTypeConfiguration<OrderItem>
    {
        public OrderItemMap()
        {
            Property(i => i.Description).IsMaxLength();
            Property(i => i.KitchenNotes).IsMaxLength();
            Property(i => i.OrderingNotes).IsMaxLength();
        }
    }
}