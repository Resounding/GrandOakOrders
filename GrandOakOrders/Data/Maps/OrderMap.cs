using System.Data.Entity.ModelConfiguration;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Maps
{
    public class OrderMap : EntityTypeConfiguration<Order>
    {
        public OrderMap()
        {
            Property(o => o.ConfirmationDate).HasColumnType("Date");
            Property(o => o.CompletedDate).HasColumnType("Date");
            Property(o => o.InvoiceDate).HasColumnType("Date");
            Property(o => o.PaymentDate).HasColumnType("Date");
            Property(o => o.PickupNotes).IsMaxLength();
            Property(o => o.Notes).IsMaxLength();
            Property(o => o.AllergyNotes).IsMaxLength();

            HasRequired(o => o.Inquiry).WithMany().HasForeignKey(o => o.InquiryId);
            HasRequired(o => o.Tax).WithMany().HasForeignKey(o => o.TaxCode);
            HasMany(o => o.Items).WithRequired().HasForeignKey(i => i.OrderId);
            HasMany(o => o.Reminders).WithRequired(r => r.Order).HasForeignKey(r => r.OrderId);
        }
    }
}