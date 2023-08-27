import { Cookies } from "react-cookie";
import { HTTPRequest, HTTPResponse } from "../types/api/api";
import BASE_URL_HOME, { BASE_URL, CUSTOM_BASE_URL, CUSTOM_BASE_URL_TEST } from "./env";

const cookie = new Cookies();

// get
export const get = (request: HTTPRequest, apiType: string): Promise<HTTPResponse> => {
    return new Promise((resolve, reject) => {
        request.method = "GET";
        doRequest(request, apiType).then(resolve).catch(reject);
    });
};

// get json only
export const getJSON = (request: HTTPRequest, apiType: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        request.method = "GET";
        doRequest(request, apiType).then((response) => {
            resolve(response.entity);
        }).catch(reject);
    });
};

// post: create || update
export const post = (request: HTTPRequest, apiType: string): Promise<HTTPResponse> => {
    return new Promise((resolve, reject) => {
        request.method = "POST";
        doRequest(request, apiType).then(resolve).catch(reject);
    });
};

// put: update
export const put = (request: HTTPRequest, apiType: string): Promise<HTTPResponse> => {
    return new Promise((resolve, reject) => {
        request.method = "PUT";
        doRequest(request, apiType).then(resolve).catch(reject);
    });
};

// delete
export const del = (request: HTTPRequest, apiType: string): Promise<HTTPResponse> => {
    return new Promise((resolve, reject) => {
        request.method = "DELETE";
        doRequest(request, apiType).then(resolve).catch(reject);
    });
};

// request
const doRequest = (request: any, apiType: string): Promise<HTTPResponse> => {

    if (!request.headers) {
        request.headers = {};
    }

    // if(
    //     request.method == 'POST' &&
    //     !request.headers.hasOwnProperty("Content-Type")
    // ){
    //     request.headers["Content-Type"] = "application/json";
    //  }
    
    if (
        request.method !== "GET" && 
        request.method !== "DELETE" 
        // request.headers.hasOwnProperty("Content-Type")
    ) {
        // request.headers["Content-Type"] = "application/x-www-form-urlencoded";
        request.headers["Content-Type"] = "application/json";
        if (request.body) {
            // request.body = encodeParameters(request.body);
            request.body = JSON.stringify(request.body);
        }
    };

    if(apiType == 'algolia') {
        request.headers['X-Algolia-Application-Id'] = process.env.REACT_APP_ALGOLIA_APLICATION_ID;
        request.headers['X-Algolia-API-Key'] = process.env.REACT_APP_ALGOLIA_API_KEY;
    };

    // for logged in users
    // TODO: set access_token after users login to request users data
    const accessToken = cookie.get("access_token");
    const accessCSRFT = cookie.get("csrf_token");
    if (request.request_user_profile) {
        
        // tslint:disable-next-line:no-string-literal
        //request.headers["Content-type"] = "application/json";
        request.headers["Access-Control-Allow-Headers"] = "Accept";
        //request.headers["Access-Control-Allow-Origin"] = "*";
        request.headers["Authorization"] = "Bearer " +`${accessToken}`;
    }; 

    // request.headers["Accept-Language"] = 'EN-US';

    return new Promise((resolve, reject) => {
        fetch(new Request( ( apiType === 'travelcompositor' ? BASE_URL_HOME : ( apiType === 'customapi' ? CUSTOM_BASE_URL : ( apiType === 'customapi_test' ? CUSTOM_BASE_URL_TEST : (['external__api', 'algolia'].includes(apiType) ? '' : BASE_URL) ) ) ) +  request.url, request)).then((response: HTTPResponse) => {
            response.traceId = response.headers.get("x-trace-id");

            // console.log({response});
            const finalize = () => {
                if (response.status < 400) {
                    return resolve(response);
                }

                return reject(response);
            };

            if (response.json) {
                return response.json().then((entity) => {
                    response.entity = entity;
                    return finalize();
                }).catch(finalize);
            }

            return finalize();

        }).catch((response: HTTPResponse) => {
            if (response.headers) {
                response.traceId = response.headers.get("x-trace-id");
            }
            return reject(response);
        });
    });
};

// encode body if not json
const encodeParameters = (params: any) => {
    const formBody: string[] = [];
    for (const key of Object.keys(params)) {
        const value = params[key];
        if (value == null || value === "") {
            continue;
        }
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(value);
        formBody.push(`${encodedKey}=${encodedValue}`);
    }
    return `${formBody.join("&")}`;
};
