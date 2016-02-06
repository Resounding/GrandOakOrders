/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/underscore/underscore.d.ts" />
/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
System.register(['aurelia-framework', 'aurelia-http-client', 'aurelia-router', '../../models/emailDelivery', '../../models/order', '../../models/email', '../../models/itemTemplate', 'underscore'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_http_client_1, aurelia_router_1, emailDelivery_1, order_1, email_1, itemTemplate_1, underscore_1;
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
            function (emailDelivery_1_1) {
                emailDelivery_1 = emailDelivery_1_1;
            },
            function (order_1_1) {
                order_1 = order_1_1;
            },
            function (email_1_1) {
                email_1 = email_1_1;
            },
            function (itemTemplate_1_1) {
                itemTemplate_1 = itemTemplate_1_1;
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
                    this._itemTemplates = [];
                    this._showAllInPricingModal = false;
                }
                EditOrder.prototype.activate = function (params) {
                    var _this = this;
                    this.httpClient.get('/api/items')
                        .then(function (response) {
                        response.content.forEach(function (i) { return _this._itemTemplates.push(new itemTemplate_1.ItemTemplate(i)); });
                        _this.httpClient.get("/api/orders/" + params.id)
                            .then(function (response) {
                            _this._model = new order_1.OrderViewModel(response.content);
                            _this._email = new email_1.Email(_this._model, _this.httpClient);
                            console.log(_this._model);
                            if (!_this._model.Items.length) {
                                _this.addItem();
                            }
                            _this.sortItems();
                            _this._toAddresses = (_this._model.Inquiry.Email || '').split(';');
                            _this._originalPeople = _this._model.Inquiry.People;
                            _this.httpClient.get('/API/Settings/DefaultInvoiceBccAddress')
                                .then(function (settingsResponse) {
                                _this._bccAddresses = (settingsResponse.content || '').toString().split(';');
                            });
                            window.setTimeout(underscore_1.default.bind(function () {
                                var $collapsible = $('.collapsible[data-collapsible=expandable]', _this.element), $eventDate = $('.datepicker.event', _this.element), $invoiceDate = $('.datepicker.invoice', _this.element), $timepicker = $('.timepicker', _this.element), $dropdown = $('.dropdown-button', _this.element), $kitchenReport = $('.kitchen-report', _this.element), $quoteReport = $('.quote-report', _this.element), $invoiceReport = $('.invoice-report', _this.element);
                                $kitchenReport.on('click', _this.showKitchenReport.bind(_this));
                                $quoteReport.on('click', _this.showQuoteReport.bind(_this));
                                $invoiceReport.on('click', _this.showInvoiceReport.bind(_this));
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
                                $invoiceDate
                                    .val(_this._model.InvoiceDateDisplay)
                                    .pickadate({
                                    container: 'body',
                                    format: 'dddd mmm d, yyyy'
                                })
                                    .on('change', function (e) {
                                    _this._model.InvoiceDate = e.target.value;
                                });
                                $timepicker
                                    .pickatime({
                                    container: 'body',
                                    format: 'h:i A',
                                    formatLabel: 'h:i A',
                                    interval: 15,
                                    min: [7, 0],
                                    max: [21, 0]
                                })
                                    .on('change', function (e) {
                                    _this._model.Inquiry.EventTime = e.target.value;
                                });
                                try {
                                    $eventDate.pickadate('picker')
                                        .set('select', _this._model.Inquiry.EventDate);
                                }
                                catch (e) {
                                }
                                try {
                                    $timepicker.pickatime('picker')
                                        .set('select', _this._model.Inquiry.EventTime);
                                }
                                catch (e) {
                                }
                            }, _this), 1000);
                        });
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
                EditOrder.prototype.changeAddress = function (list, index, address) {
                    list[index] = address;
                };
                EditOrder.prototype.addAddress = function (list) {
                    list.push('');
                };
                EditOrder.prototype.removeAddress = function (address, list) {
                    var index = list.indexOf(address);
                    if (index !== -1) {
                        list.splice(index, 1);
                    }
                };
                EditOrder.prototype.numberPeopleChange = function () {
                    var _this = this;
                    var people = parseInt(this._model.Inquiry.People.toString());
                    // skip if NaN, don't do it if 0
                    if (people) {
                        this._model.Items.forEach(function (item) {
                            if (parseInt(item.Quantity.toString()) === _this._originalPeople) {
                                item.Quantity = people;
                            }
                        });
                        this._originalPeople = people;
                    }
                };
                EditOrder.prototype.showKitchenReport = function (e) {
                    e.preventDefault();
                    var $el = $(e.target), url = $el.attr('href');
                    this.submit()
                        .then(function () { return window.open(url, '_blank'); })
                        .catch(function () { return toastr.error('There are errors on the Order.'); });
                };
                EditOrder.prototype.showQuoteReport = function (e) {
                    e.preventDefault();
                    var $el = $(e.target), url = $el.attr('href');
                    this.submit()
                        .then(function () { return window.open(url, '_blank'); })
                        .catch(function () { return toastr.error('There are errors on the Order.'); });
                };
                EditOrder.prototype.showInvoiceReport = function (e) {
                    e.preventDefault();
                    var $el = $(e.target), url = $el.attr('href');
                    if (!this._model.InvoiceDate) {
                        this._model.InvoiceDate = new Date();
                    }
                    this.submit()
                        .then(function () { return window.open(url, '_blank'); })
                        .catch(function () { return toastr.error('There are errors on the Order.'); });
                };
                EditOrder.prototype.allInPricing = function () {
                    var _this = this;
                    var itemsOnInvoice = underscore_1.default.filter(this._model.Items, function (item) { return item.ShowOnInvoice; });
                    if (itemsOnInvoice.length !== 1) {
                        window.toastr.warning('All in pricing can only be done when 0 or 1 items are being displayed on the invoice');
                    }
                    else {
                        this._showAllInPricingModal = true;
                        window.setTimeout((function () { return _this._showAllInPricingModal = false; }).bind(this));
                    }
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
                    var _this = this;
                    this._submitted = true;
                    if (!this._model.isValid()) {
                        return Promise.reject(null);
                    }
                    else {
                        var order = this._model.toJSON();
                        order.Inquiry.Email = this._toAddresses.join(';');
                        return this.httpClient.patch("/API/Orders/" + this._model.Id, order)
                            .then(function (result) {
                            var edited = result.content;
                            _this._model.Items.forEach(function (item, index) {
                                if (item.Id < 0) {
                                    item.Id = edited.Items[index].Id;
                                }
                            });
                        })
                            .catch(this.onError);
                    }
                };
                EditOrder.prototype.emailInvoice = function () {
                    var _this = this;
                    var $modal = $('#emailModal');
                    $modal.openModal({
                        ready: function () {
                            $modal.off().on('click', 'button.cancel', function (e) {
                                e.preventDefault();
                                $modal.closeModal();
                            });
                            $modal.off().on('click', 'button.blue', underscore_1.default.bind(function (e) {
                                e.preventDefault();
                                _this._email.send(_this._toAddresses, _this._bccAddresses)
                                    .then(function (result) {
                                    var delivery = new emailDelivery_1.EmailDelivery(result.content);
                                    _this._model.EmailDeliveries.push(delivery);
                                    $modal.closeModal();
                                })
                                    .catch(function (err) {
                                    console.log(err);
                                    var msg = 'There was a problem sending the email';
                                    if (err) {
                                        msg += ": " + err;
                                    }
                                    toastr.error(msg);
                                });
                            }, _this));
                            $modal.find('iframe').attr('src', _this._email.reportUrl);
                        }
                    });
                };
                EditOrder.prototype.onError = function (err) {
                    console.log(err);
                    var msg = 'There was a problem saving the order';
                    if (err) {
                        msg += ": " + err;
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
