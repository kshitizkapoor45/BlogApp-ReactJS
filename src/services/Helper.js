import axios from 'axios';
import { getToken } from '../auth';

export const BASE_URL = 'http://localhost:8080';

export const myAxios = axios.create({
    baseURL: BASE_URL
});

export const privateAxios = axios.create({
    baseURL: BASE_URL
});

privateAxios.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        if (!config.headers) {
            config.headers = {}; // Initialize headers if undefined
        }
        config.headers.Authorization = token; // Set the Authorization header
    }
    return config;
}, error => Promise.reject(error));
