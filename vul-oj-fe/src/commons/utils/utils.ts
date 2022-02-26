import { IFormValidate } from "../interface";

/**
 * 拼接类名
 * @param styles 样式module
 * @param classNames 类名
 * @returns 拼接类名
 */
export const getClass = (styles: any, classNames: Array<{ name: string, require: boolean }>) => {
    let className: string = '';
    classNames.forEach((value) => {
        if (value.require) {
            className += ' ' + styles[value.name];
        }
    });

    return className;
}

/**
 * 移除数据
 * @param key 名称
 */
export const remove = (key: string) => {
    localStorage.removeItem(key);
}

/**
 * 获取数据
 * @param key 名称
 * @returns 数据
 */
export const get = (key: string) => {
    return localStorage.getItem(key);
}

/**
 * 存储数据
 * @param key 名称
 * @param value 数据
 */
export const set = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

/**
 * 清除所有数据
 */
export const clear = () => {
    localStorage.clear();
}

const validateSuccess: IFormValidate = {
    validateStatus: 'success',
    help: ''
}
/**
 * 校验表单数据
 * @param name 数据名
 * @returns 
 */
export const check = (name: string) => (value: string): IFormValidate => {
    switch (name) {
        case 'email': {
            if (value === '' || value === undefined || value === null) {
                return {
                    validateStatus: 'error',
                    help: '请输入邮箱'
                };
            }

            let reg =
                new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);

            return reg.test(value) ? validateSuccess : {
                validateStatus: 'error',
                help: '邮箱格式不正确'
            };
        }

        case 'password': {
            if (value === '' || value === undefined || value === null) {
                return {
                    validateStatus: 'error',
                    help: '请输入密码'
                };
            }

            let reg =
                new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/);

            return reg.test(value) ? validateSuccess : {
                validateStatus: 'error',
                help: '密码长度为8-16位，且必须同时包括数字、字母和特殊符号'
            };
        }

        case 'verify': {
            if (value === '' || value === undefined || value === null) {
                return {
                    validateStatus: 'error',
                    help: '请输入邮箱验证码'
                };
            }

            let reg =
                new RegExp(/^\d{4}$/);

            return reg.test(value) ? validateSuccess : {
                validateStatus: 'error',
                help: '验证码为四位数字'
            };
        }

        default:
            break;
    }

    return validateSuccess;
}