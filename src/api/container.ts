import {get, post, put, del} from '../serve/http.ts'
// 获取集装箱管理列表
const getContainersList = (id: any) => {
	return get(`containers/${id}/containers`)
}
// 新增集装箱
const addContainer = (params: any) => {
	return post('containers', params)
}
// 编辑集装箱
const editContainer = (params: any) => {
	return put('containers/update', params)
}
// 获取集装箱信息
const getOneContainer = (id: number) => {
	return get(`containers/${id}`)
}
// 删除集装箱
const delContainer = (id: number) => {
	return del(`containers/${id}`)
}

export {
	getContainersList,
	addContainer,
	editContainer,
	getOneContainer,
	delContainer
}