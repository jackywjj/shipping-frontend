import {get, post} from '../serve/http.ts'

// 登录
const userLogin = (params: any) => {
    return post('/auth/login', params)
}
// 获取验证码
const getCaptchaApi = () => {
    return get('/captcha')
}

// dashboard
const getDashboardData = () => {
    return get('/dashboard')
}

// get port list
const getPortList = () => {
    return get('ports')
}

export {
    userLogin,
    getCaptchaApi,
    getDashboardData,
    getPortList
}
