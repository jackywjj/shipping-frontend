import {Form, Input, Spin, Modal} from 'antd'
import {useState, forwardRef, useImperativeHandle, Fragment} from 'react'
import {getOneUser, editUser, addUser} from "../../api/user.ts";

const EditModal = forwardRef((props: any, ref) => {
	useImperativeHandle(ref, () => ({
		openModal: async (id: number) => {
			setVisible(true);
			if (id) {
				setLoading(true);
				const res: any = await getOneUser(id);
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
				await editUser({user_id: formData.id, ...values})
				reset()
				props.onUpdate();
			} else {
				await addUser(values)
				reset()
				props.onUpdate();
			}
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
				<Form labelCol={{span: 6}} wrapperCol={{span: 14}} form={form} initialValues={{user_name: ''}}>
					<Form.Item rules={[{required: true,message:'请输入用户名'}]} label='用户名' name='user_name'>
						<Input />
					</Form.Item>
					{
						!formData.id ?
							<Fragment>
								<Form.Item rules={[{required: true,message:'请输入密码'}]} label='用户密码' name='user_password'>
									<Input.Password />
								</Form.Item>
								<Form.Item rules={[{required: true,message:'请输入确认密码'}]} label='确认密码' name='user_password'>
									<Input.Password />
								</Form.Item>
							</Fragment> : null
					}

				</Form>
			</Spin>
		</Modal>
	)
})

export default EditModal
