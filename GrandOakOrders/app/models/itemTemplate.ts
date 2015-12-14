export class ItemTemplate {

    Id: number;
    Description: string;
    UnitPrice: number;
    ShowToKitchen: boolean;
    ShowOnInvoice: boolean;
    KitchenNotes: string;
    OrderingNotes: string;
    InvoiceNotes: string;

    constructor(baseTemplate: ItemTemplate) {
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
        if (!this.UnitPrice) return 'Not Set';

        return `$${this.UnitPrice.toFixed(2)}`;
    }
}