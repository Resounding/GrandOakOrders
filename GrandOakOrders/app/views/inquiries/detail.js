/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', '../../models/inquiry', 'underscore', 'uri.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_fetch_client_1, aurelia_router_1, inquiry_1, _, uri;
    var InquiryDetail;
    function substringMatcher(strs) {
        return function (q, cb) {
            var substrRegex = new RegExp(q, 'i');
            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            var matches = _.reduce(strs, function (memo, str) {
                if (substrRegex.test(str.CompanyName) || substrRegex.test(str.ContactPerson)) {
                    memo.push(str);
                }
                return memo;
            }, []);
            cb(matches);
        };
    }
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_fetch_client_1_1) {
                aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (inquiry_1_1) {
                inquiry_1 = inquiry_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (uri_1) {
                uri = uri_1;
            }],
        execute: function() {
            InquiryDetail = (function () {
                function InquiryDetail(httpClient, router, element) {
                    var _this = this;
                    this.httpClient = httpClient;
                    this.router = router;
                    this.element = element;
                    this._model = new inquiry_1.InquiryViewModel();
                    this._submitted = false;
                    httpClient.fetch('/API/Customers')
                        .then(function (results) {
                        results.json().then(function (content) {
                            _this._customers = content;
                        });
                    })
                        .catch(this.onError);
                }
                InquiryDetail.prototype.activate = function (params) {
                    var _this = this;
                    if (params.id) {
                        this.httpClient.fetch("/api/inquiries/" + params.id)
                            .then(function (res) {
                            res.json().then(function (content) {
                                _this._model = new inquiry_1.InquiryViewModel(content);
                            });
                        });
                    }
                    else {
                        // check to see if there was a date passed in.
                        var query = uri.query(location.hash);
                        if (query && query.date) {
                            var date = moment(query.date, 'YYYY-MM-DD');
                            if (date.isValid()) {
                                this._model.EventDate = date.format(inquiry_1.InquiryViewModel.DATE_FORMAT);
                            }
                            ;
                        }
                    }
                    window.setTimeout(function () {
                        var $datepicker = $('#date', _this.element), $timepicker = $('.timepicker', _this.element), $select = $('select', _this.element), $txtOrganization = $('input[name=organization]', _this.element);
                        $datepicker
                            .pickadate({
                            format: 'dddd mmm d, yyyy'
                        })
                            .on('change', function (e) {
                            _this._model.EventDate = e.target.value;
                        });
                        $timepicker
                            .pickatime({
                            format: 'h:i A',
                            formatLabel: 'h:i A',
                            interval: 15,
                            min: [7, 0],
                            max: [21, 0]
                        })
                            .on('change', function (e) {
                            _this._model.EventTime = e.target.value;
                        });
                        $select.material_select();
                        $('textarea', _this.element).trigger('autoresize');
                        $txtOrganization.typeahead({
                            hint: true,
                            highlight: true,
                            minLength: 1
                        }, {
                            name: 'items',
                            source: substringMatcher(_this._customers),
                            display: 'CompanyName',
                            templates: {
                                suggestion: Handlebars.compile('<div>{{CompanyName}} ({{ContactPerson}})</div>')
                            }
                        })
                            .on('typeahead:select', function (e, item) {
                            _this._model.Organization = item.CompanyName;
                            _this._model.ContactPerson = item.ContactPerson;
                            _this._model.Email = item.Email;
                            _this._model.Phone = item.Phone;
                            $('label[for=organization]').addClass('active');
                        }).on('typeahead:active', function () {
                            $('label[for=organization]').addClass('active');
                        });
                        $('[autofocus]').focus();
                    }, 500);
                };
                Object.defineProperty(InquiryDetail.prototype, "isOnsite", {
                    get: function () {
                        return this._model.DeliveryType !== 'Off-Site' && this._model.DeliveryType !== 'Delivered';
                    },
                    enumerable: true,
                    configurable: true
                });
                InquiryDetail.prototype.save = function (e) {
                    this._submitted = true;
                    if (!this._model.isValid()) {
                        e.preventDefault();
                    }
                    else {
                        var inquiry = this._model.toJSON(), headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        if (inquiry.Id) {
                            // edit
                            this.httpClient.fetch("/api/inquiries/" + inquiry.Id, { method: 'put', body: inquiry, headers: headers })
                                .then(this.onSaved.bind(this))
                                .catch(this.onError);
                        }
                        else {
                            // create
                            this.httpClient.fetch('/api/inquiries', { method: 'post', body: JSON.stringify(inquiry), headers: headers })
                                .then(this.onSaved.bind(this))
                                .catch(this.onError);
                        }
                    }
                };
                InquiryDetail.prototype.onSaved = function (response) {
                    var _this = this;
                    console.log(response);
                    if (response.status === 201) {
                        response.json().then(function (content) {
                            _this.router.navigateToRoute('edit order', { id: content.Id });
                        });
                    }
                    else {
                        this.router.navigateToRoute('inquiries');
                    }
                };
                InquiryDetail.prototype.onError = function (err) {
                    console.log(err);
                    toastr.error('There was a problem saving the inquiry: ' + err);
                };
                InquiryDetail = __decorate([
                    aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_router_1.Router, Element)
                ], InquiryDetail);
                return InquiryDetail;
            }());
            exports_1("InquiryDetail", InquiryDetail);
        }
    }
});
