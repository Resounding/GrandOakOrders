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
const aurelia_router_1 = require('aurelia-router');
let NavBar = class NavBar {
    constructor(router) {
        this.router = router;
    }
    showCalendar() {
        var $modal = $('#calendarModal'), $calendar = $('#calendar');
        $modal.openModal({
            ready: () => {
                $modal
                    .on('click', 'a.fc-day-grid-event', () => $modal.closeModal())
                    .css({ top: 0 });
                $calendar.fullCalendar({
                    events: '/api/calendar',
                    eventRender: (event, element) => {
                        var $time = element.find('.fc-time'), inquiry = event.Inquiry, title = inquiry.Organization;
                        if ($time.length) {
                            title = '<br>' + title;
                        }
                        if (inquiry.People) {
                            title += `<br>${inquiry.People} people`;
                        }
                        var tooltip = `${$time.text()}${title.replace(/<br>/g, '\n')}`;
                        element.attr('title', tooltip).find('.fc-title').html(title);
                    },
                    dayClick: (date) => {
                        this.router.navigateToRoute('new inquiry', { date: window.moment(date).format('YYYY-MM-DD') });
                        $modal.closeModal();
                    }
                });
            }
        });
    }
};
NavBar = __decorate([
    aurelia_framework_1.customElement('nav-bar'),
    aurelia_framework_1.inject(aurelia_router_1.Router), 
    __metadata('design:paramtypes', [(typeof (_a = typeof aurelia_router_1.Router !== 'undefined' && aurelia_router_1.Router) === 'function' && _a) || Object])
], NavBar);
exports.NavBar = NavBar;
var _a;
