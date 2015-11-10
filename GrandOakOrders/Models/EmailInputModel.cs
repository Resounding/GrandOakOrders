namespace GrandOakOrders.Models
{
    public class EmailInputModel
    {
        public int OrderId { get; set; }
        public string Address { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}