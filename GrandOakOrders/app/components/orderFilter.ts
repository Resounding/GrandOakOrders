import {OrderViewModel} from '../models/order';
import _ from 'underscore';

export class OrderFilterValueConverter {
    toView(array: OrderViewModel[], filterText:string):OrderViewModel[] {
        return _.filter(array, (order:OrderViewModel) => {
            const text = (filterText || '').toLowerCase(),
                id = (`0000${order.Id}`).substring(order.Id.toString().length),
                org = order.Inquiry.Organization.toLowerCase(),
                contact = order.Inquiry.ContactPerson.toLowerCase();

            return (_.any([id, org, contact], (item) => {
                return item.indexOf(text) !== -1;
            }));
        });
    }
}