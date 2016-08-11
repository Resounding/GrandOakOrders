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
const aurelia_event_aggregator_1 = require('aurelia-event-aggregator');
const aurelia_router_1 = require('aurelia-router');
const aurelia_auth_1 = require('aurelia-auth');
let Login = class Login {
    constructor(auth, router, events) {
        this.auth = auth;
        this.router = router;
        this.events = events;
        this.params = { to: null };
    }
    activate(params) {
        this.params = params;
    }
    login() {
        debugger;
        this.auth.authenticate('google', false, null)
            .then(() => {
            this.events.publish('user:changed');
            var to = this.params.to || 'home';
            this.router.navigate(to);
        })
            .catch((ex) => {
            debugger;
            console.log(ex);
        });
    }
};
Login = __decorate([
    aurelia_framework_1.inject(aurelia_auth_1.AuthService, aurelia_router_1.Router, aurelia_event_aggregator_1.EventAggregator), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_auth_1.AuthService !== 'undefined' && aurelia_auth_1.AuthService) === 'function' && _a) || Object, (typeof (_b = typeof aurelia_router_1.Router !== 'undefined' && aurelia_router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof aurelia_event_aggregator_1.EventAggregator !== 'undefined' && aurelia_event_aggregator_1.EventAggregator) === 'function' && _c) || Object])
], Login);
exports.Login = Login;
var _a, _b, _c;
