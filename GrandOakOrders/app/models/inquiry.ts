///<reference path="../../typings/moment/moment.d.ts" />
///<reference path="../../typings/underscore/underscore.d.ts" />

export interface InquiryPojo {
    Id?:number;
    Organization: string;
    ContactPerson: string;
    Phone: string;
    Email: string;
    EventDate: string;
    EventTime: any;
    People: number;
    Summary: string;
    Description: string;
    IsQuoteRequired: boolean;
    ClosureComments?: string;
    OutcomeId: string;
    DeliveryType: string;
    Location: string;
    LocationAddress: string;
    CreatedBy?: string;
    CreatedAt?: Date;
    UpdatedBy?: string;
    UpdatedAt?: Date;
}

export class InquiryViewModel implements InquiryPojo {
    _event_date: string = null;
    _event_time: string = null;

    static DATE_FORMAT = 'dddd MMM D, YYYY';
    static TIME_FORMAT = 'h:mm A';

    constructor(model: InquiryPojo = null) {
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

    // Properties
    Organization: string = '';
    Summary: string = '';
    IsQuoteRequired: boolean = false;
    Description: string = '';
    Id: number = 0;
    OutcomeId: string = null;
    ClosureComments: string = '';
    ContactPerson: string = '';
    Email: string = '';
    Phone: string = '';
    People: number = null;
    DeliveryType: string = 'Pickup';
    Location: string = '';
    LocationAddress: string = '';
    // Properties with validation
    get EventDate(): string {
        return this._event_date;
    }
    set EventDate(val) {
        var date = moment(val, InquiryViewModel.DATE_FORMAT);
        if (date.isValid()) {
            this._event_date = val;
        }
    }

    get EventTime(): string {
        return this._event_time;
    }
    set EventTime(val) {
        var time = moment(val, InquiryViewModel.TIME_FORMAT);
        if (time.isValid()) {
            this._event_time = val;
        }
    }
    
    isValid() {
        if (!this.Organization) return false;
        if (!this.Summary) return false;
        var date = moment(this.EventDate, InquiryViewModel.DATE_FORMAT),
            time = moment(this.EventTime, InquiryViewModel.TIME_FORMAT);

        if (this.EventDate && !date.isValid()) return false;
        if (this.EventTime && !time.isValid()) return false;

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
    
    toJSON(): InquiryPojo {
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
