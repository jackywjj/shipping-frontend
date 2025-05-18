import {Breadcrumb, Button, Flex, Layout, Popconfirm, Spin, Table, Typography} from 'antd'
import {useEffect, useState} from 'react'
import {deleteUser, getUserList} from '../../api/user.ts'
import {Content} from 'antd/es/layout/layout'
import ManageModal from './manageModal'
import './style.less'
import {deepConvertUnderscoreToUpperCase} from "../../utils/utils.ts";

const {Title} = Typography

const UserPage = () => {
    const columns = [
        {
            dataIndex: 'id',
            title: 'ID'
        },
        {
            dataIndex: 'userName',
            title: '用户名'
        },
        {
            title: '操作',
            render: (item: any) => {
                return (<div>
                        <ManageModal userInfo={item} onUpdate={getList}/>
                        {(item.id !== currentUser.id) ?
                            <Popconfirm title='提示' description='确定删除该用户吗？'
                                        onConfirm={() => deleteRecord(item.id)}>
                                <Button danger type='link'>删除用户</Button>
                            </Popconfirm> : ''}
                    </div>
                )
            }
        }
    ]

    const [loading, setLoading] = useState(false)
    const [records, setRecords] = useState([])
    const [total, setTotal] = useState(0)
    const [requestParams, setRequestParams] = useState({
        pageNumber: 1,
        pageSize: 10
    })
    const userInfo: any = localStorage.getItem('userInfo')
    const currentUser = JSON.parse(userInfo) ? JSON.parse(userInfo) : {}

    useEffect(() => {
        getList()
    }, [requestParams])

    const getList = async () => {
        setLoading(true)
        const params = {
            page: requestParams.pageNumber,
            size: requestParams.pageSize,
        }
        const res: any = await getUserList(params);
        setLoading(false);
        setRecords(deepConvertUnderscoreToUpperCase(res.data.data));
        setTotal(res.data.total)
    }
    const deleteRecord = async (id: number) => {
        await deleteUser(id)
        getList()
    }

    return (
        <Layout className='layout user-page'>
            <Breadcrumb
                className='breadcrumb'
                items={[
                    {title: '系统设置'},
                    {title: '用户管理'},
                    {title: '列表'}
                ]}
            />
            <Title className='title'>用户管理</Title>
            <Content className='content'>
                <Flex justify='right' className='add-btn'>
                    <ManageModal onUpdate={getList}/>
                </Flex>
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

export default UserPage
