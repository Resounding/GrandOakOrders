import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {ItemTemplate} from '../../models/itemTemplate';
import _ from 'underscore';

@inject(HttpClient, Router, EventAggregator, Element)
export class ItemList {
    
    _items: Array<ItemTemplate> = [];

    constructor(private httpClient: HttpClient, private router: Router, private events: EventAggregator, private element: HTMLElement) {
        
    }

    activate() {
        this.httpClient.get('/api/items')
            .then((response: HttpResponseMessage) => {
                response.content.forEach(i => this._items.push(new ItemTemplate(i, this.events, this.httpClient)));
            });

        this.events.subscribe('item:updated', item => {
            const existing = _.find(this._items, (i) => i.Id === item.Id);
            if (existing) {
                _.extend(existing, item);
                existing.editing = false;
            }
        });

        this.events.subscribe('item:cancelled', item => {
            if (item.Id) {
                const existing = _.find(this._items, (i) => !i.Id);
                if (existing) {
                    _.extend(existing, item);
                    existing.editing = false;
                }
            } else {
                const index = _.findIndex(this._items, (i) => !i.Id);
                if (index !== -1) {
                    this._items.splice(index, 1);
                }
            }
        });

        this.events.subscribe('item:created', item => {
            const existing = _.find(this._items, (i) => i.Id == null || i.Id === item.Id);
            if (existing) {
                _.extend(existing, item);
                existing.editing = false;
            }
        });

        this.events.subscribe('item:deleted', item => {
            const index = _.findIndex(this._items, (i) => i.Id === item.Id);
            if (index !== -1) {
                this._items.splice(index, 1);
            }
        });
    }

    add() {
        this._items.unshift(new ItemTemplate({
            Id: null,
            Description: '',
            UnitPrice: null,
            ShowToKitchen: false,
            ShowOnInvoice: false,
            KitchenNotes: '',
            OrderingNotes: '',
            InvoiceNotes: '',
            editing: true
        }, this.events, this.httpClient));
    }
}