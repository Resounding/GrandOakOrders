/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />

import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import {InquiryViewModel, InquiryPojo} from '../../models/inquiry';
import * as _ from 'underscore'
import * as uri from 'uri.js'

@inject(HttpClient, Router, Element)
export class InquiryDetail {
	
    _model = new InquiryViewModel();
	_submitted = false;
	
	constructor(private httpClient:HttpClient, private router:Router, private element: Element) { }
	
    activate(params) {
        if (params.id) {
            this.httpClient.get(`/api/inquiries/${params.id}`)
                .then((res: HttpResponseMessage) => {
                    var inquiry: InquiryPojo = res.content;
                    this._model = new InquiryViewModel(inquiry);
                    var isNew = this._model.Id;
                });
        } else {
            // check to see if there was a date passed in.
            var query = uri.query(location.hash);
            if (query && query.date) {
                var date = moment(query.date, 'YYYY-MM-DD');
                if (date.isValid()) {
                    this._model.EventDate = query.date;
                };
            }
        }

        window.setTimeout(() => {
            var $datepicker = $('#date', this.element),
                $timepicker = $('.timepicker', this.element),
                $select = $('select', this.element);

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

    get isOnsite() {
        return this._model.DeliveryType !== 'Off-Site' && this._model.DeliveryType !== 'Delivered';
    }
	
	save(e) {
		this._submitted = true;
				
        if (!this._model.isValid()) {
            e.preventDefault();
        } else {

            var inquiry = this._model.toJSON();

            if (inquiry.Id) {
                // edit
                this.httpClient.put(`/api/inquiries/${inquiry.Id}`, inquiry)
                    .then(this.onSaved.bind(this))
                    .catch(this.onError);
            } else {
                // create
                this.httpClient.post('/api/inquiries', inquiry)
                    .then(this.onSaved.bind(this))
                    .catch(this.onError);
            }
		}
    }

    onSaved(response: HttpResponseMessage) {
        console.log(response);
        if (response.statusCode == 201) {
            this.router.navigateToRoute('edit order', { id: response.content.Id });
        } else {
            this.router.navigateToRoute('inquiries');
        }
    }

    onError(err) {
        console.log(err);
        toastr.error('There was a problem saving the inquiry: ' + err);
    }
}