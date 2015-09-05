/// <reference path="../../../typings/jquery/jquery.d.ts" />
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
            if (!this._model.Items.length) {
                this.addItem();
            }
            window.setTimeout(_.bind(() => {
                var $collapsible = $('.collapsible[data-collapsible=expandable]', this.element), $eventDate = $('.datepicker', this.element), $timepicker = $('.timepicker', this.element), $select = $('select', this.element);
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
                });
                $timepicker.pickatime('picker')
                    .set('select', this._model.Inquiry.EventTime);
                $select.material_select();
            }, this), 500);
        });
    }
    addItem() {
        this._model.addItem();
    }
    save(e) {
        this._submitted = true;
        if (!this._model.isValid()) {
            e.preventDefault();
        }
        else {
            var order = this._model.toJSON();
            this.httpClient.patch(`/API/Orders/${this._model.Id}`, order)
                .then((response) => {
                console.log(response);
                this.router.navigateTo('orders');
            })
                .catch((err) => console.log(err));
        }
    }
};
EditOrder = __decorate([
    inject(HttpClient, Router, Element), 
    __metadata('design:paramtypes', [(typeof (_a = typeof HttpClient !== 'undefined' && HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof Router !== 'undefined' && Router) === 'function' && _b) || Object, HTMLElement])
], EditOrder);
var _a, _b;
