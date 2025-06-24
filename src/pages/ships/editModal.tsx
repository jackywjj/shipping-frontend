import {Form, Input, InputNumber, Spin, Modal, Select} from 'antd'
import {useState, forwardRef, useImperativeHandle} from 'react'
import {getOneShip, editShip, addShip} from "../../api/ship.ts";
import {shipStatus, shipType} from "../../utils/dictionaries.ts";

const EditModal = forwardRef((props: any, ref) => {
	useImperativeHandle(ref, () => ({
		openModal: async (id: number) => {
			setVisible(true);
			setFormData({});
			if (id) {
				setLoading(true);
				const res: any = await getOneShip(id);
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
				await editShip({id: formData.id, ...values})
				requestSuccess()
			} else {
				await addShip(values)
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
					<Form.Item rules={[{required: true,message:'请输入船名'}]} label='船名' name='ship_name'>
						<Input/>
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请选择船舶类型'}]} label='船舶类型' name='ship_type'>
						<Select options={shipType} />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请输入载重'}]} label='载重（吨）' name='ship_capacity'>
						<InputNumber/>
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请选择当前状态'}]} label='当前状态' name='status'>
						<Select options={shipStatus}/>
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	)
})

export default EditModal
