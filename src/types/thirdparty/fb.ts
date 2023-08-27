import { LoginResponse } from "./loginStatusRes";
import { LoginOptions } from "./options";

export interface FB {
    init: (params: any) => void;
    api: (path: string, params: { fields: string }, callback: (res: unknown) => void) => void;
    login: (callback: (res: LoginResponse) => void, options?: LoginOptions) => void;
};

export interface GAPI {
    init: (params: any) => void;
    api: (path: string, params: { fields: string }, callback: (res: unknown) => void) => void;
    login: (callback: (res: LoginResponse) => void, options?: LoginOptions) => void;
}