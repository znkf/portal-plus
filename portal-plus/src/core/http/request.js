import axios from 'axios'
import promise from 'es6-promise'
promise.polyfill()
//  统一设置请求头部
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
const request = axios.create({})
request.interceptors.response.use(response => {
  return response.data
})
request.interceptors.request.use(function(conf) {
  return conf
})
export default request