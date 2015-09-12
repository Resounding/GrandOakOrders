/// <reference path="../../typings/jquery/jquery.d.ts" />

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class CurrencyCustomAttribute {

    negative: boolean = false;

    constructor(private element: HTMLInputElement, private events: EventAggregator) {
        var setVal = this.setVal.bind(this);
        $(this.element)
            .on('blur', setVal)
            .on('change', setVal);

        setVal();

        this.events.subscribe('currency:changed', this.setVal.bind(this));
    }

    valueChanged(val) {
        this.negative = (val === 'negative')
    }
    
    setVal(e) {
        window.setTimeout((() => {
            if (this.element !== document.activeElement) {
                var val = this.element.value.replace(/[$,\(\)]/g, ''),
                    currency = parseFloat(val) || 0,
                    value = `$${currency.toFixed(2)}`;

                if (this.negative) {
                    value = '(' + value + ')';
                }

                this.element.value = value;
            }
        }).bind(this), 100);
    }
}