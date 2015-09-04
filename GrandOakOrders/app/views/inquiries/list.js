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
import _ from 'underscore';
const DATE_FORMAT = 'ddd MMM D';
const TIME_FORMAT = 'h:mm A';
export let InquiriesList = class {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.requests = [];
        this.httpClient.get('/api/inquiries')
            .then((res) => {
            this.requests = _.map(res.content, (request) => {
                var createdAt = moment(request.CreatedAt), display = {
                    id: request.Id,
                    title: request.Organization,
                    summary: request.Summary,
                    date: '',
                    createdDate: createdAt.format(DATE_FORMAT),
                    createdTime: createdAt.format(TIME_FORMAT),
                    createdBy: request.CreatedBy
                };
                if (request.ContactPerson) {
                    display.title += ' (' + request.ContactPerson + ')';
                }
                if (_.isDate(request.EventDate)) {
                    var m = moment(request.EventDate);
                    display.date = m.format(DATE_FORMAT) + ' ' + m.format(TIME_FORMAT);
                }
                return display;
            });
        }, (err) => {
            console.log(err);
        });
    }
};
InquiriesList = __decorate([
    inject(HttpClient), 
    __metadata('design:paramtypes', [(typeof (_a = typeof HttpClient !== 'undefined' && HttpClient) === 'function' && _a) || Object])
], InquiriesList);
var _a;
