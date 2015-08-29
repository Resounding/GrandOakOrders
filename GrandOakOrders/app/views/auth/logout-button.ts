import {customElement} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from 'paulvanbladel/aurelia-auth';

@inject(AuthService, EventAggregator, Element)
@customElement('logout-button')
export class LogoutButton {
	constructor(private auth:AuthService, private events:EventAggregator, private element) { }
	
	logout() {
        this.auth.logout();
        this.events.publish('user:changed');
	}
}