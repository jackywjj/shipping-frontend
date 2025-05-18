import { get, post, put, del } from '../serve/http.ts'

// 获取用户列表
const getUserList = (params: any) => {
  return get('/users', params)
}
// 修改密码
const edit = (params:any) => {
  return put('/users/update',params);
}
const add = (params:any) => {
  return post('/users',params);
}
const deleteUser = (id:any) => {
  return del(`/users/${id}`);
}

export { getUserList,edit,add,deleteUser }
