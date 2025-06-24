import {
	Breadcrumb,
	Button,
	Form,
	Layout,
	message,
	Modal, Spin, Table, Typography
} from 'antd'
import {useEffect, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {getOrdersList, delOrder, deliveredOrder, pendingOrder, shippingOrder} from '../../api/order.ts'
import {addContainer} from "../../api/container.ts";
import {Content} from 'antd/es/layout/layout'
import EditModal from "./editModal.tsx";
import {orderStatus} from "../../utils/dictionaries.ts";
import './style.less'
import EditContainerModal from "./editContainerModal.tsx";

const {Title} = Typography

const OrdersPage = () => {
	const navigate = useNavigate();
	const columns = [
		{
			dataIndex: 'id',
			title: 'ID'
		},
		{
			dataIndex: 'customer_id',
			title: '客户ID'
		},
		{
			dataIndex: 'route_id',
			title: '所选航线ID'
		},
		{
			dataIndex: 'order_status',
			title: '当前状态',
			render: (value: any) => {
				return orderStatus.find((item) => item.value === value)?.label || value
			}
		},
		{
			dataIndex: 'departure_date',
			title: '出发日期'
		},
		{
			title: '操作',
			render: (item: any) => {
				return (
					<div>
						{item.order_status === 'WAIT_FOR_ORDER' ? <Button
							type='link'
							className='link-btn'
							onClick={() => changeStatus(item)}
						>准备</Button> : null}
						{item.order_status === 'PENDING' ? <Button
							type='link'
							className='link-btn'
							onClick={() => changeStatus(item)}
						>运输</Button> : null}
						{item.order_status === 'SHIPPED' ? <Button
							type='link'
							className='link-btn'
							onClick={() => changeStatus(item)}
						>完成</Button> : null}
						<Button
							type='link'
							className='link-btn'
							onClick={() => openEditContainerModal(item)}
						>新增集装箱</Button>
						<Button
							type='link'
							className='link-btn'
							onClick={() => goPage(item, 'detail')}
						>详情</Button>
						<Button
							type='link'
							className='link-btn'
							onClick={() => goPage(item, 'edit')}
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
	const editContainerModalRef = useRef();
	const [form] = Form.useForm()
	const [modal, contextHolder] = Modal.useModal();
	const [loading, setLoading] = useState(false)
	const [records, setRecords] = useState([])
	const [total, setTotal] = useState(0)
	const [addContainerVisible, setAddContainerVisible] = useState(false)
	const [orderId, setOrderId] = useState(0);
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
		const res: any = await getOrdersList(params)
		setLoading(false)
		setRecords(res.data.data)
		setTotal(res.data.total)
	}

	const openEditModal = (item: any) => {
		editModalRef.current.openModal(item.id)
	}
	const openEditContainerModal = (item: any) => {
		const { id, ...other } = item;
		editContainerModalRef.current.openModal({order_id: id, ...other})
	}

	const delRecord = async (id: any) => {
		modal.confirm({
			title: '提示',
			content: '确定删除该数据吗？',
			onOk: async () => {
				await delOrder(id)
				getList();
			},
		})
	}

	const goPage = (item: any, action: string) => {
		if (action === 'detail') {
			navigate(`/orders/detail`, {state: {id: item.id}})
		} else if (action === 'edit') {
			navigate(`/orders/create`, {state: {id: item.id}})
		} else {
			navigate('/orders/create')
		}
	}

	const changeStatus = async (item: any) => {
		const apiConfig = {
			WAIT_FOR_ORDER: pendingOrder,
			PENDING: shippingOrder,
			SHIPPED: deliveredOrder
		}
		await apiConfig[item.order_status](item.id)
		message.success('操作成功');
		getList();
	}

	return (
		<Layout className='layout'>
			<Breadcrumb
				className="breadcrumb"
				items={[
					{title: '订单管理'},
					{title: '列表'},
				]}
			/>
			<Title className='title'>订单管理</Title>
			<div className={'text-right'}>
				<Button type='primary' onClick={() => goPage(undefined, 'add')}>添加</Button>
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
			<EditModal ref={editModalRef} update={getList}/>
			<EditContainerModal ref={editContainerModalRef} update={getList}/>
			{contextHolder}
		</Layout>
	)
}

export default OrdersPage
