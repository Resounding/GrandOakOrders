import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {OrderPojo, OrderViewModel, OrderItemViewModel} from '../../models/order';

@inject(HttpClient, Router)
export class OrdersList {
    orders = [];
    hasOrderingNotes = false;
    showAll:boolean;

    constructor(private httpClient: HttpClient, private router: Router) { }

    activate(params, routeConfig) {
        this.showAll = routeConfig.name === 'all orders';
        this.load();
    }

    load() {
        const queryString = this.showAll ? '?all=true' : '';

        this.httpClient.fetch(`/api/orders${queryString}`)
            .then((res: HttpResponseMessage) => {
                res.json().then((content) => {
                    this.orders = _.chain(content)
                        .map((order: OrderPojo) => new OrderViewModel(order))
                        .sortBy((order: OrderViewModel) => {
                            console.log(order.EventDate);
                            return order.EventDate;
                        })
                        .value();

                    _.each(this.orders, (order) => {
                        order.hasOrderingNotes = _.any(order.Items, (item:OrderItemViewModel) => item.OrderingNotes);
                    });
                });
            }, (err) => {
				console.log(err);	
			});
    }

    showAllOrders() {
        this.router.navigateToRoute('all orders');
        // for some reason it doesn't navigate
        this.showAll = true;
        this.load();
    }
}