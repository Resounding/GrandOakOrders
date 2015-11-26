﻿/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />

import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import {InquiryPojo} from '../../models/inquiry';
import {EmailDelivery} from '../../models/emailDelivery';
import {OrderViewModel, OrderItemPojo} from '../../models/order';
import {Email} from '../../models/email';
import _ from 'underscore';

@inject(HttpClient, Router, Element)
export class EditOrder {
    _model: OrderViewModel;
    _email: Email;
    _submitted: boolean = false;
    sortedItems: Array<OrderItemPojo>;
    _toAddresses: Array<string>;
    _bccAddresses: Array<string>;

    constructor(private httpClient: HttpClient, private router: Router, private element:HTMLElement) { }

    activate(params) {
        this.httpClient.get(`/api/orders/${params.id}`)
            .then((response: HttpResponseMessage) => {
                this._model = new OrderViewModel(response.content);
                this._email = new Email(this._model, this.httpClient);
                
                console.log(this._model);
                if (!this._model.Items.length) {
                    this.addItem();
                }

                this.sortItems();
                this._toAddresses = (this._model.Inquiry.Email || '').split(';');

                this.httpClient.get('/API/Settings/DefaultInvoiceBccAddress')
                    .then((settingsResponse: HttpResponseMessage) => {
                        this._bccAddresses = (settingsResponse.content || '').toString().split(';');
                    });

                window.setTimeout(_.bind(() => {
                    var $collapsible = $('.collapsible[data-collapsible=expandable]', this.element),
                        $eventDate = $('.datepicker.event', this.element),
                        $invoiceDate = $('.datepicker.invoice', this.element),
                        $timepicker = $('.timepicker', this.element),
                        $dropdown = $('.dropdown-button', this.element),
                        $kitchenReport = $('.kitchen-report', this.element),
                        $invoiceReport = $('.invoice-report', this.element);

                    $kitchenReport.on('click', this.showKitchenReport.bind(this));
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
                    } catch(e) { }

                    try {
                        $timepicker.pickatime('picker')
                            .set('select', this._model.Inquiry.EventTime);
                    } catch(e) { }

                }, this), 1000);
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

    sortItems() {
        this.sortedItems = _.sortBy(this._model.Items, (item) => item.SortOrder);
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

    showKitchenReport(e) {
        e.preventDefault();

        const $el = $(e.target),
            url = $el.attr('href');

        this.submit()
            .then(() => window.open(url, '_blank'))
            .catch(() => toastr.error('There are errors on the Order.'));
    }

    showInvoiceReport(e) {
        e.preventDefault();

        const $el = $(e.target),
            url = $el.attr('href');

        if (!this._model.InvoiceDate) {
            this._model.InvoiceDate = new Date();
        }

        this.submit()
            .then(() => window.open(url, '_blank'))
            .catch(() => toastr.error('There are errors on the Order.'));
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

    submit(): Promise<any> {
        this._submitted = true;

        if (!this._model.isValid()) {
            return Promise.reject(null);
        } else {
            const order = this._model.toJSON();
            order.Inquiry.Email = this._toAddresses.join(';');

            return this.httpClient.patch(`/API/Orders/${this._model.Id}`, order)
                .then((result) => {
                    const edited = result.content;

                    this._model.Items.forEach((item, index) => {
                        if (item.Id < 0) {
                            item.Id = edited.Items[index].Id;
                        }
                    });
                })
                .catch(this.onError);
        }
    }

    emailInvoice() {
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
                        .then((result: HttpResponseMessage) => {
                            var delivery = new EmailDelivery(result.content);
                            this._model.EmailDeliveries.push(delivery);
                            $modal.closeModal();
                        })
                        .catch((err: HttpResponseMessage) => {
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
    }

    onError(err) {
        console.log(err);
        var msg = 'There was a problem saving the order';
        if (err) {
            msg += `: ${err}`;
        }
        toastr.error(msg);
    }
}