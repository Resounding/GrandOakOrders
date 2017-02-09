"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const aurelia_framework_1 = require('aurelia-framework');
const aurelia_fetch_client_1 = require('aurelia-fetch-client');
const aurelia_router_1 = require('aurelia-router');
const order_1 = require('../../models/order');
let OrdersList = class OrdersList {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.orders = [];
        this.hasOrderingNotes = false;
    }
    activate(params, routeConfig) {
        this.showAll = routeConfig.name === 'all orders';
        this.load();
    }
    load() {
        const queryString = this.showAll ? '?all=true' : '';
        this.httpClient.fetch(`/api/orders${queryString}`)
            .then((res) => {
            res.json().then((content) => {
                this.orders = _.chain(content)
                    .map((order) => new order_1.OrderViewModel(order))
                    .sortBy((order) => {
                    console.log(order.EventDate);
                    return order.EventDate;
                })
                    .value();
                _.each(this.orders, (order) => {
                    order.hasOrderingNotes = _.any(order.Items, (item) => item.OrderingNotes);
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
};
OrdersList = __decorate([
    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_router_1.Router), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_fetch_client_1.HttpClient !== 'undefined' && aurelia_fetch_client_1.HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof aurelia_router_1.Router !== 'undefined' && aurelia_router_1.Router) === 'function' && _b) || Object])
], OrdersList);
exports.OrdersList = OrdersList;
var _a, _b;
