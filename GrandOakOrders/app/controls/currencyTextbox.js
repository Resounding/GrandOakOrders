/// <reference path="../../typings/jquery/jquery.d.ts" />
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
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
export let CurrencyCustomAttribute = class {
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
        console.log(e);
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
    inject(Element, EventAggregator), 
    __metadata('design:paramtypes', [HTMLInputElement, (typeof (_a = typeof EventAggregator !== 'undefined' && EventAggregator) === 'function' && _a) || Object])
], CurrencyCustomAttribute);
var _a;
