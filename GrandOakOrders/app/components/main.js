System.register(['./auth/auth-config'], function(exports_1) {
    var auth_config_1;
    function configure(aurelia) {
        aurelia
            .use
            .standardConfiguration()
            .developmentLogging()
            .plugin('aurelia-auth', function (baseConfig) {
            var configuration = auth_config_1.config();
            baseConfig.configure(configuration);
        });
        aurelia.start().then(function (a) { return a.setRoot('app/views/app'); });
    }
    exports_1("configure", configure);
    return {
        setters:[
            function (auth_config_1_1) {
                auth_config_1 = auth_config_1_1;
            }],
        execute: function() {
        }
    }
});
