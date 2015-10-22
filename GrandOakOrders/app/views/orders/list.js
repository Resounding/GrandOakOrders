System.register(['aurelia-framework', 'aurelia-http-client', 'aurelia-router', '../../models/order', 'underscore'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var aurelia_framework_1, aurelia_http_client_1, aurelia_router_1, order_1, underscore_1;
    var OrdersList;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_http_client_1_1) {
                aurelia_http_client_1 = aurelia_http_client_1_1;
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (order_1_1) {
                order_1 = order_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            OrdersList = (function () {
                function OrdersList(httpClient, router) {
                    this.httpClient = httpClient;
                    this.router = router;
                    this.orders = [];
                    this.hasOrderingNotes = false;
                }
                OrdersList.prototype.activate = function (params, routeConfig) {
                    this.showAll = routeConfig.name === 'all orders';
                    this.load();
                };
                OrdersList.prototype.load = function () {
                    var _this = this;
                    var queryString = this.showAll ? '?all=true' : '';
                    this.httpClient.get("/api/orders" + queryString)
                        .then(function (res) {
                        _this.orders = underscore_1.default.chain(res.content)
                            .map(function (order) { return new order_1.OrderViewModel(order); })
                            .sortBy(function (order) {
                            console.log(order.EventDate);
                            return order.EventDate;
                        })
                            .value();
                        underscore_1.default.each(_this.orders, function (order) {
                            order.hasOrderingNotes = underscore_1.default.any(order.Items, function (item) { return item.OrderingNotes; });
                        });
                    }, function (err) {
                        console.log(err);
                    });
                };
                OrdersList.prototype.showAllOrders = function () {
                    this.router.navigateToRoute('all orders');
                    // for some reason it doesn't navigate
                    this.showAll = true;
                    this.load();
                };
                OrdersList = __decorate([
                    aurelia_framework_1.inject(aurelia_http_client_1.HttpClient, aurelia_router_1.Router)
                ], OrdersList);
                return OrdersList;
            })();
            exports_1("OrdersList", OrdersList);
        }
    }
});
