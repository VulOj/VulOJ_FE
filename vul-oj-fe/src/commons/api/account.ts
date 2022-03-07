import qs from 'qs';
import ajax from '../utils/request'

/**
 * 用户登陆
 * @param email 邮箱
 * @param password 密码
 * @returns 登陆返回信息
 */
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

/**
 * 用户注册
 * @param email 邮箱
 * @param password 密码
 * @param verify_code 邮箱验证码
 * @returns 注册返回信息
 */
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

/**
 * 发送邮箱验证码
 * @param email 邮箱
 * @returns 验证码的发送情况
 */
export const sendVerifyCode = (email: string) => {
    return ajax({
        url: '/auth/sendVerifyCode',
        method: 'post',
        data: qs.stringify({
            email: email
        })
    })
}

/**
 * 询问session是否过期
 * @returns session过期情况
 */
export const isSessionExpired = () => {
    return ajax({
        url: '/auth/isSessionExpired',
        method: 'post'
    })
}