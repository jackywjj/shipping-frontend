import {get, post, put, del} from '../serve/http.ts'
// 获取航线管理列表
const getRoutesList = (params: any) => {
	return get('routes', params)
}
// 新增航线
const addRoute = (params: any) => {
	return post('routes', params)
}
// 编辑航线
const editRoute = (params: any) => {
	return put('routes/update', params)
}
// 获取航线信息
const getOneRoute = (id: number) => {
	return get(`routes/${id}`)
}
// 删除航线
const delRoute = (id: number) => {
	return del(`routes/${id}`)
}

export {
	getRoutesList,
	addRoute,
	editRoute,
	getOneRoute,
	delRoute
}