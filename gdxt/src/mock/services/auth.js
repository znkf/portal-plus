import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const username = ['zhangshan', 'super']
// 强硬要求 123456 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = ['e10adc3949ba59abbe56e057f20f883e']

const login = options => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder(
    {
      id: Mock.mock('@guid'),
      name: Mock.mock('@name'),
      username: 'zhangshan',
      password: '',
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
      role: []
    },
    '',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  )
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
