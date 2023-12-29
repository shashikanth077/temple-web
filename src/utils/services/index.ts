import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from 'config/Env';

const axiosClient = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors
axiosClient.interceptors.request.use(
    (configs: InternalAxiosRequestConfig) => configs,
    error => Promise.reject(error),
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    error => Promise.reject(error),
);

export default axiosClient;
