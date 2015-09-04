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
import { AuthService } from 'paulvanbladel/aurelia-auth';
import { HttpClient } from 'aurelia-http-client';
import { Router } from 'aurelia-router';
import { InquiryViewModel } from '../../models/inquiry';
import _ from 'underscore';
export let EditInquiry = class {
    constructor(auth, httpClient, router, element) {
        this.auth = auth;
        this.httpClient = httpClient;
        this.router = router;
        this.element = element;
        this._submitted = false;
    }
    activate(params) {
        this.httpClient.get(`/api/inquiries/${params.id}`)
            .then((res) => {
            var inquiry = res.content;
            this._model = new InquiryViewModel(inquiry);
        });
        window.setTimeout(_.bind(() => {
            var $eventDate = $('#date', this.element), $timepicker = $('.timepicker', this.element), $select = $('select', this.element);
            $eventDate.pickadate({
                format: 'dddd mmmm d, yyyy'
            })
                .on('change', (e) => {
                this._model.EventDate = e.target.value;
            });
            $eventDate.pickadate('picker')
                .set('select', this._model.EventDate);
            $timepicker
                .pickatime({
                format: 'h:i A',
                formatLabel: 'h:i A'
            })
                .on('change', (e) => {
                this._model.EventTime = e.target.value;
            });
            $timepicker.pickatime('picker')
                .set('select', this._model.EventTime);
            $select.material_select();
        }, this), 500);
    }
    save(e) {
        this._submitted = true;
        if (!this._model.isValid()) {
            e.preventDefault();
        }
        else {
            var inquiry = this._model.toJSON();
            this.httpClient.put(`/api/inquiries/${inquiry.Id}`, inquiry)
                .then((response) => {
                console.log(response);
                if (response.statusCode == 201) {
                    this.router.navigateToRoute('edit order', { id: response.content.Id });
                }
                else {
                    this.router.navigateToRoute('inquiries');
                }
            });
        }
    }
};
EditInquiry = __decorate([
    inject(AuthService, HttpClient, Router, Element), 
    __metadata('design:paramtypes', [(typeof (_a = typeof AuthService !== 'undefined' && AuthService) === 'function' && _a) || Object, (typeof (_b = typeof HttpClient !== 'undefined' && HttpClient) === 'function' && _b) || Object, (typeof (_c = typeof Router !== 'undefined' && Router) === 'function' && _c) || Object, Element])
], EditInquiry);
var _a, _b, _c;
