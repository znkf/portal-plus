<template>
  <div class="wrapper">
    <div class="yz" :style="containerStyle">
      <div class="yz-header">
        <div class="yz-header-logo">
          <img :src="iconUrl" alt="logo" />
        </div>
        <div class="yz-header-title">智能客服</div>
      </div>
      <div class="yz-room" :style="containerStyle3">
        <div class="yz-room-content" :style="containerStyle2">
          <div class="yz-room-scroll" ref="messageScroll" :style="containerStyle2">
            <div class="yz-room-chat" ref="messageEle">
              <!-- <div class="chat-tip">智能咨询即将接入为您服务</div> -->
              <message
                :messageList="messageList"
                @selectquestion="selectquestion"
                @satisfy="handleSatisfy"
                @unsatisfy="handleUnsatisfy"
              />
            </div>
          </div>
          <div class="loading-box" v-if="pageLoading">
            <div class="circular">
              <div class="path"></div>
            </div>
          </div>
        </div>
        <div class="room-select">
          <span v-if="allDict.length">选择区域 :</span>
          <select
            v-if="allDict.length"
            class="selet-cell"
            @change="loadChildren"
            :value="currentViewDict"
          >
            <option :value="d.orgXzqm" v-for="d in allDict" :key="d.orgXzqm">{{d.label}}</option>
          </select>
          <select
            v-if="dictChildren.length"
            class="selet-cell"
            :value="currentViewStreent"
            @change="handleStreetChange"
          >
            <option :value="d.orgXzqm" v-for="d in dictChildren" :key="d.orgXzqm">{{d.label}}</option>
          </select>
          <img
            class="tools-image"
            style="margin-left:20px;cursor:pointer;"
            src="../../assets/images/yuyin1.png"
            alt
            @click="open1"
          />
          <img
            class="tools-image"
            style="margin-left:10px;cursor:pointer;"
            src="../../assets/images/yuyin2.png"
            alt
            @click="open2"
          />
          <img
            class="tools-image"
            style="margin-left:10px;cursor:pointer;"
            src="../../assets/images/rengongkefu.png"
            alt
            @click="open3"
          />
        </div>
        <customer-textarea @confirm="sendMessage" :fetch-suggestions="fetchSuggestions" />
      </div>
      <div class="yz-tool" :style="containerStyle3">
        <div class="yz-tool-hot tool-item">
          <h3 class="tool-title">猜您想问</h3>
          <div style>
            <ul class="hot-list" v-if="commonQuestiones.length">
              <li
                v-for="(q,index) in commonQuestiones"
                :key="'question_'+index"
                @click="sendMessage(q)"
                :title="q"
              >{{q}}</li>
            </ul>
            <div v-else>暂无</div>
          </div>
        </div>
        <div class="yz-tool-entry tool-item">
          <h3 class="tool-title">其他功能</h3>
          <ul class="entry-list">
            <li :title="app.name" v-for="(app,index) in moreApps" :key="'a_'+index">
              <a :href="app.url" target="blank">
                <i>
                  <img :src="app.img" alt />
                </i>
                <div>{{app.name}}</div>
              </a>
            </li>
          </ul>
          <div v-if="!moreApps.length">暂无</div>
        </div>
        <div class="yz-tool-contact tool-item">
          <h3 class="tool-title">联系我们</h3>
          <p class="contact-phone">
            <a :href="'tel:'+tel">{{tel}}</a>
          </p>
        </div>
      </div>
    </div>
    <div class="m_modal_container" v-if="showModal">
      <div class="m_mc"></div>

      <div class="m_modal">
        <div class="close" @click="closeFB">
          <!-- <a-icon type="close" /> -->
        </div>
        <div>请告诉我们对您没有帮助的原因，我们将会继续改进：</div>
        <textarea v-model="fbMsg"></textarea>
        <div class="m-subbmit_btn" @click="summitFB">提交反馈</div>
      </div>
    </div>
  </div>
</template>
<script>
import customerTextarea from "../../components/customer-textarea";
import message from "../../components/message";
import sendMessageJs from "../sendMessage";
import { TEXT } from "../../config/messageType";
export default {
  data() {
    return {
      windowHeight: 0,
      messageContainerHeight: 0,
      youLikeQuestion: [""],
      fbMsg: ""
    };
  },
  computed: {
    containerStyle() {
      return {
        height: this.windowHeight + "px"
      };
    },
    containerStyle3() {
      return {
        height: this.windowHeight - 70 + "px"
      };
    },
    containerStyle4() {
      return "";
    },
    containerStyle2() {
      return {
        height: this.messageContainerHeight - 40 + "px"
      };
    },
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
    message
  },
  mounted() {
    let height = document.body.clientHeight - 40;
    this.windowHeight = height > 700 ? 700 : height;
    this.messageContainerHeight = this.windowHeight - 70 - 40 - 142;
  },
  mixins: [sendMessageJs],
  async created() {
    this.getGreentings();
    this.getIcon();
    this.getTel();
    await this.handleLocation();
    this.pageLoading = true;
    this.getAllDict().then(res => {
      let discts = [];
      let selectNone = {
        label: "- 未选择 -",
        value: "-9999",
        orgXzqm: "-9999"
      };
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
      discts.unshift(selectNone);
      this.allDict = discts;
      this.pageLoading = false;
    });
    this.getCommonQuestion();
  },
  methods: {
    open1() {
      window.open("http://62.234.92.157:8200/web-portal/");
    },
    open2() {
      const top = (document.body.clientHeight - 600) / 2;
      const left = (document.body.clientWidth - 600) / 2;
      window.open(
        "https://data-analyse.in.wezhuiyi.com/#/audio-group/tts-audition",
        "",
        `width=600,height=600,left=${left},top=${top},menubar=0,titlebar=0,status=0`
      );
      // window.open(detail.AUDIT_ITEM.TRANSACT_WEB_URL);
    },
    open3() {
      const openUrl = `https://zwfw-new.hunan.gov.cn/znkf/onlineChat/webchat/chat.html?c=1&jId=1&areacode=${this.currentViewDict}`;
      window.open(openUrl);
    },
    goBottom() {
      let element = this.$refs.messageEle;
      let scroll = this.$refs.messageScroll;
      scroll.scrollTop = element.scrollHeight - scroll.clientHeight + 60;
    },
    onChange(value) {
      console.log(value);
    },
    fetchSuggestions(suggestions) {
      this.suggestions = suggestions;
    },
    handleSuggestion(question) {
      this.sendMessage(question);
      this.suggestions = [];
    },
    handleStreetChange(e) {
      let _orgXzqm = parseInt(e.target.value);
      this.currentViewStreent = _orgXzqm;
      let dictTarget = this.allDict.filter(
        a => a.orgXzqm == this.currentViewDict
      )[0];
      let streetTarget = this.dictChildren.filter(
        a => a.orgXzqm == _orgXzqm
      )[0];
      if (dictTarget && streetTarget) {
        let label = dictTarget.label;
        let labelw = streetTarget.label;
        this.onAddMessage({
          send: false,
          contentType: TEXT,
          content: `当前区域切换为：${label},${labelw}`
        });
      }
    },
    loadChildren(e) {
      let _orgXzqm = parseInt(e.target.value);
      let dictTarget = this.allDict.filter(a => a.orgXzqm == _orgXzqm)[0];
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
        }
        return;
      }
      this.pageLoading = true;
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
        this.allDictChildren.push(obj);
        this.pageLoading = false;
      });
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      let { orgXzqm } = targetOption;
      this.getOrgInfoById(orgXzqm).then(ll => {
        let contents = ll.data.contents;
        targetOption.loading = false;
        //  orgShowname orgXzqm orgId
        targetOption.children = contents.map(c => {
          let { orgShowname, orgXzqm, sjXzqm, orgId } = c;
          return {
            label: orgShowname,
            value: orgShowname,
            orgXzqm,
            sjXzqm,
            orgId
          };
        });
        this.allDictChildren[orgXzqm] = [...targetOption.children];
        this.allDict = [...this.allDict];
      });
    }
  }
};
</script>
<style lang="less" src="./index.less"></style>
