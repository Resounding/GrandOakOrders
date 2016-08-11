"use strict";
const auth_config_1 = require('./auth/auth-config');
function configure(aurelia) {
    aurelia
        .use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-auth', (baseConfig) => {
        var configuration = auth_config_1.config();
        baseConfig.configure(configuration);
    });
    aurelia.start().then((a) => a.setRoot('app/views/app'));
}
exports.configure = configure;
