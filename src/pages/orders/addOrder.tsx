import {Form, DatePicker, Spin, Modal, Select, Layout, Button, Typography} from 'antd'
import {useEffect, useState} from 'react'
import {getOneOrder, editOrder, addOrder} from "../../api/order.ts";
import { getAllCustomers } from "../../api/customer.ts";
import { useNavigate, useLocation } from "react-router-dom";
import { orderStatus } from "../../utils/dictionaries.ts";
import {Content} from "antd/es/layout/layout";

const {Title} = Typography

const AddOrderPage = (props: any, ref) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [form] = Form.useForm()
	const [formData, setFormData] = useState<any>({})
	const [customerList, setCustomerList] = useState<any>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if(location.state?.id) {
			setLoading(true);
			getOneOrder(location.state.id).then((res:any) => {
				setFormData({id: res.data.id, ...res.data});
				setLoading(false);
			});
		}
		initData();
	}, []);

	const initData = async () => {
		const res = await getAllCustomers();
		setCustomerList(res.data.map((item:any) => {
			return {
				label: item.company_name,
				value: item.id
			}
		}))
	}
	const handleOk = () => {
		form.validateFields().then(async (values: any) => {
			values.departure_date = values.departure_date ? values.departure_date.format('YYYY-MM-DD') : null
			if (formData.id) {
				await editOrder({id: formData.id, ...values})
				requestSuccess()
			} else {
				await addOrder(values)
				requestSuccess()
			}
		})
	}
	const handleCancel = () => {
		form.resetFields();
	}
	const requestSuccess = () => {
		form.resetFields();
		setFormData({});
	}
	const goPage = () => {
		navigate(-1);
	}
	return (
		<Layout className='layout'>
			<Title className='title mt-3'>{formData.id ? '编辑' : '新增'}订单</Title>
			<div className={'text-right'}>
				<Button onClick={goPage}>返回</Button>
			</div>
			<Content className='content'>
				<Spin spinning={loading}>
					<Form labelCol={{span: 6}} wrapperCol={{span: 14}} form={form} initialValues={formData}>
						<Form.Item rules={[{required: true,message:'请选择客户'}]} label='客户' name='customer_id'>
							<Select options={customerList}/>
						</Form.Item>
						<Form.Item rules={[{required: true,message:'请选择航线'}]} label='航线' name='route_id'>
							<Select/>
						</Form.Item>
						<Form.Item rules={[{required: true,message:'请选择船舶'}]} label='船舶' name='ship_id'>
							<Select/>
						</Form.Item>
						<Form.Item rules={[{required: true,message:'请选择出发日期'}]} label='出发日期' name='departure_date'>
							<DatePicker/>
						</Form.Item>
						<Form.Item rules={[{required: true,message:'请选择订单状态'}]} label='订单状态' name='order_status'>
							<Select options={orderStatus}/>
						</Form.Item>
						<Form.Item wrapperCol={{offset: 6}}>
							<Button type='primary' onClick={handleOk}>保存</Button>
						</Form.Item>
					</Form>
				</Spin>
			</Content>
		</Layout>
	)
}

export default AddOrderPage
