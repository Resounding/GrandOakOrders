import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';

@inject(AuthService, Router, EventAggregator)
export class Login {
	private params = { to: null };
	
	constructor(private auth:AuthService, private router:Router, private events:EventAggregator) { }
	
	activate(params) {
		this.params = params;
	}
	
    login() {
        debugger;
        this.auth.authenticate('google', false, null)
            .then(() => {
                this.events.publish('user:changed');
                var to = this.params.to || 'home';
                this.router.navigate(to);
            })
            .catch((ex) => {
                debugger;
                console.log(ex);
            });
	}
}