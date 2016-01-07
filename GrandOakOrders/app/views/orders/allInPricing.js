System.register(['aurelia-framework'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1;
    var AllInPricing;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }],
        execute: function() {
            AllInPricing = (function () {
                function AllInPricing(element) {
                    this.element = element;
                }
                AllInPricing.prototype.visibleChanged = function (visible) {
                    if (visible) {
                        $('.modal', this.element).openModal();
                    }
                };
                AllInPricing.prototype.cancel = function () {
                    $('.modal', this.element).closeModal();
                };
                AllInPricing.prototype.setPricing = function () {
                    this.model.Gratuity = this.model.SubTotal * 0.18;
                    $('.modal', this.element).closeModal();
                };
                __decorate([
                    aurelia_framework_1.bindable
                ], AllInPricing.prototype, "visible", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AllInPricing.prototype, "model", void 0);
                AllInPricing = __decorate([
                    aurelia_framework_1.customElement('all-in-pricing'),
                    aurelia_framework_1.inject(Element)
                ], AllInPricing);
                return AllInPricing;
            })();
            exports_1("AllInPricing", AllInPricing);
        }
    }
});
