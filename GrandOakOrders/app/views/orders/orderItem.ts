﻿import {customElement, bindable, inject} from 'aurelia-framework';
import {OrderItemPojo} from '../../models/order';
import {EditOrder} from './edit';
import _ from 'underscore';

@customElement('order-item')
@inject(Element)
export class OrderItem {
    parent: EditOrder;
    @bindable item: OrderItemPojo;

    constructor(private element: Element) { }

    created() {
        window.setTimeout(_.bind(() => {
            $('.collapsible[data-collapsible=accordion]', this.element)
                .collapsible()
                .on('materialize:opened', (e) => {
                    var $el = $(e.target).parent();
                    window.setTimeout(() => {
                        $el.find('textarea').trigger('autoresize');
                        $el.find('textarea,input').first().focus();
                    }, 50);
                });;

                
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

    get _submitted(): boolean {
        return this.parent._submitted;
    }
}