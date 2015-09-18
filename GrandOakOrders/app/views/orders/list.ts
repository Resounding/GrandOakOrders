import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {OrderPojo, OrderViewModel, OrderItemViewModel} from '../../models/order';
import moment from 'moment';
import _ from 'underscore';

const DATE_FORMAT: string = 'ddd MMM D';
const TIME_FORMAT: string = 'h:mm A';

@inject(HttpClient)
export class OrdersList {
    orders = [];
    hasOrderingNotes: boolean = false;

    constructor(private httpClient: HttpClient) {        
		
		this.httpClient.get('/api/orders')
			.then((res: HttpResponseMessage) => {
                this.orders = _.chain(res.content)
                    .map((order: OrderPojo) => new OrderViewModel(order))
                    .sortBy((order: OrderViewModel) => {
                        console.log(order.EventDate);
                        return order.EventDate
                    })
                    .value();

                _.each(this.orders, (order) => {
                    order.hasOrderingNotes = _.any(order.Items, (item: OrderItemViewModel) => item.OrderingNotes);
                });
			}, (err) => {
				console.log(err);	
			});
	}
}