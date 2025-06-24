import {Form, Input, InputNumber, Spin, Modal, Select} from 'antd'
import {useState, forwardRef, useImperativeHandle} from 'react'
import {getOneContainer, editContainer, addContainer} from "../../api/container.ts";

const EditModal = forwardRef((props: any, ref) => {
	useImperativeHandle(ref, () => ({
		openModal: async (id: number) => {
			setVisible(true);
			if (id) {
				setLoading(true);
				const res: any = await getOneContainer(id);
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
				await editContainer({id: formData.id, ...values})
				requestSuccess()
			} else {
				await addContainer(values)
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
					<Form.Item rules={[{required: true,message:'请输入船名'}]} label='船名' name='container_name'>
						<Input/>
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入载重'}]} label='载重（吨）' name='container_capacity'>
						<InputNumber/>
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	)
})

export default EditModal
