System.register(['aurelia-framework'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1;
    var ShowItem;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }],
        execute: function() {
            ShowItem = (function () {
                function ShowItem(element) {
                    this.element = element;
                }
                ShowItem.prototype.onVisibleChanged = function (visible) {
                    this.element.style.display = visible ? '' : 'none';
                };
                __decorate([
                    aurelia_framework_1.bindable
                ], ShowItem.prototype, "model", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ changeHandler: 'onVisibleChanged' })
                ], ShowItem.prototype, "visible", void 0);
                ShowItem = __decorate([
                    aurelia_framework_1.customElement('show-item'),
                    aurelia_framework_1.inject(Element)
                ], ShowItem);
                return ShowItem;
            }());
            exports_1("ShowItem", ShowItem);
        }
    }
});
