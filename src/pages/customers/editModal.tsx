import {Form, Input, Spin, Modal} from 'antd'
import {useState, forwardRef, useImperativeHandle} from 'react'
import {addCustomer} from "../../api/customer.ts";

const EditModal = forwardRef((props: any, ref) => {
	useImperativeHandle(ref, () => ({
		openModal: async () => {
			setVisible(true);
		}
	}))
	const [form] = Form.useForm()
	const [formData, setFormData] = useState<any>({})
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const handleOk = () => {
		form.validateFields().then(async (values: any) => {
			await addCustomer(values)
			reset()
			props.onUpdate();
		})
	}
	const reset = () => {
		setFormData({});
		form.resetFields();
		setVisible(false);
	}
	return (
		<Modal title={formData.id ? '编辑' : '新增'} open={visible} onOk={handleOk}
		       onCancel={reset}>
			<Spin spinning={loading}>
				<Form labelCol={{span: 6}} wrapperCol={{span: 14}} form={form} initialValues={{customer_name: ''}}>
					<Form.Item rules={[{required: true,message:'请输入公司名称'}]} label='公司名称' name='company_name'>
						<Input />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入联系人'}]} label='联系人' name='contact_name'>
						<Input />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入联系电话'}]} label='联系电话' name='company_phone'>
						<Input />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入邮箱'}]} label='邮箱' name='company_email'>
						<Input />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入地址'}]} label='地址' name='company_address'>
						<Input />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	)
})

export default EditModal
