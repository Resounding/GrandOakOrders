/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />

import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {InquiryViewModel, InquiryPojo} from '../../models/inquiry';
import * as uri from 'uri.js'
import {Customer} from '../../models/customer';

@inject(HttpClient, Router, Element)
export class InquiryDetail {
	
    private _model = new InquiryViewModel();
    private _submitted = false;
    private _customers:Array<Customer>;
	
	constructor(private httpClient: HttpClient, private router: Router, private element: Element) {
	    httpClient.fetch('/API/Customers')
            .then((results: HttpResponseMessage) => {
	            results.json().then((content:Array<Customer>) => {
	                this._customers = content;
	            });
	        })
            .catch(this.onError);
	}
	
    activate(params) {
        if (params.id) {
            this.httpClient.fetch(`/api/inquiries/${params.id}`)
                .then((res: HttpResponseMessage) => {
                    res.json().then((content:InquiryPojo) => {
                        this._model = new InquiryViewModel(content);
                    });
                });
        } else {
            // check to see if there was a date passed in.
            const query = uri.query(location.hash);
            if (query && query.date) {
                const date = moment(query.date, 'YYYY-MM-DD');
                if (date.isValid()) {
                    this._model.EventDate = date.format(InquiryViewModel.DATE_FORMAT);
                };
            }
        }

        window.setTimeout(() => {
            var $datepicker = $('#date', this.element),
                $timepicker = $('.timepicker', this.element),
                $select = $('select', this.element),
                $txtOrganization = $('input[name=organization]', this.element);

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
                    }
                )
                .on('typeahead:select', (e, item:Customer) => {
                    this._model.Organization = item.CompanyName;
                    this._model.ContactPerson = item.ContactPerson;
                    this._model.Email = item.Email;
                    this._model.Phone = item.Phone;
                    $('label[for=organization]').addClass('active');
                }).on('typeahead:active', () => {
                        $('label[for=organization]').addClass('active');
                    }
                );

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
        } else {

            var inquiry = this._model.toJSON(),
                headers = new Headers();

            headers.append('Content-Type', 'application/json');

            if (inquiry.Id) {
                // edit
                this.httpClient.fetch(`/api/inquiries/${inquiry.Id}`, { method: 'put', body: JSON.stringify(inquiry), headers })
                    .then(this.onSaved.bind(this))
                    .catch(this.onError);
            } else {
                // create
                this.httpClient.fetch('/api/inquiries', { method: 'post', body: JSON.stringify(inquiry), headers })
                    .then(this.onSaved.bind(this))
                    .catch(this.onError);
            }
		}
    }

    onSaved(response: HttpResponseMessage) {
        console.log(response);
        if (response.status === 201) {
            response.json().then((content) => {
                this.router.navigateToRoute('edit order', { id: content.Id });
            });
        } else {
            this.router.navigateToRoute('inquiries');
        }
    }

    onError(err) {
        console.log(err);
        toastr.error('There was a problem saving the inquiry: ' + err);
    }
}

function substringMatcher(strs) {
    return (q:string, cb) => {

        var substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        var matches = _.reduce(strs, (memo:Array<Customer>, str:Customer) => {
            if (substrRegex.test(str.CompanyName) || substrRegex.test(str.ContactPerson)) {
                memo.push(str);
            }
            return memo;
        }, []);

        cb(matches);
    };
}