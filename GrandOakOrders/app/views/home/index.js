System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-auth'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_fetch_client_1, aurelia_auth_1;
    var Home;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_fetch_client_1_1) {
                aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
            },
            function (aurelia_auth_1_1) {
                aurelia_auth_1 = aurelia_auth_1_1;
            }],
        execute: function() {
            Home = (function () {
                function Home(httpClient, auth, router) {
                    this.httpClient = httpClient;
                    this.auth = auth;
                    this.router = router;
                    this.load();
                }
                Home.prototype.load = function () {
                    var _this = this;
                    this.httpClient.fetch('/API/Home')
                        .then(function (response) {
                        _this.content = response.content;
                    })
                        .catch(function (err) {
                        if (err.statusCode === 401) {
                            _this.auth.authenticate('google', false, null)
                                .then(function () { return _this.load(); })
                                .catch(function () { return _this.router.navigateToRoute('login'); });
                        }
                        else {
                            console.log(err);
                        }
                    });
                };
                Home = __decorate([
                    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_auth_1.AuthService)
                ], Home);
                return Home;
            })();
            exports_1("default", Home);
        }
    }
});
