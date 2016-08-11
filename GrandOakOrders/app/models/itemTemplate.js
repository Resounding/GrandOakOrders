"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const aurelia_binding_1 = require('aurelia-binding');
const _ = require('underscore');
class ItemTemplate {
    constructor(baseTemplate, events, httpClient) {
        this.events = events;
        this.httpClient = httpClient;
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
    get unitPriceDisplay() {
        if (!this.UnitPrice)
            return 'Not Set';
        return `$${this.UnitPrice.toFixed(2)}`;
    }
    edit() {
        this.editing = true;
    }
    cancel() {
        this.events.publish('item:cancelled', this.toJSON());
    }
    save() {
        const body = JSON.stringify(this), headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (this.Id) {
            this.httpClient.fetch(`/api/items/${this.Id}`, { method: 'put', body: body, headers: headers })
                .then(() => {
                this.events.publish('item:updated', this.toJSON());
            })
                .catch(this.onError);
        }
        else {
            this.httpClient.fetch('/api/items', { method: 'post', body: body, headers: headers })
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
        }
        else {
            this.cancel();
        }
    }
    toJSON() {
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
__decorate([
    aurelia_binding_1.computedFrom('UnitPrice'), 
    __metadata('design:type', Object)
], ItemTemplate.prototype, "unitPriceDisplay", null);
exports.ItemTemplate = ItemTemplate;
