import {customElement, bindable, inject} from 'aurelia-framework';
import {OrderItemPojo} from '../../models/order';
import {ItemTemplate} from '../../models/itemTemplate';
import {EditOrder} from './edit';

@customElement('order-item')
@inject(Element)
export class OrderItem {
    parent: EditOrder;
    templates: Array<ItemTemplate>;
    @bindable item: OrderItemPojo;

    constructor(private element: Element) { }

    created() {
        window.setTimeout(_.bind(() => {
            var $collapsible = $('.collapsible[data-collapsible=accordion]', this.element),
                $txtItem = $('input[name=description]', this.element);

            $collapsible
                .collapsible()
                .on('materialize:opened', (e) => {
                    var $el = $(e.target).parent();
                    window.setTimeout(() => {
                        $el.find('textarea').trigger('autoresize');
                        $el.find('textarea,input').first().focus();
                    }, 50);
                });

            $txtItem.typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                    name: 'items',
                    source: substringMatcher(this.parent._itemTemplates),
                    display: 'Description',
                    templates: {
                        suggestion: Handlebars.compile('<div>{{Description}}</div>')
                    }
                }
            )
            .on('typeahead:select', (e, item:ItemTemplate) => {
                    this.item.Description = item.Description;
                    this.item.UnitPrice = item.UnitPrice;
                    this.item.ShowToKitchen = item.ShowToKitchen;
                    this.item.ShowOnInvoice = item.ShowOnInvoice;
                    this.item.KitchenNotes = item.KitchenNotes;
                    this.item.OrderingNotes = item.OrderingNotes;
                    this.item.InvoiceNotes = item.InvoiceNotes;
                    $(`label[for=description_${item.Id}]`).addClass('active');
                }).on('typeahead:active', (e) => {
                        $(`label[for="${e.target.id}"]`).addClass('active');
                    }
                );


        }, this), 500);
    }

    bind(bindingContext, overrideContext) {
        this.parent = overrideContext.parentOverrideContext.bindingContext;
    }

    isNaN(val) {
        return isNaN(val);
    }

    removeItem() {
        this.parent.removeItem(this.item);
    }
    moveItemUp() {
        this.parent.moveUp(this.item);
    }
    moveItemDown() {
        this.parent.moveDown(this.item);
    }

    get _submitted(): boolean {
        return this.parent && this.parent._submitted;
    }
}

function substringMatcher(strs) {
    return (q:string, cb) => {

        var substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        var matches = _.reduce(strs, (memo:Array<ItemTemplate>, str:ItemTemplate) => {
            if (substrRegex.test(str.Description)) {
                memo.push(str);
            }
            return memo;
        }, []);

        cb(matches);
    };
}