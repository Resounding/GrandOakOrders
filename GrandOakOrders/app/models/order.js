/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
System.register(['./inquiry', './emailDelivery', 'aurelia-event-aggregator', 'aurelia-dependency-injection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var inquiry_1, emailDelivery_1, aurelia_event_aggregator_1, aurelia_dependency_injection_1;
    var DATE_FORMAT, TIME_FORMAT, OrderItemViewModel, OrderViewModel;
    return {
        setters:[
            function (inquiry_1_1) {
                inquiry_1 = inquiry_1_1;
            },
            function (emailDelivery_1_1) {
                emailDelivery_1 = emailDelivery_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            }],
        execute: function() {
            DATE_FORMAT = 'dddd MMM D, YYYY';
            TIME_FORMAT = 'h:mm A';
            OrderItemViewModel = (function () {
                function OrderItemViewModel(model, events) {
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
                Object.defineProperty(OrderItemViewModel.prototype, "Quantity", {
                    get: function () {
                        return this._quantity;
                    },
                    set: function (val) {
                        this._quantity = val;
                        var numVal = parseFloat((val || '').toString());
                        if (!isNaN(numVal)) {
                            this._totalPrice = this._quantity * this._unitPrice;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OrderItemViewModel.prototype, "UnitPrice", {
                    get: function () {
                        return this._unitPrice;
                    },
                    set: function (val) {
                        var currency = parseFloat((val || '0').toString().replace(/[$,\(\)]/g, ''));
                        if (!isNaN(currency)) {
                            this._unitPrice = currency;
                            this._totalPrice = this._quantity * this._unitPrice;
                            this.events.publish('currency:changed');
                        }
                        else {
                            this._unitPrice = val;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OrderItemViewModel.prototype, "TotalPrice", {
                    get: function () {
                        return this._totalPrice;
                    },
                    set: function (val) {
                        var currency = parseFloat((val || '').toString().replace(/[$,\(\)]/g, ''));
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
                    },
                    enumerable: true,
                    configurable: true
                });
                OrderItemViewModel.prototype.isValid = function () {
                    if (!this.Description)
                        return false;
                    if (isNaN(parseFloat((this.Quantity || '0').toString())))
                        return false;
                    if (isNaN(parseFloat((this.UnitPrice || '0').toString())))
                        return false;
                    if (isNaN(parseFloat((this.TotalPrice || '0').toString())))
                        return false;
                    return true;
                };
                OrderItemViewModel.prototype.toJSON = function () {
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
                };
                return OrderItemViewModel;
            }());
            exports_1("OrderItemViewModel", OrderItemViewModel);
            OrderViewModel = (function () {
                function OrderViewModel(model) {
                    var _this = this;
                    this.EventDate = null;
                    this.CreatedDateAndTime = '';
                    this.UpdatedDateAndTime = '';
                    this.events = aurelia_dependency_injection_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
                    var deposit = model.Deposit;
                    var gratuity = model.Gratuity;
                    delete model.Deposit;
                    delete model.Gratuity;
                    _.extend(this, model);
                    this._deposit = deposit;
                    this._gratuity = gratuity;
                    this.Inquiry = new inquiry_1.InquiryViewModel(model.Inquiry);
                    var items = model.Items;
                    this.Items = _.map(items, function (item) { return new OrderItemViewModel(item, _this.events); });
                    this.IdText = '';
                    if (this.Id > 0) {
                        this.IdText = ("0000" + this.Id).substring(this.Id.toString().length);
                    }
                    if (model.EmailDeliveries) {
                        this.EmailDeliveries = model.EmailDeliveries.map(function (d) { return new emailDelivery_1.EmailDelivery(d); });
                    }
                    var eventDate = model.Inquiry.EventDate ? moment(model.Inquiry.EventDate) : null, eventTime = model.Inquiry.EventTime ? moment(model.Inquiry.EventTime, TIME_FORMAT) : null, createdAt = moment(model.CreatedAt), createdDate = createdAt.format(DATE_FORMAT), createdTime = createdAt.format(TIME_FORMAT), updatedAt = moment(model.UpdatedAt), updatedDate = updatedAt.format(DATE_FORMAT), updatedTime = updatedAt.format(TIME_FORMAT);
                    this.CreatedDateAndTime = createdDate + " @ " + createdTime;
                    this.UpdatedDateAndTime = updatedDate + " @ " + updatedTime;
                    if (eventDate) {
                        if (eventTime) {
                            eventDate.add(eventTime.hours(), 'hours').add(eventTime.minutes(), 'minutes');
                        }
                        this.EventDate = eventDate.toDate();
                    }
                }
                Object.defineProperty(OrderViewModel.prototype, "HeaderText", {
                    get: function () {
                        var text = this.Inquiry.Organization;
                        if (this.Inquiry.ContactPerson) {
                            text += " (" + this.Inquiry.ContactPerson + ")";
                        }
                        if (this.Inquiry.People) {
                            text += " for " + this.Inquiry.People + " people";
                        }
                        return text;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OrderViewModel.prototype, "DateAndTime", {
                    get: function () {
                        var text = '';
                        if (this.Inquiry.EventDate) {
                            text = this.Inquiry.EventDate;
                        }
                        if (this.Inquiry.EventTime) {
                            text += " @ " + this.Inquiry.EventTime;
                        }
                        return text;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OrderViewModel.prototype, "SubTotal", {
                    get: function () {
                        return _.reduce(this.Items, function (memo, item) {
                            return memo + (parseFloat(item.TotalPrice) || 0);
                        }, 0);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OrderViewModel.prototype, "TotalTax", {
                    get: function () {
                        return parseFloat((this.SubTotal * this.TaxRate).toFixed(2));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OrderViewModel.prototype, "Gratuity", {
                    get: function () {
                        return this._gratuity;
                    },
                    set: function (val) {
                        var currency = parseFloat((val || '0').toString().replace(/[$,\(\)]/g, ''));
                        if (!isNaN(currency)) {
                            this._gratuity = currency;
                            this.events.publish('currency:changed');
                        }
                        else {
                            this._gratuity = val;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OrderViewModel.prototype, "Deposit", {
                    get: function () {
                        return this._deposit;
                    },
                    set: function (val) {
                        var currency = parseFloat((val || '0').toString().replace(/[$,\(\)]/g, ''));
                        if (!isNaN(currency)) {
                            this._deposit = currency;
                            this.events.publish('currency:changed');
                        }
                        else {
                            this._deposit = val;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OrderViewModel.prototype, "GrandTotal", {
                    get: function () {
                        return this.SubTotal + this.TotalTax + this.Gratuity - this.Deposit;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OrderViewModel.prototype, "InvoiceDateDisplay", {
                    get: function () {
                        return this.InvoiceDate ? moment(this.InvoiceDate).format(DATE_FORMAT) : 'Not invoiced';
                    },
                    enumerable: true,
                    configurable: true
                });
                OrderViewModel.prototype.addItem = function () {
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
                };
                OrderViewModel.prototype.removeItem = function (item) {
                    var index = this.Items.indexOf(item);
                    if (index !== -1) {
                        this.Items.splice(index, 1);
                    }
                    if (!this.Items.length) {
                        this.addItem();
                    }
                    this.resort();
                };
                OrderViewModel.prototype.moveUp = function (item) {
                    if (item.SortOrder > 0) {
                        var newOrder_1 = item.SortOrder - 1;
                        var other = _.find(this.Items, function (i) { return i.SortOrder === newOrder_1; });
                        if (other) {
                            other.SortOrder = item.SortOrder;
                        }
                        item.SortOrder = newOrder_1;
                    }
                    this.resort();
                };
                OrderViewModel.prototype.moveDown = function (item) {
                    var newOrder = item.SortOrder + 1;
                    var other = _.find(this.Items, function (i) { return i.SortOrder === newOrder; });
                    if (other) {
                        other.SortOrder = item.SortOrder;
                    }
                    item.SortOrder = newOrder;
                    this.resort();
                };
                OrderViewModel.prototype.resort = function () {
                    var index = 1;
                    var sortedItems = _.sortBy(this.Items, function (i) { return i.SortOrder; });
                    for (var _i = 0, sortedItems_1 = sortedItems; _i < sortedItems_1.length; _i++) {
                        var item = sortedItems_1[_i];
                        item.SortOrder = index++;
                    }
                };
                OrderViewModel.prototype.isValid = function () {
                    if (this.IsCancelled)
                        return true;
                    if (_.any(this.Items, function (item) { return !item.isValid(); }))
                        return false;
                    return true;
                };
                OrderViewModel.prototype.toJSON = function () {
                    var items = _.map(this.Items, function (item) { return item.toJSON(); });
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
                };
                return OrderViewModel;
            }());
            exports_1("OrderViewModel", OrderViewModel);
        }
    }
});
