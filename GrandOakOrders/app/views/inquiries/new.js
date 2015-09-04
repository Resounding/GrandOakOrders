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
import { InquiryViewModel } from '../../models/inquiry';
export let NewInquiry = class {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this._model = new InquiryViewModel();
        this._submitted = false;
    }
    activate() {
        window.setTimeout(() => {
            $('.datepicker')
                .pickadate({
                format: 'dddd mmmm d, yyyy'
            })
                .on('change', (e) => {
                this._model.EventDate = e.target.value;
            });
            $('.timepicker')
                .pickatime({
                format: 'h:i A',
                formatLabel: 'h:i A'
            })
                .on('change', (e) => {
                this._model.EventTime = e.target.value;
            });
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
            this.httpClient.post('/api/inquiries', inquiry)
                .then((response) => {
                console.log(response);
                this.router.navigateToRoute('inquiries');
            });
        }
    }
};
NewInquiry = __decorate([
    inject(HttpClient, Router), 
    __metadata('design:paramtypes', [(typeof (_a = typeof HttpClient !== 'undefined' && HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof Router !== 'undefined' && Router) === 'function' && _b) || Object])
], NewInquiry);
var _a, _b;
