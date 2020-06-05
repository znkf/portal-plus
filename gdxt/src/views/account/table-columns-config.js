export const columnsUserAll = [
  // {
  //   title: '序号',
  //   scopedSlots: { customRender: 'serial' }
  // },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '手机号码',
    dataIndex: 'mobilePhone'
  },
  // {
  //   title: '证件类型',
  //   dataIndex: 'identityCardName',
  //   scopedSlots: { customRender: 'description' }
  // },
  {
    title: '证件号码',
    dataIndex: 'identityCardCode'
    // customRender: text => text + ' 次'
  },
  // {
  //   title: 'appid',
  //   dataIndex: 'appId',
  //   scopedSlots: { customRender: 'status' }
  // },
  {
    title: '性别',
    dataIndex: 'gender',
    scopedSlots: { customRender: 'gender' }
  },
  {
    title: '出生日期',
    dataIndex: 'birthDate',
    scopedSlots: { customRender: 'birthDate' }
  },
  {
    title: '注册时间',
    dataIndex: 'createTime'
  },
  {
    title: '最近刷脸时间',
    dataIndex: 'lastTifTime'
  },
  {
    title: '状态',
    dataIndex: 'isOnline',
    scopedSlots: { customRender: 'isOnline' },
    width: '60px'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' },
    fixed: 'right'
  }
]

export const columnsUserOnline = [
  // {
  //   title: '序号',
  //   scopedSlots: { customRender: 'serial' }
  // },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '手机号码',
    dataIndex: 'mobilePhone'
  },
  {
    title: '证件类型',
    dataIndex: 'identityCardName',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '证件号码',
    dataIndex: 'identityCardCode'
    // customRender: text => text + ' 次'
  },
  // {
  //   title: 'appid',
  //   dataIndex: 'appId',
  //   scopedSlots: { customRender: 'status' }
  // },
  {
    title: '性别',
    dataIndex: 'gender',
    scopedSlots: { customRender: 'gender' }
  },
  {
    title: '出生日期',
    dataIndex: 'birthDate',
    scopedSlots: { customRender: 'birthDate' }
  },
  {
    title: '注册时间',
    dataIndex: 'createTime'
  },
  {
    title: '状态',
    dataIndex: 'isOnline',
    scopedSlots: { customRender: 'isOnline' },
    width: '60px'
  },
  {
    title: '最近刷脸时间',
    dataIndex: 'lastTifTime'
  }
]
