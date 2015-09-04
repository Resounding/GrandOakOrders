import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {OrderPojo, OrderViewModel} from '../../models/order';
import moment from 'moment';
import _ from 'underscore';

const DATE_FORMAT: string = 'ddd MMM D';
const TIME_FORMAT: string = 'h:mm A';

@inject(HttpClient)
export class OrdersList {
    orders = [];

    constructor(private httpClient:HttpClient) {
		
		this.httpClient.get('/api/orders')
			.then((res: HttpResponseMessage) => {
                this.orders = _.map(res.content, (order: OrderPojo) => new OrderViewModel(order));
			}, (err) => {
				console.log(err);	
			});
	}
}