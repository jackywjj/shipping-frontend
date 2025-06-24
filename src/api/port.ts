import {get, post, put, del} from '../serve/http.ts'
// 获取港口管理列表
const getPortsList = (params: any) => {
	return get('ports', params)
}
// 新增港口
const addPort = (params: any) => {
	return post('ports', params)
}
// 编辑港口
const editPort = (params: any) => {
	return put('ports/update', params)
}
// 获取港口信息
const getOnePort = (id: number) => {
	return get(`ports/${id}`)
}
// 删除港口
const delPort = (id: number) => {
	return del(`ports/${id}`)
}

export {
	getPortsList,
	addPort,
	editPort,
	getOnePort,
	delPort
}