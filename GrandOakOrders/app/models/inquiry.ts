///<reference path="../../typings/moment/moment.d.ts" />
///<reference path="../../typings/underscore/underscore.d.ts" />

import {computedFrom} from 'aurelia-binding';
import moment from 'moment';
import _ from 'underscore';

const DATE_FORMAT: string = 'dddd MMMM D, YYYY';
const TIME_FORMAT: string = 'h:mm A';

export interface InquiryPojo {
    Id?:number;
    Organization: string;
    ContactPerson: string;
    EventDate: Date;
    People: number;
    Summary: string;
    Description: string;
    IsQuoteRequired: boolean;
    NeedsConfirmation: boolean;
    ConfirmationDate: Date;
    ClosureComments?: string;
    OutcomeId: string;
    CreatedBy?: string;
    CreatedAt?: Date;
    UpdatedBy?: string;
    UpdatedAt?: Date;
}

export interface InquiryValidator {
    organization: string,
    event_date: string,
    event_time: string,
    people: string,
    summary: string
}

export class NewInquiryViewModel {
    _organization = '';
    _event_date:string = null;
    _event_time: string = null;
    _people: number = null;
    _summary: string = '';
    _errors: InquiryValidator = {
        organization: 'Please enter the organization name',
        event_date: '',
        event_time: '',
        people: '',
        summary: ''
    };

    get Organization():string {
        return this._organization;
    }
    set Organization(val: string) {
        this._errors.organization = val ? '' : 'Organization is required';

        this._organization = val;
    }

    ContactPerson: string = '';

    get EventDate():string {
        return this._event_date;
    }
    set EventDate(val) {
        var date = moment(val, DATE_FORMAT),
            valid = date.isValid();

        this._errors.event_date = valid ? '' : 'Please enter a valid date';

        if(valid) {
            this._event_date = date.format(DATE_FORMAT);            
        }
    }

    get EventTime(): string {
        return this._event_time;
    }
    set EventTime(val) {
        var time = moment(val, TIME_FORMAT),
            valid = time.isValid();
        
        this._errors.event_time = valid ? '' : 'Please enter a valid time';
        if(valid) {
            this._event_time = time.format(TIME_FORMAT);
        }
    }

    get People():number {
        return this._people;
    }
    set People(val) {
        if (!val) {
            val = null;
        } else {
            val = parseInt(val.toString(), 10);
        }

        var valid = (val == null || !isNaN(val));

        this._errors.people = valid ? '' : 'Please enter the number of people';
        if (valid) {
            this._people = val;
        }
    }
    
    get Summary(): string {
        return this._summary;
    }
    set Summary(val) {
        this._errors.summary = val ? '' : 'Please enter a summary of the inquiry';
        
        this._summary = val;
    }

    IsQuoteRequired: boolean = false;
    Description: string = '';
    NeedsConfirmation: boolean = false;
    ConfirmationDate: string = '';

    get allErrors():InquiryValidator {
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

    toJSON():InquiryPojo {
        var time = moment(this.EventTime, TIME_FORMAT),
            date = moment(this.EventDate, DATE_FORMAT)
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

    Id: number;
    OutcomeId: string = null;
    _needs_confirmation: boolean = false;
    ConfirmationDate: string = null;
    ClosureComments: string = '';
    CreatedBy: string;
    CreatedAt: Date;
    UpdatedBy: string;
    UpdatedAt: Date;
    _confirmation_date: string = '';

    constructor(inquiry:InquiryPojo) {
        super();

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

    get NeedsConfirmation():boolean {
        return this._needs_confirmation;
    }
    set NeedsConfirmation(val) {
        if (val && !this._needs_confirmation) {
            let eventDate = moment(this._event_date, DATE_FORMAT),
                twoWeeksBeforeEvent = eventDate.clone().subtract(2, 'weeks');

            if (eventDate.isValid() && twoWeeksBeforeEvent.isAfter()) {
                this.ConfirmationDate = twoWeeksBeforeEvent.format(DATE_FORMAT);
            }
        }
        this._needs_confirmation = val;
    }

    @computedFrom('OutcomeId')
    get outcomeCanCreateOrder() {
        return this.OutcomeId && this.OutcomeId !== 'CLOSE';
    }

    @computedFrom('OutcomeId')
    get outcomeCanSave() {
        return !this.OutcomeId || this.OutcomeId === 'WAIT';
    }

    @computedFrom('OutcomeId')
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

    toJSON(): InquiryPojo {
        var json = super.toJSON();
        json.Id = this.Id;
        json.OutcomeId = this.OutcomeId;
        json.NeedsConfirmation = this.NeedsConfirmation;
        json.ConfirmationDate =  (this.ConfirmationDate) ?
            moment(this.ConfirmationDate, DATE_FORMAT).toISOString() :
            null;
        json.ClosureComments = this.ClosureComments || '';

        return json;
    }
}