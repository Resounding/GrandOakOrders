import {HttpClient, HttpResponseMessage} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {computedFrom} from 'aurelia-binding';

export class ItemTemplate {

    Id: number;
    Description: string;
    UnitPrice: number;
    ShowToKitchen: boolean;
    ShowOnInvoice: boolean;
    KitchenNotes: string;
    OrderingNotes: string;
    InvoiceNotes: string;
    editing: boolean;

    constructor(baseTemplate: ItemTemplate, private events:EventAggregator, private httpClient: HttpClient) {
        this.Id = baseTemplate.Id;
        this.Description = baseTemplate.Description;
        this.UnitPrice = baseTemplate.UnitPrice;
        this.ShowToKitchen = baseTemplate.ShowToKitchen;
        this.ShowOnInvoice = baseTemplate.ShowOnInvoice;
        this.KitchenNotes = baseTemplate.KitchenNotes;
        this.OrderingNotes = baseTemplate.OrderingNotes;
        this.InvoiceNotes = baseTemplate.InvoiceNotes;
        this.editing = (baseTemplate.editing === true);
    }

    @computedFrom('UnitPrice')
    get unitPriceDisplay() {
        if (!this.UnitPrice) return 'Not Set';

        return `$${this.UnitPrice.toFixed(2)}`;
    }

    edit() {
        this.editing = true;
    }

    cancel() {
        this.events.publish('item:cancelled', this.toJSON());
    }

    save() {
        const body = JSON.stringify(this),
              headers = new Headers();
        headers.append('Content-Type', 'application/json');        

        if (this.Id) {
            this.httpClient.fetch(`/api/items/${this.Id}`, { method: 'put', body, headers })
                .then(() => {
                    this.events.publish('item:updated', this.toJSON());
                })
                .catch(this.onError);
        } else {
            this.httpClient.fetch('/api/items', { method: 'post', body, headers })
                .then((result) => {
                    result.json().then((content) => {
                        _.extend(this, content);
                        this.events.publish('item:created', this.toJSON());
                    });
                })
                .catch(this.onError);
        }
        this.editing = false;
    }

    destroy() {
        if (this.Id) {
            this.httpClient.fetch(`/api/items/${this.Id}`, { method: 'delete' })
                .then(() => this.events.publish('item:deleted', this.toJSON()))
                .catch(this.onError);
        } else {
            this.cancel();
        }
    }

    toJSON():ItemTemplate {
        return {
            Id: this.Id,
            Description: this.Description,
            UnitPrice: parseFloat(this.UnitPrice),
            ShowToKitchen: this.ShowToKitchen,
            ShowOnInvoice: this.ShowOnInvoice,
            KitchenNotes: this.KitchenNotes,
            OrderingNotes: this.OrderingNotes,
            InvoiceNotes: this.InvoiceNotes,
            editing: false
        };
    }

    onError(err) {
        console.log(err);
        toastr.error('There was a problem saving the inquiry: ' + err);
    }
}