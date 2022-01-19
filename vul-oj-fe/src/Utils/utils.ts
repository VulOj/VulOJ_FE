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