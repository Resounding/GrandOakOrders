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
import { customElement } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService } from 'paulvanbladel/aurelia-auth';
import { Router } from 'aurelia-router';
export let UserProfile = class {
    constructor(auth, events, router) {
        this.auth = auth;
        this.events = events;
        this.router = router;
        this.profile = '';
        if (this.auth.isAuthenticated()) {
            this.getMe();
        }
        this.events.subscribe('user:changed', () => this.getMe());
    }
    getMe() {
        this.auth.getMe()
            .then((me) => this.profile = me.DisplayName)
            .catch(() => {
            // problem - try to authenticate again
            this.auth.authenticate('google', false, null)
                .then(() => {
                this.auth.getMe()
                    .then((me) => this.profile = me.DisplayName)
                    .catch(() => this.router.navigateToRoute('login'));
            })
                .catch(() => {
                // need to log in.
                this.router.navigateToRoute('login');
            });
        });
    }
};
UserProfile = __decorate([
    inject(AuthService, EventAggregator, Router),
    customElement('user-profile'), 
    __metadata('design:paramtypes', [(typeof (_a = typeof AuthService !== 'undefined' && AuthService) === 'function' && _a) || Object, (typeof (_b = typeof EventAggregator !== 'undefined' && EventAggregator) === 'function' && _b) || Object, (typeof (_c = typeof Router !== 'undefined' && Router) === 'function' && _c) || Object])
], UserProfile);
var _a, _b, _c;
