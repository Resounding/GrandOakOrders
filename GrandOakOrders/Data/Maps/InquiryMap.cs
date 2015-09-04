using System.Data.Entity.ModelConfiguration;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Maps
{
    public class InquiryMap : EntityTypeConfiguration<Inquiry>
    {
        public InquiryMap()
        {
            Property(i => i.Description).IsMaxLength();
            Property(i => i.ClosureComments).IsMaxLength();
            Property(i => i.EventDate).HasColumnType("Date");
            HasOptional(i => i.Outcome).WithMany().HasForeignKey(i => i.OutcomeId);
        }
    }
}