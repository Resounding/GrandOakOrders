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
const aurelia_auth_1 = require('aurelia-auth');
let Home = class Home {
    constructor(httpClient, auth, router) {
        this.httpClient = httpClient;
        this.auth = auth;
        this.router = router;
        this.load();
    }
    load() {
        this.httpClient.fetch('/API/Home')
            .then((response) => {
            response.json().then((content) => {
                this.content = content;
            });
        })
            .catch((err) => {
            if (err.status === 401) {
                this.auth.authenticate('google', false, null)
                    .then(() => this.load())
                    .catch(() => this.router.navigateToRoute('login'));
            }
            else {
                console.log(err);
            }
        });
    }
};
Home = __decorate([
    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_auth_1.AuthService), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_fetch_client_1.HttpClient !== 'undefined' && aurelia_fetch_client_1.HttpClient) === 'function' && _a) || Object, (typeof (_b = typeof aurelia_auth_1.AuthService !== 'undefined' && aurelia_auth_1.AuthService) === 'function' && _b) || Object, (typeof (_c = typeof aurelia_router_1.Router !== 'undefined' && aurelia_router_1.Router) === 'function' && _c) || Object])
], Home);
exports.default = Home;
var _a, _b, _c;
