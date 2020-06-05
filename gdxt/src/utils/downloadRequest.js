
/**
 * 网页里导出excel get带token认证
 */
import Vue from 'vue'
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { CryptoJS } from "./cryptoJS";
import { sha256 } from "./sha256";
import { domain } from "./domain"
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

function downloadRequest(config) {
  const headers = {}
  const token = Vue.ls.get(ACCESS_TOKEN);
  const paasid = "cssg_cards";
  const token2 = "InZLQZfs9pEGuROijHov8k7cg6nl406g";
  const timestamp = (Date.now() / 1000).toFixed();
  const nonce = "987654321abcdefg1";
  const signature = sha256(timestamp + token2 + nonce + timestamp)
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();
  headers["x-tif-paasid"] = paasid;
  headers["x-tif-timestamp"] = timestamp;
  headers["x-tif-signature"] = signature;
  headers["x-tif-nonce"] = nonce;
  if (token) {
    headers["X-YZ-TOKEN"] = token;
  }
  axios.get(config.url, {
    responseType: 'blob',
    baseURL: domain,
    headers: { ...headers }
  }).then(({ data, status }) => {
    if (status !== 200) {
      notification.error({
        message: '请求错误',
        description: ''
      })
      return
    }
    // 大小小于60有错误
    if (data && data.size < 60) {
      data.text().then((e) => {
        try {
          const error = JSON.parse(e)
          notification.error({
            message: error.msg,
            description: ''
          })
        } catch (ex) {
          notification.error({
            message: '导出错误',
            description: ''
          })
        }
      })
      return
    }
    const a = document.createElement("a")
    const blob = new Blob([data], {
      type: "text/xls;charset=GBK;"
    })
    const objectUrl = URL.createObjectURL(blob)
    a.setAttribute("href", objectUrl)
    a.setAttribute("download", `政民互动平台-${config.fileName}.xls`)
    a.click()
  })
}
export { downloadRequest }
