
import Mock from 'mockjs2'
import { builder, getBody } from '../util'
const username = ['zhangshan', 'super']
// 强硬要求 123456 相同密码
const password = ['e10adc3949ba59abbe56e057f20f883e']

const login = options => {
  const body = { username: 'zhangshan', pwd: 'e10adc3949ba59abbe56e057f20f883e' } || getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.pwd)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }
  console.log('=========customlogin==========')
  return builder(
    {
      id: Mock.mock('@guid'),
      name: Mock.mock('@name'),
      username: 'zhangshan',
      pwd: '',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      status: 1,
      telephone: '',
      lastLoginIp: '27.154.74.117',
      lastLoginTime: 1534837621348,
      creatorId: 'zhangshan',
      createTime: 1497160610259,
      deleted: 0,
      roleId: 'admin',
      lang: 'zh-CN',
      token: '4291d7da9005377ec9aec4a71ea837f',
      role: [],
      admin: {
        name: 'zhangshan',
        avatar: '12321'
      }
    },
    '',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  )
}
const info = options => {
  console.log('mock: userinfo', options)
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: 'zhangshan',
    username: 'zhangshan',
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {}
  }
  const roles = [
    '多媒体服务',
    '日志服务',
    '收藏统计',
    '在线用户',
    '所有用户',
    '用户画像',
    '管理员列表',
    '角色列表',
    '证照绑定信息',
    '亮证统计',
    '添加卡证类型',
    '事项管理',
    '搜索管理',
    '缓存管理',
    '公告管理'
  ]
  userInfo.role = roles
  return builder(userInfo)
}
const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const getMy = () => {
  return builder({ name: '1231' })
}

Mock.mock(/\/admin\/login-by-username/, 'post', login)
Mock.mock(/\/admin\/get-my/, 'get', getMy)
Mock.mock(/\/admin\/userinfo/, 'get', info)
Mock.mock(/\/auth\/logout/, 'post', logout)
