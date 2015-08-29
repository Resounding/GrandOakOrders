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
import { customElement } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService } from 'paulvanbladel/aurelia-auth';
export let LogoutButton = class {
    constructor(auth, events, element) {
        this.auth = auth;
        this.events = events;
        this.element = element;
    }
    logout() {
        this.auth.logout();
        this.events.publish('user:changed');
    }
};
LogoutButton = __decorate([
    inject(AuthService, EventAggregator, Element),
    customElement('logout-button'), 
    __metadata('design:paramtypes', [(typeof AuthService !== 'undefined' && AuthService) || Object, (typeof EventAggregator !== 'undefined' && EventAggregator) || Object, Object])
], LogoutButton);
