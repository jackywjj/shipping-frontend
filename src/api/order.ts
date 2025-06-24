import {get, post, put, del} from '../serve/http.ts'
// 获取订单管理列表
const getOrdersList = (params: any) => {
	return get('orders', params)
}
// 新增订单
const addOrder = (params: any) => {
	return post('orders', params)
}
// 编辑订单
const editOrder = (params: any) => {
	return put('orders/update', params)
}
// 获取订单信息
const getOneOrder = (id: number) => {
	return get(`orders/${id}`)
}
// 删除订单
const delOrder = (id: number) => {
	return del(`orders/${id}`)
}

// 更改订单状态为准备中
const pendingOrder = (id: number) => {
	return get(`orders/${id}/pending`)
}
// 订单状态为运输中
const shippingOrder = (id: number) => {
	return get(`orders/${id}/shipped`)
}
// 订单状态为已送达
const deliveredOrder = (id: number) => {
	return get(`orders/${id}/delivered`)
}

export {
	getOrdersList,
	addOrder,
	editOrder,
	getOneOrder,
	delOrder,
	pendingOrder,
	shippingOrder,
	deliveredOrder
}