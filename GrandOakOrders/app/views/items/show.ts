import {customElement, bindable, inject} from 'aurelia-framework';
import {ItemTemplate} from "../../models/itemTemplate";

@customElement('show-item')
@inject(Element)
export class ShowItem {
    constructor(private element: Element) { }

    @bindable model: ItemTemplate;

    @bindable({ changeHandler: 'onVisibleChanged' }) visible: boolean;

    onVisibleChanged(visible) {
        this.element.style.display = visible ? '' : 'none';
    }
}