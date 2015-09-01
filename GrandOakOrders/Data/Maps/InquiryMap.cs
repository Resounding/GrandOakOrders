using System.Data.Entity.ModelConfiguration;
using GrandOakOrders.Data.Entities;

namespace GrandOakOrders.Data.Maps
{
    public class InquiryMap : EntityTypeConfiguration<Inquiry>
    {
        public InquiryMap()
        {
            HasOptional(i => i.Outcome).WithMany().HasForeignKey(i => i.OutcomeId);
            Property(i => i.Description).IsMaxLength();
            Property(i => i.ClosureComments).IsMaxLength();
        }
    }
}