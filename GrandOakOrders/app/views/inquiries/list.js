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
import moment from 'moment';
export let List = class {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.requests = [];
        this.httpClient.get('/api/requests')
            .then((res) => {
            this.requests = JSON.parse(res.response);
            this.requests.forEach((request) => {
                request.createdDate = moment(request.createdAt).format('MMM D');
                request.createdTime = moment(request.createdAt).format('h:mm A');
            });
        }, (err) => {
            console.log(err);
        });
    }
};
List = __decorate([
    inject(HttpClient), 
    __metadata('design:paramtypes', [(typeof HttpClient !== 'undefined' && HttpClient) || Object])
], List);
