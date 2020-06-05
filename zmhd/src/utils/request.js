import axios from "axios";
import promise from "es6-promise";
// console.log('store:',store)
// import
promise.polyfill();
//  统一设置请求头部
axios.defaults.headers.get["Content-Type"] =
  "application/x-www-form-urlencoded";
// axios.defaults.headers.get["Content-Type"] = "application/json";
//
// const domain = "http://zwfw-new.hunan.gov.cn";

const request = axios.create({
  // baseURL: domain,
  timeout: 60000 // 请求超时时间
});
// const handleError = (msg) => {
//   return Promise.reject(msg);
// };
const err = (error) => {
  if (error.response) {
    console.log('err')
  }
  return Promise.reject(error);
};
request.interceptors.response.use((response) => {
  return response.data;
}, err);
request.interceptors.request.use(function(conf) {
  return conf;
}, err);
export default request;
