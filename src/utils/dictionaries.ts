// 船舶类型
const shipType = [
  {
    value: 'CONTAINER_SHIP',
    label: '集装箱船'
  },
  {
    value: 'BULK_CARRIER',
    label: '散货船'
  },
  {
    value: 'RO_RO_SHIP',
    label: '滚装船'
  },
  {
    value: 'GENERAL_CARGO_SHIP',
    label: '杂货船'
  },
  {
    value: 'REEFER_SHIP',
    label: '冷藏船'
  },
];
const shipStatus = [
  {
    value: 'AVAILABLE',
    label: '可用'
  },
  {
    value: 'IN_TRANSIT',
    label: '作业中'
  },
  {
    value: 'MAINTENANCE',
    label: '维护中'
  },
];

const orderStatus = [
  {
    value: 'WAIT_FOR_ORDER',
    label: '等待下单'
  },
  {
    value: 'PENDING',
    label: '准备中'
  },
  {
    value: 'SHIPPED',
    label: '运输中'
  },
  {
    value: 'DELIVERED',
    label: '已送达'
  },
];

const containerType = [
  {
    value: 1,
    label: '20GP'
  },
  {
    value: 2,
    label: '40GP'
  },
  {
    value: 3,
    label: '40HQ'
  },
  {
    value: 4,
    label: '45HQ'
  },
];

export {
	shipType,
	shipStatus,
	orderStatus,
  containerType,
};