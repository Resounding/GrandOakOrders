System.register(['aurelia-binding', 'underscore'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_binding_1, underscore_1;
    var ItemTemplate;
    return {
        setters:[
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            ItemTemplate = (function () {
                function ItemTemplate(baseTemplate, events, httpClient) {
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
                Object.defineProperty(ItemTemplate.prototype, "unitPriceDisplay", {
                    get: function () {
                        if (!this.UnitPrice)
                            return 'Not Set';
                        return "$" + this.UnitPrice.toFixed(2);
                    },
                    enumerable: true,
                    configurable: true
                });
                ItemTemplate.prototype.edit = function () {
                    this.editing = true;
                };
                ItemTemplate.prototype.cancel = function () {
                    this.events.publish('item:cancelled', this.toJSON());
                };
                ItemTemplate.prototype.save = function () {
                    var _this = this;
                    if (this.Id) {
                        this.httpClient.put("/api/items/" + this.Id, this)
                            .then(function () { return _this.events.publish('item:updated', _this.toJSON()); })
                            .catch(this.onError);
                    }
                    else {
                        this.httpClient.post('/api/items', this)
                            .then(function (result) {
                            underscore_1.default.extend(_this, result.content);
                            _this.events.publish('item:created', _this.toJSON());
                        })
                            .catch(this.onError);
                    }
                    this.editing = false;
                };
                ItemTemplate.prototype.destroy = function () {
                    var _this = this;
                    if (this.Id) {
                        this.httpClient.delete("/api/items/" + this.Id)
                            .then(function () { return _this.events.publish('item:deleted', _this.toJSON()); })
                            .catch(this.onError);
                    }
                    else {
                        this.cancel();
                    }
                };
                ItemTemplate.prototype.toJSON = function () {
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
                };
                ItemTemplate.prototype.onError = function (err) {
                    console.log(err);
                    toastr.error('There was a problem saving the inquiry: ' + err);
                };
                __decorate([
                    aurelia_binding_1.computedFrom('UnitPrice')
                ], ItemTemplate.prototype, "unitPriceDisplay", null);
                return ItemTemplate;
            })();
            exports_1("ItemTemplate", ItemTemplate);
        }
    }
});
