﻿/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />

import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import {InquiryPojo} from '../../models/inquiry';
import {OrderViewModel, OrderItemPojo} from '../../models/order';
import _ from 'underscore';

@inject(HttpClient, Router, Element)
export class EditOrder {
    _model: OrderViewModel;
    _submitted: boolean = false;
    sortedItems: Array<OrderItemPojo>;

    constructor(private httpClient: HttpClient, private router: Router, private element:HTMLElement) { }

    activate(params) {
        this.httpClient.get(`/api/orders/${params.id}`)
            .then((response: HttpResponseMessage) => {
                this._model = new OrderViewModel(response.content);
                console.log(this._model);
                if (!this._model.Items.length) {
                    this.addItem();
                }

                this.sortItems();

                window.setTimeout(_.bind(() => {
                    var $collapsible = $('.collapsible[data-collapsible=expandable]', this.element),
                        $eventDate = $('.datepicker', this.element),
                        $timepicker = $('.timepicker', this.element),
                        $select = $('select', this.element),
                        $dropdown = $('.dropdown-button', this.element),
                        $kitchenReport = $('#kitchenReport', this.element);

                    $kitchenReport.on('click', this.showKitchenReport.bind(this));

                    $select.material_select();

                    $dropdown.dropdown({
                        belowOrigin: true
                    });

                    $collapsible.collapsible({ accordion: false });
                    $eventDate.pickadate({
                        container: 'body',
                        format: 'dddd mmmm d, yyyy'
                    })
                    .on('change', (e) => {
                        this._model.Inquiry.EventDate = e.target.value;
                    });

                    $timepicker
                        .pickatime({
                            container: 'body',
                            format: 'h:i A',
                            formatLabel: 'h:i A'
                        })
                        .on('change', (e) => {
                            this._model.Inquiry.EventTime = e.target.value;
                        })

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

    showKitchenReport(e) {
        e.preventDefault();

        var $el = $(e.target),
            url = $el.attr('href');

        this.submit()
            .then(() => window.open(url, '_blank')
            .catch(() => console.log('Form was invalid'));
    }

    save(e) {
        e.preventDefault();

        this._submitted = true;
        this.submit()
            .then((response) => {
                console.log(response);
                this.router.navigateToRoute('orders');
            });
    }

    submit():Promise<any> {
        if (!this._model.isValid()) {
            return Promise.reject(null);
        } else {
            var order = this._model.toJSON();
            return this.httpClient.patch(`/API/Orders/${this._model.Id}`, order)
                .catch((err) => console.log(err));
        }
    }
}