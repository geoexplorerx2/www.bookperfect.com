import { DialogParams, LoginOptions } from "../types/thirdparty/options";
import { decodeUlrParamsToObject, encodeObjectToUlrParams } from "./params";

export const DIALOG_PARAMS_STATE = "fb-login-state";

// is redirect to login
export function isRedirected(dialogParams?: DialogParams): boolean {
    const params = decodeUlrParamsToObject(window.location.search) as DialogParams;
    return (
        (params.state === dialogParams?.state ?? DIALOG_PARAMS_STATE) &&
        params[(dialogParams?.response_type as keyof DialogParams) ?? ""] !== undefined
    );
};

// redirect to facebook dialog
export function redirectToDialog(
    dialogParams: DialogParams, 
    loginOptions: LoginOptions
    ){
    window.location.href = `https://www.facebook.com/dialog/oauth${encodeObjectToUlrParams({
        ...dialogParams,
        ...loginOptions,
    })}`;
};

// get FB sdk
export function getFB() {
    if (!window.FB) {
        throw new Error("window.FB SDK not available");
    }
    return window.FB;
};