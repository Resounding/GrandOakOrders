System.register(['aurelia-framework', 'aurelia-router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_router_1;
    var NavBar;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            }],
        execute: function() {
            NavBar = (function () {
                function NavBar(router) {
                    this.router = router;
                }
                NavBar.prototype.showCalendar = function () {
                    var _this = this;
                    var $modal = $('#calendarModal'), $calendar = $('#calendar');
                    $modal.openModal({
                        ready: function () {
                            $modal
                                .on('click', 'a.fc-day-grid-event', function () { return $modal.closeModal(); })
                                .css({ top: 0 });
                            $calendar.fullCalendar({
                                events: '/api/calendar',
                                eventRender: function (event, element) {
                                    var $time = element.find('.fc-time'), inquiry = event.Inquiry, title = inquiry.Organization;
                                    if ($time.length) {
                                        title = '<br>' + title;
                                    }
                                    if (inquiry.People) {
                                        title += "<br>" + inquiry.People + " people";
                                    }
                                    var tooltip = "" + $time.text() + title.replace(/<br>/g, '\n');
                                    element.attr('title', tooltip).find('.fc-title').html(title);
                                },
                                dayClick: function (date) {
                                    _this.router.navigateToRoute('new inquiry', { date: window.moment(date).format('YYYY-MM-DD') });
                                    $modal.closeModal();
                                }
                            });
                        }
                    });
                };
                NavBar = __decorate([
                    aurelia_framework_1.customElement('nav-bar'),
                    aurelia_framework_1.inject(aurelia_router_1.Router)
                ], NavBar);
                return NavBar;
            }());
            exports_1("NavBar", NavBar);
        }
    }
});
