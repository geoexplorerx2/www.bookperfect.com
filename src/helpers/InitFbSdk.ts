
const facebookAppId = process.env.FACEBOOK_APP_ID;

export function initFacebookSdk() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        // @ts-ignore
        window.fbAsyncInit = function () {
            // @ts-ignore
            window.FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });
        };  
    });
}