export class ItemTemplate {
    constructor(baseTemplate) {
        this.Id = baseTemplate.Id;
        this.Description = baseTemplate.Description;
        this.UnitPrice = baseTemplate.UnitPrice;
        this.ShowToKitchen = baseTemplate.ShowToKitchen;
        this.ShowOnInvoice = baseTemplate.ShowOnInvoice;
        this.KitchenNotes = baseTemplate.KitchenNotes;
        this.OrderingNotes = baseTemplate.OrderingNotes;
        this.InvoiceNotes = baseTemplate.InvoiceNotes;
    }
    get unitPriceDisplay() {
        if (!this.UnitPrice)
            return 'Not Set';
        return `$${this.UnitPrice.toFixed(2)}`;
    }
}
