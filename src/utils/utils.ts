// 匹配字符串中的大写字母转化为下划线
export function convertUpperCaseToUnderscore(input: string): string {
    return input.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// 匹配字符串中的下划线转化为大写字母
export function convertUnderscoreToUpperCase(input: string): string {
    return input.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// 深度遍历匹配对象中属性包含的下划线转化为大写字母
export function deepConvertUnderscoreToUpperCase(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepConvertUnderscoreToUpperCase(item));
    }
    const result: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = convertUnderscoreToUpperCase(key);
            result[newKey] = deepConvertUnderscoreToUpperCase(obj[key]);
        }
    }
    return result;
}
