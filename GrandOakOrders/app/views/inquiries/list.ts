import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import moment from 'moment';
import _ from 'underscore';

const DATE_FORMAT: string = 'ddd MMM D';
const TIME_FORMAT: string = 'h:mm A';

@inject(HttpClient)
export class List {
	requests = [];
	
	constructor(private httpClient:HttpClient) {		
		
		this.httpClient.get('/api/inquiries')
			.then((res) => {
                this.requests = _.map(res.content, (request) => {
                    var createdAt = moment(request.CreatedAt),
                        display = {
                            id: request.Id,
                            title: request.Organization,
                            summary: request.Summary,
                            date: '',
                            createdDate: createdAt.format(DATE_FORMAT),
                            createdTime: createdAt.format(TIME_FORMAT),
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
	}
}