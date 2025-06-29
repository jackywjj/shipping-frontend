import {Breadcrumb, Button, Layout, Modal, Spin, Table, Typography} from 'antd'
import {useEffect, useRef, useState} from 'react'
import {getUsersList, delUser} from '../../api/user.ts'
import {Content} from 'antd/es/layout/layout'
import EditModal from "./editModal.tsx";
import './style.less'

const {Title} = Typography

const UsersPage = () => {
	const columns = [
		{
			dataIndex: 'id',
			title: 'ID'
		},
		{
			dataIndex: 'user_name',
			title: '用户名称',
		},
		{
			dataIndex: 'created_at',
			title: '创建日期'
		},
		{
			title: '操作',
			render: (item: any) => {
				return (
					<div>
						<Button
							type='link'
							className='link-btn'
							onClick={() => openEditModal(item)}
						>编辑</Button>
						<Button
							type='link'
							className='link-btn'
							onClick={() => delRecord(item.id)}
							danger>删除</Button>
					</div>
				)
			}
		},
	]

	const editModalRef = useRef();
	const [modal, contextHolder] = Modal.useModal();
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
		const params = {
			page_size: requestParams.pageSize,
			page_number: requestParams.pageNumber
		}
		const res: any = await getUsersList(params)
		setLoading(false)
		setRecords(res.data.data)
		setTotal(res.data.total)
	}

	const openEditModal = (item: any) => {
		editModalRef.current.openModal(item.id)
	}

	const delRecord = async (id: any) => {
		modal.confirm({
			title: '提示',
			content: '确定删除该数据吗？',
			onOk: async () => {
				await delUser(id)
				getList();
			},
		})

	}

	return (
		<Layout className='layout'>
			<Breadcrumb
				className="breadcrumb"
				items={[
					{title: '用户管理'},
					{title: '列表'},
				]}
			/>
			<Title className='title'>用户管理</Title>
			<div className={'text-right'}>
				<Button type='primary' onClick={openEditModal}>添加</Button>
			</div>
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
			<EditModal ref={editModalRef} update={getList} />
			{contextHolder}
		</Layout>
	)
}

export default UsersPage
