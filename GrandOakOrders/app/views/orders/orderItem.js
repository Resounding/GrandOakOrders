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
let OrderItem = class OrderItem {
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
            }).on('typeahead:active', (e) => {
                $(`label[for="${e.target.id}"]`).addClass('active');
            });
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
    get _submitted() {
        return this.parent && this.parent._submitted;
    }
};
__decorate([
    aurelia_framework_1.bindable, 
    __metadata('design:type', Object)
], OrderItem.prototype, "item", void 0);
OrderItem = __decorate([
    aurelia_framework_1.customElement('order-item'),
    aurelia_framework_1.inject(Element), 
    __metadata('design:paramtypes', [Element])
], OrderItem);
exports.OrderItem = OrderItem;
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
