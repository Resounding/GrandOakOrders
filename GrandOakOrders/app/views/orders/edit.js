/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
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
const aurelia_router_1 = require('aurelia-router');
const emailDelivery_1 = require('../../models/emailDelivery');
const order_1 = require('../../models/order');
const email_1 = require('../../models/email');
const itemTemplate_1 = require('../../models/itemTemplate');
let EditOrder = class EditOrder {
    constructor(httpClient, router, element) {
        this.httpClient = httpClient;
        this.router = router;
        this.element = element;
        this._submitted = false;
        this._itemTemplates = [];
        this._showAllInPricingModal = false;
    }
    activate(params) {
        this.httpClient.fetch('/api/items')
            .then((response) => {
            response.json().then((content) => {
                content.forEach(i => this._itemTemplates.push(new itemTemplate_1.ItemTemplate(i)));
            });
            this.httpClient.fetch(`/api/orders/${params.id}`)
                .then((response) => {
                response.json().then((content) => {
                    this._model = new order_1.OrderViewModel(content);
                    this._email = new email_1.Email(this._model, this.httpClient);
                    console.log(this._model);
                    if (!this._model.Items.length) {
                        this.addItem();
                    }
                    this.sortItems();
                    this._toAddresses = (this._model.Inquiry.Email || '').split(';');
                    this._originalPeople = this._model.Inquiry.People;
                    this.httpClient.fetch('/API/Settings/DefaultInvoiceBccAddress')
                        .then((settingsResponse) => {
                        settingsResponse.json().then((settingsContent) => {
                            this._bccAddresses = (settingsContent || '').toString().split(';');
                        });
                    });
                    window.setTimeout(_.bind(() => {
                        var $collapsible = $('.collapsible[data-collapsible=expandable]', this.element), $eventDate = $('.datepicker.event', this.element), $invoiceDate = $('.datepicker.invoice', this.element), $timepicker = $('.timepicker', this.element), $dropdown = $('.dropdown-button', this.element), $kitchenReport = $('.kitchen-report', this.element), $quoteReport = $('.quote-report', this.element), $invoiceReport = $('.invoice-report', this.element);
                        $kitchenReport.on('click', this.showKitchenReport.bind(this));
                        $quoteReport.on('click', this.showQuoteReport.bind(this));
                        $invoiceReport.on('click', this.showInvoiceReport.bind(this));
                        $dropdown.dropdown({
                            belowOrigin: true
                        });
                        $collapsible
                            .collapsible({ accordion: false })
                            .on('materialize:opened', (e) => {
                            var $el = $(e.target).parent();
                            window.setTimeout(() => {
                                $el.find('textarea').trigger('autoresize');
                                $el.find('textarea,input').first().focus();
                            }, 50);
                        });
                        $eventDate.pickadate({
                            container: 'body',
                            format: 'dddd mmm d, yyyy'
                        })
                            .on('change', (e) => {
                            this._model.Inquiry.EventDate = e.target.value;
                        });
                        $invoiceDate
                            .val(this._model.InvoiceDateDisplay)
                            .pickadate({
                            container: 'body',
                            format: 'dddd mmm d, yyyy'
                        })
                            .on('change', (e) => {
                            this._model.InvoiceDate = e.target.value;
                        });
                        $timepicker
                            .pickatime({
                            container: 'body',
                            format: 'h:i A',
                            formatLabel: 'h:i A',
                            interval: 15,
                            min: [7, 0],
                            max: [21, 0]
                        })
                            .on('change', (e) => {
                            this._model.Inquiry.EventTime = e.target.value;
                        });
                        try {
                            $eventDate.pickadate('picker')
                                .set('select', this._model.Inquiry.EventDate);
                        }
                        catch (e) {
                        }
                        try {
                            $timepicker.pickatime('picker')
                                .set('select', this._model.Inquiry.EventTime);
                        }
                        catch (e) {
                        }
                    }, this), 1000);
                });
            });
        });
    }
    get isOnsite() {
        return this._model.Inquiry.DeliveryType !== 'Off-Site' && this._model.Inquiry.DeliveryType !== 'Delivered';
    }
    addItem() {
        this._model.addItem();
        this.sortItems();
    }
    removeItem(item) {
        this._model.removeItem(item);
        this.sortItems();
    }
    moveUp(item) {
        this._model.moveUp(item);
        this.sortItems();
    }
    moveDown(item) {
        this._model.moveDown(item);
        this.sortItems();
    }
    sortItems() {
        this.sortedItems = _.sortBy(this._model.Items, (item) => item.SortOrder);
    }
    changeAddress(list, index, address) {
        list[index] = address;
    }
    addAddress(list) {
        list.push('');
    }
    removeAddress(address, list) {
        var index = list.indexOf(address);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }
    numberPeopleChange() {
        var people = parseInt(this._model.Inquiry.People.toString());
        // skip if NaN, don't do it if 0
        if (people) {
            this._model.Items.forEach((item) => {
                if (parseInt(item.Quantity.toString()) === this._originalPeople) {
                    item.Quantity = people;
                }
            });
            this._originalPeople = people;
        }
    }
    showKitchenReport(e) {
        e.preventDefault();
        const $el = $(e.target), url = $el.attr('href');
        this.submit()
            .then(() => window.open(url, '_blank'))
            .catch(() => toastr.error('There are errors on the Order.'));
    }
    showQuoteReport(e) {
        e.preventDefault();
        const $el = $(e.target), url = $el.attr('href');
        this.submit()
            .then(() => window.open(url, '_blank'))
            .catch(() => toastr.error('There are errors on the Order.'));
    }
    showInvoiceReport(e) {
        e.preventDefault();
        const $el = $(e.target), url = $el.attr('href');
        this.submit()
            .then(() => window.open(url, '_blank'))
            .catch(() => toastr.error('There are errors on the Order.'));
    }
    allInPricing() {
        var itemsOnInvoice = _.filter(this._model.Items, (item) => item.ShowOnInvoice);
        if (itemsOnInvoice.length !== 1) {
            window.toastr.warning('All in pricing can only be done when 0 or 1 items are being displayed on the invoice');
        }
        else {
            this._showAllInPricingModal = true;
            window.setTimeout((() => this._showAllInPricingModal = false).bind(this));
        }
    }
    save(e) {
        e.preventDefault();
        this.submit()
            .then((response) => {
            console.log(response);
            this.router.navigateToRoute('orders');
        })
            .catch(this.onError);
    }
    createReminders(e) {
        e.preventDefault();
        this.httpClient.fetch(`/API/Orders/${this._model.Id}/Reminders`, { method: 'put' })
            .then(result => {
            if (result.ok) {
                this._model.Reminders.push({});
            }
        })
            .catch(this.onError);
    }
    removeReminders(e) {
        e.preventDefault();
        this.httpClient.fetch(`/API/Orders/${this._model.Id}/Reminders`, { method: 'delete' })
            .then(result => {
            if (result.ok) {
                this._model.Reminders = [];
            }
        })
            .catch(this.onError);
    }
    submit() {
        this._submitted = true;
        if (!this._model.isValid()) {
            return Promise.reject(null);
        }
        else {
            const order = this._model.toJSON(), headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.httpClient.fetch(`/API/Orders/${this._model.Id}`, { method: 'patch', body: JSON.stringify(order), headers: headers })
                .then((result) => {
                result.json().then((content) => {
                    this._model.Items.forEach((item, index) => {
                        if (item.Id < 0) {
                            item.Id = content.Items[index].Id;
                        }
                    });
                });
            })
                .catch(this.onError);
        }
    }
    emailInvoice() {
        this.submit()
            .then(() => {
            var $modal = $('#emailModal');
            $modal.openModal({
                ready: () => {
                    $modal.off().on('click', 'button.cancel', (e) => {
                        e.preventDefault();
                        $modal.closeModal();
                    });
                    $modal.off().on('click', 'button.blue', _.bind((e) => {
                        e.preventDefault();
                        this._email.send(this._toAddresses, this._bccAddresses)
                            .then((result) => {
                            result.json().then((content) => {
                                var delivery = new emailDelivery_1.EmailDelivery(content);
                                this._model.EmailDeliveries.push(delivery);
                                $modal.closeModal();
                            });
                        })
                            .catch((err) => {
                            console.log(err);
                            var msg = 'There was a problem sending the email';
                            if (err) {
                                msg += `: ${err}`;
                            }
                            toastr.error(msg);
                        });
                    }, this));
                    $modal.find('iframe').attr('src', this._email.reportUrl);
                }
            });
        })
            .catch(() => toastr.error('There are errors on the Order.'));
    }
    onError(err) {
        console.log(err);
        var msg = 'There was a problem saving the order';
        if (err) {
            msg += `: ${err}`;
        }
        toastr.error(msg);
    }
};
EditOrder = __decorate([
    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_router_1.Router, Element), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_fetch_client_1.HttpClient !== 'undefined' && aurelia_fetch_client_1.HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof aurelia_router_1.Router !== 'undefined' && aurelia_router_1.Router) === 'function' && _b) || Object, HTMLElement])
], EditOrder);
exports.EditOrder = EditOrder;
var _a, _b;
