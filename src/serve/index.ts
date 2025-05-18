import axios, { AxiosError, AxiosResponse } from 'axios'
import qs from 'qs'
import { getLocalStorage } from '../utils/tool.ts'
import { message } from 'antd'

const serve = axios.create({
  baseURL: '/api',
  timeout: 600000
})

serve.interceptors.request.use((config) => {
  const token = getLocalStorage('user_token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  if (config.method === 'get') {
    config.paramsSerializer = qs.stringify(config.params, { arrayFormat: 'repeat' })
  }
  return config
}, (err: AxiosError) => {
  return Promise.reject(err)
})

serve.interceptors.response.use((res: AxiosResponse) => {
  if (res.data.code === 401) {
    localStorage.removeItem('user_token')
    message.error('登录已过期，已登出！')
    window.open('#/login', '_self')
    return Promise.reject(res.data.msg)
  } else if (res.data.code === 0 || res.data.code === 200) {
    return res
  } else {
    message.error(res.data.msg)
    return Promise.reject(res.data.msg)
  }
}, (error: AxiosError) => {
  // @ts-expect-error error handler
  message.error(error.response.data.msg)
  // @ts-expect-error error handler
  return Promise.reject(error.response.data.msg)
})

export default serve
