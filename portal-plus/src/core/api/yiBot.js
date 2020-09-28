import request from "../http/request";
// import { objectKeyToStrFirstLetterTrun } from "../../utils//help.js";
import { CryptoJS } from "../../utils/cryptoJS";
import { sha256 } from "js-sha256";
import { BASE_URL, BASE_URL_LOCATION } from "./baseUrl";

// const pubkey = "wnOat7bdskxqDtbeOCcldK7zPDL10w8ePNerz3w0Ox0";
// const privateKey = "e485a3e89aea68bb9d7abe9c0ff80341";
const pubkey = "QkxAG1MF3Y04zwQlM3jJz+fpA4MUscn4hVyhcGZhl0Q";
const privateKey = "9e225c2fb80d69953f4206581ea5c46d";
const token = "7Z1hS4f0j9l8J26F5MQdkDlAJ5v7msKn";
const paasid = "cssg_znkf";
// 反馈
function isPC() {
  let userAgentInfo = navigator.userAgent;
  let Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  let flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
export function yibotFeedBack(params) {
  var account = "test01";
  var corre_water_feedback = params.corre_water_feedback;
  let docid = params.id;
  var faq = params.question;
  var op = "feedback";
  var question = params.question;
  var reason = params.reason;
  var sessionId = "xxx";
  var type = params.type;
  var time_stamp = (Date.now() / 1000).toFixed();

  var raw_str =
    account +
    corre_water_feedback +
    docid +
    faq +
    op +
    pubkey +
    question +
    reason +
    sessionId +
    time_stamp +
    type +
    privateKey;
  var base64_str = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(raw_str)
  );
  var sign = CryptoJS.MD5(base64_str).toString();

  let obj = {
    account,
    corre_water_feedback,
    docid,
    faq,
    op,
    pubkey,
    question,
    reason,
    sessionId,
    time_stamp,
    type,
    sign
  };
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/znkf/interface/common/query`,
    params: obj
  });
}
// 欢迎语
export function getGreentings() {
  var raw_str = pubkey + privateKey;
  var base64_str = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(raw_str)
  );
  var sign = CryptoJS.MD5(base64_str).toString();
  let data = {
    pubkey,
    sign
  };
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/znkf/exconfig/plugin-center/api/v1/plugin-config/yibot-view/store-65602537-3dff081e-e75a-40a7-9e55-196387a41fb5`,
    params: data
  });
}
// 一件事一次办
export function getOneEvent() {
  var timestamp = (Date.now() / 1000).toFixed();
	var nonce = Math.random()
	.toString(36)
	.substr(2);
	var signature = sha256(timestamp + token + nonce + timestamp)
	.toString(CryptoJS.enc.Hex)
	.toUpperCase();
	return request({
	headers: {
	"x-tif-paasid": paasid,
	"x-tif-signature": signature,
	"x-tif-timestamp": timestamp,
	"x-tif-nonce": nonce,
	"Content-Type": "application/json"
	},
	method: "GET",
	url: `${
	process.env.NODE_ENV == "production" ? BASE_URL : ""
	}/ebus/sjgl_be/node/gdbsOneThing/index`
	});
}
// 联系方式
export function getTel() {
  var raw_str = pubkey + privateKey;
  var base64_str = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(raw_str)
  );
  var sign = CryptoJS.MD5(base64_str).toString();
  let data = {
    pubkey,
    sign
  };
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/znkf/exconfig/plugin-center/api/v1/plugin-config/yibot-view/store-65602537-7a4147f8-ed92-41bc-a7df-551e0cd3736c`,
    params: data
  });
}
// 猜你想问
export function getCommonQuestion() {
  var raw_str = pubkey + privateKey;
  var base64_str = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(raw_str)
  );
  var sign = CryptoJS.MD5(base64_str).toString();
  let data = {
    pubkey,
    sign
  };
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/znkf/exconfig/plugin-center/api/v1/plugin-config/yibot-view/store-65602537-d69e32a3-af35-4066-b72e-70ceeaad04ca`,
    params: data
  });
}
//猜你想问配置
export function getCommonQuestiones() {
  var raw_str = pubkey + privateKey;
  var base64_str = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(raw_str)
  );
  var sign = CryptoJS.MD5(base64_str).toString();
  let data = {
    pubkey,
    sign
  };
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/znkf/exconfig/plugin-center/api/v1/plugin-config/yibot-view/store-65602537-d69e32a3-af35-4066-b72e-70ceeaad04ca`,
    params: data
  });
}
export function getIcon() {
  var raw_str = pubkey + privateKey;
  var base64_str = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(raw_str)
  );
  var sign = CryptoJS.MD5(base64_str).toString();
  let data = {
    pubkey,
    sign
  };
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/znkf/exconfig/plugin-center/api/v1/plugin-config/yibot-view/store-65602537-ad67663c-c847-4ea5-ad71-c11ecd67e9fe`,
    params: data
  });
}
export function yibotQuery(params) {
  var time_stamp = (Date.now() / 1000).toFixed();
  let a = document.cookie.split('=');
  let a_num = a.length - 1;
  var account = a[a_num];
  // var account = "test01";
  var ip = params.ip;
  var question = params.text.replace("\n", "");
  var labels = params.labels;
  var sessionId = a[1];
  // var sessionId = "xxx";
  var raw_str =
    account +
    ip +
    labels +
    pubkey +
    question +
    sessionId +
    time_stamp +
    privateKey;
  var base64_str = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(raw_str)
  );
  var sign = CryptoJS.MD5(base64_str).toString();
  let obj = {
    time_stamp,
    account,
    ip,
    question,
    labels,
    sessionId,
    pubkey,
    sign
  };
  console.log(raw_str);
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/znkf/interface/common/query`,
    params: obj
  });
}
// 输入联想
/*
question：用户问句
size：需要返回的推荐条数 （最大值为20）
pubkey：公钥
op：smarbox标志位
sign：签名(生成方法通yibot普通协议的签名生成方式)*/
export function smartbox(params) {
  var question = params.text.replace("\n", "");
  let size = 10;
  let op = "smartbox";
  var raw_str = op + pubkey + question + size + privateKey;
  var base64_str = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(raw_str)
  );
  var sign = CryptoJS.MD5(base64_str).toString();
  let data = {
    size,
    pubkey,
    op,
    sign,
    question
  };
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/znkf/interface/smartbox/search`,
    params: data
  });
}
// 定位
export function getIPLocation() {
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL_LOCATION : ""
    }/ws/location/v1/ip?key=GIPBZ-VZE3F-N7HJK-NKXNB-UDED3-SGFTT`
  });
}
//根据approveId获取approveCode
export function getRightsTempByPage(approveId){
	var timestamp = (Date.now() / 1000).toFixed();
	var nonce = Math.random()
	.toString(36)
	.substr(2);
	var signature = sha256(timestamp + token + nonce + timestamp)
	.toString(CryptoJS.enc.Hex)
	.toUpperCase();
	return request({
	headers: {
	"x-tif-paasid": paasid,
	"x-tif-signature": signature,
	"x-tif-timestamp": timestamp,
	"x-tif-nonce": nonce,
	"Content-Type": "application/json"
	},
	method: "GET",
	url: `${
	process.env.NODE_ENV == "production" ? BASE_URL : ""
	}/ebus/cssg_kc_zwfwsxgl/exchangeDataInterface/v2/getRightsTempByPage?cond={"rightsState":"1","approveId":"${approveId}"}&page=1&rows=1`
	});
}
// yibotQuery 会返回一个事件码taskCode
// 发送消息先使用yibotQuery 然后调getAuditItemDetail_Cur
export function getAuditItemDetail_Cur(taskCode) {
  var timestamp = (Date.now() / 1000).toFixed();
  var nonce = Math.random()
    .toString(36)
    .substr(2);
  var signature = sha256(timestamp + token + nonce + timestamp)
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();
  return request({
    headers: {
      "x-tif-paasid": paasid,
      "x-tif-signature": signature,
      "x-tif-timestamp": timestamp,
      "x-tif-nonce": nonce,
      "Content-Type": "application/json"
    },
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/ebus/sxml_be/event/getAuditItemDetail_Cur?TASK_CODE=${taskCode}`
  });
}
//查询事项相关常见问题接口
export function getEventDetail(approveId) {
  var timestamp = (Date.now() / 1000).toFixed();
  var nonce = Math.random()
    .toString(36)
    .substr(2);
  var signature = sha256(timestamp + token + nonce + timestamp)
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();
  return request({
    headers: {
      "x-tif-paasid": paasid,
      "x-tif-signature": signature,
      "x-tif-timestamp": timestamp,
      "x-tif-nonce": nonce,
      "Content-Type": "application/json"
    },
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/ebus/cssg_kc_zwfwsxgl/exchangeDataInterface/v2/getCsApproveFaqByPage?cond={"approveId":"${approveId}"}&page=1&rows=100`
  });
}
// 获取下面办事处
export function getOrgInfoById(sjXzqm) {
  var timestamp = (Date.now() / 1000).toFixed();
  var nonce = Math.random()
    .toString(36)
    .substr(2);
  var signature = sha256(timestamp + token + nonce + timestamp)
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();
  return request({
    headers: {
      "x-tif-paasid": paasid,
      "x-tif-signature": signature,
      "x-tif-timestamp": timestamp,
      "x-tif-nonce": nonce,
      "Content-Type": "application/json"
    },
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/ebus/cssg_kc_zwfwsxgl/exchangeDataInterface/v1/getOrgInfoById?cond={"sjXzqm":"${sjXzqm}"}&page=1&rows=15000&sidx=asc&sord=orgXzqm`
  });
}
export function getAppsIcon() {
  var raw_str = pubkey + privateKey;
  var base64_str = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(raw_str)
  );
  var sign = CryptoJS.MD5(base64_str).toString();
  let data = {
    pubkey,
    sign
  };
  return request({
    method: "GET",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/znkf/exconfig/plugin-center/api/v1/plugin-config/yibot-view/store-65602537-ad67663c-c847-4ea5-ad71-c11ecd67e9fe`,
    params: data
  });
}
// 获取办事指南详情
export function getWorkDetail(approveCode) { 
  var timestamp = (Date.now() / 1000).toFixed();
  var nonce = Math.random()
    .toString(36)
    .substr(2);
  var signature = sha256(timestamp + token + nonce + timestamp)
    .toString(CryptoJS.enc.Hex)
    .toUpperCase();
    let obj = {}
  obj['approveCode'] = approveCode
  const data = {
      page: 1,
      rows: 50,
      cond: JSON.stringify(obj)
    }
  return request({
    headers: {
      "x-tif-paasid": paasid,
      "x-tif-signature": signature,
      "x-tif-timestamp": timestamp,
      "x-tif-nonce": nonce,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {...data},
    method: "POST",
    url: `${
      process.env.NODE_ENV == "production" ? BASE_URL : ""
    }/ebus/cssg_cards/api/transform/ebus/cssg_kc_zwfwsxgl/exchangeDataInterface/v2/getApproveInfoBasicByPage`
  });
}
// 兜底搜索接口
export function getEventclause(keyword,regionCode) {
  return request({
    method: "GET",
    //url: `/portal_s/portal/api/search?pageNum=1&pageSize=2&keyword=${keyword}&regionCode=${regionCode}&forceQry=0&departmentCode=&onlyCorrespondingLevel=false&onlyOnlineable=false&itemType=&searchType=[%22guide%22]&page=%7B%22guide%22%3A%7B%22page%22%3A1%2C%22pageSize%22%3A10%7D%7D`
    url: `/portal/api/search?pageNum=1&pageSize=2&keyword=${keyword}&regionCode=${regionCode}&forceQry=0&departmentCode=&onlyCorrespondingLevel=false&onlyOnlineable=false&itemType=&searchType=["guide"]&page=%7B%22guide%22%3A%7B%22page%22%3A1%2C%22pageSize%22%3A10%7D%7D`
    //{'guide':{'page':1,'pageSize':10}}
    //
});
  
}
// http://smartgate.changsha.gov.cn/znkf/exconfig/plugin-center/api/v1/plugin-config/yibot-view/store-65602537-ad67663c-c847-4ea5-ad71-c11ecd67e9fe
