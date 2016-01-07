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
import { ItemTemplate } from "../../models/itemTemplate";
export let ShowItem = class {
    constructor(element) {
        this.element = element;
    }
    onVisibleChanged(visible) {
        this.element.style.display = visible ? '' : 'none';
    }
};
__decorate([
    bindable, 
    __metadata('design:type', ItemTemplate)
], ShowItem.prototype, "model");
__decorate([
    bindable({ changeHandler: 'onVisibleChanged' }), 
    __metadata('design:type', Boolean)
], ShowItem.prototype, "visible");
ShowItem = __decorate([
    customElement('show-item'),
    inject(Element), 
    __metadata('design:paramtypes', [Element])
], ShowItem);
