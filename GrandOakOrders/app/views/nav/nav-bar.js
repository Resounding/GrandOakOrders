System.register(['aurelia-framework'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var aurelia_framework_1;
    var NavBar;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }],
        execute: function() {
            NavBar = (function () {
                function NavBar() {
                }
                NavBar.prototype.showCalendar = function () {
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
                                }
                            });
                        }
                    });
                };
                NavBar = __decorate([
                    aurelia_framework_1.customElement('nav-bar')
                ], NavBar);
                return NavBar;
            })();
            exports_1("NavBar", NavBar);
        }
    }
});
