import {config} from './auth/auth-config';

export function configure(aurelia) {
	aurelia
		.use
		.standardConfiguration()
        .developmentLogging()
		.plugin('paulvanbladel/aurelia-auth', (baseConfig) => {
			var configuration = config();
			baseConfig.configure(configuration);	
		});
		
    aurelia.start().then((a) => a.setRoot('app/views/app'));
}