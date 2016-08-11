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
const moment = require('moment');
const _ = require('underscore');
const DATE_FORMAT = 'ddd MMM D';
const TIME_FORMAT = 'h:mm A';
let InquiriesList = class InquiriesList {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.requests = [];
        this.httpClient.fetch('/api/inquiries')
            .then((res) => {
            res.json().then((content) => {
                this.requests = _.map(content, (request) => {
                    var createdAt = moment(request.CreatedAt), display = {
                        id: request.Id,
                        title: request.Organization,
                        summary: request.Summary,
                        people: request.People,
                        date: '',
                        createdDate: createdAt.format(DATE_FORMAT),
                        createdTime: createdAt.format(TIME_FORMAT),
                        location: request.Location,
                        address: request.LocationAddress,
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
        });
    }
};
InquiriesList = __decorate([
    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_fetch_client_1.HttpClient !== 'undefined' && aurelia_fetch_client_1.HttpClient) === 'function' && _a) || Object])
], InquiriesList);
exports.InquiriesList = InquiriesList;
var _a;
