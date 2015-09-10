/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />

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
                if (!this._model.Items.length) {
                    this.addItem();
                }

                this.sortItems();

                window.setTimeout(_.bind(() => {
                    var $collapsible = $('.collapsible[data-collapsible=expandable]', this.element),
                        $eventDate = $('.datepicker', this.element),
                        $timepicker = $('.timepicker', this.element),
                        $select = $('select', this.element),
                        $dropdown = $('.dropdown-button', this.element);

                    $collapsible.collapsible({ accordion: false });
                    $eventDate.pickadate({
                        container: 'body',
                        format: 'dddd mmmm d, yyyy'
                    })
                    .on('change', (e) => {
                        this._model.Inquiry.EventDate = e.target.value;
                    });
                    $eventDate.pickadate('picker')
                        .set('select', this._model.Inquiry.EventDate);

                    $timepicker
                        .pickatime({
                            container: 'body',
                            format: 'h:i A',
                            formatLabel: 'h:i A'
                        })
                        .on('change', (e) => {
                            this._model.Inquiry.EventTime = e.target.value;
                        })

                    $timepicker.pickatime('picker')
                        .set('select', this._model.Inquiry.EventTime);

                    $select.material_select();
                    $dropdown.dropdown({
                        belowOrigin: true
                    });

                }, this), 500);
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

    save(e) {
        this._submitted = true;

        if (!this._model.isValid()) {
            e.preventDefault();
        } else {
            var order = this._model.toJSON();
            this.httpClient.patch(`/API/Orders/${this._model.Id}`, order)
                .then((response) => {
                    console.log(response);
                    this.router.navigateTo('orders');
                })
                .catch((err) => console.log(err));
        }
    }
}