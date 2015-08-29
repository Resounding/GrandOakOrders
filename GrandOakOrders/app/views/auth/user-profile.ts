import {inject} from 'aurelia-framework';
import {customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from 'paulvanbladel/aurelia-auth';

@inject(AuthService, EventAggregator)
@customElement('user-profile')
export class UserProfile {
	private profile:string = '';
	
	constructor(private auth:AuthService, private events:EventAggregator) {
        if (this.auth.isAuthenticated()) {
            this.getMe();
        }

        this.events.subscribe('user:changed', () => this.getMe());
    }

    getMe() {
        this.auth.getMe()
				.then((me) => this.profile = me.DisplayName)
				.catch(() => this.profile = '');
    }
}