import Axios, { InternalAxiosRequestConfig } from 'axios';

export const API_URL = import.meta.env.VITE_BASE_URL as string;
import storage from '@/utils/storage';

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();

    if (token) {
        config.headers.authorization = `${token}`;
    }

    config.headers.Accept = 'application/json';
    return config;
};

export const axios = Axios.create({
    baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        const message = error.response?.data?.message || error.message;
        console.error(message);

        return Promise.reject(error);
    }
);
