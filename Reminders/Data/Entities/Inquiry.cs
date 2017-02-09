using System;

namespace Reminders.Data.Entities
{
    public class Inquiry
    {
        public int Id { get; set; }
        public string Organization { get; set; }
        public string ContactPerson { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime? EventDate { get; set; }
        public TimeSpan? EventTime { get; set; }
        public int? People { get; set; }
        public string Summary { get; set; }
    }
}