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
import * as _ from 'underscore';
import * as uri from 'uri.js';
export let InquiryDetail = class {
    constructor(httpClient, router, element) {
        this.httpClient = httpClient;
        this.router = router;
        this.element = element;
        this._model = new InquiryViewModel();
        this._submitted = false;
        httpClient.get('/API/Customers')
            .then((results) => {
            this._customers = results.content;
        })
            .catch(this.onError);
    }
    activate(params) {
        if (params.id) {
            this.httpClient.get(`/api/inquiries/${params.id}`)
                .then((res) => {
                var inquiry = res.content;
                this._model = new InquiryViewModel(inquiry);
            });
        }
        else {
            // check to see if there was a date passed in.
            const query = uri.query(location.hash);
            if (query && query.date) {
                const date = moment(query.date, 'YYYY-MM-DD');
                if (date.isValid()) {
                    this._model.EventDate = date.format(InquiryViewModel.DATE_FORMAT);
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
