import history from "../history";
import { FC } from "react";
import TYPES from "../../types/store";
import services from "../../api/services";
import Logger from "../../common/Logger";
import auths from "../../api/auths";

interface signinProps {
  username?: string;
  password?: string;
};

const server = services;
const auth =  auths;

// signin
export const signin = (username: string , password : any, error: any, success: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; entity: any }) => void) => {
    auth
      .signIn(username, password)
      .then((data: any) => {
        // dispatch({
        //   type: TYPES.TOKEN,
        //   payload: data.entity.token,
        // });
        if(data.entity.token) success(data.entity, true);
        else error(data.entity);
      })
      .catch((err: any) => {
        Logger.error(err);
        error(err)
      });
  };
};

// signup
export const signup = (new_user: any, cb: Function, onError: Function) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    auth
      .signUp(new_user)
      .then((data) => {
        // dispatch({
        //   type: TYPES.TOKEN,
        //   payload: data.entity.token,
        // });
        if(data.entity.token) cb(data, true);
      })
      .catch((err: any) => {
        Logger.error(err);
        onError(err);
      });
  };
};

// user data
export const userData = (username: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getUserData(username)
      .then((data: any) => {
        dispatch({
          type: TYPES.USER_DATA,
          payload: data.entity
        })
      })
  }
};

// set active profile sidemenu
export const activateSideMenu = (menu: object) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
   // server
      // .signIn(username, password)
      // .then((data: { entity: any; }) => {
        // console.log({data});
        // console.log({menu});
        dispatch({
          type: TYPES.ACTIVE_PROFILE_SIDE_MENU,
          payload: {
            menu: menu
          },
        });
      // })
      // .catch((error: any) => {
      //   Logger.error(error);
      // });
  };
};

// social login sdk
export const socialLoginSDK = (redirect_url: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getSocialLoginSdk(redirect_url)
      .then((data: any) => {
        dispatch({
          type: TYPES.SOCIAL_LOGIN_SDK,
          payload: data.entity
        })
      })
  }
};

// social login
export const socialLoginOrSignup = (social: string, code: string, redirect_uri: string, callback: Function) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    auth
      .socialLoginOrSignup(social, code, redirect_uri)
      .then((data: any) => {

        dispatch({
          type: TYPES.SOCIAL_LOGIN_OR_SIGNUP,
          payload: data.entity
        });

        if(data.entity.token) {
          //   server.getUserProfileWithToken().then((data: any) => {
          //     dispatch({
          //       type: TYPES.USER_PROFILE,
          //       payload: data.entity
          //     });

              
          // });
          callback(data.entity, true);
         }
      })
  }
};

// user profile with token
export const userProfileWithToken = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getUserProfileWithToken()
      .then((data: any) => {
        dispatch({
          type: TYPES.USER_PROFILE,
          payload: data.entity
        })
      })
  }
};