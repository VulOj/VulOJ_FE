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

/**
 * 校验邮箱合法性
 * @param email 需要校验的邮箱
 * @returns 校验结果
 */
export const checkEmail = (email: string) => {
    if (email === '' || email === undefined || email === null)
        return false;

    let reg =
        new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);

    return reg.test(email);
}

/**
 * 校验密码合法性
 * 密码规则:长度8-16位, 必须包括数字、英文和特殊符号
 * @param passwd 需要校验的密码
 * @returns 校验结果
 */
export const checkPassword = (passwd: string) => {
    if (passwd === '' || passwd === undefined || passwd === null)
        return false;

    let reg =
        new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/);

    return reg.test(passwd);
}