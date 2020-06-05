// 系统管理
import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'
const totalCount = 501
const addAmin = () => {
  return builder({
    code: 200, // 状态码
    msg: 'ok' // 状态码对应描述
  })
}
// 更新管理
const updateAdmin = () => {
  return builder({
    code: 200, // 状态码
    msg: 'ok' // 状态码对应描述
  })
}
const searchAllRole = param => {
  const parameters = getQueryParameters(param)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: 12, // 主键ID
      name: '普通用户', // 角色名称
      permissionList: [
        { id: 1, name: '在线用户' },
        { id: 2, name: '所有用户' },
        { id: 3, name: '角色列表' }
      ], // 角色权限列表
      adminList: [
        { id: 1, name: '张三' },
        { id: 1, name: 'root' }
      ], // 对应用户列表
      updateTime: '2020-1-3 15:32:00',
      status: 1 // 启用标志(1:是， 0:否)
    })
  }

  return builder({
    code: 200,
    msg: 'ok',
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}
// 搜索管理
const searchAdmin = param => {
  const parameters = getQueryParameters(param)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: 12, // 主键ID
      identityCardName: '身份证', // 身份证照名称
      identityCardCode: '432503199988777', // 身份证照编号
      name: '张三', // 姓名
      pwd: 123456, // 登录密码
      company: '腾云悦智', // 单位
      department: '财务部', // 部门
      mobilePhone: '18888888888', // 手机号
      gender: '女', // 性别
      birthDate: '1999-9-9', // 出生日期
      position: '出纳', // 岗位
      status: 1, // 是否启用(1:启用；0：不启用)
      roleList: [] // 角色列表
    })
  }

  return builder({
    code: 200,
    msg: 'ok',
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}
// 在线用户 所有用户
const searchUser = options => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: parseInt(Math.random() * 1000000),
      identityCardName: '身份证', // 证件名称
      identityCardCode: parseInt(Math.random() * 1000000), // 证件编号
      appId: 'wxaeeaaa5e' + i, // 微信授权登录返回的用户标识ID
      name: '戴永明' + i, // 用户姓名
      mobilePhone: '18122223333', // 手机号
      gender: Math.random() > 0.5 ? '男' : '女', // 性别
      birthDate: '2020-01-02', // 出生日期
      lastTifTime: '2020-01-02 14:00:30', // 最近一次刷脸登录时间
      nation: '汉族', // 民族
      province: '湖南省', // 收件省份
      city: '长沙市', // 收件城市
      district: '岳麓区', // 收件区县
      detailedDddress: '环湖路金茂大厦20层', // 收件详细地址
      email: '8888@qq.com', // 邮箱地址
      emergencyContact: '张三', // 紧急联系人
      emergencyContactPhone: '13333333333' // 紧急联系人电话
    })
  }

  return builder({
    code: 200,
    msg: 'ok',
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}
const updateUser = options => {
  return builder({
    code: 200,
    msg: 'ok'
  })
}
// 搜索证照
const searchCard = param => {
  const parameters = getQueryParameters(param)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: 1234, // 记录ID
      cardType: '卡证类', // 证照类型
      cardName: '身份证', // 证照名称
      cardCode: '4325031999999999', // 证照编号
      status: 1, // 绑定状态(1:绑定； 2:解绑)
      createTime: '2020-01-02 16:09:22', // 创建时间
      updateTime: '2020-01-02 17:09:22', // 更新时间
      iconUrl: ' http://xxxxx/xxxxx ', // 证照图标URL
      expiryDate: '2025-12-30' // 有效截止日期
    })
  }

  return builder({
    code: 200,
    msg: 'ok',
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}
// 搜索亮照
const searchCardShown = param => {
  const parameters = getQueryParameters(param)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      cardType: '卡证类', // 证照类型
      cardName: '身份证', // 证照名称
      cardCode: '432503667789', // 证照编号
      shownCount: parseInt(Math.random() * 1000000 + 1000000), // 亮照次数
      bindPeopleCount: parseInt(Math.random() * 10000 + 1000) // 当前绑定人数
    })
  }

  return builder({
    code: 200,
    msg: 'ok',
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}
// 搜索事项
const searchItems = param => {
  const parameters = getQueryParameters(param)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      serialNum: '345234523342424', // 流水号
      itemsCode: '11430105006146107X ', // 事项编号
      itemsName: '出生医学证明首次签发及换发', // 事项名称
      applyTime: '2020-01-02 15:30:59', // 申请时间
      applicantName: '戴永明' // 申请人
    })
  }

  return builder({
    code: 200,
    msg: 'ok',
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}
// 搜索公告
const searchNotice = param => {
  const parameters = getQueryParameters(param)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: 3452, // ID
      sort: 1000,
      title: '出生医学证明首次签发及换发 ', // 公告标题
      releaseTime: '2020-01-02 15:30:59', // 发布时间
      releaseStatus: '2020-01-02 15:30:59', // 发布状态
      type: '系统消息', // 公告类型
      coverImageUrl: 'http://xxxxxx/xxxx', // 封面图片
      content: '春节快乐！' // 公告内容
    })
  }

  return builder({
    code: 200,
    msg: 'ok',
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}
// 搜索收藏
const searchCollection = param => {
  const parameters = getQueryParameters(param)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: 3452, // ID
      title: 'zhangshan', // 收藏事项标题
      type: '系统消息', // 收藏事项类型
      code: 'efffgg', // 收藏事项编号
      sid: '124fff', // 用户标识ID
      username: '李四' // 用户姓名
    })
  }

  return builder({
    code: 200,
    msg: 'ok',
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const deleteUser = options => {
  return builder({
    code: 200,
    msg: 'ok'
  })
}
Mock.mock(/\/admin\/add/, 'post', addAmin)
Mock.mock(/\/admin\/update/, 'put', updateAdmin)
Mock.mock(/\/admin\/search-role/, 'get', searchAllRole)
Mock.mock(/\/admin\/search/, 'get', searchAdmin)
Mock.mock(/\/card\/search-shown/, 'get', searchCardShown)
Mock.mock(/\/card\/search/, 'get', searchCard)
Mock.mock(/\/user\/search/, 'get', searchUser)

Mock.mock(/\/user\/update/, 'put', updateUser)
Mock.mock(/\/user\/delete/, 'delete', deleteUser)

Mock.mock(/\/items\/search/, 'get', searchItems)
Mock.mock(/\/notice\/search/, 'get', searchNotice)

Mock.mock(/\/collection\/search/, 'get', searchCollection)
