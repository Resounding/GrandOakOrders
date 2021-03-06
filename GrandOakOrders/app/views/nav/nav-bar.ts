import {customElement, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@customElement('nav-bar')
@inject(Router)
export class NavBar {
    constructor(private router:Router) { }

    showCalendar() {
        var $modal = $('#calendarModal'),
            $calendar = $('#calendar');
        $modal.openModal({
            ready: () => {
                $modal
                    .on('click', 'a.fc-day-grid-event', () => $modal.closeModal())
                    .css({ top: 0 });

                $calendar.fullCalendar({
                    events: '/api/calendar',
                    eventRender: (event, element) => {
                        var $time = element.find('.fc-time'),
                            inquiry = event.Inquiry,
                            title = inquiry.Organization;

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
                        $modal.closeModal()
                    }
                });
            }   
        });
    }
}