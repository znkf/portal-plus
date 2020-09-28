<template>
  <div class="m-wrapper">
    <div class="m-header">
      <span class="m-header__icon">
        <img src="../../assets/images/logo.png" alt="logo" style="width:100%" />
      </span>
      <span style="margin-left:12px;">智能客服系统</span>
    </div>
    <div class="m-message__container">
      <div class="m-message__list" ref="messageScroll">
        <div ref="messageEle">
          <Message
            :messageList="messageList"
            @selectquestion="selectquestion"
            @selectmessage="selectmessage"
            @satisfy="handleSatisfy"
            @unsatisfy="handleUnsatisfy"
            @newanswer="handleNewAnswers"
            :gqList="commonQuestiones"
            :mobile="true"
          />
        </div>
        <div v-if="pageLoading">
          <div class="loader-wrap" style="bottom: auto;">
            <div class="showbox clearfix">
              <div class="loader" style="width:60px;">
                <svg class="circular" viewBox="25 25 50 50">
                  <circle
                    class="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lx-list" v-if="lxVisible">
      <div class="lx-item" v-for="(i,idx) in lxList" :key="idx">{{i}}</div>
    </div>
    <customer-textarea
      v-model="message"
      :fetch-suggestions="querySuggestions"
      @confirm="sendMessage"
      @showmore="showMore"
      @contactus="contactUs"
      @pickChange="handlePickerChange"
      @pickConfirm="handlePickerConfirm"
      :pickerColumns="pickerColumns2"
      :more-apps="moreApps"
      :smallpro="smallPro"
      :loading="loading"
      :pickValues="pickValues"
    ></customer-textarea>
    <feed-back :visible="showModal" @close="showModal = false" @confirm="summitFBMB" />
    <transition name="slidein">
      <div class="feedback" v-if="moreVisible">
        <div class="feedback-mask" @click="closeMore"></div>
        <div class="feedback-container">
          <div class="feedback-header">
            <div class>应用程序</div>
            <div class="close2" @click="closeMore">关闭</div>
          </div>
          <div class="feedback-content">
            <div class="app-list">
              <div class="app-item" v-for="(item, index) in moreApps" :key="index">
                <a class="app-item__content" target="_blank" :href="item.url">
                  <div class="app-icon">
                    <img :src="item.img" alt />
                  </div>
                  <div class="app-label">{{ item.name }}</div>
                </a>
              </div>
              <div class="no-app" v-if="!moreApps.length">暂无</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slidein">
      <div class="feedback" v-if="contactVisible">
        <div class="feedback-mask" @click="closeContact"></div>
        <div class="feedback-container">
          <div class="feedback-header">
            <div class>联系我们</div>
            <div class="close2" @click="closeContact">关闭</div>
          </div>
          <div class="feedback-content">
            <p class="contact-phone"></p>
            <div style="padding: 20px 0;">
              您可以拨打
              <a class="content-warn" :href="'tel:'+tel">{{tel}}</a>进行咨询
            </div>
            <a class="feedback-btn" :href="'tel:'+tel">拨打电话</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import customerTextarea from "../../components/customer-textarea-m";
import feedBack from "../../components/feedback";
import Message from "../../components/message";
import sendMessageJs from "../sendMessage";
import { TEXT } from "../../config/messageType";
export default {
  data() {
    return {
      lxVisible: false,
      moreVisible: false,
      contactVisible: false,
      showFb: false,
      message: "",
      otherCOnfig: [],
      smallPro: false,
      pickerColumns: [],
      pickerColumns2: [],
      loading: false,

      pickValues: [] //当前查看的区域
    };
  },
  computed: {
    dictChildren() {
      let target = this.allDictChildren.filter(
        a => a.key == this.currentViewDict
      )[0];
      if (target) {
        return target.data;
      }
      return [];
    }
  },
  watch: {
    dictChildren(newVal, oldVal) {
      newVal[0] && (this.currentViewStreent = newVal[0].orgXzqm);
    }
  },
  updated() {
    this.goBottom();
  },
  components: {
    customerTextarea,
    Message,
    feedBack
  },
  mixins: [sendMessageJs],
  mounted() {
    // setTimeout(() => {
    //   //
    //   let smallPro = false;
    //   wx.miniProgram.getEnv(function(res) {
    //     if (res.miniprogram) {
    //       smallPro = true;
    //     } else {
    //       smallPro = false;
    //     }
    //   });
    //   this.smallPro = smallPro;
    // }, 200);
  },
  async created() {
    this.getGreentings();
    this.getIcon();
    this.getCommonQuestion();
    await this.handleLocation2();
    this.getTel();
    this.loading = true;
  },
  methods: {
    // 根据定位结果提示用户
    mGetAllDict() {
      this.getAllDict().then(res => {
        let discts = [];
        if (res.data && res.data.contents && res.data.contents.length) {
          let contents = res.data.contents;
          discts = contents.map(c => {
            let { orgShowname, orgXzqm, sjXzqm } = c;
            return {
              label: orgShowname,
              value: orgShowname,
              orgXzqm,
              sjXzqm,
              isLeaf: false
            };
          });
        }
        this.allDict = discts;
        const col1 = discts.map(d => {
          return d.label;
        });
        let disabled = false;
        if (this.pickValues && this.pickValues[0] == "长沙市直") {
          disabled = true;
        }
        if (col1[0] == "长沙市直") {
          this.pickerColumns2 = [
            { values: col1 },
            { values: ["长沙市直"], disabled: disabled }
          ];
        } else {
          this.pickerColumns2 = [
            { values: col1 },
            { values: [], disabled: disabled }
          ];
        }

        this.pageLoading = false;
        this.loading = false;
      });
    },
    async handleLocation2() {
      this.pageLoading = true;
      try {
        // const res = await this.$api.getIPLocation();
        var data = {
          key: "GIPBZ-VZE3F-N7HJK-NKXNB-UDED3-SGFTT"
        };
        var url = "https://apis.map.qq.com/ws/location/v1/ip";
        data.output = "jsonp";
        this.$jsonp(url, data)
          .then(res => {
            this.mGetAllDict();
            
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
                  content: `当前咨询区域为：${district}`
                });
                this.setPickLabel([district]);
                return
              } else {
                this.currentViewDict = String(_sjXzqm);
              }
              if (district && district == "长沙市直") {
                this.currentViewDict = String(_sjXzqm);
                this.mmm[_sjXzqm] = true;
                this.onAddMessage({
                  send: false,
                  contentType: TEXT,
                  content: `当前咨询区域为：${district}`
                });
                this.setPickLabel([district]);
                return;
              }
              this.getOrgInfoById(_sjXzqm).then(ll => {
                if (ll && ll.data && ll.data.contents) {
                  this.mmm[_sjXzqm] = true;
                  let contents = ll.data.contents;
                  contents.sort((a, b) => a.orgXzqm - b.orgXzqm);
                  let qbjTarget = contents.filter(
                    c => c.orgXzqm.substring(6) == "999000"
                  )[0];
                  let otTargetes = contents.filter(
                    c =>
                      c.orgXzqm.substring(6) != "999000" && c.jglx != "县级窗口"
                  );
                  if (qbjTarget) {
                    contents = [qbjTarget].concat(otTargetes);
                  }

                  let _d = contents.map(c => {
                    let { orgShowname, orgXzqm, sjXzqm, orgId } = c;
                    return {
                      label: orgShowname,
                      value: orgShowname,
                      orgXzqm,
                      sjXzqm,
                      orgId,
                      pid: _sjXzqm
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
                    }${_d[0].label}`
                  });

                  let key = _sjXzqm;
                  let obj = { key, data: _d };
                  this.allDictChildren.push(obj);
                  if (district) {
                    this.setPickLabel([district, _d[0].label]);
                  } else {
                    this.setPickLabel([_d[0].label]);
                  }
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
                content: `当前咨询区域为：长沙市直`
              });
              this.setPickLabel(["长沙市直"]);
              this.onAddMessage({
                send: false,
                contentType: TEXT,
                content: `${res.message}`
              });
            }
          })
          .catch(() => {
            this.pageLoading = false;
            this.currentViewDict = "430101000000";
            this.setPickLabel(["长沙市直"]);
            this.onAddMessage({
              send: false,
              contentType: TEXT,
              content: "定位失败"
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
    setPickLabel(labels) {
      this.pickValues = labels;
    },
    handlePickerConfirm(options) {
      const values = options.values;
      const index = options.index;
      if (values[0] == "长沙市直") {
        this.pickValues = ["长沙市直"];
        this.onAddMessage({
          send: false,
          contentType: TEXT,
          content: `当前区域切换为：长沙市直`
        });
      }
    },
    handlePickerChange(options) {
      const values = options.values;
      const picker = options.picker;
      const index = options.index;
      if (values) {
        const dict = values[0];
        // const street = values[1];
        let target = this.allDict.filter(a => a.label == dict)[0];
        if (target) {
          const { orgXzqm } = target;
          if (index == 1) {
            this.pickValues = values;
            this.handleStreetChange(values, orgXzqm);
            return;
          }
          this.loadChildren(orgXzqm, picker);
        }
      }
    },
    handleStreetChange(values, _orgXzqm) {
      const targetChildren = this.allDictChildren.filter(
        a => a.key == _orgXzqm
      );

      if (targetChildren) {
        const _t = targetChildren[0].data.filter(d => d.label == values[1])[0];
        const { orgXzqm } = _t;
        this.currentViewStreent = orgXzqm;
      }
      if (values[0] == "长沙市直") {
        this.onAddMessage({
          send: false,
          contentType: TEXT,
          content: `当前区域切换为：${values[0]}}`
        });
        this.currentViewStreent = "";
      } else {
        this.onAddMessage({
          send: false,
          contentType: TEXT,
          content: `当前区域切换为：${values[0]},${values[1]}`
        });
      }
    },
    loadChildren(_orgXzqm, picker) {
      const dictTarget = this.allDict.filter(a => a.orgXzqm == _orgXzqm)[0];
      if (dictTarget && dictTarget.label == "长沙市直") {
        this.currentViewDict = String(_orgXzqm);
        this.currentViewStreent = "";
        this.mmm[_orgXzqm] = true;
        if (dictTarget) {
          let label = dictTarget.label;
          this.onAddMessage({
            send: false,
            contentType: TEXT,
            content: `当前区域切换为：${label}`
          });
          const children = ["长沙市直"];

          this.pickValues = ["长沙市直"];
          if (picker) {
            picker.setColumnValues(1, children);
          }
        }
        return;
      } else {
        this.currentViewDict = String(_orgXzqm);
      }
      if (_orgXzqm === "-9999") {
        this.onAddMessage({
          send: false,
          contentType: TEXT,
          content: `当前区域切换为：长沙市`
        });
        return;
      }
      if (this.mmm[_orgXzqm]) {
        if (dictTarget) {
          let label = dictTarget.label;
          this.onAddMessage({
            send: false,
            contentType: TEXT,
            content: `当前区域切换为：${label},${this.dictChildren[0].label}`
          });
          this.pickValues = [label, this.dictChildren[0].label];
        }

        const children = this.allDictChildren
          .filter(a => a.key == _orgXzqm)[0]
          .data.map($d => {
            return $d.label;
          });
        if (picker) {
          picker.setColumnValues(1, children);
        }
        return;
      }
      this.pageLoading = true;
      this.loading = true;

      this.getOrgInfoById(_orgXzqm).then(ll => {
        let contents = ll.data.contents;
        this.mmm[_orgXzqm] = true;
        let key = _orgXzqm;
        contents.sort((a, b) => a.orgXzqm - b.orgXzqm);
        let qbjTarget = contents.filter(
          c => c.orgXzqm.substring(6) == "999000"
        )[0];
        let otTargetes = contents.filter(
          c => c.orgXzqm.substring(6) != "999000" && c.jglx != "县级窗口"
        );
        if (qbjTarget) {
          contents = [qbjTarget].concat(otTargetes);
        }
        let _d = contents.map(c => {
          let { orgShowname, orgXzqm, sjXzqm, orgId } = c;
          return {
            label: orgShowname,
            value: orgShowname,
            orgXzqm,
            sjXzqm,
            orgId,
            pid: _orgXzqm
          };
        });
        let obj = {
          key,
          data: _d
        };
        this.onAddMessage({
          send: false,
          contentType: TEXT,
          content: `当前区域切换为：${dictTarget.label},${_d[0].label}`
        });
        this.pickValues = [dictTarget.label, _d[0].label];

        const children = _d.map($d => {
          return $d.label;
        });
        picker.setColumnValues(1, children);
        this.allDictChildren.push(obj);
        this.pageLoading = false;
        this.loading = false;
      });
    },
    goBottom() {
      let element = this.$refs.messageEle;
      let scroll = this.$refs.messageScroll;
      scroll.scrollTop = element.scrollHeight - scroll.clientHeight + 60;
    },
    showMore() {
      this.moreVisible = true;
    },
    closeMore() {
      this.moreVisible = false;
    },
    contactUs() {
      this.contactVisible = true;
    },
    closeContact() {
      this.contactVisible = false;
    },
    selectmessage(msg) {
      this.sendMessage(msg);
    }
  }
};
</script>
<style lang="less" src="./index.less" scoped></style>