var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { Router } from 'aurelia-router';
import { OrderViewModel } from '../../models/order';
import _ from 'underscore';
export let OrdersList = class {
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
        this.httpClient.get(`/api/orders${queryString}`)
            .then((res) => {
            this.orders = _.chain(res.content)
                .map((order) => new OrderViewModel(order))
                .sortBy((order) => {
                console.log(order.EventDate);
                return order.EventDate;
            })
                .value();
            _.each(this.orders, (order) => {
                order.hasOrderingNotes = _.any(order.Items, (item) => item.OrderingNotes);
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
    inject(HttpClient, Router), 
    __metadata('design:paramtypes', [(typeof (_a = typeof HttpClient !== 'undefined' && HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof Router !== 'undefined' && Router) === 'function' && _b) || Object])
], OrdersList);
var _a, _b;
