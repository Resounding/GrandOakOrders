using System;

namespace GrandOakOrders.Data.Entities
{
    public class EmailDelivery
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Bcc { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public int? OrderId { get; set; }
        public DateTime Sent { get; set; }
        public string SentBy { get; set; }
        public DateTime? DeliveredDate { get; set; }
        public DateTime? BouncedDate { get; set; }
        public DateTime? OpenedDate { get; set; }

        public virtual Order Order { get; set; }
    }
}