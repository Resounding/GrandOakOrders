"use strict";
const _ = require('underscore');
class OrderFilterValueConverter {
    toView(array, filterText) {
        return _.filter(array, (order) => {
            const text = (filterText || '').toLowerCase(), id = (`0000${order.Id}`).substring(order.Id.toString().length), org = order.Inquiry.Organization.toLowerCase(), contact = order.Inquiry.ContactPerson.toLowerCase();
            return (_.any([id, org, contact], (item) => {
                return item.indexOf(text) !== -1;
            }));
        });
    }
}
exports.OrderFilterValueConverter = OrderFilterValueConverter;
