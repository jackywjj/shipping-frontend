import {Button, Col, Layout, Row, Spin, Typography, Card, Table, Modal} from 'antd'
import {useEffect, useState, useRef} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import {getOneOrder} from '../../api/order.ts'
import { getContainersList, delContainer, editContainer } from "../../api/container.ts";
import { getOneRoute } from "../../api/route.ts";
import {Content} from 'antd/es/layout/layout'
import './style.less'
import EditContainerModal from "./editContainerModal.tsx";

const {Title} = Typography

const OrderDetailPage = () => {
	const [modal, contextHolder] = Modal.useModal();
	const navigate = useNavigate();
	const location = useLocation();
	const editContainerModalRef = useRef<any>();
	const [loading, setLoading] = useState(false);
	const [orderInfo, setOrderInfo] = useState<any>({});
	const [containerList, setContainerList] = useState<any>([]);
	const [routeInfo, setRouteInfo] = useState<any>({});

	const columns = [
		{
			title: '集装箱id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: '集装箱编号',
			dataIndex: 'container_number',
			key: 'container_number',
		},
		{
			title: '集装箱类型',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '操作',
			render: (item: any) => {
				return (
					<div>
						<Button
							type='link'
							className='link-btn'
							onClick={() => openEditContainerModal(item)}>编辑</Button>
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

	useEffect(() => {
		getList()
	}, [])

	const getList = async () => {
		setLoading(true)
		const res: any = await getOneOrder(location.state.id);
		setOrderInfo(res.data);
		const records = await getContainersList(res.data.id);
		setContainerList(records.data);
		const routeInfoRes = await getOneRoute(res.data.route_id);
		setRouteInfo(routeInfoRes.data);
		setLoading(false)
	}

	const goPage = () => {
		navigate(-1)
	}

	const delRecord = async (id: any) => {
		modal.confirm({
			title: '提示',
			content: '确定删除该数据吗？',
			onOk: async () => {
				await delContainer(id)
				getList();
			},
		})
	}

	const openEditContainerModal = (item: any) => {
		editContainerModalRef.current.openModal(item)
	}

	return (
		<Layout className='layout'>
			{contextHolder}
			<Title className='title mt-3'>订单详情</Title>
			<div className={'text-right'}>
				<Button onClick={goPage}>返回</Button>
			</div>
			<Content className='content'>
				<Spin spinning={loading}>
					<Row gutter={[0,16]} style={{width: 'calc(100%-32px)'}}>
						<Col span={12} style={{paddingRight: '16px'}}>
							<Card title="订单信息">
								<div>订单ID：{orderInfo.id}</div>
								<div>订单状态：{orderInfo.order_status}</div>
								<div>客户ID：{orderInfo.order_status}</div>
							</Card>
						</Col>
						<Col span={12} style={{paddingRight: '16px'}}>
							<Card title="航线信息">
								<div>起始港口：{routeInfo.origin_port_id}</div>
								<div>目的港口：{routeInfo.destination_port_id}</div>
								<div>预计天数：{routeInfo.estimated_days}</div>
							</Card>
						</Col>
						<Col span={24}>
							<Card title="集装箱信息">
								<Table columns={columns} dataSource={containerList} rowKey='id' />
							</Card>
						</Col>
					</Row>
				</Spin>
			</Content>
			<EditContainerModal ref={editContainerModalRef} update={getList} />
		</Layout>
	)
}

export default OrderDetailPage;
