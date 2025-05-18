import {Button, Layout} from 'antd'
import {Outlet, useNavigate} from 'react-router-dom'
import MenuComponent from '../components/menu'
import './style.less'
import {getLocalStorage, removeLocalStorage} from '../utils/tool.ts';

const LayoutComponent = () => {
    const navigate = useNavigate()
    const {Header, Sider, Content} = Layout
    const currentUser: any = getLocalStorage('userInfo');
    console.log(currentUser)
    const logOut = async () => {
        removeLocalStorage('user_token')
        navigate('/login')
    }
    return (
        <Layout className='layout-page'>
            <Header className='header'>
                <div className='logoBox'>
                    <img alt='logo' src='src/assets/logo.png'/>
                    <span className='name ml-1'>航运订单管理系统</span>
                </div>
                <div className='userInfo'>
                    <span>您好，{currentUser?.user_name}</span>
                    <Button type='link' onClick={logOut}>登出</Button>
                </div>
            </Header>
            <Layout>
                <Sider className='sider'>
                    <MenuComponent/>
                </Sider>
                <Content className='content'>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutComponent
