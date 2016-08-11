/// <reference path="../../typings/jquery/jquery.d.ts" />
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
const aurelia_event_aggregator_1 = require('aurelia-event-aggregator');
let CurrencyCustomAttribute = class CurrencyCustomAttribute {
    constructor(element, events) {
        this.element = element;
        this.events = events;
        this.negative = false;
        var setVal = this.setVal.bind(this);
        $(this.element)
            .on('blur', setVal)
            .on('change', setVal);
        setVal();
        this.events.subscribe('currency:changed', this.setVal.bind(this));
    }
    valueChanged(val) {
        this.negative = (val === 'negative');
    }
    setVal(e) {
        window.setTimeout((() => {
            if (this.element !== document.activeElement) {
                var val = this.element.value.replace(/[$,\(\)]/g, ''), currency = parseFloat(val) || 0, value = `$${currency.toFixed(2)}`;
                if (this.negative) {
                    value = '(' + value + ')';
                }
                this.element.value = value;
            }
        }).bind(this), 100);
    }
};
CurrencyCustomAttribute = __decorate([
    aurelia_framework_1.inject(Element, aurelia_event_aggregator_1.EventAggregator), 
    __metadata('design:paramtypes', [HTMLInputElement, (typeof (_a = typeof aurelia_event_aggregator_1.EventAggregator !== 'undefined' && aurelia_event_aggregator_1.EventAggregator) === 'function' && _a) || Object])
], CurrencyCustomAttribute);
exports.CurrencyCustomAttribute = CurrencyCustomAttribute;
var _a;
