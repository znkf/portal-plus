import Vue from "vue";
import axios from "axios";
import store from "@/store";
import notification from "ant-design-vue/es/notification";
import { VueAxios } from "./axios";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { CryptoJS } from "./cryptoJS";
import { sha256 } from "./sha256";
import { domain } from "./domain";
axios.defaults.headers.get["Content-Type"] = "application/json";

// 创建 axios 实例
const service = axios.create({
  baseURL: domain,
  timeout: 60000, // 请求超时时间
  withCredentials: true // 允许携带cookie
});
const handleError = msg => {
  notification.error({
    message: msg || "糟糕，请求出错了",
    description: ""
  });
  // eslint-disable-next-line no-throw-literal
  throw msg || "糟糕，请求出错了";
};
const err = error => {
  if (error.response) {
    const data = error.response.data;
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (error.response.status === 403) {
      notification.error({
        message: "Forbidden",
        description: data.message
      });
    }
    if (error.response.status === 409) {
      notification.error({
        message: "错误",
        description: data.message
      });
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      notification.error({
        message: "Unauthorized",
        description: "Authorization verification failed"
      });
      if (token) {
        store.dispatch("Logout").then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN);
  const paasid = "cssg_cards";
  const token2 = "InZLQZfs9pEGuROijHov8k7cg6nl406g";
  const timestamp = (Date.now() / 1000).toFixed();
  const nonce = "987654321abcdefg1";
  const signature = sha256(timestamp + token2 + nonce + timestamp)
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();
  config.headers["x-tif-paasid"] = paasid;
  config.headers["x-tif-timestamp"] = timestamp;
  config.headers["x-tif-signature"] = signature;
  config.headers["x-tif-nonce"] = nonce;
  if (token) {
    config.headers["X-YZ-TOKEN"] = token;
  }
  return config;
}, err);

// response interceptor
service.interceptors.response.use(response => {
  // eslint-disable-next-line eqeqeq
  console.log();
  if (
    response.config.url.indexOf("gaio_order4outer_be") >= 0 ||
    (response.data.errcode == 200 && response.status == 200)
  ) {
    return response.data;
  } else {
    handleError(response.data.errmsg);
  }
}, err);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  }
};

export { installer as VueAxios, service as axios };
