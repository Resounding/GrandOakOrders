System.register(['aurelia-framework', 'aurelia-http-client', 'paulvanbladel/aurelia-auth'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var aurelia_framework_1, aurelia_http_client_1, aurelia_auth_1;
    var Home;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_http_client_1_1) {
                aurelia_http_client_1 = aurelia_http_client_1_1;
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
                    this.httpClient.get('/API/Home')
                        .then(function (response) {
                        _this.content = response.content;
                    })
                        .catch(function (err) {
                        if (err.statusCode === 401) {
                            _this.auth.authenticate('google', false, null)
                                .then(_this.load)
                                .catch(function () { return _this.router.navigateToRoute('login'); });
                        }
                        else {
                            console.log(err);
                        }
                    });
                };
                Home = __decorate([
                    aurelia_framework_1.inject(aurelia_http_client_1.HttpClient, aurelia_auth_1.AuthService)
                ], Home);
                return Home;
            })();
            exports_1("default", Home);
        }
    }
});
