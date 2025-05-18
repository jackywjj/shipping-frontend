import {Button, Col, Form, type FormProps, Input, Row} from 'antd'
import {useNavigate} from 'react-router-dom'
import {getCaptchaApi, userLogin} from '../../api/api.ts'
import './style.less'
import {useEffect, useState} from 'react'
import {setLocalStorage} from '../../utils/tool.ts';

const LoginPage = () => {
    type FieldType = {
        user_name: string;
        user_password: string;
    }
    const navigate = useNavigate()
    const [captchaImg, setCaptchaImg] = useState('')
    const [captchaCode, setCaptchaCode] = useState('')

    const layout = {
        labelCol: {span: 16},
        wrapperCol: {span: 24}
    }
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const params = {
            ...values,
            captcha_code: captchaCode
        }
        try {
            const res: any = await userLogin(params)
            setLocalStorage('userInfo', JSON.stringify(res.data.user_info))
            setLocalStorage('user_token', res.data.user_token)
            navigate('/dashboard')
        } catch (err) {
            getCaptcha()
        }
    }

    const getCaptcha = () => {
        getCaptchaApi().then((res: any) => {
            setCaptchaImg(`data:image/gif;base64,${res.data.captcha_image}`)
            setCaptchaCode(res.data.captcha_code)
        })
    }

    useEffect(() => {
        getCaptcha()
    }, [])

    return (
        <div className={'login-page'}>
            <div className={'content'}>
                <div className='systemName'>
                    航运订单管理系统
                </div>
                <Form {...layout} layout={'vertical'} onFinish={onFinish}>
                    <Form.Item name='user_name' rules={[{required: true, message: '请输入用户名'}]}>
                        <Input placeholder={'请输入用户名'}/>
                    </Form.Item>
                    <Form.Item name='user_password' rules={[{required: true, message: '请输入密码'}]}>
                        <Input placeholder={'请输入密码'} type={'password'}/>
                    </Form.Item>
                    <Form.Item name='captcha_value' rules={[{required: true, message: '请输入验证码'}]}>
                        <Row>
                            <Col>
                                <Input className='mr-2 captchaInput' placeholder={'请输入验证码'}/>
                            </Col>
                            <Col className='captchaImg'>
                                <img
                                    className='captchaImg'
                                    src={captchaImg} onClick={getCaptcha}
                                    alt=''/>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 0, span: 24}}>
                        <Button className='submit-btn' type='primary' htmlType='submit'>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
