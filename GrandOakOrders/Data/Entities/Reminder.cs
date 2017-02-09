using System;

namespace GrandOakOrders.Data.Entities
{
    public class Reminder
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public DateTimeOffset ReminderTime { get; set; }
        public bool Done { get; set; }

        public virtual Order Order { get; set; }
    }
}