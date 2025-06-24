import {get, post, put, del} from '../serve/http.ts'
// 获取用户管理列表
const getUsersList = (params: any) => {
  return get('users', params)
}
// 新增用户
const addUser = (params: any) => {
  return post('users', params)
}
// 编辑用户
const editUser = (params: any) => {
  return put('users/update', params)
}
// 获取用户信息
const getOneUser = (id: number) => {
  return get(`users/${id}`)
}
// 删除用户
const delUser = (id: number) => {
  return del(`users/${id}`)
}


export {
  getUsersList,
  addUser,
  editUser,
  getOneUser,
  delUser,
}