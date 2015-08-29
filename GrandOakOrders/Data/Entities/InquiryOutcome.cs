namespace GrandOakOrders.Data.Entities
{
    public class InquiryOutcome
    {
        public static string QuoteId = "QUOTE";
        public static string OrderId = "ORDER";
        public static string ClosedId = "CLOSE";

        public string Id { get; set; }
        public string Name { get; set; }
    }
}