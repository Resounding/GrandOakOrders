/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
System.register(['aurelia-framework', 'aurelia-http-client', 'aurelia-router', '../../models/inquiry', 'uri.js'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var aurelia_framework_1, aurelia_http_client_1, aurelia_router_1, inquiry_1, uri;
    var InquiryDetail;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_http_client_1_1) {
                aurelia_http_client_1 = aurelia_http_client_1_1;
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (inquiry_1_1) {
                inquiry_1 = inquiry_1_1;
            },
            function (uri_1) {
                uri = uri_1;
            }],
        execute: function() {
            InquiryDetail = (function () {
                function InquiryDetail(httpClient, router, element) {
                    this.httpClient = httpClient;
                    this.router = router;
                    this.element = element;
                    this._model = new inquiry_1.InquiryViewModel();
                    this._submitted = false;
                }
                InquiryDetail.prototype.activate = function (params) {
                    var _this = this;
                    if (params.id) {
                        this.httpClient.get("/api/inquiries/" + params.id)
                            .then(function (res) {
                            var inquiry = res.content;
                            _this._model = new inquiry_1.InquiryViewModel(inquiry);
                            var isNew = _this._model.Id;
                        });
                    }
                    else {
                        // check to see if there was a date passed in.
                        var query = uri.query(location.hash);
                        if (query && query.date) {
                            var date = moment(query.date, 'YYYY-MM-DD');
                            if (date.isValid()) {
                                this._model.EventDate = query.date;
                            }
                            ;
                        }
                    }
                    window.setTimeout(function () {
                        var $datepicker = $('#date', _this.element), $timepicker = $('.timepicker', _this.element), $select = $('select', _this.element);
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
                        var inquiry = this._model.toJSON();
                        if (inquiry.Id) {
                            // edit
                            this.httpClient.put("/api/inquiries/" + inquiry.Id, inquiry)
                                .then(this.onSaved.bind(this))
                                .catch(this.onError);
                        }
                        else {
                            // create
                            this.httpClient.post('/api/inquiries', inquiry)
                                .then(this.onSaved.bind(this))
                                .catch(this.onError);
                        }
                    }
                };
                InquiryDetail.prototype.onSaved = function (response) {
                    console.log(response);
                    if (response.statusCode == 201) {
                        this.router.navigateToRoute('edit order', { id: response.content.Id });
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
                    aurelia_framework_1.inject(aurelia_http_client_1.HttpClient, aurelia_router_1.Router, Element)
                ], InquiryDetail);
                return InquiryDetail;
            })();
            exports_1("InquiryDetail", InquiryDetail);
        }
    }
});
