using System;
using System.Collections.Generic;

namespace GrandOakOrders.Data.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int InquiryId { get; set; }
        public string Notes { get; set; }
        public string PickupNotes { get; set; }
        public string AllergyNotes { get; set; }
        public bool RequireDeposit { get; set; }
        public bool IsConfirmed { get; set; }
        public bool IsCancelled { get; set; }
        public DateTime? ConfirmationDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public DateTime? PaymentDate { get; set; }

        public decimal SubTotal { get; set; }
        public decimal Gratuity { get; set; }
        public decimal Deposit { get; set; }
        public decimal GrandTotal { get; set; }
        public string TaxCode { get; set; }
        public decimal TaxRate { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Inquiry Inquiry { get; set; }
        public List<OrderItem> Items { get; set; }
        public Tax Tax { get; set; }

        public ICollection<EmailDelivery> EmailDeliveries { get; set; }
    }
}