import { TEXT, DETAIL, ANSWER, QUESTION } from "../config/messageType";
export default {
  data() {
    return {
      messageList: [], //消息列表
      pageLoading: false, //页面加载状态
      subDict: {},
      subDictShow: false, //
      allDict: [], //区：岳麓区/芙蓉区/长沙市直...
      allDictChildren: [], //区下面的街道
      mmm: {}, //存档当前区下的街道是否加载过的flag
      currentViewDict: "", //当前查看的区
      currentViewStreent: "", //当前查看的街道
      currentViewDictLabel: "", //当前查看的街道的名字
      suggestions: [], //输入联想
      showModal: false, //pc 显示输入反馈意见的modal
      edmitFBItem: "", //当前点击满意/不满意的回复
      allCommQuestion: [],
      defaultCommonQuestioned: [],
      tel: "--",
      locationIp: "127.0.0.1",
      // commonQuestiones: [],
      moreApps: [
        // {
        //   name: "公积金",
        //   img: "公积金中心",
        //   url: "http://gjjzx.changsha.gov.cn/"
        // },
        // {
        //   name: "社保",
        //   img: "社保中心",
        //   url: "http://www.cs12333.com/revision/"
        // },
        // {
        //   name: "公安局",
        //   img: "长沙市公安局",
        //   url:
        //     "http://zwfw-new.hunan.gov.cn/portal/branch-hall?orgCode=006127037"
        // },
        // {
        //   name: "监督管理",
        //   img: "长沙市市场监督管理局",
        //   url:
        //     "http://zwfw-new.hunan.gov.cn/portal/branch-hall?orgCode=006127037"
        // }
      ], //更多应用
      iconUrl: "",
    };
  },
  computed: {
    //猜你想问
    commonQuestiones() {
      let target = this.allCommQuestion.filter(
        (a) => a.areaCode == this.currentViewDict
      )[0];
      let questions = [];
      if (target) {
        questions = target.question.split(";");
      } else {
        questions = this.defaultCommonQuestioned;
      }
      return questions;
      // this.areaCode
      // currentViewDict
    },
  },
  methods: {
    closeFB() {
      this.showModal = false;
    },
    getTel() {
      this.$api.getTel().then((res) => {
        this.tel = res.data.phone;
      });
    },
    handleSatisfy(item) {
      // reason type
      // corre_water_feedback id question
      let { targetAnswer } = item;
      let _item = {
        reason: "",
        type: 2,
        id: targetAnswer.id,
        question: targetAnswer.question,
        corre_water_feedback: item.corre_water_feedback,
      };
      this.pageLoading = true;
      this._submitFB(_item).then((res) => {
        this.pageLoading = false;
        this.onAddMessage({
          send: false,
          contentType: TEXT,
          content: `感谢您的肯定，很高兴为您服务。`,
        });
      });
    },
    _submitFB(item) {
      // reason type
      // corre_water_feedback id question
      let { reason, type, id, question, corre_water_feedback } = item;
      return this.$api.yibotFeedBack({
        reason,
        type,
        id,
        question,
        corre_water_feedback,
      });
    },
    handleUnsatisfy(item) {
      this.showModal = true;
      this.edmitFBItem = item;
    },
    summitFBMB(msg) {
      this.fbMsg = msg;
      this.summitFB();
    },
    summitFB() {
      if (!this.fbMsg) {
        return;
      }
      let { targetAnswer } = this.edmitFBItem;
      let _item = {
        reason: this.fbMsg,
        type: 3,
        id: targetAnswer.id,
        question: targetAnswer.question,
        corre_water_feedback: this.edmitFBItem.corre_water_feedback,
      };
      this.pageLoading = true;
      this.showModal = false;
      this._submitFB(_item).then((res) => {
        this.pageLoading = false;
        this.fbMsg = "";
        this.onAddMessage({
          send: false,
          contentType: TEXT,
          content: `感谢您的反馈，我会再接再厉提升自己～`,
        });
      });
    },
    // 根据定位结果提示用户
    async handleLocation() {
      this.pageLoading = true;
      try {
        // const res = await this.$api.getIPLocation();
        var data = {
          key: "GIPBZ-VZE3F-N7HJK-NKXNB-UDED3-SGFTT",
        };
        var url = "https://apis.map.qq.com/ws/location/v1/ip";
        data.output = "jsonp";
        this.$jsonp(url, data)
          .then((res) => {
            if (res.result) {
              let result = res.result;
              let { ad_info, ip } = result;
              this.locationIp = ip;
              let { adcode, city, district, province } = ad_info;
              let _sjXzqm = parseInt(parseInt(adcode) * 1000000);
              if (city != "长沙市") {
                _sjXzqm = "430100000000";
                district = "长沙市直";
                this.currentViewDict = "430101000000";
                this.onAddMessage({
                  send: false,
                  contentType: TEXT,
                  content: `当前咨询区域为：${district}`,
                });
                return;
              } else {
                this.currentViewDict = String(_sjXzqm);
              }
              if (district && district == "长沙市直") {
                this.currentViewDict = String(_sjXzqm);
                this.mmm[_sjXzqm] = true;
                this.onAddMessage({
                  send: false,
                  contentType: TEXT,
                  content: `当前咨询区域为：${district}`,
                });
                return;
              }
              this.getOrgInfoById(_sjXzqm).then((ll) => {
                if (ll && ll.data && ll.data.contents) {
                  this.mmm[_sjXzqm] = true;
                  let contents = ll.data.contents;
                  contents.sort((a, b) => a.orgXzqm - b.orgXzqm);
                  let qbjTarget = contents.filter(
                    (c) => c.orgXzqm.substring(6) == "999000"
                  )[0];
                  let otTargetes = contents.filter(
                    (c) =>
                      c.orgXzqm.substring(6) != "999000" && c.jglx != "县级窗口"
                  );
                  if (qbjTarget) {
                    contents = [qbjTarget].concat(otTargetes);
                  }

                  let _d = contents.map((c) => {
                    let { orgShowname, orgXzqm, sjXzqm, orgId } = c;
                    return {
                      label: orgShowname,
                      value: orgShowname,
                      orgXzqm,
                      sjXzqm,
                      orgId,
                      pid: _sjXzqm,
                    };
                  });
                  if (!district) {
                    this.currentViewDict = "430101000000";
                  }
                  this.onAddMessage({
                    send: false,
                    contentType: TEXT,
                    content: `当前咨询区域为：${
                      district ? district + "," : ""
                    }${_d[0].label}`,
                  });

                  let key = _sjXzqm;
                  let obj = { key, data: _d };
                  this.allDictChildren.push(obj);
                } else {
                  this.currentViewDict = "430101000000";
                }
                this.pageLoading = false;
              });
            } else {
              this.currentViewDict = "430101000000";

              this.onAddMessage({
                send: false,
                contentType: TEXT,
                content: `${res.message}`,
              });
            }
          })
          .catch(() => {
            this.pageLoading = false;
            this.onAddMessage({
              send: false,
              contentType: TEXT,
              content: "定位失败",
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    getIcon() {
      this.$api.getIcon().then((res) => {
        let resData = res.data;
        if (resData) {
          if (resData.logo) {
            var link =
              document.querySelector("link[rel*='icon']") ||
              document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "shortcut icon";
            link.href = resData.logo;
            document.getElementsByTagName("head")[0].appendChild(link);
            this.iconUrl = resData.logo;
          }
          //因为返回的数据格式不规范 所以只能根据key模糊来查找配置了多少个更多icons
          Object.keys(resData).forEach((key) => {
            if (key.indexOf("url") > -1) {
              let iconsKey = key.split("url")[1];
              this.moreApps.push({
                name: resData["name" + iconsKey],
                img: resData["img" + iconsKey],
                url: resData["url" + iconsKey],
              });
            }
          });
        }
      });
    },
    getGreentings() {
      let now = new Date();
      let hour = now.getHours();
      let text = "";
      let weType = "";
      if (hour < 6) {
        text = "凌晨好";
        weType = "lc";
      } else if (hour < 9) {
        text = "早上好";
        weType = "zs";
      } else if (hour < 12) {
        text = "上午好";
        weType = "sw";
      } else if (hour < 14) {
        text = "中午好";
        weType = "zw";
      } else if (hour < 17) {
        text = "下午好";
        weType = "xw";
      } else if (hour < 19) {
        text = "傍晚好";
        weType = "bw";
      } else if (hour < 22) {
        text = "晚上好";
        weType = "ws";
      } else {
        text = "夜里好";
        weType = "sy";
      }
      this.$api.getGreentings().then((res) => {
        if (res.data) {
          this.onAddMessage({
            send: false,
            contentType: TEXT,
            content: res.data["WelcomeMessage_" + weType],
          });
        } else {
          this.onAddMessage({
            back: true,
            contentType: TEXT,
            content: `${text}，智能咨询为您服务，请问有什么可以帮到您?`,
          });
        }
      });
    },
    // 猜你想问
    getCommonQuestion() {
      this.$api.getCommonQuestiones().then((res) => {
        if (res.data) {
          this.allCommQuestion = JSON.parse(res.data.locationquestion);
          let questiones = res.data.question.split(";");
          this.defaultCommonQuestioned = questiones;
        }
      });
      // this.$api.getCommonQuestion().then(res => {
      //   if (res.data && res.data.question) {
      //     let questiones = res.data.question.split(";");
      //     this.commonQuestiones = questiones;
      //   }
      // });
    },
    querySuggestions() {},
    async getAllDict() {
      this.pageLoading = true;
      let orgXzqm = 430100000000;
      return this.getOrgInfoById(orgXzqm);
    },
    getOrgInfoById(sjXzqm) {
      return this.$api.getOrgInfoById(sjXzqm);
    },
    selectquestion(question) {
      this.sendMessage(question);
    },
    async encodeMsg(res, message) {
      let info = res.info;
      let targetAnswer = info[0];
      if (targetAnswer) {
        let { answer, id } = targetAnswer;
        if (answer.startsWith("approveCode:")) {
          let code = answer.split("approveCode:")[1];
          this.$api.getAuditItemDetail_Cur(code).then((res2) => {
            if (res2.data && res2.data.AUDIT_ITEM) {
              this.onAddMessage({
                send: false,
                contentType: DETAIL,
                content: res2.data,
                showFd: true,
                targetAnswer: targetAnswer,
                corre_water_feedback: res.corre_water_feedback,
              });
            } else {
              let tel = this.tel;
              this.onAddMessage({
                send: false,
                contentType: TEXT,
                content: `暂无具体内容,您可以拨打<a
                  href='tel:${tel}'
                >${tel}</a>进行咨询`,
              });
            }
            this.pageLoading = false;
          });
          return;
        }
        let msgType = res.type;
        //如果是200直接回答显示 relate
        // 如果是300显示info中的 question
        if (msgType == 200) {
          this.onAddMessage({
            send: false,
            contentType: ANSWER,
            content: info,
          });
        } else if (msgType == 300) {
          this.onAddMessage({
            send: false,
            contentType: QUESTION,
            content: info,
          });
        }
        this.pageLoading = false;
      }
    },
    async sendMessage(msg) {
      if (!msg.replace(/(^\s+)|(\s+$)/g, "")) {
        return false;
      }
      const message = msg;
      this.message = null;
      let errMsg = null;
      this.onAddMessage({
        send: true,
        contentType: TEXT,
        content: msg,
      });
      this.pageLoading = true;
      try {
        let p1 = this.currentViewDict;
        let p2 = this.currentViewStreent;
        let labels = p2 ? p2 : p1;
        let res = await this.$api.yibotQuery({
          text: message.replace(/\.{2}/g, ""), // 加了..的请求会被拦截掉，waf会匹配到 ..\ 识别为路径穿越攻击
          labels,
          ip:this.locationIp
        });
        if (res.msg == "success") {
          //  判断 approveCode:55430111060110383Y00000000000000
          if (res.reject_recog == 1) {
            let resReject_recog = await this.$api.yibotQuery({
              text: message.replace(/\.{2}/g, ""), // 加了..的请求会被拦截掉，waf会匹配到 ..\ 识别为路径穿越攻击
              labels: p1,
              ip:this.locationIp
            });
            if (resReject_recog.reject_recog == 1) {
              let resReject_recog2 = await this.$api.yibotQuery({
                text: message.replace(/\.{2}/g, ""), // 加了..的请求会被拦截掉，waf会匹配到 ..\ 识别为路径穿越攻击
                labels: "430100000000",
                ip:this.locationIp
              });
              if (resReject_recog2.reject_recog == 1) {
                let tel = this.tel;
                this.onAddMessage({
                  send: false,
                  contentType: TEXT,
                  content: `当前区域暂无该问题的具体回复,您可以拨打<a
            href='tel:${tel}'
          >${tel}</a>进行咨询`,
                });
                this.pageLoading = false;
                return;
              }
              this.encodeMsg(resReject_recog2, message);
              return;
            }
            this.encodeMsg(resReject_recog, message);
            this.pageLoading = false;
            return;
          }
          this.encodeMsg(res, message);
          this.pageLoading = false;
          return;
        }
        this.pageLoading = false;
        errMsg = "系统正在升级中，请稍后再试...";
      } catch (err) {
        this.pageLoading = false;
        errMsg = "系统正在升级中，请稍后再试...";
      }
      this.pageLoading = false;
      errMsg &&
        this.onAddMessage({
          send: false,
          contentType: TEXT,
          content: errMsg,
        });
    },
    onAddMessage(msgItem) {
      this.messageList.push(msgItem);
    },
  },
};
