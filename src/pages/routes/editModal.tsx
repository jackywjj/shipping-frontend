import {Form, Input, Spin, Modal} from 'antd'
import {useState, forwardRef, useImperativeHandle} from 'react'
import {getOneRoute, editRoute, addRoute} from "../../api/route.ts";

const EditModal = forwardRef((props: any, ref) => {
	useImperativeHandle(ref, () => ({
		openModal: async (id: number) => {
			setVisible(true);
			setFormData({});
			if (id) {
				setLoading(true);
				const res: any = await getOneRoute(id);
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
			if (formData.id) {
				await editRoute({id: formData.id, ...values})
				requestSuccess()
			} else {
				await addRoute(values)
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
		props.onUpdate();
	}
	return (
		<Modal title={formData.id ? '编辑' : '新增'} open={visible} onOk={handleOk}
		       onCancel={handleCancel}>
			<Spin spinning={loading}>
				<Form labelCol={{span: 6}} wrapperCol={{span: 14}} form={form}>
					<Form.Item rules={[{required: true,message:'请输入起始港口'}]} label='起始港口' name='origin_port_id'>
						<Input />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入目的港口'}]} label='目的港口' name='destination_port_id'>
						<Input />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入预计天数'}]} label='预计天数' name='estimated_days'>
						<Input />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	)
})

export default EditModal
