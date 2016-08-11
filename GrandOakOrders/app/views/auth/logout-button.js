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
const aurelia_framework_2 = require('aurelia-framework');
const aurelia_event_aggregator_1 = require('aurelia-event-aggregator');
const aurelia_auth_1 = require('aurelia-auth');
let LogoutButton = class LogoutButton {
    constructor(auth, events, element) {
        this.auth = auth;
        this.events = events;
        this.element = element;
    }
    logout() {
        this.auth.logout();
        this.events.publish('user:changed');
    }
};
LogoutButton = __decorate([
    aurelia_framework_2.inject(aurelia_auth_1.AuthService, aurelia_event_aggregator_1.EventAggregator, Element),
    aurelia_framework_1.customElement('logout-button'), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_auth_1.AuthService !== 'undefined' && aurelia_auth_1.AuthService) === 'function' && _a) || Object, (typeof (_b = typeof aurelia_event_aggregator_1.EventAggregator !== 'undefined' && aurelia_event_aggregator_1.EventAggregator) === 'function' && _b) || Object, Object])
], LogoutButton);
exports.LogoutButton = LogoutButton;
var _a, _b;
