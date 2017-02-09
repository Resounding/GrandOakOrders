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
const aurelia_framework_1 = require('aurelia-framework');
const aurelia_fetch_client_1 = require('aurelia-fetch-client');
const aurelia_event_aggregator_1 = require('aurelia-event-aggregator');
const aurelia_router_1 = require('aurelia-router');
const itemTemplate_1 = require('../../models/itemTemplate');
let ItemList = class ItemList {
    constructor(httpClient, router, events, element) {
        this.httpClient = httpClient;
        this.router = router;
        this.events = events;
        this.element = element;
        this._items = [];
    }
    activate() {
        this.httpClient.fetch('/api/items')
            .then((response) => {
            response.json().then((content) => {
                content.forEach(i => this._items.push(new itemTemplate_1.ItemTemplate(i, this.events, this.httpClient)));
            });
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
            }
            else {
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
        this._items.unshift(new itemTemplate_1.ItemTemplate({
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
};
ItemList = __decorate([
    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_router_1.Router, aurelia_event_aggregator_1.EventAggregator, Element), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_fetch_client_1.HttpClient !== 'undefined' && aurelia_fetch_client_1.HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof aurelia_router_1.Router !== 'undefined' && aurelia_router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof aurelia_event_aggregator_1.EventAggregator !== 'undefined' && aurelia_event_aggregator_1.EventAggregator) === 'function' && _c) || Object, HTMLElement])
], ItemList);
exports.ItemList = ItemList;
var _a, _b, _c;
