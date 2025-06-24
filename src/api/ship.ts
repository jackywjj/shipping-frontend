import {get, post, put, del} from '../serve/http.ts'
// 获取船只管理列表
const getShipsList = (params: any) => {
	return get('ships', params)
}
// 新增船只
const addShip = (params: any) => {
	return post('ships', params)
}
// 编辑船只
const editShip = (params: any) => {
	return put('ships/update', params)
}
// 获取船只信息
const getOneShip = (id: number) => {
	return get(`ships/${id}`)
}
// 删除船只
const delShip = (id: number) => {
	return del(`ships/${id}`)
}

export {
	getShipsList,
	addShip,
	editShip,
	getOneShip,
	delShip
}