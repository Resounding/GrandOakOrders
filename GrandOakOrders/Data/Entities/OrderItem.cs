using System;

namespace GrandOakOrders.Data.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int SortOrder { get; set; }
        public string Description { get; set; }
        public decimal Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public string KitchenNotes { get; set; }
        public string OrderingNotes { get; set; }
        public string InvoiceNotes { get; set; }
        public bool ShowToKitchen { get; set; }
        public bool ShowOnInvoice { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}