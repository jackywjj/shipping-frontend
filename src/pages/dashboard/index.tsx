import {Breadcrumb, Layout, Row, Col, Spin, Statistic, Typography} from 'antd'
import {Content} from 'antd/es/layout/layout'
import {useEffect, useState} from 'react'
import * as echarts from 'echarts';
import './style.less'
import {getDashboardData} from '../../api/api.ts'

const {Title} = Typography
const DashboardPage = () => {
    const [loading, setLoading] = useState(false)
    const [deviceAmount, setDeviceAmount] = useState(0)
    const [birthRecordAmount, setBirthRecordAmount] = useState(0)
    const [weanRecordAmount, setWeanRecordAmount] = useState(0)

    useEffect(() => {
        getData();
        renderEchart();
    }, [])
    const getData = async () => {
        setLoading(true)
        const res: any = await getDashboardData()
        setLoading(false)
        setDeviceAmount(res.data.device_amount)
        setBirthRecordAmount(res.data.birth_amount)
        setWeanRecordAmount(res.data.wean_amount)
    }

    const renderEchart = () => {
        const chartDom = document.getElementById('chart');
        const myChart = echarts.init(chartDom);
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        option && myChart.setOption(option);
    }

    return (
        <Layout className='layout dashboard'>
            <Breadcrumb className='breadcrumb' items={[{title: '控制台'}]}/>
            <Title className='text-center'>欢迎使用航运订单管理系统</Title>
            <Spin spinning={loading}>
                <Content className='content'>
                    <Row>
                        <Col span={12}>
                            <Statistic title="当日发货订单数：" value={112893} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="最新消息：" suffix={'条'} value={112893} />
                        </Col>
                        <Col className='chart-box' span={24}>
                            <div className='chart-title'>近一周订单折线图：</div>
                            <div className='chart' id='chart'/>
                        </Col>
                    </Row>
                </Content>
            </Spin>
        </Layout>
    )
}

export default DashboardPage
