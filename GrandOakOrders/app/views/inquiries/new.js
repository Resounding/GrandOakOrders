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
import moment from 'moment';
export let NewInquiry = class {
    constructor(auth, httpClient, router) {
        this.auth = auth;
        this.httpClient = httpClient;
        this.router = router;
        this._organization = '';
        this.contact_person = '';
        this.people = 0;
        this.summary = '';
        this.isQuoteRequired = false;
        this.description = '';
        this.createdBy = '';
        this.organizationInvalid = false;
        this.submitted = false;
        this.auth.getMe()
            .then((me) => {
            let now = moment();
            this.event_date = now.format('D MMMM, YYYY');
            this.event_time = now.startOf('hour').format('H:mm A');
            this.createdBy = me.name;
        });
    }
    activate() {
        window.setTimeout(function () {
            $('.datepicker').pickadate();
        }, 500);
    }
    save(e) {
        this.submit();
        if (!this.newInquiryForm.checkValidity()) {
            e.preventDefault();
        }
        else {
            var time = moment(this.event_time, 'H:mm A'), date = moment(this.event_date, 'D MMMM, YYYY')
                .hours(time.hours())
                .minutes(time.minutes()), request = {
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
            });
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
};
NewInquiry = __decorate([
    inject(AuthService, HttpClient, Router), 
    __metadata('design:paramtypes', [(typeof AuthService !== 'undefined' && AuthService) || Object, (typeof HttpClient !== 'undefined' && HttpClient) || Object, (typeof Router !== 'undefined' && Router) || Object])
], NewInquiry);
