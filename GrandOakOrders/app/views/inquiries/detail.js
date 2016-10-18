/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
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
const inquiry_1 = require('../../models/inquiry');
const _ = require('underscore');
const uri = require('uri.js');
let InquiryDetail = class InquiryDetail {
    constructor(httpClient, router, element) {
        this.httpClient = httpClient;
        this.router = router;
        this.element = element;
        this._model = new inquiry_1.InquiryViewModel();
        this._submitted = false;
        httpClient.fetch('/API/Customers')
            .then((results) => {
            results.json().then((content) => {
                this._customers = content;
            });
        })
            .catch(this.onError);
    }
    activate(params) {
        if (params.id) {
            this.httpClient.fetch(`/api/inquiries/${params.id}`)
                .then((res) => {
                res.json().then((content) => {
                    this._model = new inquiry_1.InquiryViewModel(content);
                });
            });
        }
        else {
            // check to see if there was a date passed in.
            const query = uri.query(location.hash);
            if (query && query.date) {
                const date = moment(query.date, 'YYYY-MM-DD');
                if (date.isValid()) {
                    this._model.EventDate = date.format(inquiry_1.InquiryViewModel.DATE_FORMAT);
                }
                ;
            }
        }
        window.setTimeout(() => {
            var $datepicker = $('#date', this.element), $timepicker = $('.timepicker', this.element), $select = $('select', this.element), $txtOrganization = $('input[name=organization]', this.element);
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
                formatLabel: 'h:i A',
                interval: 15,
                min: [7, 0],
                max: [21, 0]
            })
                .on('change', (e) => {
                this._model.EventTime = e.target.value;
            });
            $select.material_select();
            $('textarea', this.element).trigger('autoresize');
            $txtOrganization.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                name: 'items',
                source: substringMatcher(this._customers),
                display: 'CompanyName',
                templates: {
                    suggestion: Handlebars.compile('<div>{{CompanyName}} ({{ContactPerson}})</div>')
                }
            })
                .on('typeahead:select', (e, item) => {
                this._model.Organization = item.CompanyName;
                this._model.ContactPerson = item.ContactPerson;
                this._model.Email = item.Email;
                this._model.Phone = item.Phone;
                $('label[for=organization]').addClass('active');
            }).on('typeahead:active', () => {
                $('label[for=organization]').addClass('active');
            });
            $('[autofocus]').focus();
        }, 500);
    }
    get isOnsite() {
        return this._model.DeliveryType !== 'Off-Site' && this._model.DeliveryType !== 'Delivered';
    }
    save(e) {
        this._submitted = true;
        if (!this._model.isValid()) {
            e.preventDefault();
        }
        else {
            var inquiry = this._model.toJSON(), headers = new Headers();
            headers.append('Content-Type', 'application/json');
            if (inquiry.Id) {
                // edit
                this.httpClient.fetch(`/api/inquiries/${inquiry.Id}`, { method: 'put', body: JSON.stringify(inquiry), headers: headers })
                    .then(this.onSaved.bind(this))
                    .catch(this.onError);
            }
            else {
                // create
                this.httpClient.fetch('/api/inquiries', { method: 'post', body: JSON.stringify(inquiry), headers: headers })
                    .then(this.onSaved.bind(this))
                    .catch(this.onError);
            }
        }
    }
    onSaved(response) {
        console.log(response);
        if (response.status === 201) {
            response.json().then((content) => {
                this.router.navigateToRoute('edit order', { id: content.Id });
            });
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
    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_router_1.Router, Element), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_fetch_client_1.HttpClient !== 'undefined' && aurelia_fetch_client_1.HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof aurelia_router_1.Router !== 'undefined' && aurelia_router_1.Router) === 'function' && _b) || Object, Element])
], InquiryDetail);
exports.InquiryDetail = InquiryDetail;
function substringMatcher(strs) {
    return (q, cb) => {
        var substrRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        var matches = _.reduce(strs, (memo, str) => {
            if (substrRegex.test(str.CompanyName) || substrRegex.test(str.ContactPerson)) {
                memo.push(str);
            }
            return memo;
        }, []);
        cb(matches);
    };
}
var _a, _b;
