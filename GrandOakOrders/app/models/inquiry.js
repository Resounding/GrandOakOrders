///<reference path="../../typings/moment/moment.d.ts" />
///<reference path="../../typings/underscore/underscore.d.ts" />
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
import { computedFrom } from 'aurelia-binding';
import moment from 'moment';
import _ from 'underscore';
const DATE_FORMAT = 'dddd MMMM D, YYYY';
const TIME_FORMAT = 'h:mm A';
export class NewInquiryViewModel {
    constructor() {
        this._organization = '';
        this._event_date = null;
        this._event_time = null;
        this._people = null;
        this._summary = '';
        this._errors = {
            organization: 'Please enter the organization name',
            event_date: '',
            event_time: '',
            people: '',
            summary: ''
        };
        this.ContactPerson = '';
        this.IsQuoteRequired = false;
        this.Description = '';
        this.NeedsConfirmation = false;
        this.ConfirmationDate = '';
    }
    get Organization() {
        return this._organization;
    }
    set Organization(val) {
        this._errors.organization = val ? '' : 'Organization is required';
        this._organization = val;
    }
    get EventDate() {
        return this._event_date;
    }
    set EventDate(val) {
        var date = moment(val, DATE_FORMAT), valid = date.isValid();
        this._errors.event_date = valid ? '' : 'Please enter a valid date';
        if (valid) {
            this._event_date = date.format(DATE_FORMAT);
        }
    }
    get EventTime() {
        return this._event_time;
    }
    set EventTime(val) {
        var time = moment(val, TIME_FORMAT), valid = time.isValid();
        this._errors.event_time = valid ? '' : 'Please enter a valid time';
        if (valid) {
            this._event_time = time.format(TIME_FORMAT);
        }
    }
    get People() {
        return this._people;
    }
    set People(val) {
        if (!val) {
            val = null;
        }
        else {
            val = parseInt(val.toString(), 10);
        }
        var valid = (val == null || !isNaN(val));
        this._errors.people = valid ? '' : 'Please enter the number of people';
        if (valid) {
            this._people = val;
        }
    }
    get Summary() {
        return this._summary;
    }
    set Summary(val) {
        this._errors.summary = val ? '' : 'Please enter a summary of the inquiry';
        this._summary = val;
    }
    get allErrors() {
        return this._errors;
    }
    errorMessages() {
        return _.chain(this._errors)
            .values()
            .filter((err) => !!err)
            .value();
    }
    isValid() {
        return !_.any(this._errors, (val, key) => {
            return !!val;
        });
    }
    toJSON() {
        var time = moment(this.EventTime, TIME_FORMAT), date = moment(this.EventDate, DATE_FORMAT)
            .hours(time.hours())
            .minutes(time.minutes());
        return {
            Organization: this.Organization,
            ContactPerson: this.ContactPerson || '',
            EventDate: date.toISOString(),
            People: this.People,
            Summary: this.Summary,
            Description: this.Description || '',
            IsQuoteRequired: this.IsQuoteRequired,
            NeedsConfirmation: false,
            ConfirmationDate: null,
            OutcomeId: null
        };
    }
}
export class EditInquiryViewModel extends NewInquiryViewModel {
    constructor(inquiry) {
        super();
        this.OutcomeId = null;
        this._needs_confirmation = false;
        this.ConfirmationDate = null;
        this.ClosureComments = '';
        this._confirmation_date = '';
        this.Id = inquiry.Id;
        this._organization = inquiry.Organization;
        this.ContactPerson = inquiry.ContactPerson;
        if (inquiry.EventDate) {
            let date = moment(inquiry.EventDate);
            this._event_date = date.format(DATE_FORMAT);
            this._event_time = date.format(TIME_FORMAT);
        }
        this.People = inquiry.People;
        this.Summary = inquiry.Summary;
        this.IsQuoteRequired = inquiry.IsQuoteRequired;
        this.Description = inquiry.Description;
        this.OutcomeId = inquiry.OutcomeId;
        this.NeedsConfirmation = inquiry.NeedsConfirmation;
        if (inquiry.ConfirmationDate) {
            let date = moment(inquiry.ConfirmationDate);
            this._confirmation_date = date.format(DATE_FORMAT);
        }
        this.CreatedBy = inquiry.CreatedBy;
        this.CreatedAt = inquiry.CreatedAt;
        this.UpdatedBy = inquiry.UpdatedBy;
        this.UpdatedAt = inquiry.UpdatedAt;
    }
    get NeedsConfirmation() {
        return this._needs_confirmation;
    }
    set NeedsConfirmation(val) {
        if (val && !this._needs_confirmation) {
            let eventDate = moment(this._event_date, DATE_FORMAT), twoWeeksBeforeEvent = eventDate.clone().subtract(2, 'weeks');
            if (eventDate.isValid() && twoWeeksBeforeEvent.isAfter()) {
                this.ConfirmationDate = twoWeeksBeforeEvent.format(DATE_FORMAT);
            }
        }
        this._needs_confirmation = val;
    }
    get outcomeCanCreateOrder() {
        return this.OutcomeId && this.OutcomeId !== 'CLOSE';
    }
    get outcomeCanSave() {
        return !this.OutcomeId || this.OutcomeId === 'WAIT';
    }
    get isCloseOutcome() {
        return this.OutcomeId === 'CLOSE';
    }
    get outcomeOptions() {
        return [
            { value: 'ORDER', text: 'Create Order' },
            { value: 'WAIT', text: 'Wait for Confirmation' },
            { value: 'CLOSE', text: 'Close Inquiry' }
        ];
    }
    toJSON() {
        var json = super.toJSON();
        json.Id = this.Id;
        json.OutcomeId = this.OutcomeId;
        json.NeedsConfirmation = this.NeedsConfirmation;
        json.ConfirmationDate = (this.ConfirmationDate) ?
            moment(this.ConfirmationDate, DATE_FORMAT).toISOString() :
            null;
        json.ClosureComments = this.ClosureComments || '';
        return json;
    }
}
Object.defineProperty(EditInquiryViewModel.prototype, "outcomeCanCreateOrder",
    __decorate([
        computedFrom('OutcomeId'), 
        __metadata('design:type', Object)
    ], EditInquiryViewModel.prototype, "outcomeCanCreateOrder", Object.getOwnPropertyDescriptor(EditInquiryViewModel.prototype, "outcomeCanCreateOrder")));
Object.defineProperty(EditInquiryViewModel.prototype, "outcomeCanSave",
    __decorate([
        computedFrom('OutcomeId'), 
        __metadata('design:type', Object)
    ], EditInquiryViewModel.prototype, "outcomeCanSave", Object.getOwnPropertyDescriptor(EditInquiryViewModel.prototype, "outcomeCanSave")));
Object.defineProperty(EditInquiryViewModel.prototype, "isCloseOutcome",
    __decorate([
        computedFrom('OutcomeId'), 
        __metadata('design:type', Object)
    ], EditInquiryViewModel.prototype, "isCloseOutcome", Object.getOwnPropertyDescriptor(EditInquiryViewModel.prototype, "isCloseOutcome")));
