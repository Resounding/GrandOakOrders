import {customElement, bindable, inject} from 'aurelia-framework';
import {OrderViewModel, OrderItemViewModel} from '../../models/order';
import {EventAggregator} from 'aurelia-event-aggregator';
import {computedFrom} from 'aurelia-binding';
import _ from 'underscore';

@customElement('all-in-pricing')
@inject(EventAggregator, Element)
export class AllInPricing {
    @bindable visible: boolean;
    @bindable model: OrderViewModel;
    pricingModel:PricingModel;

    constructor(private events:EventAggregator, private element: Element) { }
    
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
}

class PricingModel {
    _gratuity: number;
    _deposit: number;
    _subTotal: number;
    _grandTotal: number;
    _itemOnInvoice: OrderItemViewModel;
    _quantity: number;

    constructor(private order: OrderViewModel, events:EventAggregator) {
        this._gratuity = order.Gratuity;
        this._deposit = order.Deposit;
        this._subTotal = order.SubTotal;
        this._grandTotal = order.GrandTotal;
        const itemOnInvoice = _.find(order.Items, (item) => item.ShowOnInvoice);
        this._itemOnInvoice = new OrderItemViewModel(itemOnInvoice, events);
    }
    @computedFrom('_deposit')
    get deposit(): number {
        return this._deposit;
    }
    @computedFrom('_deposit')
    get depositDisplay():string {
        return `$${this._deposit.toFixed(2)}`;
    }

    @computedFrom('_gratuity')
    get gratuity():number {
        return this._gratuity;
    }
    set gratuity(val: number) {
        var number = parseFloat(val.toString());
        if (!isNaN(number)) {
            const desiredTotal = this._grandTotal;

            this._gratuity = number;
            const subTotalWithTax = parseFloat((this._subTotal * (1 + this.order.TaxRate)).toFixed(2));
            this._grandTotal = parseFloat((this._gratuity + subTotalWithTax - this._deposit).toFixed(2));

            this.grandTotal = desiredTotal;
        }
    }

    @computedFrom('_subTotal')
    get subTotal(): number {
        return this._subTotal;
    }

    @computedFrom('_subTotal')
    get subTotalDisplay(): string {
        return `$${this._subTotal.toFixed(2)}`;
    }

    @computedFrom('_subTotal')
    get taxDisplay(): string {
        return `$${(this._subTotal * this.order.TaxRate).toFixed(2)}`;
    }

    get taxCodeDisplay(): string {
        return `${this.order.TaxCode} (${this.order.TaxRate * 100}%)`;
    }

    @computedFrom('_subTotal')
    get unitPriceDisplay(): string {
        const quantity = parseFloat(this._itemOnInvoice.Quantity.toString());
        const unit = this._subTotal / quantity;
        if (isNaN(unit) || !isFinite(unit)) return '';

        return `(${quantity} items @ $${unit.toFixed(2)})`;
    }

    @computedFrom('_grandTotal')
    get grandTotal():number {
        return this._grandTotal;
    }

    set grandTotal(val: number) {
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

    @computedFrom('_grandTotal')
    get grandTotalDisplay(): number {
        return `${this._grandTotal.toFixed(2)}`;
    }
    set grandTotalDisplay(val: number) {
        
    }

    @computedFrom('_grandTotal')
    get totalBeforeDeposit(): number {
        return parseFloat((this._grandTotal + this._deposit).toFixed(2));
    }
    set totalBeforeDeposit(val: number) {
        const number = parseFloat(val.toString()) || 0;
        const afterDeposit = parseFloat((number - this._deposit).toFixed(2));
        this.grandTotal = afterDeposit;
    }

    @computedFrom('_gratuity', '_subTotal')
    get gratuityPercentage(): number {
        const percent = parseFloat(((this._gratuity / this._subTotal) * 100).toFixed(2)) || 0;
        return percent;
    }

    set gratuityPercentage(val: number) {
        var number = (parseFloat(val.toString()) || 0) / 100;
        this._gratuity = parseFloat((number * this._subTotal).toFixed(2));
    }
}