/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />

import {InquiryPojo, InquiryViewModel} from './inquiry';
import {EmailDelivery} from './emailDelivery';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Container} from 'aurelia-dependency-injection';
import _ from 'underscore';
import moment from 'moment';

const DATE_FORMAT: string = 'dddd MMM D, YYYY';
const TIME_FORMAT: string = 'h:mm A';

export interface OrderPojo {
    Id: number;
    Inquiry: InquiryPojo;
    InquiryId: number;
    Notes: string;
    PickupNotes: string;
    AllergyNotes: string;
    RequireDeposit: boolean;
    RequireConfirmation: boolean;
    ConfirmationDate: Date;
    CompletedDate: Date;
    InvoiceDate: Date;
    PaymentDate: Date;

    Items: Array<OrderItemPojo>;
    EmailDeliveries: Array<EmailDelivery>;

    SubTotal: number;
    Gratuity: number;
    Deposit: number;
    GrandTotal: number;
    TaxCode: string;
    TaxRate: number;

    CreatedBy?: string;
    CreatedAt?: Date;
    UpdatedBy?: string;
    UpdatedAt?: Date;
}

export interface OrderItemPojo {
    Id: number;
    OrderId: number;
    Description: string;
    Quantity: number;
    UnitPrice: number;
    TotalPrice: number;
    KitchenNotes: string;
    OrderingNotes: string;
    InvoiceNotes: string;
    ShowToKitchen: boolean;
    ShowOnInvoice: boolean;
    SortOrder: number;
    CreatedBy?: string;
    CreatedAt?: Date;
    UpdatedBy?: string;
    UpdatedAt?: Date;
}

export class OrderItemViewModel {
    Id: number;
    OrderId: number;
    Description: string = '';        
    KitchenNotes: string = '';
    OrderingNotes: string = '';
    InvoiceNotes: string = '';
    ShowToKitchen: boolean = true;
    ShowOnInvoice: boolean = true;
    SortOrder: number = 1;
    CreatedBy: string;
    CreatedAt: Date;
    UpdatedBy: string;
    UpdatedAt: Date;
    private _quantity: number = 1;
    private _unitPrice: number = 0;
    private _totalPrice: number = 0;

    constructor(model:any, private events:EventAggregator) {
        if (model) {
            _.extend(this, model);
        }
    }

    get Quantity(): number {
        return this._quantity;
    }
    set Quantity(val) {
        this._quantity = val;
        var numVal = parseFloat((val || '').toString());
        if(!isNaN(numVal)) {            
            this._totalPrice = this._quantity * this._unitPrice;
        }
    }

    get UnitPrice(): number {
        return this._unitPrice;
    }
    set UnitPrice(val) {
        const currency = parseFloat((val || '0').toString().replace(/[$,\(\)]/g, ''));

        if (!isNaN(currency)) {
            this._unitPrice = currency;
            this._totalPrice = this._quantity * this._unitPrice;
            this.events.publish('currency:changed');
        } else {
            this._unitPrice = val;
        }        
    }

    get TotalPrice(): number {
        return this._totalPrice;
    }
    set TotalPrice(val) {
        const currency = parseFloat((val || '').toString().replace(/[$,\(\)]/g, ''));

        if (!isNaN(currency)) {
            this._totalPrice = currency;
            if (val) {
                this._unitPrice = this._totalPrice / this._quantity;
            }
            this.events.publish('currency:changed');
        } else {
            this._totalPrice = val;
        }        
    }

    isValid(): boolean {
        if (!this.Description) return false;
        if (isNaN(parseFloat((this.Quantity || '0').toString()))) return false;
        if (isNaN(parseFloat((this.UnitPrice || '0').toString()))) return false;
        if (isNaN(parseFloat((this.TotalPrice || '0').toString()))) return false;

        return true;
    }

    toJSON(): OrderItemPojo {
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

export class OrderViewModel implements OrderPojo {
    Id: number;
    Inquiry: InquiryPojo;
    InquiryId: number;
    Notes: string;
    PickupNotes: string;
    AllergyNotes: string;
    RequireDeposit: boolean;
    RequireConfirmation: boolean;
    ConfirmationDate: Date;
    CompletedDate: Date;
    InvoiceDate: Date;
    PaymentDate: Date;

    Items: Array<OrderItemPojo>;
    EmailDeliveries: Array<EmailDelivery>;

    TaxCode: string;
    TaxRate: number;

    CreatedBy: string;
    CreatedAt: Date;
    UpdatedBy: string;
    UpdatedAt: Date;

    HeaderText: string;
    IdText: string;
    EventDate: Date = null;
    DateAndTime: string = '';
    CreatedDateAndTime: string = '';
    UpdatedDateAndTime: string = '';
    _gratuity: number;
    _deposit: number;

    events: EventAggregator;

    constructor(model: OrderPojo) {

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

        if (model.EmailDeliveries) {
            this.EmailDeliveries = model.EmailDeliveries.map(d => new EmailDelivery(d));
        }

        var eventDate = model.Inquiry.EventDate ? moment(model.Inquiry.EventDate) : null,
            eventTime = model.Inquiry.EventTime ? moment(model.Inquiry.EventTime, TIME_FORMAT) : null,
            createdAt = moment(model.CreatedAt),
            createdDate = createdAt.format(DATE_FORMAT),
            createdTime = createdAt.format(TIME_FORMAT),
            updatedAt = moment(model.UpdatedAt),
            updatedDate = updatedAt.format(DATE_FORMAT),
            updatedTime = updatedAt.format(TIME_FORMAT);
        this.CreatedDateAndTime = `${createdDate} @ ${createdTime}`;
        this.UpdatedDateAndTime = `${updatedDate} @ ${updatedTime}`;
        if (eventDate) {            
            if (eventTime) {
                eventDate.add(eventTime.hours(), 'hours').add(eventTime.minutes(), 'minutes');
            }
            this.EventDate = eventDate.toDate();
        }
    }

    get SubTotal(): number {
        return _.reduce(this.Items, (memo, item) => {
            return memo + (parseFloat(item.TotalPrice) || 0);
        }, 0);
    }

    get TotalTax(): number {
        return parseFloat((this.SubTotal * this.TaxRate).toFixed(2));
    }

    get Gratuity(): number {
        return this._gratuity;
    }

    set Gratuity(val) {
        const currency = parseFloat((val || '0').toString().replace(/[$,\(\)]/g, ''));

        if (!isNaN(currency)) {
            this._gratuity = currency;
            this.events.publish('currency:changed');
        } else {
            this._gratuity = val;
        }
    }

    get Deposit(): number {
        return this._deposit;
    }

    set Deposit(val) {
        const currency = parseFloat((val || '0').toString().replace(/[$,\(\)]/g, ''));

        if (!isNaN(currency)) {
            this._deposit = currency;
            this.events.publish('currency:changed');
        } else {
            this._deposit = val;
        }
    }

    get GrandTotal():number {
        return this.SubTotal + this.TotalTax + this.Gratuity - this.Deposit;
    }

    addItem(): OrderItemPojo {
        var orders = _.pluck(this.Items, 'SortOrder'),
            order = 1;
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

    isValid(): boolean {
        if (_.any(this.Items, (item:OrderItemPojo) => !item.isValid())) return false;
        return true;
    }

    toJSON(): OrderPojo {
        const items: OrderItemPojo[] = _.map(this.Items, (item) => item.toJSON());

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
            TaxRate: this.TaxRate,
            EmailDeliveries: []
        };
    }
}