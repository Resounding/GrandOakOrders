System.register(['aurelia-framework', '../../models/order', 'aurelia-event-aggregator', 'aurelia-binding', 'underscore'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, order_1, aurelia_event_aggregator_1, aurelia_binding_1, underscore_1;
    var AllInPricing, PricingModel;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (order_1_1) {
                order_1 = order_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            AllInPricing = (function () {
                function AllInPricing(events, element) {
                    this.events = events;
                    this.element = element;
                }
                AllInPricing.prototype.visibleChanged = function (visible) {
                    if (visible) {
                        this.pricingModel = new PricingModel(this.model, this.events);
                        $('.modal', this.element).openModal();
                    }
                };
                AllInPricing.prototype.cancel = function () {
                    $('.modal', this.element).closeModal();
                };
                AllInPricing.prototype.setPricing = function () {
                    this.model.Gratuity = this.pricingModel.gratuity;
                    var itemOnInvoice = underscore_1.default.find(this.model.Items, function (item) { return item.ShowOnInvoice; });
                    var unitPrice = parseFloat((this.pricingModel.subTotal / itemOnInvoice.Quantity).toFixed(2));
                    itemOnInvoice.UnitPrice = unitPrice;
                    // re-adjust
                    this.model.Gratuity = this.pricingModel.grandTotal - this.model.SubTotal - this.model.TotalTax;
                    $('.modal', this.element).closeModal();
                };
                __decorate([
                    aurelia_framework_1.bindable
                ], AllInPricing.prototype, "visible", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AllInPricing.prototype, "model", void 0);
                AllInPricing = __decorate([
                    aurelia_framework_1.customElement('all-in-pricing'),
                    aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator, Element)
                ], AllInPricing);
                return AllInPricing;
            })();
            exports_1("AllInPricing", AllInPricing);
            PricingModel = (function () {
                function PricingModel(order, events) {
                    this.order = order;
                    this._gratuity = order.Gratuity;
                    this._subTotal = order.SubTotal;
                    this._grandTotal = order.GrandTotal;
                    var itemOnInvoice = underscore_1.default.find(order.Items, function (item) { return item.ShowOnInvoice; });
                    this._itemOnInvoice = new order_1.OrderItemViewModel(itemOnInvoice, events);
                }
                Object.defineProperty(PricingModel.prototype, "gratuity", {
                    get: function () {
                        return this._gratuity;
                    },
                    set: function (val) {
                        var number = parseFloat(val.toString());
                        if (!isNaN(number)) {
                            this._gratuity = number;
                            var subTotalWithTax = parseFloat((this._subTotal * (1 + this.order.TaxRate)).toFixed(2));
                            this._grandTotal = parseFloat((this._gratuity + subTotalWithTax).toFixed(2));
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PricingModel.prototype, "subTotal", {
                    get: function () {
                        return this._subTotal;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PricingModel.prototype, "subTotalDisplay", {
                    get: function () {
                        return "$" + this._subTotal.toFixed(2);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PricingModel.prototype, "taxDisplay", {
                    get: function () {
                        return "$" + (this._subTotal * this.order.TaxRate).toFixed(2);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PricingModel.prototype, "taxCodeDisplay", {
                    get: function () {
                        return this.order.TaxCode + " (" + this.order.TaxRate * 100 + "%)";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PricingModel.prototype, "unitPriceDisplay", {
                    get: function () {
                        var people = this.order.Inquiry.People;
                        var unit = this._subTotal / people;
                        if (isNaN(unit) || !isFinite(unit))
                            return '';
                        return "(" + people + " people @ $" + unit.toFixed(2) + ")";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PricingModel.prototype, "grandTotal", {
                    get: function () {
                        return this._grandTotal;
                    },
                    set: function (val) {
                        var number = parseFloat(val.toString());
                        if (!isNaN(number)) {
                            this._grandTotal = number;
                            var subTotalWithTax = this._grandTotal - this._gratuity;
                            var subTotal = parseFloat((subTotalWithTax / (1 + this.order.TaxRate)).toFixed(2));
                            var unitPrice = parseFloat((subTotal / this._itemOnInvoice.Quantity).toFixed(2));
                            this._itemOnInvoice.UnitPrice = unitPrice;
                            subTotal = this._itemOnInvoice.TotalPrice;
                            subTotalWithTax = parseFloat((subTotal * (1 + this.order.TaxRate)).toFixed(2));
                            this._subTotal = subTotal;
                            this._gratuity = parseFloat((this._grandTotal - subTotalWithTax).toFixed(2));
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PricingModel.prototype, "gratuityPercentageDisplay", {
                    get: function () {
                        var percent = this._gratuity / this._subTotal;
                        if (isNaN(percent) || !isFinite(percent))
                            return 'N/A';
                        return (percent * 100).toFixed(2) + "%";
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    aurelia_binding_1.computedFrom('_gratuity')
                ], PricingModel.prototype, "gratuity", null);
                __decorate([
                    aurelia_binding_1.computedFrom('_subTotal')
                ], PricingModel.prototype, "subTotal", null);
                __decorate([
                    aurelia_binding_1.computedFrom('_subTotal')
                ], PricingModel.prototype, "subTotalDisplay", null);
                __decorate([
                    aurelia_binding_1.computedFrom('_subTotal')
                ], PricingModel.prototype, "taxDisplay", null);
                __decorate([
                    aurelia_binding_1.computedFrom('_subTotal')
                ], PricingModel.prototype, "unitPriceDisplay", null);
                __decorate([
                    aurelia_binding_1.computedFrom('_grandTotal')
                ], PricingModel.prototype, "grandTotal", null);
                __decorate([
                    aurelia_binding_1.computedFrom('_gratuity', '_subTotal')
                ], PricingModel.prototype, "gratuityPercentageDisplay", null);
                return PricingModel;
            })();
        }
    }
});