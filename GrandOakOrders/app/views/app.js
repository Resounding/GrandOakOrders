/// <reference path="../../typings/toastr/toastr.d.ts" />
System.register(['aurelia-framework', 'paulvanbladel/aurelia-auth/app.httpClient.config', 'paulvanbladel/aurelia-auth'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
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
                function App(httpClientConfig) {
                    this.httpClientConfig = httpClientConfig;
                }
                App.prototype.activate = function () {
                    this.httpClientConfig.configure();
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
                        { route: 'orders/:id', name: 'edit order', moduleId: './orders/edit', nav: false, auth: true }
                    ]);
                };
                App = __decorate([
                    aurelia_framework_1.inject(app_httpClient_config_1.default)
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});
