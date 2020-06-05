
/**
 * 网页里导出excel get带token认证
 */
import Vue from 'vue'
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { CryptoJS } from "./cryptoJS";
import { sha256 } from "./sha256";
import { domian_cardPreview } from "./domain"
import Qs from "qs";

axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

function previewRequest(config) {
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
  return axios({
    // responseType: 'blob',
    // baseURL: domain,
    responseType: 'blob',
    baseURL: domian_cardPreview,
    url: config.url,
    headers: { ...headers },
    method: "post",
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        data = Qs.stringify(data);
        return data;
      }
    ],
    data: config.parameter
  })
}
export { previewRequest }
