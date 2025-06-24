import {Breadcrumb, Button, Layout, Modal, Spin, Table, Typography} from 'antd'
import {useEffect, useRef, useState} from 'react'
import {getShipsList, delShip} from '../../api/ship.ts'
import {Content} from 'antd/es/layout/layout'
import EditModal from "./editModal.tsx";
import {shipStatus, shipType} from "../../utils/dictionaries.ts";
import './style.less'

const {Title} = Typography

const ShipsPage = () => {
	const columns = [
		{
			dataIndex: 'id',
			title: 'ID'
		},
		{
			dataIndex: 'ship_name',
			title: '船名'
		},
		{
			dataIndex: 'ship_type',
			title: '船舶类型',
			render: (value: any) => {
				return shipType.find((item) => item.value === value)?.label || value
			}
		},
		{
			dataIndex: 'ship_capacity',
			title: '载重（吨）'
		},
		{
			dataIndex: 'status',
			title: '当前状态',
			render: (value: any) => {
				return shipStatus.find((item) => item.value === value)?.label || value
			}
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
		const res: any = await getShipsList(params)
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
				await delShip(id)
				getList();
			},
		})

	}

	return (
		<Layout className='layout'>
			<Breadcrumb
				className="breadcrumb"
				items={[
					{title: '船只管理'},
					{title: '列表'},
				]}
			/>
			<Title className='title'>船只管理</Title>
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

export default ShipsPage
