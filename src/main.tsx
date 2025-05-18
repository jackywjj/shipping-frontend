import {createRoot} from 'react-dom/client'
import {ConfigProvider} from 'antd'
import {RouterProvider} from 'react-router-dom'
import locale from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn';
import router from './router/index.tsx'
import './styles/index.less'

const validateMessages = {
    required: '${label}是必填字段'
}

createRoot(document.getElementById('root')!).render(
    <ConfigProvider
        locale={locale}
        form={{
            validateMessages
        }}
        theme={{token: {colorPrimary: '#1677ff'}}}>
        <RouterProvider router={router}/>
    </ConfigProvider>
)
