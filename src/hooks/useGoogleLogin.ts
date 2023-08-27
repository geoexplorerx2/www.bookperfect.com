import { useState, useEffect } from 'react';
import loadScript from '../sdk/loadScript';
import removeScript from '../sdk/removeScript';

const useGoogleLogin = ({
  onLoginSuccess = () => {},
  onAutoLoadFinished = () => {},
  onFailure = () => {},
  onRequest = () => {},
  onScriptLoadFailure,
  clientId,
  cookiePolicy,
  loginHint,
  hostedDomain,
  autoLoad,
  isSignedIn,
  fetchBasicProfile,
  redirectUri,
  discoveryDocs,
  uxMode,
  scope,
  accessType,
  responseType,
  jsSrc = 'https://apis.google.com/js/api.js',
  prompt
}: any) => {
  const [loaded, setLoaded] = useState(false);
  
  function handleSigninSuccess(res: any) {
    // offer renamed response keys to names that match use
    const basicProfile = res.getBasicProfile()
    const authResponse = res.getAuthResponse(true)
    res.googleId = basicProfile.getId()
    res.tokenObj = authResponse
    res.tokenId = authResponse.id_token
    res.accessToken = authResponse.access_token
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName()
    }
    onLoginSuccess(res)
  };

  function signIn(e: any = null) {
    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    if (loaded) {
      const GoogleAuth = window.gapi.auth2.getAuthInstance()
      const options = {
        prompt
      };
      onRequest();
      if (responseType === 'code') {
        GoogleAuth.grantOfflineAccess(options).then(
          (res: any) => onLoginSuccess(res),
          (err: any) => onFailure(err)
        )
      } else {
        GoogleAuth.signIn(options).then(
          (res: any) => handleSigninSuccess(res),
          (err: any) => onFailure(err)
        )
      }
    }
  };

  useEffect(() => {
    let unmounted = false
    const onLoadFailure = onScriptLoadFailure || onFailure
    loadScript(
      document,
      'script',
      'google-login',
      jsSrc,
      () => {
        const params = {
          client_id: clientId,
          cookie_policy: cookiePolicy,
          login_hint: loginHint,
          hosted_domain: hostedDomain,
          fetch_basic_profile: fetchBasicProfile,
          discoveryDocs,
          ux_mode: uxMode,
          redirect_uri: redirectUri,
          scode: scope,
          access_type: accessType,
          plugin_name:'Book Perfect'
        };

        if (responseType === 'code') {
          params.access_type = 'offline'
        };

        window.gapi.load('auth2', async () => {
          const GoogleAuth = window.gapi.auth2.getAuthInstance();
          if (!GoogleAuth) {
            await window.gapi.auth2.init(params).then(
              (res: any) => {
                if (!unmounted) {
                  setLoaded(true)
                  const signedIn = isSignedIn && res.isSignedIn.get()
                  onAutoLoadFinished(signedIn)
                  if (signedIn) {
                    handleSigninSuccess(res.currentUser.get())
                  }
                }
              },
              (err: any) => {
                setLoaded(true)
                onAutoLoadFinished(false)
                onLoadFailure(err)
              }
            )
          } else {
            GoogleAuth.then(
              () => {
                if (unmounted) {
                  return
                }
                if (isSignedIn && GoogleAuth.isSignedIn.get()) {
                  setLoaded(true)
                  onAutoLoadFinished(true)
                  handleSigninSuccess(GoogleAuth.currentUser.get())
                } else {
                  setLoaded(true)
                  onAutoLoadFinished(false)
                }
              },
              (err: any) => {
                onFailure(err)
              }
            )
          }
        })
      },
      (err: any) => {
        onLoadFailure(err)
      }
    )

    return () => {
      unmounted = true
      removeScript(document, 'google-login')
    }
  }, [])

  useEffect(() => {
    if (autoLoad) {
      signIn()
    }
  }, [loaded])

  return { signIn, loaded }
}

export default useGoogleLogin