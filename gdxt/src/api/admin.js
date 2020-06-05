import { axios } from "@/utils/request";
import Qs from "qs";
import api from "./config";
import { domain_ywtb } from "../utils/domain";
import { previewRequest } from "../utils/previewRequest";
// =================系统服务====================/
/**
 * 登录
 * @parameter {
    “username”:”zhangsan”,  //用户名
    “pwd”:”123456”,  //密码
  }
 *
 */
export function login(parameter) {
  // return axios({
  //   url: api.login,
  //   method: "get",
  //   params: parameter
  // });
  return axios({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        data = Qs.stringify(data);
        return data;
      }
    ],
    url: api.login,
    method: "post",
    data: parameter
  });
}
/**
 * 获取登录人的信息
 * @parameter {}
 */
export function getInfo(parameter) {
  return axios({
    url: api.getInfo,
    method: "get",
    data: parameter
  });
}
// 获取卡证类型
export function getCardType(parameter) {
  return axios({
    url: api.getCardType,
    method: "get",
    data: parameter
  });
}

/**
 * 新增管理员
 * @parameter {
        “identityCardName ”:”身份证”,  //身份证照名称
        “identityCardCode”:”432503199988777”,  //身份证照编号
        “name”:”张三”,  //姓名
        “pwd”:”123456”,  //登录密码
        “company”:”腾云悦智”,  //单位
        “department”:”财务部”,  //部门
        “mobilePhone”:”18888888888”,  //手机号
        “gender”:”女”,  //性别
        “birthDate”:”1999-9-9”,  //出生日期
        “position”:”出纳”,  //岗位
        “status”:1,  //是否启用(1:启用；0：不启用)
        “roleIdList”:[1, 2, ……]  //角色ID列表
      }
 */
export function addAdmin(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        return JSON.stringify(data);
      }
    ],
    url: api.addAdmin,
    method: "post",
    data: parameter
  });
}
/**
 * 修改管理员
 * @parameter {
      “id”: 12,     //主键ID
      “identityCardName ”:”身份证”,  //身份证照名称
      “identityCardCode”:”432503199988777”,  //身份证照编号
      “name”:”张三”,  //姓名
      “pwd”:”123456”,  //登录密码
      “company”:”腾云悦智”,  //单位
      “department”:”财务部”,  //部门
      “mobilePhone”:”18888888888”,  //手机号
      “gender”:”女”,  //性别
      “birthDate”:”1999-9-9”,  //出生日期
      “position”:”出纳”,  //岗位
      “status”:1,  //是否启用(1:启用；0：不启用)
      “roleList”:[ 1, 2, ……]  //角色列表
    }
 */
export function updateAdmin(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        return JSON.stringify(data);
      }
    ],
    url: api.updateAdmin,
    method: "post",
    data: parameter
  });
}
/**
 * 搜索管理员
 * @parameter {
            identityCardCode=345234523342424,  //身份证照编号
            phone=13888888888,  //手机号
            name=戴永明  //管理员姓名
            company=腾云悦智,  //单位
            department=财务部,  //部门
            pageNum=2  //页码(值为-1不分页)
          }
 */
export function searchAdmin(parameter) {
  return axios({
    url: api.searchAdmin,
    method: "get",
    params: parameter
  });
}
/**
 * 获取登录验证吗
 */
export function loginVerify(parameter) {
  return axios({
    url: api.loginVerify,
    method: "get",
    params: parameter
  });
}

/**
 * 新增角色
 * @parameter {
                “name”:”普通用户”,  //角色名称
                “permissionIdList”:[1, 2, ……],  //角色权限列表
                “adminIdList”:[1, 2, ……],  //对应用户列表
                “status”:1  启用标志(1:是， 0:否)
              }
 */
export function addRole(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        return JSON.stringify(data);
      }
    ],
    url: api.addRole,
    method: "post",
    data: parameter
  });
}
/**
 * 修改角色
 * @parameter {
                “id”: 12,     //主键ID
                “name”:”普通用户”,  //角色名称
                “permissionIdList”:[1, 2, ……],  //角色权限列表
                “adminIdList”:[1, 2, ……],  //对应用户列表
                “status”:1  启用标志(1:是， 0:否)
              }
 */
export function updateRole(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        return JSON.stringify(data);
      }
    ],
    url: api.updateRole,
    method: "post",
    data: parameter
  });
}
/**
 * 搜索角色
 * @parameter {
                code=role001,  //角色编号
                name=普通用户  //角色名称
                status=1,  //是否启用
                pageNum=2  //页码(值为-1不分页)
              }
 */
export function searchRole(parameter) {
  return axios({
    url: api.searchRole,
    method: "get",
    params: parameter
  });
}
/**
 * 搜素权限
 * @parameter {
                ”adminId“:"role001",  //管理员ID
              }
 */
export function searchPermission(parameter) {
  return axios({
    url: api.searchPermission,
    method: "get",
    params: parameter
  });
}
// =================公告服务====================/
/**
 * 新增公告
 * @parameter {
              “title”:”放假”,  //公告标题
              “releaseTime”:”2020-02-24 23:59:59”,  //发布时间
              “type”:”系统消息”,  //公告类型
              “coverImageUrl”:”http://xxxxxx/xxxx”,  //封面图片
              “content”:”春节快乐！”  //公告内容
            }
 */
export function addNotice(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        return JSON.stringify(data);
      }
    ],
    url: api.addNotice,
    method: "post",
    data: parameter
  });
}
/**
 * 搜索公告
 * @parameter {
                "key":放'假公告'',  //搜索关键字
                "“pageNum”":2  //页码
              }
 */
export function searchNotice(parameter) {
  return axios({
    url: api.searchNotice,
    method: "get",
    params: parameter
  });
}
/**
 * 修改公告
 * @parameter {
                “id”:11,
                “title”:”zhangshan”,  //公告标题
                “releaseTime”:”2020-02-24 23:59:59”,  //发布时间
                “type”:”系统消息”,  //公告类型
                “coverImageUrl”:”http://xxxxxx/xxxx”,  //封面图片
                “content”:”春节快乐！”,  //公告内容
              }
 */
export function updateNotice(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        return JSON.stringify(data);
      }
    ],
    url: api.updateNotice,
    method: "post",
    data: parameter
  });
}
/**
 * 删除公告
 * @parameter {
                “id”:“公告记录ID”
              }
 */
export function deleteNotice(parameter) {
  return axios({
    url: `${api.deleteNotice}/${parameter.id}`,
    method: "post",
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        data = Qs.stringify(data);
        return data;
      }
    ],
    params: parameter
  });
}
// idList
export function deleteSelectedNotice(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        data = Qs.stringify(data);
        return data;
      }
    ],
    url: `${api.deleteSelectedNotice}`,
    method: "delete",
    data: parameter
  });
}

// =================收藏统计====================/
/**
 * 搜索收藏
 * @parameter {
                "sid":"124fff"  //用户标识ID
                "username":"李四"  //用户姓名
                "title":"出生医学证明首次签发及换发"   //标题
                "pageNum":2  //页码
              }
 */

export function searchCollection(parameter) {
  return axios({
    url: api.searchCollection,
    method: "get",
    params: parameter
  });
}
// =================用户管理====================/
/**
 * 搜索用户
 * @parameter {
                "cardCode":"430521199512212341"  //证件号码
                "name":"戴永明"  //用户姓名
                "phone":18122223333  // 手机号
                "isOnline":1  //是否在线(1:在线)
                "pageNum":10  //页码
              }
 */
export function searchUser(parameter) {
  return axios({
    url: api.searchUser,
    method: "get",
    params: parameter
  });
}

/**
 * 删除用户
 * @parameter {
                id:'jksdkjds'//用户记录ID
              }
*/
export function deleteUser(parameter) {
  return axios({
    url: `${api.deleteUser}/${parameter.id}`,
    method: "delete",
    params: parameter
  });
}
/**
 * 修改用户
 * @parameter {
                “id”:123456,    //用户记录ID
                "nation”:"汉族",  //民族
                "province”:"湖南省",	//收件省份
                "city”:"长沙市",	//收件城市
                "district”:"岳麓区",	 // 收件区县
                "detailedAddress”:"环湖路金茂大厦20层",  //收件详细地址
                "email”:"8888@qq.com",	//邮箱地址
                "emergencyContact”:"张三", //紧急联系人
                "emergencyContactPhone”:"13333333333" //紧急联系人电话
              }
*/
export function updateUser(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        return JSON.stringify(data);
      }
    ],
    url: api.updateUser,
    method: "post",
    data: parameter
  });
}
// =================证照管理====================/
/**
 * 解绑证照
 * @parameter {
                id:绑定记录ID
              }
*/
export function unbindCard(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        return JSON.stringify(data);
      }
    ],
    url: `${api.unbindCard}/${parameter.id}`,
    method: "put",
    data: parameter
  });
}
/**
 * 搜索证照
 * @parameter {
                cardType=卡证类  //证照类型
                cardName=身份证  //证照名称
                cardCode=4325031999999999  //证照编号
                holderIdentityCardCode=123456  //持有人身份证照编号
                pageNum=2  //页码
              }
*/
export function searchCard(parameter) {
  return axios({
    url: api.searchCard,
    method: "get",
    params: parameter
  });
}
/**
 * 搜索亮照
 * @parameter {
                cardType=卡证类    //证照类型
                cardName=身份证  //证照名称
              }
*/
export function searchCardShown(parameter) {
  return axios({
    url: api.searchCardShown,
    method: "get",
    params: parameter
  });
}

// =================搜索事项====================/
/**
 * 搜索事项
 * @parameter {
                serialNum= 345234523342424,  //流水号
                itemsCode=11430105006146107X,  //事项编号
                applicantName=戴永明  //申办人
                pageNum=2  //页码
              }
*/
export function searchItems(parameter) {
  return axios({
    url: api.searchItems,
    method: "get",
    params: parameter
  });
}
// searchCanNetwork
//
/**
 * 搜索可网办事项
 * @parameter {
                code= 345234523342424,  //事项编码
                name=出生医学证明首次签发及换发  //事项名称
                orgName=长沙市应急管理局  //组织机构名称
                serviceObject=个人  //服务对象
                isHandle=1  //小程序是否可办理
                pageNum=2  //页码(-1为全部)
                pageSize=10  //每页记录数
              }
 */
export function searchCanNetwork(parameter) {
  return axios({
    url: api.searchCanNetwork,
    method: "get",
    params: parameter
  });
}
/**
 * 设置可网办事项
 * @parameter [
                {
                "id":" 345234523342424",  //标识ID
                    "isHandle":true,  //小程序是否可办理
                "dockingMode ":1,  //对接方式
                }, ……
              ]
 */
export function setCanNetwork(parameter) {
  return axios({
    headers: {
      "Content-Type": "application/json"
    },
    url: api.setCanNetwork,
    method: "post",
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        return JSON.stringify(data);
      }
    ],
    data: parameter
  });
}
/**
/**
 * 查询事件详情
 * /workorders/{idOrCode}/view
 * idOrCode  工单标识/工单流水号-工单信息
 */
export function viewWorkers(Code) {
  console.log('domain_ywtb~~~>', domain_ywtb)
  return axios({
    baseURL: domain_ywtb, // process.env.VUE_APP_API_BASE_URL_GETEVT,
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        return JSON.stringify(data);
      }
    ],
    url: `/gaio_order4outer_be/out-workorder-apis/workorders/${Code}/view?mark=code`,
    method: "post",
    data: { Code }
  });
}
/**
 * 办事下载附件
 * // http://smartgate.changsha.gov.cn/ebus/gaio_order4outer_be/out-workorder-apis/workorders/out/files/e595d1724d1c8c9924f995b160b28bbc?mark=byte&fileId=
 */
export function downloadAttachment(url) {
  return axios({
    baseURL: domain_ywtb, // process.env.VUE_APP_API_BASE_URL_GETEVT,
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        // 在请求之前对data传参进行格式转换
        return JSON.stringify(data);
      }
    ],
    url: `/gaio_order4outer_be/out-workorder-apis/workorders/out/files/${url}?mark=byte&fileId=`,
    method: "post",
    data: { url }
  });
}
/**
 * 用户导出
 * @param {*} {cardCode: 证件号码, name: 用户姓名，phone: 手机号，isOnline: 1 在线}
 */
export function userDownload(query, isLine) {
  return `${api.userDownload}?cardCode=${query.cardCode}&name=${query.name}&phone=${query.phone}&isOnline=${isLine}`;
}

/**
 * 证照导出
 * @param {*} { * }
 */
export function cardDownload(query) {
  return `${api.cardDownload}?cardType=${query.cardType}&cardId=${query.cardId}&cardCode=${query.cardCode}&holderIdentityCardCode=${query.holderIdentityCardCode}`;
}
// 导出亮证
export function cardDownloadShown(query) {
  return `${api.cardDownloadShown}?cardType=${query.cardType}&cardId=${query.cardId}`;
}
// 导出事项
export function itemsDownload(query) {
  return `${api.itemsDownload}?serialNum=${query.serialNum}&itemsName=${query.itemsName}&applicantName=${query.applicantName}`;
}
// 管理员
export function adminDownload(query) {
  return `${api.adminDownload}?identityCardCode=${query.identityCardCode}&phone=${query.phone}&name=${query.name}&company=${query.company}&department=${query.department}`;
}
// 导出角色
export function downloadRole(query) {
  return `${api.downloadRole}?code=${query.code}&name=${query.name}&status=${query.status}`;
}
// 导出收藏
export function collectionDownload(query) {
  return `${api.collectionDownload}?sid=${query.sid}&username=${query.username}&title=${query.title}`;
}

// =================首页====================/
// getVisitCount
export function getVisitCount() {
  return axios({
    // baseURL: 'http://10.94.71.64:9010/amc',
    url: api.getVisitCount,
    method: "get",
    params: {}
  });
}
// 查询本月本周活跃用户

export function getVisitRate() {
  return axios({
    // baseURL: 'http://10.94.71.64:9010/amc',
    url: api.getVisitRate,
    method: "get",
    params: {}
  });
}

/**
 * 获取指定日期范围内的活跃用户
 * @parameter {
                startDate ,  // 开始时间
                endDate // 结束时间
              }
*/
export function getVisitStatistics(params) {
  return axios({
    // baseURL: 'http://10.94.71.64:9010/amc',
    url: api.getVisitStatistics,
    method: "get",
    params: { ...params }
  });
}
/**
 * 获取用户画像相关数据
 * @parameter {
                userType 用户类型 1：新增用户，2：活跃用户
                cycleType 周期类型 1：昨天，2：近七天，3：近30天
              }
*/
export function getVisitPortrait(params) {
  return axios({
    // baseURL: 'http://10.94.71.64:9010/amc',
    url: api.getVisitPortrait,
    method: "get",
    params: { ...params }
  });
}
/**
 * 事项增长比例
 * @parameter {}
 */
export function getStatisticsRate() {
  return axios({
    url: api.getStatisticsRate,
    method: "get",
    params: {}
  });
}
/**
 * 事项趋势统计
 * @parameter {
                startDate ,  // 开始时间
                endDate // 结束时间
              }
*/
export function getStatisticsTrend(params) {
  return axios({
    url: api.getStatisticsTrend,
    method: "get",
    params: { ...params }
  });
}
// =================消息管理====================/

/**
 * 消息查询
 * @parameter {
                receiverName=zhangshan,  //接收人名
                receiverIdCard=4311…,  //接收人身份证号
                receiverPhone=158…,   //接收人手机号
                type=1,   //消息类型，1-短信，2-邮件，3-站内信，4-微信
                start=2020-03-20,//开始时间
                end=2020-03-29,//结束时间
                page=1,//页码
                size=10,//分页大小
              }
*/
export function getMessages(params) {
  return axios({
    url: api.getMessages,
    method: "get",
    params: { ...params }
  });
}
/**
 * 
 * 字典：code
      事项对接方式：items_docking_mode
      公告类型：notice_type
      消息类型：message_type
 */
// =================获取字典====================/
export function getDict(code) {
  return axios({
    url: `${api.getDict}/${code}`,
    method: "get",
    params: {}
  });
}
//
export function getCardImage(parameter) {
  // return previewRequest(parameter)
  const config = {
    url: "/cssg_gagrzzzz/license/image_file",
    parameter
  };
  return previewRequest(config)
  // return axios({
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   },
  //   transformRequest: [
  //     function(data) {
  //       // 在请求之前对data传参进行格式转换
  //       data = Qs.stringify(data);
  //       return data;
  //     }
  //   ],
  //   // baseURL: "http://smartgate.0x5f81.cn",
  //   baseURL: "",
  //   url: "/cssg_gagrzzzz/license/image_file",
  //   method: "post",
  //   data: parameter
  // });
}
