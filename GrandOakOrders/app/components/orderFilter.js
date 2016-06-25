System.register(['underscore'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var underscore_1;
    var OrderFilterValueConverter;
    return {
        setters:[
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            OrderFilterValueConverter = (function () {
                function OrderFilterValueConverter() {
                }
                OrderFilterValueConverter.prototype.toView = function (array, filterText) {
                    return underscore_1.default.filter(array, function (order) {
                        var text = (filterText || '').toLowerCase(), id = ("0000" + order.Id).substring(order.Id.toString().length), org = order.Inquiry.Organization.toLowerCase(), contact = order.Inquiry.ContactPerson.toLowerCase();
                        return (underscore_1.default.any([id, org, contact], function (item) {
                            return item.indexOf(text) !== -1;
                        }));
                    });
                };
                return OrderFilterValueConverter;
            }());
            exports_1("OrderFilterValueConverter", OrderFilterValueConverter);
        }
    }
});
