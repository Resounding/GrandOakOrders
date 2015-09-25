/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { Router } from 'aurelia-router';
import { OrderViewModel } from '../../models/order';
import _ from 'underscore';
export let EditOrder = class {
    constructor(httpClient, router, element) {
        this.httpClient = httpClient;
        this.router = router;
        this.element = element;
        this._submitted = false;
    }
    activate(params) {
        this.httpClient.get(`/api/orders/${params.id}`)
            .then((response) => {
            this._model = new OrderViewModel(response.content);
            console.log(this._model);
            if (!this._model.Items.length) {
                this.addItem();
            }
            this.sortItems();
            window.setTimeout(_.bind(() => {
                var $collapsible = $('.collapsible[data-collapsible=expandable]', this.element), $eventDate = $('.datepicker', this.element), $timepicker = $('.timepicker', this.element), $select = $('select', this.element), $dropdown = $('.dropdown-button', this.element), $kitchenReport = $('#kitchenReport', this.element);
                $kitchenReport.on('click', this.showKitchenReport.bind(this));
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
                $timepicker
                    .pickatime({
                    container: 'body',
                    format: 'h:i A',
                    formatLabel: 'h:i A'
                })
                    .on('change', (e) => {
                    this._model.Inquiry.EventTime = e.target.value;
                });
                try {
                    $eventDate.pickadate('picker')
                        .set('select', this._model.Inquiry.EventDate);
                }
                catch (e) { }
                try {
                    $timepicker.pickatime('picker')
                        .set('select', this._model.Inquiry.EventTime);
                }
                catch (e) { }
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
        var $el = $(e.target), url = $el.attr('href');
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
    submit() {
        this._submitted = true;
        if (!this._model.isValid()) {
            return Promise.reject(null);
        }
        else {
            var order = this._model.toJSON();
            return this.httpClient.patch(`/API/Orders/${this._model.Id}`, order)
                .catch(this.onError);
        }
    }
    onError(err) {
        console.log(err);
        var msg = 'There was a problem saving the order';
        if (err) {
            msg += ': ' + err;
        }
        toastr.error(msg);
    }
};
EditOrder = __decorate([
    inject(HttpClient, Router, Element), 
    __metadata('design:paramtypes', [(typeof (_a = typeof HttpClient !== 'undefined' && HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof Router !== 'undefined' && Router) === 'function' && _b) || Object, HTMLElement])
], EditOrder);
var _a, _b;
