import {Button, Form, Input, message, Modal} from 'antd'
import {Fragment, useState} from 'react'
import {add, edit} from '../../../api/user.ts'
import {getLocalStorage} from "../../../utils/tool.ts";

const ManageModal = (props: any) => {
    const {userInfo} = props
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const openModal = () => {
        setVisible(true)
    }
    const handleOk = () => {
        const loginUser = getLocalStorage('userInfo');
        form.validateFields().then(async (values: any) => {
            if (values.password === values.confirmPassword) {
                const params = {
                    user_id: userInfo ? userInfo.id : undefined,
                    client_id: userInfo ? undefined : loginUser.client_id,
                    user_name: values.userName,
                    real_name: values.realName,
                    user_password: values.userPassword,
                    user_group: 'admin'
                }
                userInfo ? await edit(params) : await add(params)
                form.resetFields()
                props.onUpdate()
                setVisible(false)
            } else {
                message.warning('两次密码输入不一致，请重新输入！')
            }
        })
    }
    const handleCancel = () => {
        setVisible(false)
    }
    return (
        <Fragment>
            <Button type={userInfo ? 'link' : 'primary'} onClick={openModal}>{userInfo ? '修改密码' : '新增'}</Button>
            <Modal title={userInfo ? '修改密码' : '新增用户'} open={visible} destroyOnClose onOk={handleOk}
                   onCancel={handleCancel}>
                <Form labelCol={{span: 6}} wrapperCol={{span: 14}} form={form} initialValues={userInfo}>
                    <Form.Item label='账号' name='userName'>
                        {userInfo ? userInfo.userName : <Input/>}
                    </Form.Item>
                    <Form.Item label='密码' name='userPassword'>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item label='确认密码' name='userPasswordConfirm'>
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default ManageModal
