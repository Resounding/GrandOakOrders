System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-event-aggregator', 'aurelia-router', '../../models/itemTemplate'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, aurelia_router_1, itemTemplate_1;
    var ItemList;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_fetch_client_1_1) {
                aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (itemTemplate_1_1) {
                itemTemplate_1 = itemTemplate_1_1;
            }],
        execute: function() {
            ItemList = (function () {
                function ItemList(httpClient, router, events, element) {
                    this.httpClient = httpClient;
                    this.router = router;
                    this.events = events;
                    this.element = element;
                    this._items = [];
                }
                ItemList.prototype.activate = function () {
                    var _this = this;
                    this.httpClient.fetch('/api/items')
                        .then(function (response) {
                        response.json().then(function (content) {
                            content.forEach(function (i) { return _this._items.push(new itemTemplate_1.ItemTemplate(i, _this.events, _this.httpClient)); });
                        });
                    });
                    this.events.subscribe('item:updated', function (item) {
                        var existing = _.find(_this._items, function (i) { return i.Id === item.Id; });
                        if (existing) {
                            _.extend(existing, item);
                            existing.editing = false;
                        }
                    });
                    this.events.subscribe('item:cancelled', function (item) {
                        if (item.Id) {
                            var existing = _.find(_this._items, function (i) { return !i.Id; });
                            if (existing) {
                                _.extend(existing, item);
                                existing.editing = false;
                            }
                        }
                        else {
                            var index = _.findIndex(_this._items, function (i) { return !i.Id; });
                            if (index !== -1) {
                                _this._items.splice(index, 1);
                            }
                        }
                    });
                    this.events.subscribe('item:created', function (item) {
                        var existing = _.find(_this._items, function (i) { return i.Id == null || i.Id === item.Id; });
                        if (existing) {
                            _.extend(existing, item);
                            existing.editing = false;
                        }
                    });
                    this.events.subscribe('item:deleted', function (item) {
                        var index = _.findIndex(_this._items, function (i) { return i.Id === item.Id; });
                        if (index !== -1) {
                            _this._items.splice(index, 1);
                        }
                    });
                };
                ItemList.prototype.add = function () {
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
                };
                ItemList = __decorate([
                    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_router_1.Router, aurelia_event_aggregator_1.EventAggregator, Element)
                ], ItemList);
                return ItemList;
            }());
            exports_1("ItemList", ItemList);
        }
    }
});
