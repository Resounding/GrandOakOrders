import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import moment from 'moment';

@inject(HttpClient)
export class List {
	requests = [];
	
	constructor(private httpClient:HttpClient) {		
		
		this.httpClient.get('/api/requests')
			.then((res) => {
				this.requests = JSON.parse(res.response);
                this.requests.forEach((request) => {
                    request.createdDate = moment(request.createdAt).format('MMM D');
                    request.createdTime = moment(request.createdAt).format('h:mm A');
                });
			}, (err) => {
				console.log(err);	
			});
	}
}