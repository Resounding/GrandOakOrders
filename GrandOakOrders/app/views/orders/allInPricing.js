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
const order_1 = require('../../models/order');
const aurelia_event_aggregator_1 = require('aurelia-event-aggregator');
const aurelia_binding_1 = require('aurelia-binding');
const _ = require('underscore');
let AllInPricing = class AllInPricing {
    constructor(events, element) {
        this.events = events;
        this.element = element;
    }
    visibleChanged(visible) {
        if (visible) {
            this.pricingModel = new PricingModel(this.model, this.events);
            $('.modal', this.element).openModal();
        }
    }
    cancel() {
        $('.modal', this.element).closeModal();
    }
    setPricing() {
        this.model.Gratuity = this.pricingModel.gratuity;
        const itemOnInvoice = _.find(this.model.Items, (item) => item.ShowOnInvoice);
        const unitPrice = parseFloat((this.pricingModel.subTotal / itemOnInvoice.Quantity).toFixed(2));
        itemOnInvoice.UnitPrice = unitPrice;
        // re-adjust
        this.model.Gratuity = parseFloat((this.pricingModel.grandTotal - this.model.SubTotal - this.model.TotalTax + this.pricingModel._deposit).toFixed(2));
        $('.modal', this.element).closeModal();
    }
};
__decorate([
    aurelia_framework_1.bindable, 
    __metadata('design:type', Boolean)
], AllInPricing.prototype, "visible", void 0);
__decorate([
    aurelia_framework_1.bindable, 
    __metadata('design:type', order_1.OrderViewModel)
], AllInPricing.prototype, "model", void 0);
AllInPricing = __decorate([
    aurelia_framework_1.customElement('all-in-pricing'),
    aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator, Element), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_event_aggregator_1.EventAggregator !== 'undefined' && aurelia_event_aggregator_1.EventAggregator) === 'function' && _a) || Object, Element])
], AllInPricing);
exports.AllInPricing = AllInPricing;
class PricingModel {
    constructor(order, events) {
        this.order = order;
        this._gratuity = order.Gratuity;
        this._deposit = order.Deposit;
        this._subTotal = order.SubTotal;
        this._grandTotal = order.GrandTotal;
        const itemOnInvoice = _.find(order.Items, (item) => item.ShowOnInvoice);
        this._itemOnInvoice = new order_1.OrderItemViewModel(itemOnInvoice, events);
    }
    get deposit() {
        return this._deposit;
    }
    get depositDisplay() {
        return `$${this._deposit.toFixed(2)}`;
    }
    get gratuity() {
        return this._gratuity;
    }
    set gratuity(val) {
        var number = parseFloat(val.toString());
        if (!isNaN(number)) {
            const desiredTotal = this._grandTotal;
            this._gratuity = number;
            const subTotalWithTax = parseFloat((this._subTotal * (1 + this.order.TaxRate)).toFixed(2));
            this._grandTotal = parseFloat((this._gratuity + subTotalWithTax - this._deposit).toFixed(2));
            this.grandTotal = desiredTotal;
        }
    }
    get subTotal() {
        return this._subTotal;
    }
    get subTotalDisplay() {
        return `$${this._subTotal.toFixed(2)}`;
    }
    get taxDisplay() {
        return `$${(this._subTotal * this.order.TaxRate).toFixed(2)}`;
    }
    get taxCodeDisplay() {
        return `${this.order.TaxCode} (${this.order.TaxRate * 100}%)`;
    }
    get unitPriceDisplay() {
        const quantity = parseFloat(this._itemOnInvoice.Quantity.toString());
        const unit = this._subTotal / quantity;
        if (isNaN(unit) || !isFinite(unit))
            return '';
        return `(${quantity} items @ $${unit.toFixed(2)})`;
    }
    get grandTotal() {
        return this._grandTotal;
    }
    set grandTotal(val) {
        const number = parseFloat(val.toString());
        if (!isNaN(number)) {
            this._grandTotal = number;
            let subTotalWithTax = this._grandTotal - this._gratuity + this._deposit;
            let subTotal = parseFloat((subTotalWithTax / (1 + this.order.TaxRate)).toFixed(2));
            const unitPrice = parseFloat((subTotal / this._itemOnInvoice.Quantity).toFixed(2));
            this._itemOnInvoice.UnitPrice = unitPrice;
            subTotal = this._itemOnInvoice.TotalPrice;
            subTotalWithTax = parseFloat((subTotal * (1 + this.order.TaxRate)).toFixed(2));
            this._subTotal = subTotal;
            this._gratuity = parseFloat((this._grandTotal - subTotalWithTax + this._deposit).toFixed(2));
        }
    }
    get grandTotalDisplay() {
        return `${this._grandTotal.toFixed(2)}`;
    }
    set grandTotalDisplay(val) {
    }
    get totalBeforeDeposit() {
        return parseFloat((this._grandTotal + this._deposit).toFixed(2));
    }
    set totalBeforeDeposit(val) {
        const number = parseFloat(val.toString()) || 0;
        const afterDeposit = parseFloat((number - this._deposit).toFixed(2));
        this.grandTotal = afterDeposit;
    }
    get gratuityPercentage() {
        const percent = parseFloat(((this._gratuity / this._subTotal) * 100).toFixed(2)) || 0;
        return percent;
    }
    set gratuityPercentage(val) {
        var number = (parseFloat(val.toString()) || 0) / 100;
        this._gratuity = parseFloat((number * this._subTotal).toFixed(2));
    }
}
__decorate([
    aurelia_binding_1.computedFrom('_deposit'), 
    __metadata('design:type', Number)
], PricingModel.prototype, "deposit", null);
__decorate([
    aurelia_binding_1.computedFrom('_deposit'), 
    __metadata('design:type', String)
], PricingModel.prototype, "depositDisplay", null);
__decorate([
    aurelia_binding_1.computedFrom('_gratuity'), 
    __metadata('design:type', Number)
], PricingModel.prototype, "gratuity", null);
__decorate([
    aurelia_binding_1.computedFrom('_subTotal'), 
    __metadata('design:type', Number)
], PricingModel.prototype, "subTotal", null);
__decorate([
    aurelia_binding_1.computedFrom('_subTotal'), 
    __metadata('design:type', String)
], PricingModel.prototype, "subTotalDisplay", null);
__decorate([
    aurelia_binding_1.computedFrom('_subTotal'), 
    __metadata('design:type', String)
], PricingModel.prototype, "taxDisplay", null);
__decorate([
    aurelia_binding_1.computedFrom('_subTotal'), 
    __metadata('design:type', String)
], PricingModel.prototype, "unitPriceDisplay", null);
__decorate([
    aurelia_binding_1.computedFrom('_grandTotal'), 
    __metadata('design:type', Number)
], PricingModel.prototype, "grandTotal", null);
__decorate([
    aurelia_binding_1.computedFrom('_grandTotal'), 
    __metadata('design:type', Number)
], PricingModel.prototype, "grandTotalDisplay", null);
__decorate([
    aurelia_binding_1.computedFrom('_grandTotal'), 
    __metadata('design:type', Number)
], PricingModel.prototype, "totalBeforeDeposit", null);
__decorate([
    aurelia_binding_1.computedFrom('_gratuity', '_subTotal'), 
    __metadata('design:type', Number)
], PricingModel.prototype, "gratuityPercentage", null);
var _a;
