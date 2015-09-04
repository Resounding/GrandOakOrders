/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
import { InquiryViewModel } from './inquiry';
import _ from 'underscore';
import moment from 'moment';
const DATE_FORMAT = 'dddd MMMM D, YYYY';
const TIME_FORMAT = 'h:mm A';
export class OrderItemViewModel {
    constructor(model) {
        this.Description = '';
        this.KitchenNotes = '';
        this.OrderingNotes = '';
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
        this._unitPrice = val;
        var numVal = parseFloat((val || '').toString());
        if (!isNaN(numVal)) {
            this._totalPrice = this._quantity * this._unitPrice;
        }
    }
    get TotalPrice() {
        return this._totalPrice;
    }
    set TotalPrice(val) {
        this._totalPrice = val;
        var numVal = parseFloat((val || '').toString());
        if (!isNaN(numVal)) {
            if (val) {
                this._unitPrice = this._totalPrice / this._quantity;
            }
        }
    }
    isValid() {
        if (!this.Description)
            return false;
        if (isNaN(parseFloat((this.Quantity || '').toString())))
            return false;
        if (isNaN(parseFloat((this.UnitPrice || '').toString())))
            return false;
        if (isNaN(parseFloat((this.TotalPrice || '').toString())))
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
            Quantity: this._quantity,
            UnitPrice: this._unitPrice,
            TotalPrice: this._totalPrice
        };
    }
}
export class OrderViewModel {
    constructor(model) {
        this.DateAndTime = '';
        this.CreatedDateAndTime = '';
        this.UpdatedDateAndTime = '';
        _.extend(this, model);
        this.Inquiry = new InquiryViewModel(model.Inquiry);
        this.HeaderText = this.Inquiry.Organization;
        if (this.Inquiry.ContactPerson) {
            this.HeaderText += ` (${this.Inquiry.ContactPerson})`;
        }
        if (this.Inquiry.People) {
            this.HeaderText += ` for ${this.Inquiry.People} people`;
        }
        if (this.Inquiry.EventDate) {
            this.DateAndTime = this.Inquiry.EventDate;
        }
        if (this.Inquiry.EventTime) {
            this.DateAndTime += ` @ ${this.Inquiry.EventTime}`;
        }
        var createdAt = moment(model.CreatedAt), createdDate = createdAt.format(DATE_FORMAT), createdTime = createdAt.format(TIME_FORMAT), updatedAt = moment(model.UpdatedAt), updatedDate = updatedAt.format(DATE_FORMAT), updatedTime = updatedAt.format(TIME_FORMAT);
        this.CreatedDateAndTime = `${createdDate} @ ${createdTime}`;
        this.UpdatedDateAndTime = `${updatedDate} @ ${updatedTime}`;
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
        });
        this.Items.push(item);
        return item;
    }
    isValid() {
        if (_.any(this.Items, (item) => !item.isValid()))
            return false;
        return true;
    }
    toJSON() {
        var items = _.map(this.Items, (item) => item.toJSON());
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
            InvoiceDate: this.InvoiceDate,
            PaymentDate: this.PaymentDate,
            Items: items,
            SubTotal: this.SubTotal,
            Gratuity: this.Gratuity,
            Deposit: this.Deposit,
            GrandTotal: this.GrandTotal,
            TaxCode: this.TaxCode,
            TaxRate: this.TaxRate
        };
    }
}
