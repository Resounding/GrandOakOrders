System.register(['aurelia-framework', 'underscore'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, underscore_1;
    var OrderItem;
    function substringMatcher(strs) {
        return function (q, cb) {
            var substrRegex = new RegExp(q, 'i');
            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            var matches = underscore_1.default.reduce(strs, function (memo, str) {
                if (substrRegex.test(str.Description)) {
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
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            }],
        execute: function() {
            OrderItem = (function () {
                function OrderItem(element) {
                    this.element = element;
                }
                OrderItem.prototype.created = function () {
                    var _this = this;
                    window.setTimeout(underscore_1.default.bind(function () {
                        var $collapsible = $('.collapsible[data-collapsible=accordion]', _this.element), $txtItem = $('input[name=description]', _this.element);
                        $collapsible
                            .collapsible()
                            .on('materialize:opened', function (e) {
                            var $el = $(e.target).parent();
                            window.setTimeout(function () {
                                $el.find('textarea').trigger('autoresize');
                                $el.find('textarea,input').first().focus();
                            }, 50);
                        });
                        $txtItem.typeahead({
                            hint: true,
                            highlight: true,
                            minLength: 1
                        }, {
                            name: 'items',
                            source: substringMatcher(_this.parent._itemTemplates),
                            display: 'Description',
                            templates: {
                                suggestion: Handlebars.compile('<div>{{Description}}</div>')
                            }
                        })
                            .on('typeahead:select', function (e, item) {
                            _this.item.Description = item.Description;
                            _this.item.UnitPrice = item.UnitPrice;
                            _this.item.ShowToKitchen = item.ShowToKitchen;
                            _this.item.ShowOnInvoice = item.ShowOnInvoice;
                            _this.item.KitchenNotes = item.KitchenNotes;
                            _this.item.OrderingNotes = item.OrderingNotes;
                            _this.item.InvoiceNotes = item.InvoiceNotes;
                            $("label[for=description_" + item.Id + "]").addClass('active');
                        }).on('typeahead:active', function (e, item) {
                            $("label[for=description_" + item.Id + "]").addClass('active');
                        });
                    }, this), 500);
                };
                OrderItem.prototype.bind = function (bindingContext, overrideContext) {
                    this.parent = overrideContext.parentOverrideContext.bindingContext;
                };
                OrderItem.prototype.isNaN = function (val) {
                    return isNaN(val);
                };
                OrderItem.prototype.removeItem = function () {
                    this.parent.removeItem(this.item);
                };
                Object.defineProperty(OrderItem.prototype, "_submitted", {
                    get: function () {
                        return this.parent && this.parent._submitted;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    aurelia_framework_1.bindable
                ], OrderItem.prototype, "item", void 0);
                OrderItem = __decorate([
                    aurelia_framework_1.customElement('order-item'),
                    aurelia_framework_1.inject(Element)
                ], OrderItem);
                return OrderItem;
            })();
            exports_1("OrderItem", OrderItem);
        }
    }
});
