System.register(['aurelia-framework', 'aurelia-event-aggregator', 'aurelia-auth'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_framework_2, aurelia_event_aggregator_1, aurelia_auth_1;
    var LogoutButton;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
                aurelia_framework_2 = aurelia_framework_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_auth_1_1) {
                aurelia_auth_1 = aurelia_auth_1_1;
            }],
        execute: function() {
            LogoutButton = (function () {
                function LogoutButton(auth, events, element) {
                    this.auth = auth;
                    this.events = events;
                    this.element = element;
                }
                LogoutButton.prototype.logout = function () {
                    this.auth.logout();
                    this.events.publish('user:changed');
                };
                LogoutButton = __decorate([
                    aurelia_framework_2.inject(aurelia_auth_1.AuthService, aurelia_event_aggregator_1.EventAggregator, Element),
                    aurelia_framework_1.customElement('logout-button')
                ], LogoutButton);
                return LogoutButton;
            }());
            exports_1("LogoutButton", LogoutButton);
        }
    }
});
