const developmentConfig = {
    loginRedirect: '/#',
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
const productionConfig = {
    loginRedirect: '/#',
    profileUrl: '/api/me',
    tokenName: 'access_token',
    providers: {
        google: {
            clientId: '233717436720-9ia97orckf475kgkugc02p04482svl44.apps.googleusercontent.com',
            redirectUri: 'http://goc.resounding.ca/auth/callback',
            url: '/login'
        }
    }
};
export function config() {
    return (window.location.hostname === 'localhost') ? developmentConfig : productionConfig;
}
