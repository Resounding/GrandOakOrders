﻿import {customElement, bindable, inject} from 'aurelia-framework';
import {ItemTemplate} from "../../models/itemTemplate";
import * as _ from 'underscore';

@customElement('edit-item')
@inject(Element)
export class EditItem {
    constructor(private element:Element) { }

    @bindable model: ItemTemplate;
    @bindable({ changeHandler: 'onVisibleChanged' }) visible: boolean;

    onVisibleChanged(visible) {
        this.element.style.display = visible ? '' : 'none';
    }
}