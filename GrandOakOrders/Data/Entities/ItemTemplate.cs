namespace GrandOakOrders.Data.Entities
{
    public class ItemTemplate
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal UnitPrice { get; set; }
        public bool ShowToKitchen { get; set; }
        public bool ShowOnInvoice { get; set; }
        public string KitchenNotes { get; set; }
        public string OrderingNotes { get; set; }
        public string InvoiceNotes { get; set; }
    }
}