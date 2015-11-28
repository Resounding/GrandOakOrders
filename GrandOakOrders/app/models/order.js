/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
import { InquiryViewModel } from './inquiry';
import { EmailDelivery } from './emailDelivery';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Container } from 'aurelia-dependency-injection';
import _ from 'underscore';
import moment from 'moment';
const DATE_FORMAT = 'dddd MMM D, YYYY';
const TIME_FORMAT = 'h:mm A';
export class OrderItemViewModel {
    constructor(model, events) {
        this.events = events;
        this.Description = '';
        this.KitchenNotes = '';
        this.OrderingNotes = '';
        this.InvoiceNotes = '';
        this.ShowToKitchen = true;
        this.ShowOnInvoice = true;
        this.SortOrder = 1;
        this._quantity = 1;
        this._unitPrice = 0;
        this._totalPrice = 0;
        if (model) {
            _.extend(this, model);
        }
    }
    get Quantity() {
        return this._quantity;
    }
    set Quantity(val) {
        this._quantity = val;
        var numVal = parseFloat((val || '').toString());
        if (!isNaN(numVal)) {
            this._totalPrice = this._quantity * this._unitPrice;
        }
    }
    get UnitPrice() {
        return this._unitPrice;
    }
    set UnitPrice(val) {
        const currency = parseFloat((val || '0').toString().replace(/[$,\(\)]/g, ''));
        if (!isNaN(currency)) {
            this._unitPrice = currency;
            this._totalPrice = this._quantity * this._unitPrice;
            this.events.publish('currency:changed');
        }
        else {
            this._unitPrice = val;
        }
    }
    get TotalPrice() {
        return this._totalPrice;
    }
    set TotalPrice(val) {
        const currency = parseFloat((val || '').toString().replace(/[$,\(\)]/g, ''));
        if (!isNaN(currency)) {
            this._totalPrice = currency;
            if (currency) {
                this._unitPrice = this._totalPrice / this._quantity;
            }
            this.events.publish('currency:changed');
        }
        else {
            this._totalPrice = val;
        }
    }
    isValid() {
        if (!this.Description)
            return false;
        if (isNaN(parseFloat((this.Quantity || '0').toString())))
            return false;
        if (isNaN(parseFloat((this.UnitPrice || '0').toString())))
            return false;
        if (isNaN(parseFloat((this.TotalPrice || '0').toString())))
            return false;
        return true;
    }
    toJSON() {
        return {
            Id: this.Id,
            OrderId: this.OrderId,
            SortOrder: this.SortOrder,
            Description: this.Description,
            KitchenNotes: this.KitchenNotes,
            OrderingNotes: this.OrderingNotes,
            InvoiceNotes: this.InvoiceNotes,
            ShowToKitchen: this.ShowToKitchen,
            ShowOnInvoice: this.ShowOnInvoice,
            Quantity: this._quantity,
            UnitPrice: this._unitPrice,
            TotalPrice: this._totalPrice
        };
    }
}
export class OrderViewModel {
    constructor(model) {
        this.EventDate = null;
        this.CreatedDateAndTime = '';
        this.UpdatedDateAndTime = '';
        this.events = Container.instance.get(EventAggregator);
        var deposit = model.Deposit;
        var gratuity = model.Gratuity;
        delete model.Deposit;
        delete model.Gratuity;
        _.extend(this, model);
        this._deposit = deposit;
        this._gratuity = gratuity;
        this.Inquiry = new InquiryViewModel(model.Inquiry);
        const items = model.Items;
        this.Items = _.map(items, (item) => new OrderItemViewModel(item, this.events));
        this.IdText = '';
        if (this.Id > 0) {
            this.IdText = (`0000${this.Id}`).substring(this.Id.toString().length);
        }
        if (model.EmailDeliveries) {
            this.EmailDeliveries = model.EmailDeliveries.map(d => new EmailDelivery(d));
        }
        var eventDate = model.Inquiry.EventDate ? moment(model.Inquiry.EventDate) : null, eventTime = model.Inquiry.EventTime ? moment(model.Inquiry.EventTime, TIME_FORMAT) : null, createdAt = moment(model.CreatedAt), createdDate = createdAt.format(DATE_FORMAT), createdTime = createdAt.format(TIME_FORMAT), updatedAt = moment(model.UpdatedAt), updatedDate = updatedAt.format(DATE_FORMAT), updatedTime = updatedAt.format(TIME_FORMAT);
        this.CreatedDateAndTime = `${createdDate} @ ${createdTime}`;
        this.UpdatedDateAndTime = `${updatedDate} @ ${updatedTime}`;
        if (eventDate) {
            if (eventTime) {
                eventDate.add(eventTime.hours(), 'hours').add(eventTime.minutes(), 'minutes');
            }
            this.EventDate = eventDate.toDate();
        }
    }
    get HeaderText() {
        var text = this.Inquiry.Organization;
        if (this.Inquiry.ContactPerson) {
            text += ` (${this.Inquiry.ContactPerson})`;
        }
        if (this.Inquiry.People) {
            text += ` for ${this.Inquiry.People} people`;
        }
        return text;
    }
    get DateAndTime() {
        var text = '';
        if (this.Inquiry.EventDate) {
            text = this.Inquiry.EventDate;
        }
        if (this.Inquiry.EventTime) {
            text += ` @ ${this.Inquiry.EventTime}`;
        }
        return text;
    }
    get SubTotal() {
        return _.reduce(this.Items, (memo, item) => {
            return memo + (parseFloat(item.TotalPrice) || 0);
        }, 0);
    }
    get TotalTax() {
        return parseFloat((this.SubTotal * this.TaxRate).toFixed(2));
    }
    get Gratuity() {
        return this._gratuity;
    }
    set Gratuity(val) {
        const currency = parseFloat((val || '0').toString().replace(/[$,\(\)]/g, ''));
        if (!isNaN(currency)) {
            this._gratuity = currency;
            this.events.publish('currency:changed');
        }
        else {
            this._gratuity = val;
        }
    }
    get Deposit() {
        return this._deposit;
    }
    set Deposit(val) {
        const currency = parseFloat((val || '0').toString().replace(/[$,\(\)]/g, ''));
        if (!isNaN(currency)) {
            this._deposit = currency;
            this.events.publish('currency:changed');
        }
        else {
            this._deposit = val;
        }
    }
    get GrandTotal() {
        return this.SubTotal + this.TotalTax + this.Gratuity - this.Deposit;
    }
    get InvoiceDateDisplay() {
        return this.InvoiceDate ? moment(this.InvoiceDate).format(DATE_FORMAT) : 'Not invoiced';
    }
    addItem() {
        var orders = _.pluck(this.Items, 'SortOrder'), order = 1;
        if (orders.length) {
            order = _.max(orders) + 1;
        }
        var item = new OrderItemViewModel({
            Id: -order,
            OrderId: this.Id,
            SortOrder: order,
            Quantity: this.Inquiry.People,
        }, this.events);
        this.Items.push(item);
        return item;
    }
    removeItem(item) {
        var index = this.Items.indexOf(item);
        if (index !== -1) {
            this.Items.splice(index, 1);
        }
        if (!this.Items.length) {
            this.addItem();
        }
        this.resort();
    }
    resort() {
        let index = 1;
        for (let item of this.Items) {
            item.SortOrder = index++;
        }
    }
    isValid() {
        if (_.any(this.Items, (item) => !item.isValid()))
            return false;
        return true;
    }
    toJSON() {
        const items = _.map(this.Items, (item) => item.toJSON());
        return {
            Id: this.Id,
            InquiryId: this.InquiryId,
            Inquiry: this.Inquiry,
            Notes: this.Notes,
            PickupNotes: this.PickupNotes,
            AllergyNotes: this.AllergyNotes,
            RequireDeposit: this.RequireDeposit,
            RequireConfirmation: this.RequireConfirmation,
            ConfirmationDate: this.ConfirmationDate,
            CompletedDate: this.CompletedDate,
            IsConfirmed: this.IsConfirmed,
            IsCancelled: this.IsCancelled,
            InvoiceDate: this.InvoiceDate,
            PaymentDate: this.PaymentDate,
            Items: items,
            SubTotal: this.SubTotal,
            Gratuity: this.Gratuity,
            ShowGratuity: this.ShowGratuity,
            Deposit: this.Deposit,
            GrandTotal: this.GrandTotal,
            TaxCode: this.TaxCode,
            TaxRate: this.TaxRate,
            EmailDeliveries: []
        };
    }
}
