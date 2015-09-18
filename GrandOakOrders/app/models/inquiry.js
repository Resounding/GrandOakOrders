///<reference path="../../typings/moment/moment.d.ts" />
///<reference path="../../typings/underscore/underscore.d.ts" />
import moment from 'moment';
import _ from 'underscore';
const DATE_FORMAT = 'dddd MMM D, YYYY';
const TIME_FORMAT = 'h:mm A';
export class InquiryViewModel {
    constructor(model = null) {
        this._event_date = null;
        this._event_time = null;
        // Properties
        this.Organization = '';
        this.Summary = '';
        this.IsQuoteRequired = false;
        this.Description = '';
        this.Id = 0;
        this.OutcomeId = null;
        this.ClosureComments = '';
        this.ContactPerson = '';
        this.People = null;
        this.IsPickup = false;
        this.Location = '';
        this.LocationAddress = '';
        if (model) {
            _.extend(this, model);
            if (model.EventDate) {
                this.EventDate = moment(model.EventDate).format(DATE_FORMAT);
            }
            if (model.EventTime) {
                this.EventTime = moment(model.EventTime, 'HH:mm:SS').format(TIME_FORMAT);
            }
        }
    }
    // Properties with validation
    get EventDate() {
        return this._event_date;
    }
    set EventDate(val) {
        var date = moment(val, DATE_FORMAT);
        if (date.isValid()) {
            this._event_date = val;
        }
    }
    get EventTime() {
        return this._event_time;
    }
    set EventTime(val) {
        var time = moment(val, TIME_FORMAT);
        if (time.isValid()) {
            this._event_time = val;
        }
    }
    isValid() {
        if (!this.Organization)
            return false;
        if (!this.Summary)
            return false;
        var date = moment(this.EventDate, DATE_FORMAT), time = moment(this.EventTime, TIME_FORMAT);
        if (this.EventDate && !date.isValid())
            return false;
        if (this.EventTime && !time.isValid())
            return false;
        return true;
    }
    get outcomeCanCreateOrder() {
        return this.OutcomeId && this.OutcomeId !== 'CLOSE';
    }
    get outcomeCanSave() {
        return !this.OutcomeId;
    }
    get isCloseOutcome() {
        return this.OutcomeId === 'CLOSE';
    }
    get outcomeOptions() {
        return [
            { value: 'ORDER', text: 'Create Order' },
            { value: 'CLOSE', text: 'Close Inquiry' }
        ];
    }
    toJSON() {
        var json = {
            Id: this.Id,
            Organization: this.Organization,
            ContactPerson: this.ContactPerson,
            EventDate: this.EventDate ? moment(this.EventDate, DATE_FORMAT).format('YYYY-MM-DD') : null,
            EventTime: this.EventTime ? moment(this.EventTime, TIME_FORMAT).format('HH:mm:SS') : null,
            People: this.People || 0,
            Summary: this.Summary,
            Description: this.Description,
            IsQuoteRequired: this.IsQuoteRequired,
            ClosureComments: this.ClosureComments,
            OutcomeId: this.OutcomeId || null,
            IsPickup: this.IsPickup,
            Location: this.Location,
            LocationAddress: this.LocationAddress
        };
        return json;
    }
}
