import {Form, Input, Spin, Modal} from 'antd'
import {useState, forwardRef, useImperativeHandle} from 'react'
import {getOnePort, editPort, addPort} from "../../api/port.ts";

const EditModal = forwardRef((props: any, ref) => {
	useImperativeHandle(ref, () => ({
		openModal: async (id: number) => {
			setVisible(true);
			if (id) {
				setLoading(true);
				const res: any = await getOnePort(id);
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
				await editPort({id: formData.id, ...values})
				requestSuccess()
			} else {
				await addPort(values)
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
					<Form.Item rules={[{required: true,message:'请输入港口Code'}]} label='港口Code' name='port_code'>
						<Input />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入港口名称'}]} label='港口名称' name='port_name'>
						<Input />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入国家'}]} label='国家' name='country'>
						<Input />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	)
})

export default EditModal
