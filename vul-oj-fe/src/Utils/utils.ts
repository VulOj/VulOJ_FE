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