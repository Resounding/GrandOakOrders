System.register(['aurelia-framework', 'aurelia-event-aggregator', 'aurelia-router', 'aurelia-auth'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_event_aggregator_1, aurelia_router_1, aurelia_auth_1;
    var Login;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (aurelia_auth_1_1) {
                aurelia_auth_1 = aurelia_auth_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(auth, router, events) {
                    this.auth = auth;
                    this.router = router;
                    this.events = events;
                    this.params = { to: null };
                }
                Login.prototype.activate = function (params) {
                    this.params = params;
                };
                Login.prototype.login = function () {
                    var _this = this;
                    this.auth.authenticate('google', false, null)
                        .then(function () {
                        _this.events.publish('user:changed');
                        var to = _this.params.to || 'home';
                        _this.router.navigate(to);
                    });
                };
                Login = __decorate([
                    aurelia_framework_1.inject(aurelia_auth_1.AuthService, aurelia_router_1.Router, aurelia_event_aggregator_1.EventAggregator)
                ], Login);
                return Login;
            })();
            exports_1("Login", Login);
        }
    }
});
