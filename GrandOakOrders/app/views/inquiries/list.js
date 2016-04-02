System.register(['aurelia-framework', 'aurelia-fetch-client', 'moment', 'underscore'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_fetch_client_1, moment_1, underscore_1;
    var DATE_FORMAT, TIME_FORMAT, InquiriesList;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_fetch_client_1_1) {
                aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            DATE_FORMAT = 'ddd MMM D';
            TIME_FORMAT = 'h:mm A';
            InquiriesList = (function () {
                function InquiriesList(httpClient) {
                    var _this = this;
                    this.httpClient = httpClient;
                    this.requests = [];
                    this.httpClient.fetch('/api/inquiries')
                        .then(function (res) {
                        res.json().then(function (content) {
                            _this.requests = underscore_1.default.map(content, function (request) {
                                var createdAt = moment_1.default(request.CreatedAt), display = {
                                    id: request.Id,
                                    title: request.Organization,
                                    summary: request.Summary,
                                    people: request.People,
                                    date: '',
                                    createdDate: createdAt.format(DATE_FORMAT),
                                    createdTime: createdAt.format(TIME_FORMAT),
                                    location: request.Location,
                                    address: request.LocationAddress,
                                    createdBy: request.CreatedBy
                                };
                                if (request.ContactPerson) {
                                    display.title += ' (' + request.ContactPerson + ')';
                                }
                                if (underscore_1.default.isDate(request.EventDate)) {
                                    var m = moment_1.default(request.EventDate);
                                    display.date = m.format(DATE_FORMAT) + ' ' + m.format(TIME_FORMAT);
                                }
                                return display;
                            });
                        }, function (err) {
                            console.log(err);
                        });
                    });
                }
                InquiriesList = __decorate([
                    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient)
                ], InquiriesList);
                return InquiriesList;
            })();
            exports_1("InquiriesList", InquiriesList);
        }
    }
});
