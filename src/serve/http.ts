import serve from './index'
import qs from 'qs'

/**
 * get方法，对应get请求
 */
export function get(url: string, params?: any) {
    return new Promise((resolve, reject) => {
        serve.get(url, {
            params: params || {}
        }).then(res => {
            resolve(res?.data)
        }).catch(err => {
            reject(err?.data || err)
        })
    })
}

/**
 * post方法，对应post请求

 */
export function post(url: string, params?: any, contentType?: string) {
    let ajax: any = null
    if (contentType === 'query') {
        ajax = serve.post(url, null, {
            params: params
        })
    } else if (contentType === 'formData') {
        ajax = serve.post(url, qs.stringify(params))
    } else {
        ajax = serve.post(url, params)
    }
    return new Promise((resolve, reject) => {
        ajax.then((res: any) => {
            resolve(res?.data)
        }).catch((err: any) => {
            reject(err?.data || err)
        })
    })
}

export function put(url: string, params?: any, contentType?: string) {
    let ajax: any = null
    if (contentType === 'query') {
        ajax = serve.put(url, null, {
            params: params
        })
    } else if (contentType === 'formData') {
        ajax = serve.put(url, qs.stringify(params))
    } else {
        ajax = serve.put(url, params)
    }
    return new Promise((resolve, reject) => {
        ajax.then((res: any) => {
            resolve(res?.data)
        }).catch((err: any) => {
            reject(err?.data || err)
        })
    })
}

export function del(url: string, params?: any) {
    return new Promise((resolve, reject) => {
        serve.delete(url, params).then((res) => {
            resolve(res?.data)
        }).catch((err: any) => {
            reject(err?.data || err)
        })
    })
}
