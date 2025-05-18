import {Breadcrumb, Layout, Spin, Table, Typography} from 'antd'
import {useEffect, useState} from 'react'
import {getPortList} from '../../api/api.ts'
import {Content} from 'antd/es/layout/layout'

const {Title} = Typography

const DevicePage = () => {
    const columns = [
        {
            dataIndex: 'id',
            title: 'ID'
        },
        {
            dataIndex: 'deviceCode',
            title: '设备码'
        }
    ]

    const [loading, setLoading] = useState(false)
    const [records, setRecords] = useState([])
    const [total, setTotal] = useState(0)
    const [requestParams, setRequestParams] = useState({
        pageNumber: 1,
        pageSize: 10
    })

    useEffect(() => {
        getList()
    }, [requestParams])

    const getList = async () => {
        setLoading(true)
        const res: any = await getPortList()
        setLoading(false)
        setRecords(res.data.devices)
        setTotal(res.data.total)
    }

    return (
        <Layout className='layout'>
            <Breadcrumb
                className="breadcrumb"
                items={[
                    {title: '系统设置'},
                    {title: '设备管理'},
                    {title: '列表'},
                ]}
            />
            <Title className='title'>设备管理</Title>
            <Content className='content'>
                <Spin spinning={loading}>
                    <Table
                        columns={columns}
                        dataSource={records}
                        rowKey='id'
                        pagination={{
                            pageSize: requestParams.pageSize,
                            current: requestParams.pageNumber,
                            total,
                            onChange: (page, pageSize) => {
                                setRequestParams({pageNumber: page, pageSize: pageSize})
                            },
                            showSizeChanger: false
                        }}
                    />
                </Spin>
            </Content>
        </Layout>
    )
}

export default DevicePage
