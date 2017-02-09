using System.Collections.Generic;

namespace Reminders.Data.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int InquiryId { get; set; }
        
        public Inquiry Inquiry { get; set; }

        public ICollection<Reminder> Reminders { get; set; }
    }
}