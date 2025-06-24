import { Breadcrumb, Button, Layout, Modal, Spin, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { editStatusToComplete, editStatusToProgress, getSchedulesList } from '../../api/schedule.ts';
import { Content } from 'antd/es/layout/layout';
import './style.less';

const { Title } = Typography;

const SchedulesPage = () => {
  const columns = [
    {
      dataIndex: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'ship_id',
      title: '船舶ID',
    },
    {
      dataIndex: 'ship_name',
      title: '船舶名称',
    },
    {
      dataIndex: 'route_label',
      title: '航线',
    },
    {
      dataIndex: 'departure_time',
      title: '出发时间',
    },
    {
      dataIndex: 'arrival_time',
      title: '预计到达时间',
    },
    {
      dataIndex: 'status_label',
      title: '状态',
    },
    {
      title: '操作',
      render: (item: any) => {
        // todo,根据状态展示按钮
        return (
          <div>
            {item.status === 'SCHEDULED' ? <Button
              type='link'
              className='link-btn'
              onClick={() => changeStatus(item)}
            >运输</Button> : null}

            {item.status === 'IN_PROGRESS' ? <Button
              type='link'
              className='link-btn'
              onClick={() => changeStatus(item)}
            >完成</Button> : null}
          </div>
        );
      },
    },
  ];

  const [modal, contextHolder] = Modal.useModal();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [requestParams, setRequestParams] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getList();
  }, [requestParams]);

  const getList = async () => {
    setLoading(true);
    const params = {
      page_size: requestParams.pageSize,
      page_number: requestParams.pageNumber,
    };
    const res: any = await getSchedulesList(params);
    setLoading(false);
    setRecords(res.data.data);
    setTotal(res.data.total);
  };

  const changeStatus = async (record: any) => {
    modal.confirm({
      title: '提示',
      content: '确定执行该操作吗？',
      onOk: async () => {
        // todo 根据状态执行不同操作
        if (record.status === '待出发') {
          await editStatusToProgress(record.id);
        } else {
          await editStatusToComplete(record.id);
        }
        getList();
      },
    });
  };


  return (
    <Layout className='layout'>
      <Breadcrumb
        className='breadcrumb'
        items={[
          { title: '船运调度' },
          { title: '列表' },
        ]}
      />
      <Title className='title'>船运调度</Title>
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
                setRequestParams({ pageNumber: page, pageSize: pageSize });
              },
              showSizeChanger: false,
            }}
          />
        </Spin>
      </Content>
      {contextHolder}
    </Layout>
  );
};

export default SchedulesPage;
