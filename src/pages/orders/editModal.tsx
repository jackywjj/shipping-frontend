import {Form, DatePicker, Spin, Modal, Select} from 'antd'
import {useState, forwardRef, useImperativeHandle} from 'react'
import {getOneOrder, editOrder, addOrder} from "../../api/order.ts";
import * as dayjs from "dayjs";
import { orderStatus } from "../../utils/dictionaries.ts";

const EditModal = forwardRef((props: any, ref) => {
	useImperativeHandle(ref, () => ({
		openModal: async (id: number) => {
			setVisible(true);
			if (id) {
				setLoading(true);
				const res: any = await getOneOrder(id);
				res.data.departure_date = res.data.departure_date ? dayjs(res.data.departure_date) : null
				setLoading(false);
				form.setFieldsValue(res.data);
				setFormData(res.data);
			}
		}
	}))
	const [form] = Form.useForm()
	const [formData, setFormData] = useState<any>({})
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
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
		setVisible(false)
	}
	const requestSuccess = () => {
		form.resetFields();
		setVisible(false);
		setFormData({});
		props.onUpdate();
	}
	return (
		<Modal title={formData.id ? '编辑' : '新增'} open={visible} onOk={handleOk}
		       onCancel={handleCancel}>
			<Spin spinning={loading}>
				<Form labelCol={{span: 6}} wrapperCol={{span: 14}} form={form} initialValues={formData}>
					<Form.Item rules={[{required: true,message:'请选择客户'}]} label='客户' name='customer_id'>
						<Select/>
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
				</Form>
			</Spin>
		</Modal>
	)
})

export default EditModal
