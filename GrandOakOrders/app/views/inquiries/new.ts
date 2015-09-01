import {inject} from 'aurelia-framework';
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {HttpClient} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import moment from 'moment';
import {InquiryValidator, NewInquiryViewModel} from '../../models/inquiry';

@inject(AuthService, HttpClient, Router)
export class NewInquiry {
	
    _errors: InquiryValidator;
    _errorMessages: Array<string> = [];
    _model = new NewInquiryViewModel();
	_submitted = false;
	
	constructor(private auth:AuthService, private httpClient:HttpClient, private router:Router) { }
	
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
            this._errorMessages = this._model.errorMessages();
            this._errors = this._model.allErrors;
        } else {
            
            this._errorMessages = null;
            this._errors = null;

            var inquiry = this._model.toJSON();
			
			this.httpClient.post('/api/inquiries', inquiry)
				.then((response) => {
					console.log(response);
					this.router.navigateToRoute('inquiries');
				})
		}
	}	
}