import axios from "axios";
import { get } from "./utils";

const service = axios.create({
    baseURL: process.env.REACT_APP_TEST_API,
    timeout: 60 * 1000
});

service.interceptors.request.use(
    config => {
        let token = get('token');

        if (token) {
            (config as any).headers['Authorization'] = token;
        }

        return config;
    },
    error => {
        console.log('error');
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        if (response.status >= 200 && response.status < 300) {
            
            return response;
        } else {
            return Promise.reject('Network Request Failed.');
        }
    },
    error => {
        console.log('error');
        return Promise.reject(error);
    }
);

export default service;