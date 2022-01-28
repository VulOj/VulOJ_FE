import ajax from '../utils/request'

export const login = (email: string, password: string) => {
    return ajax({
        url:'/auth/login',
        method: 'post',
        data: {
            email: email,
            password: password
        }
    });
}

export const signUp = () => {

}