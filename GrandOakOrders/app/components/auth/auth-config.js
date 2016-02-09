System.register([], function(exports_1) {
    var developmentConfig, productionConfig;
    function config() {
        return (window.location.hostname === 'localhost') ? developmentConfig : productionConfig;
    }
    exports_1("config", config);
    return {
        setters:[],
        execute: function() {
            developmentConfig = {
                loginRedirect: '/',
                profileUrl: '/api/me',
                tokenName: 'access_token',
                providers: {
                    google: {
                        clientId: '233717436720-9ia97orckf475kgkugc02p04482svl44.apps.googleusercontent.com',
                        redirectUri: 'http://localhost:52464/auth/callback',
                        url: '/login'
                    }
                }
            };
            productionConfig = {
                loginRedirect: '/',
                profileUrl: '/api/me',
                tokenName: 'access_token',
                providers: {
                    google: {
                        clientId: '233717436720-9ia97orckf475kgkugc02p04482svl44.apps.googleusercontent.com',
                        redirectUri: 'https://grandoakorders.azurewebsites.net/auth/callback',
                        url: '/login'
                    }
                }
            };
        }
    }
});
