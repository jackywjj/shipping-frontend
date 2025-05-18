/**
 * localStorage 提取存储
 */
const getLocalStorage = (key: string) => {
    const storage = window.localStorage
    if (!storage) {
        window.alert('浏览器不支持localStorage')
        return
    }
    const value = storage.getItem(key)
    // 对象或者数组需要parse
    if ((value && value.charAt(0) === '[') || (value && value.charAt(0) === '{')) {
        return JSON.parse(value)
    } else {
        return value ? value : undefined
    }
}
/**
 * localStorage 存储数据
 */
const setLocalStorage = (key: string, value: any) => {
    const storage = window.localStorage
    if (!storage) {
        window.alert('浏览器不支持localStorage')
        return
    }
    if (Array.isArray(value) || typeof value === 'object') {
        storage.setItem(key, JSON.stringify(value))
    } else {
        storage.setItem(key, value)
    }
}

/**
 * localStorage 删除数据
 */
const removeLocalStorage = (key: string) => {
    const storage = window.localStorage
    if (!storage) {
        window.alert('浏览器不支持localStorage')
        return
    }
    storage.removeItem(key)
}

export {getLocalStorage, setLocalStorage, removeLocalStorage}
