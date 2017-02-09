"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const aurelia_framework_1 = require('aurelia-framework');
const itemTemplate_1 = require("../../models/itemTemplate");
let EditItem = class EditItem {
    constructor(element) {
        this.element = element;
    }
    onVisibleChanged(visible) {
        this.element.style.display = visible ? '' : 'none';
    }
};
__decorate([
    aurelia_framework_1.bindable, 
    __metadata('design:type', itemTemplate_1.ItemTemplate)
], EditItem.prototype, "model", void 0);
__decorate([
    aurelia_framework_1.bindable({ changeHandler: 'onVisibleChanged' }), 
    __metadata('design:type', Boolean)
], EditItem.prototype, "visible", void 0);
EditItem = __decorate([
    aurelia_framework_1.customElement('edit-item'),
    aurelia_framework_1.inject(Element), 
    __metadata('design:paramtypes', [Element])
], EditItem);
exports.EditItem = EditItem;
