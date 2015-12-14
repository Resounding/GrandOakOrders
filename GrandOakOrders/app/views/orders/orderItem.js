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
import _ from 'underscore';
export let OrderItem = class {
    constructor(element) {
        this.element = element;
    }
    created() {
        window.setTimeout(_.bind(() => {
            var $collapsible = $('.collapsible[data-collapsible=accordion]', this.element), $txtItem = $('input[name=description]', this.element);
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
            }, {
                name: 'items',
                source: substringMatcher(this.parent._itemTemplates),
                display: 'Description',
                templates: {
                    suggestion: Handlebars.compile('<div>{{Description}}</div>')
                }
            })
                .on('typeahead:select', (e, item) => {
                this.item.Description = item.Description;
                this.item.UnitPrice = item.UnitPrice;
                this.item.ShowToKitchen = item.ShowToKitchen;
                this.item.ShowOnInvoice = item.ShowOnInvoice;
                this.item.KitchenNotes = item.KitchenNotes;
                this.item.OrderingNotes = item.OrderingNotes;
                this.item.InvoiceNotes = item.InvoiceNotes;
                $(`label[for=description_${item.Id}]`).addClass('active');
            }).on('typeahead:active', () => {
                $(`label[for=description_${item.Id}]`).addClass('active');
            });
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
    get _submitted() {
        return this.parent._submitted;
    }
};
__decorate([
    bindable, 
    __metadata('design:type', Object)
], OrderItem.prototype, "item");
OrderItem = __decorate([
    customElement('order-item'),
    inject(Element), 
    __metadata('design:paramtypes', [Element])
], OrderItem);
function substringMatcher(strs) {
    return (q, cb) => {
        var substrRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        var matches = _.reduce(strs, (memo, str) => {
            if (substrRegex.test(str.Description)) {
                memo.push(str);
            }
            return memo;
        }, []);
        cb(matches);
    };
}
