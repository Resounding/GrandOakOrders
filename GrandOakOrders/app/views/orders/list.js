System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', '../../models/order', 'underscore'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_fetch_client_1, aurelia_router_1, order_1, underscore_1;
    var OrdersList;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_fetch_client_1_1) {
                aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
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
                    this.httpClient.fetch("/api/orders" + queryString)
                        .then(function (res) {
                        res.json().then(function (content) {
                            _this.orders = underscore_1.default.chain(content)
                                .map(function (order) { return new order_1.OrderViewModel(order); })
                                .sortBy(function (order) {
                                console.log(order.EventDate);
                                return order.EventDate;
                            })
                                .value();
                            underscore_1.default.each(_this.orders, function (order) {
                                order.hasOrderingNotes = underscore_1.default.any(order.Items, function (item) { return item.OrderingNotes; });
                            });
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
                    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_router_1.Router)
                ], OrdersList);
                return OrdersList;
            })();
            exports_1("OrdersList", OrdersList);
        }
    }
});
