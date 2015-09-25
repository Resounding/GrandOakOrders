/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
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
import { InquiryViewModel } from '../../models/inquiry';
export let InquiryDetail = class {
    constructor(httpClient, router, element) {
        this.httpClient = httpClient;
        this.router = router;
        this.element = element;
        this._model = new InquiryViewModel();
        this._submitted = false;
    }
    activate(params) {
        if (params.id) {
            this.httpClient.get(`/api/inquiries/${params.id}`)
                .then((res) => {
                var inquiry = res.content;
                this._model = new InquiryViewModel(inquiry);
                var isNew = this._model.Id;
            });
        }
        window.setTimeout(() => {
            var $datepicker = $('#date', this.element), $timepicker = $('.timepicker', this.element), $select = $('select', this.element);
            $datepicker
                .pickadate({
                format: 'dddd mmm d, yyyy'
            })
                .on('change', (e) => {
                this._model.EventDate = e.target.value;
            });
            $timepicker
                .pickatime({
                format: 'h:i A',
                formatLabel: 'h:i A'
            })
                .on('change', (e) => {
                this._model.EventTime = e.target.value;
            });
            $select.material_select();
            $('textarea', this.element).trigger('autoresize');
            $('[autofocus]').focus();
        }, 500);
    }
    save(e) {
        this._submitted = true;
        if (!this._model.isValid()) {
            e.preventDefault();
        }
        else {
            var inquiry = this._model.toJSON();
            if (inquiry.Id) {
                // edit
                this.httpClient.put(`/api/inquiries/${inquiry.Id}`, inquiry)
                    .then(this.onSaved.bind(this))
                    .catch(this.onError);
            }
            else {
                // create
                this.httpClient.post('/api/inquiries', inquiry)
                    .then(this.onSaved.bind(this))
                    .catch(this.onError);
            }
        }
    }
    onSaved(response) {
        console.log(response);
        if (response.statusCode == 201) {
            this.router.navigateToRoute('edit order', { id: response.content.Id });
        }
        else {
            this.router.navigateToRoute('inquiries');
        }
    }
    onError(err) {
        console.log(err);
        toastr.error('There was a problem saving the inquiry: ' + err);
    }
};
InquiryDetail = __decorate([
    inject(HttpClient, Router, Element), 
    __metadata('design:paramtypes', [(typeof (_a = typeof HttpClient !== 'undefined' && HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof Router !== 'undefined' && Router) === 'function' && _b) || Object, Element])
], InquiryDetail);
var _a, _b;
