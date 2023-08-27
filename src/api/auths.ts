import { Cookies } from "react-cookie";
import { HTTPResponse } from "../types/api/api";
import { get } from "./request";
import services from "./services";

const cookie = new Cookies();

class Auth {

    // signin 
    public signIn = (username: string, password: any): Promise<void> => {
        return new Promise((resolve, reject) => {
            services.signIn(username, password).then((response) => {
                this.setAuthorizationCookie(response.entity.token);
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    // signup 
    public signUp = (new_user: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            services.signUp(new_user).then((response: HTTPResponse) => {
                this.setAuthorizationCookie(response.entity.token);
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

    // social login
    public socialLoginOrSignup = (social: string, code: string, redirect_url: string) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `social-login?state=${social}&code=${code}&redirect_uri=${redirect_url}`
            }, 'customapi').then((response: HTTPResponse) => {
                  this.setAuthorizationCookie(response.entity.token);
                  resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    };

    // sign out
    public signOut = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            services.signOut().then(() => {
                this.removeAuthorizationcookie();
                resolve();
            }).catch(() => {
                this.removeAuthorizationcookie();
                resolve();
            });
        });
    };

    // is authenticated
    public isAuthenticated = (): boolean => {
        return this.hasAuthorizationCookie();
    };

    // travel compositor public access token
    // public getPublicToken = (): Promise<any> => {
    //     return new Promise((resolve, reject) => {
    //         services.getPublicToken().then((response: HTTPResponse) => {
    //             resolve(response);
    //         }).catch((error: any) => {
    //             reject(error);
    //         })
    //     });
    // };

    // is access token alive
    public isAccessTokenAlive = (): Promise<void> => {
        if (!this.hasAuthorizationCookie()) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            services.isAuthenticated().then(() => {
                resolve();
            }).catch(() => {
                this.removeAuthorizationcookie();
                reject();
            });
        });
    };

    private hasAuthorizationCookie(): boolean {
        const accessToken = cookie.get("access_token");
        return !!accessToken;
    };

    private setAuthorizationCookie(value: any): void {
        this.removeAuthorizationcookie();
        cookie.set("access_token", value, { path: "/" });
    }

    private removeAuthorizationcookie(): void {
        cookie.remove("access_token", { path: "/" });
    }

};

export default new Auth();