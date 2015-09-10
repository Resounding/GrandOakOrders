var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { customElement, bindable, inject } from 'aurelia-framework';
import _ from 'underscore';
export let OrderItem = class {
    constructor(element) {
        this.element = element;
    }
    created() {
        window.setTimeout(_.bind(() => {
            $('.collapsible[data-collapsible=accordion]', this.element).collapsible();
        }, this), 500);
    }
    bind(context) {
        this.parent = context.$parent;
    }
    isNaN(val) {
        return isNaN(val);
    }
    removeItem() {
        this.parent.removeItem(this.item);
    }
    get _submitted() {
        return this.parent._submitted;
    }
};
__decorate([
    bindable, 
    __metadata('design:type', Object)
], OrderItem.prototype, "item");
OrderItem = __decorate([
    customElement('order-item'),
    inject(Element), 
    __metadata('design:paramtypes', [Element])
], OrderItem);
