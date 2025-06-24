import {Form, Spin, Modal, Select, Input} from 'antd'
import {useState, forwardRef, useImperativeHandle} from 'react'
import {getOneOrder, editOrder, addOrder} from "../../api/order.ts";
import * as dayjs from "dayjs";
import {containerType} from "../../utils/dictionaries.ts";

const EditContainerModal = forwardRef((props: any, ref) => {
	useImperativeHandle(ref, () => ({
		openModal: async (info: any) => {
			setVisible(true);
			// 编辑
			if (info.id) {
				form.setFieldsValue(info);
			}
			setFormData(info);
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
					<Form.Item rules={[{required: true,message:'请输入集装箱编号'}]} label={'集装箱编号'} name="container_number">
						<Input placeholder={'请输入集装箱编号'} />
					</Form.Item>
					<Form.Item rules={[{required: true,message:'请选择集装箱类型'}]} label={'集装箱类型'} name="type">
						<Select placeholder={'请选择集装箱类型'} options={containerType} />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	)
})

export default EditContainerModal
