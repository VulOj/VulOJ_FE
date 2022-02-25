import qs from 'qs';
import ajax from '../utils/request'

export const login = (email: string, password: string) => {
    return ajax({
        url: '/auth/login',
        method: 'post',
        data: {
            email: email,
            password: password
        }
    });
}

export const sendVerifyCode = (email: string) => {
    return ajax({
        url: '/auth/sendVerifyCode',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
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

export const signUp = () => {

}