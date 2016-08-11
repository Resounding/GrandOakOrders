///<reference path="../../typings/moment/moment.d.ts" />
///<reference path="../../typings/underscore/underscore.d.ts" />
"use strict";
const moment = require('moment');
const _ = require('underscore');
class InquiryViewModel {
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
        this.Email = '';
        this.Phone = '';
        this.People = null;
        this.DeliveryType = 'Pickup';
        this.Location = '';
        this.LocationAddress = '';
        if (model) {
            _.extend(this, model);
            if (model.EventDate) {
                this.EventDate = moment(model.EventDate).format(InquiryViewModel.DATE_FORMAT);
            }
            if (model.EventTime) {
                this.EventTime = moment(model.EventTime, 'HH:mm:SS').format(InquiryViewModel.TIME_FORMAT);
            }
        }
    }
    // Properties with validation
    get EventDate() {
        return this._event_date;
    }
    set EventDate(val) {
        var date = moment(val, InquiryViewModel.DATE_FORMAT);
        if (date.isValid()) {
            this._event_date = val;
        }
    }
    get EventTime() {
        return this._event_time;
    }
    set EventTime(val) {
        var time = moment(val, InquiryViewModel.TIME_FORMAT);
        if (time.isValid()) {
            this._event_time = val;
        }
    }
    isValid() {
        if (!this.Organization)
            return false;
        if (!this.Summary)
            return false;
        var date = moment(this.EventDate, InquiryViewModel.DATE_FORMAT), time = moment(this.EventTime, InquiryViewModel.TIME_FORMAT);
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
    toJSON() {
        var json = {
            Id: this.Id,
            Organization: this.Organization,
            ContactPerson: this.ContactPerson,
            Phone: this.Phone,
            Email: this.Email,
            EventDate: this.EventDate ? moment(this.EventDate, InquiryViewModel.DATE_FORMAT).format('YYYY-MM-DD') : null,
            EventTime: this.EventTime ? moment(this.EventTime, InquiryViewModel.TIME_FORMAT).format('HH:mm:SS') : null,
            People: this.People || 0,
            Summary: this.Summary,
            Description: this.Description,
            IsQuoteRequired: this.IsQuoteRequired,
            ClosureComments: this.ClosureComments,
            OutcomeId: this.OutcomeId || null,
            DeliveryType: this.DeliveryType,
            Location: this.Location,
            LocationAddress: this.LocationAddress
        };
        return json;
    }
}
InquiryViewModel.DATE_FORMAT = 'dddd MMM D, YYYY';
InquiryViewModel.TIME_FORMAT = 'h:mm A';
exports.InquiryViewModel = InquiryViewModel;
