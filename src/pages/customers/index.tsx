import { Breadcrumb, Button, Layout, Modal, Spin, Table, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getCustomersList } from '../../api/customer';
import { Content } from 'antd/es/layout/layout';
import EditModal from './editModal.tsx';
import './style.less';

const { Title } = Typography;

const CustomersPage = () => {
  const columns = [
    {
      dataIndex: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'company_name',
      title: '公司名称',
    },
    {
      dataIndex: 'contact_name',
      title: '联系人',
    },
    {
      dataIndex: 'company_phone',
      title: '联系电话',
    },
    {
      dataIndex: 'company_email',
      title: '邮箱',
    },
    {
      dataIndex: 'company_address',
      title: '地址',
    },
    {
      dataIndex: 'created_at',
      title: '创建日期',
    },
  ];

  const editModalRef = useRef();
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
    const res: any = await getCustomersList(params);
    setLoading(false);
    setRecords(res.data.data);
    setTotal(res.data.total);
  };

  const openEditModal = (item: any) => {
    editModalRef.current.openModal(item.id);
  };

  return (
    <Layout className='layout'>
      <Breadcrumb
        className='breadcrumb'
        items={[
          { title: '客户管理' },
          { title: '列表' },
        ]}
      />
      <Title className='title'>客户管理</Title>
      <div className={'text-right'}>
        <Button type='primary' onClick={openEditModal}>添加</Button>
      </div>
      <Content className='content'>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={records}
            rowKey='id'
            scroll={{ x: 'max-content' }}
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
      <EditModal ref={editModalRef} update={getList} />
      {contextHolder}
    </Layout>
  );
};

export default CustomersPage;
