///<reference path="../../typings/moment/moment.d.ts" />
///<reference path="../../typings/underscore/underscore.d.ts" />
System.register(['moment', 'underscore'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var moment_1, underscore_1;
    var InquiryViewModel;
    return {
        setters:[
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            InquiryViewModel = (function () {
                function InquiryViewModel(model) {
                    if (model === void 0) { model = null; }
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
                        underscore_1.default.extend(this, model);
                        if (model.EventDate) {
                            this.EventDate = moment_1.default(model.EventDate).format(InquiryViewModel.DATE_FORMAT);
                        }
                        if (model.EventTime) {
                            this.EventTime = moment_1.default(model.EventTime, 'HH:mm:SS').format(InquiryViewModel.TIME_FORMAT);
                        }
                    }
                }
                Object.defineProperty(InquiryViewModel.prototype, "EventDate", {
                    // Properties with validation
                    get: function () {
                        return this._event_date;
                    },
                    set: function (val) {
                        var date = moment_1.default(val, InquiryViewModel.DATE_FORMAT);
                        if (date.isValid()) {
                            this._event_date = val;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InquiryViewModel.prototype, "EventTime", {
                    get: function () {
                        return this._event_time;
                    },
                    set: function (val) {
                        var time = moment_1.default(val, InquiryViewModel.TIME_FORMAT);
                        if (time.isValid()) {
                            this._event_time = val;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                InquiryViewModel.prototype.isValid = function () {
                    if (!this.Organization)
                        return false;
                    if (!this.Summary)
                        return false;
                    var date = moment_1.default(this.EventDate, InquiryViewModel.DATE_FORMAT), time = moment_1.default(this.EventTime, InquiryViewModel.TIME_FORMAT);
                    if (this.EventDate && !date.isValid())
                        return false;
                    if (this.EventTime && !time.isValid())
                        return false;
                    return true;
                };
                Object.defineProperty(InquiryViewModel.prototype, "outcomeCanCreateOrder", {
                    get: function () {
                        return this.OutcomeId && this.OutcomeId !== 'CLOSE';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InquiryViewModel.prototype, "outcomeCanSave", {
                    get: function () {
                        return !this.OutcomeId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InquiryViewModel.prototype, "isCloseOutcome", {
                    get: function () {
                        return this.OutcomeId === 'CLOSE';
                    },
                    enumerable: true,
                    configurable: true
                });
                InquiryViewModel.prototype.toJSON = function () {
                    var json = {
                        Id: this.Id,
                        Organization: this.Organization,
                        ContactPerson: this.ContactPerson,
                        Phone: this.Phone,
                        Email: this.Email,
                        EventDate: this.EventDate ? moment_1.default(this.EventDate, InquiryViewModel.DATE_FORMAT).format('YYYY-MM-DD') : null,
                        EventTime: this.EventTime ? moment_1.default(this.EventTime, InquiryViewModel.TIME_FORMAT).format('HH:mm:SS') : null,
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
                };
                InquiryViewModel.DATE_FORMAT = 'dddd MMM D, YYYY';
                InquiryViewModel.TIME_FORMAT = 'h:mm A';
                return InquiryViewModel;
            }());
            exports_1("InquiryViewModel", InquiryViewModel);
        }
    }
});
