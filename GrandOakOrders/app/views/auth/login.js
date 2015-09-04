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
import { Router } from 'aurelia-router';
import { AuthService } from 'paulvanbladel/aurelia-auth';
export let Login = class {
    constructor(auth, router, events) {
        this.auth = auth;
        this.router = router;
        this.events = events;
        this.params = { to: null };
    }
    activate(params) {
        this.params = params;
    }
    login() {
        this.auth.authenticate('google', false, null)
            .then(() => {
            this.events.publish('user:changed');
            var to = this.params.to || 'home';
            this.router.navigate(to);
        });
    }
};
Login = __decorate([
    inject(AuthService, Router, EventAggregator), 
    __metadata('design:paramtypes', [(typeof (_a = typeof AuthService !== 'undefined' && AuthService) === 'function' && _a) || Object, (typeof (_b = typeof Router !== 'undefined' && Router) === 'function' && _b) || Object, (typeof (_c = typeof EventAggregator !== 'undefined' && EventAggregator) === 'function' && _c) || Object])
], Login);
var _a, _b, _c;
