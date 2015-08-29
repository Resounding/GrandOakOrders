import {inject} from 'aurelia-framework';
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {HttpClient} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(AuthService, HttpClient, Router)
export class NewInquiry {
	
	newInquiryForm:HTMLFormElement;
	_organization = '';
	contact_person = '';
	event_date:Date;
	event_time:Date;
	people = 0;
	summary = '';
	isQuoteRequired = false;
	description = '';
	createdBy = '';
	
	organizationInvalid = false;
	submitted = false;
	
	constructor(private auth:AuthService, private httpClient:HttpClient, private router:Router) {
		this.auth.getMe()
			.then((me) => {
				let now = moment();
				this.event_date = now.format('D MMMM, YYYY');
				this.event_time = now.startOf('hour').format('H:mm A');
				this.createdBy = me.name;		
			}
		);
	}
	
	activate() {
		window.setTimeout(function() {
			$('.datepicker').pickadate();
		}, 500);
	}
	
	save(e) {
		this.submit();
				
		if(!this.newInquiryForm.checkValidity()) {
		e.preventDefault();
		} else {
			var	time = moment(this.event_time, 'H:mm A'), 
				date = moment(this.event_date, 'D MMMM, YYYY')
					.hours(time.hours())
					.minutes(time.minutes()),
				request = {
					organization: this.organization,
					contact_person: this.contact_person,
					event_date: date.toISOString(),
					people: this.people,
					summary: this.summary,
					description: this.description,
					createdBy: this.createdBy,
					outcome: null,
					isQuoteRequired: this.isQuoteRequired
				};
			
			this.httpClient.post('/api/requests', request)
				.then((response) => {
					console.log(response);
					this.router.navigateToRoute('inquiries');
				})
		}
	}
	
	submit() {
		this.submitted = true;
		this.organization = this.organization;
	}
	
	set organization(value) {
		this._organization = value;
		this.organizationInvalid = this.submitted && !value;
	}
	get organization() {
		return this._organization;
	}
}