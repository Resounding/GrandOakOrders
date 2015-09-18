/// <reference path="../../typings/toastr/toastr.d.ts" />
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
import HttpClientConfig from 'paulvanbladel/aurelia-auth/app.httpClient.config';
import { AuthorizeStep } from 'paulvanbladel/aurelia-auth';
export let App = class {
    constructor(httpClientConfig) {
        this.httpClientConfig = httpClientConfig;
    }
    activate() {
        this.httpClientConfig.configure();
        toastr.options.positionClass = 'toast-bottom-left';
        toastr.options.timeOut = 0;
    }
    configureRouter(config, router) {
        this.router = router;
        config.title = 'Grand Oak Culinary Market ordering application';
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
            { route: 'login', name: 'login', moduleId: './auth/login' },
            { route: ['/', 'home'], name: 'home', moduleId: './home/index', nav: true, auth: true },
            { route: 'inquiries', name: 'inquiries', moduleId: './inquiries/list', nav: true, auth: true },
            { route: 'inquiries/new', name: 'new inquiry', moduleId: './inquiries/detail', nav: false, auth: true },
            { route: 'inquiries/:id', name: 'edit inquiry', moduleId: './inquiries/detail', nav: false, auth: true },
            { route: 'orders', name: 'orders', moduleId: './orders/list', nav: true, auth: true },
            { route: 'orders/:id', name: 'edit order', moduleId: './orders/edit', nav: false, auth: true }
        ]);
    }
};
App = __decorate([
    inject(HttpClientConfig), 
    __metadata('design:paramtypes', [(typeof (_a = typeof HttpClientConfig !== 'undefined' && HttpClientConfig) === 'function' && _a) || Object])
], App);
var _a;
