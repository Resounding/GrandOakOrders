using System;

namespace GrandOakOrders.Data.Entities
{
    public class Inquiry
    {
        public int Id { get; set; }
        public string Organization { get; set; }
        public string ContactPerson { get; set; }
        public DateTime? EventDate { get; set; }
        public TimeSpan? EventTime { get; set; }
        public int? People { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public bool IsQuoteRequired { get; set; }
        public string ClosureComments { get; set; }
        public string OutcomeId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }

        public InquiryOutcome Outcome { get; set; }
    }
}