import { useEffect, useState } from "react";
import { DIALOG_PARAMS_STATE, getFB, isRedirected, redirectToDialog } from "../helpers/fbClient";
import { isClientSide } from "../helpers/ssr";
import { loadFbSdk } from "../sdk/loadFbSdk";
import { LoginResponse } from "../types/thirdparty/loginStatusRes";
import { DialogParams, LoginOptions, Options } from "../types/thirdparty/options";


export function useFacebookLogin(options: Options) {
    const [ready, setReady] = useState(false);
    const [busy, setBusy] = useState(false);

    const dialogParams: DialogParams = {
        redirect_uri: isClientSide() ? window.location.origin + window.location.pathname : "/",
        state: DIALOG_PARAMS_STATE,
        response_type: "code",
        ...options.dialogParams,
        client_id: options.appId,
    };

    const loginOptions: LoginOptions = {
        ...options.loginOptions,
        scope: options.scope ?? "public_profile,email",
    };

    // load fb sdk and login
    useEffect(() => {
        async function init() {
            try {
                await loadFbSdk(options.language || "en_US");
            } catch (error) {
                options.onInitError?.(error);
                return;
            }

            setReady(true);

            window.fbAsyncInit = () => {
                getFB().init({
                    version: "v14.0",
                    ...options.sdkInitParams,
                    appId: options.appId,
                });

                if (isRedirected(dialogParams) && options.useRedirect) {
                    requestLogin();
                }
            };
        }

        init();
    }, []);

    async function logIn() {
        if (!options.appId) {
            throw new Error("App ID is required.");
        }

        if (options.useRedirect) {
            redirectToDialog(dialogParams, loginOptions);
            return null;
        }

        return requestLogin();
    }

    function requestLogin() {
        setBusy(true);

        return new Promise<LoginResponse>((resolve) =>
            getFB().login((res) => {
                setBusy(false);
                resolve(res);
            }, loginOptions)
        );
    };

    // function logOut() {
    //     return new Promise<LogOutResponse>((resolve) => getFB().logout((response) => resolve(response)));
    // }

    function getProfile() {
        return new Promise(
            (resolve) => getFB().api("me", { 
                fields: options.fields ?? "name,email" }, 
                (res) => resolve(res)
            )
        );
    };

    return { 
        ready, 
        busy, 
        logIn, 
        // logOut, 
        getProfile 
    };
}