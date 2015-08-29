import {RouterConfiguration, AppRouter} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import HttpClientConfig from 'paulvanbladel/aurelia-auth/app.httpClient.config';
import {AuthorizeStep} from 'paulvanbladel/aurelia-auth';

@inject(HttpClientConfig)
export class App {
	router:AppRouter;
	
	constructor(private httpClientConfig:HttpClientConfig) { }
	
	activate() {
		this.httpClientConfig.configure();
	}
	
	configureRouter(config:RouterConfiguration, router:AppRouter) {
		this.router = router;
		config.title = 'Grand Oak Culinary Market ordering application';
		config.addPipelineStep('authorize', AuthorizeStep);
		config.map([
			{ route: 'login', name: 'login', moduleId: './auth/login' },
			{ route: ['/', 'home'], name: 'home', moduleId: './home/index', nav: true, auth: true },
			{ route: 'inquiries', name: 'inquiries', moduleId: './inquiries/list', nav: true, auth: true },
			{ route: 'inquiries/new', name: 'new inquiry', moduleId: './inquiries/new', nav: false, auth: true },
			{ route: 'inquiries/{id}', name: 'edit inquiry', moduleId: './inquiries/detail', nav: false, auth: true }
		]);
	}
}