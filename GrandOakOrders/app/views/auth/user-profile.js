System.register(['aurelia-framework', 'aurelia-event-aggregator', 'aurelia-auth', 'aurelia-router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_framework_2, aurelia_event_aggregator_1, aurelia_auth_1, aurelia_router_1;
    var UserProfile;
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
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            }],
        execute: function() {
            UserProfile = (function () {
                function UserProfile(auth, events, router) {
                    var _this = this;
                    this.auth = auth;
                    this.events = events;
                    this.router = router;
                    this.profile = '';
                    if (this.auth.isAuthenticated()) {
                        this.getMe();
                    }
                    this.events.subscribe('user:changed', function () { return _this.getMe(); });
                }
                UserProfile.prototype.getMe = function () {
                    var _this = this;
                    this.auth.getMe()
                        .then(function (me) { return _this.profile = me.DisplayName; })
                        .catch(function () {
                        // problem - try to authenticate again
                        _this.auth.authenticate('google', false, null)
                            .then(function () {
                            _this.auth.getMe()
                                .then(function (me) { return _this.profile = me.DisplayName; })
                                .catch(function () { return _this.router.navigateToRoute('login'); });
                        })
                            .catch(function () {
                            // need to log in.
                            _this.router.navigateToRoute('login');
                        });
                    });
                };
                UserProfile = __decorate([
                    aurelia_framework_1.inject(aurelia_auth_1.AuthService, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router),
                    aurelia_framework_2.customElement('user-profile')
                ], UserProfile);
                return UserProfile;
            })();
            exports_1("UserProfile", UserProfile);
        }
    }
});
