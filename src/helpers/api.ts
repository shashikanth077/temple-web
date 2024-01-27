// import { jwtDecode } from 'jwt-decode';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { config } from 'config/Env';

const username = 'ClientApi';
const password = 'ClientApi';
const credentials = btoa(`${username}:${password}`);
const basicAuth = `Basic ${credentials}`;

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.put['Access-Control-Allow-Headers'] = '*';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.delete['Access-Control-Allow-Headers'] = '*';

axios.defaults.headers.post.Authorization = basicAuth;
axios.defaults.headers.put.Authorization = basicAuth;
axios.defaults.headers.get.Authorization = basicAuth;
axios.defaults.headers.delete.Authorization = basicAuth;
axios.defaults.baseURL = config.API_BASE_URL;
axios.defaults.withCredentials = true;

// Interceptors
axios.interceptors.request.use(
    (configs: InternalAxiosRequestConfig) => configs,
    error => Promise.reject(error),
);

// intercepting to capture errors
axios.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    error => {
        let message;
        switch (error?.response?.status) {
        case 500:
            message = 'Internal Server Error';
            break;
        case 401:
            message = 'Invalid credentials';
            break;
        case 404:
            message = 'Something went wrong! Please try again';
            break;
        case 400:
            message = 'Sorry! There is some issue in details. Please check later';
            break;
        default:
            message = error.message || error;
        }
        const errorObj = {
            errorMessage: message,
            errorCode: error.response.status,
            errorData: error.response.code,
        };
        return Promise.reject(errorObj);
    },
);

const AUTH_SESSION_KEY = 'admintemple_user';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string | null) => {
    if (token) axios.defaults.headers.common.Authorization = `JWT ${token}`;
    else delete axios.defaults.headers.common.Authorization;
};

const getUserFromCookie = () => {
    const user:any = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (user) {
        if (user.token) {
            setAuthorization(user.token);
        }
    }
    return JSON.parse(user);
};

class APICore {
    static get(url: string, params: any) {
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map(key => `${key}=${params[key]}`)
                    .join('&')
                : '';
            return axios.get(`${url}?${queryString}`, {
                auth: {
                    username: 'ClientApi',
                    password: 'ClientApi',
                },
                params: { username },
            }).then(res => res)
                .catch(err => err);
        }
        return axios.get(`${url}`, params).then(res => res)
            .catch(err => err);
    }

    static getFile(url: string, params: any) {
        let response;
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map(key => `${key}=${params[key]}`)
                    .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, { responseType: 'blob' });
        } else {
            response = axios.get(`${url}`, { responseType: 'blob' });
        }
        return response;
    }

    static getMultiple(urls: string, params: any) {
        const reqs = [];
        let queryString = '';
        if (params) {
            queryString = params
                ? Object.keys(params)
                    .map(key => `${key}=${params[key]}`)
                    .join('&')
                : '';
        }

        /* eslint-disable */
        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`));
        }
        return axios.all(reqs);
    }

    /**
     * post given data to url
     * use same format for others
     */ 
    static create(url: string, data: any) { 
        return axios.post(url, data)
        .then(res => res)
        .catch(err => err);
    }

    /**
     * Updates patch data
     */
    static updatePatch(url: string, data: any) { axios.patch(url, data); }

    /**
     * Updates data
     */
    static update(url: string, data: any) { 
        return axios.put(url, data)
        .then(res => res)
        .catch(err => err);
    }

    /**
     * Deletes data
     */
    static delete(url: string) {  return axios.delete(url)
        .then(res => res)
        .catch(err => err); }

    static deletePost(url: string, data: any) { 
        return axios.delete(url, data)
        .then(res => res)
        .catch(err => err);
    }

    /**
     * post given data to url with file
     */
    static createWithFile(url: string, data: any) {
        const config: any = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.post(url,data,config)
        .then(res => res)
        .catch(err => err);
    }

    static createWithFileUpdate(url: string, data: any) {
        const config: any = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.put(url,data,config)
        .then(res => res)
        .catch(err => err);
    }
    
    /**
     * post given data to url with file
     */
    // static updateWithFile(url: string, data: any) {
    //     const formData = new FormData();

    //     for (const [key, value] of Object.entries(data)) {
    //         console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
    //     }

    //     for (const k in someObjectValues) {
    //         if (Object.hasOwn(data, k)) {
    //             formData.append(k, data[k]);
    //         }
    //     }

    //     const config: any = {
    //         headers: {
    //             ...axios.defaults.headers,
    //             'content-type': 'multipart/form-data',
    //         },
    //     };
    //     return axios.patch(url, formData, config);
    // }

    static isUserAuthenticated() {
        const user = APICore.getLoggedInUser();
        if ((!user && user == null) || (!user && user.length ==0)) {
            return false;
        } else {
            return true;
        }
    }

    static destoryUser(){
        sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
    static setLoggedInUser(session: any) {
        if (session) sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
        else {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
        }
    }

    /**
     * Returns the logged in user
     */
    static getLoggedInUser() { return getUserFromCookie(); }

    static setUserInSession(modifiedUser: any) {
        const userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
        if (userInfo) {
            const { user } = JSON.parse(userInfo);
            console.log("setUserInSession",user);
            APICore.setLoggedInUser({ ...user, ...modifiedUser });
        }
    }
}


export { APICore, setAuthorization };
