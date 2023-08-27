export interface HTTPRequest extends RequestInit {
    url?: string;
    accessToken?: string;
    headers?: any;
    body?: any;
    request_user_profile?: boolean;
};

export interface HTTPResponse extends Response {
    traceId?: string | null;
    entity?: any;
    message?: string;
};