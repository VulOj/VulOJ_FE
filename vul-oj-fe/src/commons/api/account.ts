import qs from 'qs';
import ajax from '../utils/request'

export const login = (email: string, password: string) => {
    return ajax({
        url: '/auth/login',
        method: 'post',
        data: qs.stringify({
            email: email,
            password: password
        })
    });
}

export const register = (email: string, password: string, verify_code: string) => {
    return ajax({
        url: 'auth/signup',
        method: 'post',
        data: qs.stringify({
            email: email,
            password: password,
            verify_code: verify_code
        })
    })
}

export const sendVerifyCode = (email: string) => {
    return ajax({
        url: '/auth/sendVerifyCode',
        method: 'post',
        data: qs.stringify({
            email: email
        })
    })
}

export const isSessionExpired = () => {
    return ajax({
        url: '/auth/isSessionExpired',
        method: 'post'
    })
}