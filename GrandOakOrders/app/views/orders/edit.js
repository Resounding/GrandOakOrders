/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
System.register(['aurelia-framework', 'aurelia-http-client', 'aurelia-router', '../../models/order', 'underscore'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var aurelia_framework_1, aurelia_http_client_1, aurelia_router_1, order_1, underscore_1;
    var EditOrder;
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
            function (order_1_1) {
                order_1 = order_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            EditOrder = (function () {
                function EditOrder(httpClient, router, element) {
                    this.httpClient = httpClient;
                    this.router = router;
                    this.element = element;
                    this._submitted = false;
                }
                EditOrder.prototype.activate = function (params) {
                    var _this = this;
                    this.httpClient.get("/api/orders/" + params.id)
                        .then(function (response) {
                        _this._model = new order_1.OrderViewModel(response.content);
                        console.log(_this._model);
                        if (!_this._model.Items.length) {
                            _this.addItem();
                        }
                        _this.sortItems();
                        window.setTimeout(underscore_1.default.bind(function () {
                            var $collapsible = $('.collapsible[data-collapsible=expandable]', _this.element), $eventDate = $('.datepicker', _this.element), $timepicker = $('.timepicker', _this.element), $select = $('select', _this.element), $dropdown = $('.dropdown-button', _this.element), $kitchenReport = $('#kitchenReport', _this.element);
                            $kitchenReport.on('click', _this.showKitchenReport.bind(_this));
                            $dropdown.dropdown({
                                belowOrigin: true
                            });
                            $collapsible
                                .collapsible({ accordion: false })
                                .on('materialize:opened', function (e) {
                                var $el = $(e.target).parent();
                                window.setTimeout(function () {
                                    $el.find('textarea').trigger('autoresize');
                                    $el.find('textarea,input').first().focus();
                                }, 50);
                            });
                            $eventDate.pickadate({
                                container: 'body',
                                format: 'dddd mmm d, yyyy'
                            })
                                .on('change', function (e) {
                                _this._model.Inquiry.EventDate = e.target.value;
                            });
                            $timepicker
                                .pickatime({
                                container: 'body',
                                format: 'h:i A',
                                formatLabel: 'h:i A'
                            })
                                .on('change', function (e) {
                                _this._model.Inquiry.EventTime = e.target.value;
                            });
                            try {
                                $eventDate.pickadate('picker')
                                    .set('select', _this._model.Inquiry.EventDate);
                            }
                            catch (e) { }
                            try {
                                $timepicker.pickatime('picker')
                                    .set('select', _this._model.Inquiry.EventTime);
                            }
                            catch (e) { }
                        }, _this), 1000);
                    });
                };
                Object.defineProperty(EditOrder.prototype, "isOnsite", {
                    get: function () {
                        return this._model.Inquiry.DeliveryType !== 'Off-Site' && this._model.Inquiry.DeliveryType !== 'Delivered';
                    },
                    enumerable: true,
                    configurable: true
                });
                EditOrder.prototype.addItem = function () {
                    this._model.addItem();
                    this.sortItems();
                };
                EditOrder.prototype.removeItem = function (item) {
                    this._model.removeItem(item);
                    this.sortItems();
                };
                EditOrder.prototype.sortItems = function () {
                    this.sortedItems = underscore_1.default.sortBy(this._model.Items, function (item) { return item.SortOrder; });
                };
                EditOrder.prototype.showKitchenReport = function (e) {
                    e.preventDefault();
                    var $el = $(e.target), url = $el.attr('href');
                    this.submit()
                        .then(function () { return window.open(url, '_blank'); })
                        .catch(function () { return toastr.error('There are errors on the Order.'); });
                };
                EditOrder.prototype.save = function (e) {
                    var _this = this;
                    e.preventDefault();
                    this.submit()
                        .then(function (response) {
                        console.log(response);
                        _this.router.navigateToRoute('orders');
                    })
                        .catch(this.onError);
                };
                EditOrder.prototype.submit = function () {
                    this._submitted = true;
                    if (!this._model.isValid()) {
                        return Promise.reject(null);
                    }
                    else {
                        var order = this._model.toJSON();
                        return this.httpClient.patch("/API/Orders/" + this._model.Id, order)
                            .catch(this.onError);
                    }
                };
                EditOrder.prototype.onError = function (err) {
                    console.log(err);
                    var msg = 'There was a problem saving the order';
                    if (err) {
                        msg += ': ' + err;
                    }
                    toastr.error(msg);
                };
                EditOrder = __decorate([
                    aurelia_framework_1.inject(aurelia_http_client_1.HttpClient, aurelia_router_1.Router, Element)
                ], EditOrder);
                return EditOrder;
            })();
            exports_1("EditOrder", EditOrder);
        }
    }
});
