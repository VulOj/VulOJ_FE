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

        // 添加请求头
        if (config.method === 'post') {
            if ((config as any).headers['Content-Type'] === undefined || (config as any).headers['Content-Type'] === null) {
                (config as any).headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
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
        return Promise.reject(error);
    }
);

export default service;