import {inject} from 'aurelia-framework';
import {customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {Router} from 'aurelia-router';

@inject(AuthService, EventAggregator, Router)
@customElement('user-profile')
export class UserProfile {
	private profile:string = '';
	
	constructor(private auth:AuthService, private events:EventAggregator, private router:Router) {
        if (this.auth.isAuthenticated()) {
            this.getMe();
        }

        this.events.subscribe('user:changed', () => this.getMe());
    }

    getMe() {
        this.auth.getMe()
            // all good
            .then((me) => this.profile = me.DisplayName)            
            .catch(() => {
                // problem - try to authenticate again
                this.auth.authenticate('google', false, null)
                    // worked. get me again
                    .then(() => {
                        this.auth.getMe()
                            .then((me) => this.profile = me.DisplayName)
                            // this shouldn't happen, but...
                            .catch(() => this.router.navigateToRoute('login'));
                    })
                    .catch(() => {
                        // need to log in.
                        this.router.navigateToRoute('login');
                    });
            });
    }
}