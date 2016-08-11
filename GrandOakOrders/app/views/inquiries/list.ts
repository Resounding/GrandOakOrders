import {InquiryPojo} from '../../models/inquiry'
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import * as moment from 'moment';
import * as _ from 'underscore';

const DATE_FORMAT: string = 'ddd MMM D';
const TIME_FORMAT: string = 'h:mm A';

@inject(HttpClient)
export class InquiriesList {
	requests = [];
	
	constructor(private httpClient:HttpClient) {

	    this.httpClient.fetch('/api/inquiries')
	        .then((res) => {
	            res.json().then((content) => {
	                this.requests = _.map(content, (request:InquiryPojo) => {
	                    var createdAt = moment(request.CreatedAt),
	                        display = {
	                            id: request.Id,
	                            title: request.Organization,
	                            summary: request.Summary,
	                            people: request.People,
	                            date: '',
	                            createdDate: createdAt.format(DATE_FORMAT),
	                            createdTime: createdAt.format(TIME_FORMAT),
	                            location: request.Location,
	                            address: request.LocationAddress,
	                            createdBy: request.CreatedBy
	                        };

	                    if (request.ContactPerson) {
	                        display.title += ' (' + request.ContactPerson + ')';
	                    }

	                    if (_.isDate(request.EventDate)) {
	                        var m = moment(request.EventDate);
	                        display.date = m.format(DATE_FORMAT) + ' ' + m.format(TIME_FORMAT);
	                    }

	                    return display;
	                });
	            }, (err) => {
	                console.log(err);
	            });
	        });
	}
}