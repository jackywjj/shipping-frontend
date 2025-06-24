import {get, post, put, del} from '../serve/http.ts'
// 获取客户管理列表
const getCustomersList = (params: any) => {
	return get('customers', params)
}
// 新增客户
const addCustomer = (params: any) => {
	return post('customers', params)
}
// 获取客户下拉列表
const getAllCustomers = () => {
	return get('customers/all')
}


export {
	getCustomersList,
	addCustomer,
	getAllCustomers
}