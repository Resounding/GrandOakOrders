System.register(['aurelia-framework'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1;
    var EditItem;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }],
        execute: function() {
            EditItem = (function () {
                function EditItem(element) {
                    this.element = element;
                }
                EditItem.prototype.onVisibleChanged = function (visible) {
                    this.element.style.display = visible ? '' : 'none';
                };
                __decorate([
                    aurelia_framework_1.bindable
                ], EditItem.prototype, "model", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ changeHandler: 'onVisibleChanged' })
                ], EditItem.prototype, "visible", void 0);
                EditItem = __decorate([
                    aurelia_framework_1.customElement('edit-item'),
                    aurelia_framework_1.inject(Element)
                ], EditItem);
                return EditItem;
            })();
            exports_1("EditItem", EditItem);
        }
    }
});
