import {customElement, bindable, inject} from 'aurelia-framework';
import {OrderViewModel} from '../../models/order';

@customElement('all-in-pricing')
@inject(Element)
export class AllInPricing {
    @bindable visible: boolean;
    @bindable model:OrderViewModel;

    constructor(private element: Element) { }
    
    visibleChanged(visible) {
        if (visible) {
            $('.modal', this.element).openModal();
        }
    }

    cancel() {
        $('.modal', this.element).closeModal();
    }

    setPricing() {
        this.model.Gratuity = this.model.SubTotal * 0.18;
        $('.modal', this.element).closeModal();
    }
}