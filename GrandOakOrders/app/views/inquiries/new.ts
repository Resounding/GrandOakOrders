/// <reference path="../../../typings/jquery/jquery.d.ts" />

import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import {InquiryViewModel} from '../../models/inquiry';

@inject(HttpClient, Router)
export class NewInquiry {
	
    _model = new InquiryViewModel();
	_submitted = false;
	
	constructor(private httpClient:HttpClient, private router:Router) { }
	
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
        } else {

            var inquiry = this._model.toJSON();
			
			this.httpClient.post('/api/inquiries', inquiry)
				.then((response:HttpResponseMessage) => {
					console.log(response);
					this.router.navigateToRoute('inquiries');
				})
		}
	}	
}