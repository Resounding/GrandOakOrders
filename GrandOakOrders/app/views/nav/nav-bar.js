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
import { customElement, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
export let NavBar = class {
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
    customElement('nav-bar'),
    inject(Router), 
    __metadata('design:paramtypes', [(typeof (_a = typeof Router !== 'undefined' && Router) === 'function' && _a) || Object])
], NavBar);
var _a;
