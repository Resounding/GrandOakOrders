/// <reference path="../../typings/toastr/toastr.d.ts" />
System.register(['aurelia-framework', 'aurelia-auth/app.httpClient.config', 'aurelia-auth'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, app_httpClient_config_1, aurelia_auth_1;
    var App;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (app_httpClient_config_1_1) {
                app_httpClient_config_1 = app_httpClient_config_1_1;
            },
            function (aurelia_auth_1_1) {
                aurelia_auth_1 = aurelia_auth_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(httpClientConfig, fetchConfig) {
                    this.httpClientConfig = httpClientConfig;
                    this.fetchConfig = fetchConfig;
                }
                App.prototype.activate = function () {
                    this.httpClientConfig.configure();
                    this.fetchConfig.configure();
                    toastr.options.positionClass = 'toast-bottom-left';
                };
                App.prototype.configureRouter = function (config, router) {
                    this.router = router;
                    config.title = 'Grand Oak Culinary Market ordering application';
                    config.addPipelineStep('authorize', aurelia_auth_1.AuthorizeStep);
                    config.map([
                        { route: 'login', name: 'login', moduleId: './auth/login' },
                        { route: ['/', 'home'], name: 'home', moduleId: './home/index', nav: true, auth: true },
                        { route: 'inquiries', name: 'inquiries', moduleId: './inquiries/list', nav: true, auth: true },
                        { route: 'inquiries/new', name: 'new inquiry', moduleId: './inquiries/detail', nav: false, auth: true },
                        { route: 'inquiries/:id', name: 'edit inquiry', moduleId: './inquiries/detail', nav: false, auth: true },
                        { route: 'orders', name: 'orders', moduleId: './orders/list', nav: true, auth: true },
                        { route: 'orders/all', name: 'all orders', moduleId: './orders/list', nav: true, auth: true },
                        { route: 'orders/:id', name: 'edit order', moduleId: './orders/edit', nav: false, auth: true },
                        { route: 'items', name: 'items', moduleId: './items/list', nav: true, auth: true }
                    ]);
                };
                App = __decorate([
                    aurelia_framework_1.inject(app_httpClient_config_1.default, aurelia_auth_1.FetchConfig)
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});
