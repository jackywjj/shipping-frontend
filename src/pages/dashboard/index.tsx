import {Breadcrumb, Layout, Spin, Typography} from 'antd'
import {Content} from 'antd/es/layout/layout'
import {useEffect, useState} from 'react'
import './style.less'
import {getDashboardData} from '../../api/api.ts'

const {Title} = Typography
const DashboardPage = () => {
    const [loading, setLoading] = useState(false)
    const [deviceAmount, setDeviceAmount] = useState(0)
    const [birthRecordAmount, setBirthRecordAmount] = useState(0)
    const [weanRecordAmount, setWeanRecordAmount] = useState(0)

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        setLoading(true)
        const res: any = await getDashboardData()
        setLoading(false)
        setDeviceAmount(res.data.device_amount)
        setBirthRecordAmount(res.data.birth_amount)
        setWeanRecordAmount(res.data.wean_amount)
    }

    return (
        <Layout className='layout dashboard'>
            <Breadcrumb className='breadcrumb' items={[{title: '仪表盘'}]}/>
            <Title className='title'>数据总览</Title>
            <Spin spinning={loading}>
                <Content className='content'>
                    <div className='card' style={{backgroundColor: '#ebfcef'}} key='deviceCount'>
                        <div className='card-title'>设备数量</div>
                        <div className='card-value'><span className='value'>{deviceAmount}</span>台</div>
                    </div>
                    <div className='card' style={{backgroundColor: '#e8f0fa'}} key='birthWeight'>
                        <div className='card-title'>出生称重</div>
                        <div className='card-value'><span className='value'>{birthRecordAmount}</span>头</div>
                    </div>
                    <div className='card' style={{backgroundColor: '#fff0e8'}} key='weanRecordAmount'>
                        <div className='card-title'>断奶称重</div>
                        <div className='card-value'><span className='value'>{weanRecordAmount}</span>头</div>
                    </div>
                </Content>
            </Spin>
        </Layout>
    )
}

export default DashboardPage
