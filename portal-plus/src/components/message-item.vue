<template>
  <div class="m-message__item" :class="{m__right:transfer}">
	<!-- <img v-if="!transfer"  src="../assets/images/logo.png" /> -->
    <div class="message__item__content" v-if="type === typeMap.TEXT">
      <div v-html="innerCont"></div>
    </div>
    <div
      class="message__item__content"
      v-else-if="type === typeMap.ANSWER"
      :class="{'bdr10':content&&content.length&&content.length==1&&content[0].relate&&content[0].relate.length}"
    >
      <messageItemAnswer  v-for="(f,index) in content" :key="'faq_'+index" :item="f" @handleItemClick="handleAnswer"/>
      <!-- <div v-for="(f,index) in content" :key="'faq_'+index">
        <template v-if="f.relate&&f.relate.length">
          <div class="item__content__title">
            <span>{{f.answer}}</span>
            <a style="float:right;color:#1890ff" @click="handleCollapse">{{collapse?'收起':'展示更多'}}</a>
          </div>
          <div class="question-list">
            <div
              class="question-list-item"
              @click="handleAnswer(r.qt)"
              v-for="(r,idx) in f.relate"
              :key="r.qt"
            >{{idx+1}}. {{r.qt}}</div>
          </div>
        </template>
        <template v-else>
          <div class="item__content__title2" v-html="f.answer"></div>
        </template>
      </div> -->
    </div>
    <div
      class="message__item__content"
      v-else-if="type === typeMap.QUESTION"
      style="border-radius:10px"
    >
      <div>
        <div class="item__content__title">您是否想问：</div>
        <div class="question-list">
          <!-- 
          @touchstart="handleAnswer(f.question)"-->
          <div
            class="question-list-item"
            v-for="(f,index) in content"
            :key="'faq_'+index"
            @click="handleAnswer(f.question)"
          >{{index+1}}. {{f.question}}</div>
        </div>
      </div>
    </div>
    <div
      class="message__item__content"
      v-else-if="type === typeMap.NEW_QUESTION"
      style="border-radius:10px"
    >
      <div>
        <div class="item__content__title">您是否还想问：</div>
        <div class="question-list">
          <new-detail @handleNewAnswer="handleNewAnswer" :detail="content"></new-detail>
        </div>
      </div>
    </div>
    <div
      class="message__item__content"
      v-else-if="type === typeMap.DETAIL&&content.AUDIT_ITEM"
      style="border-radius:10px;"
    >
      <sx-detail :detail="content"></sx-detail>
      <div class="robot-evaluate" v-if="item.showFd&&content.AUDIT_ITEM">
        <div @click="handleSatisfy">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#808080"
              d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
            />
          </svg>
          <span>满意</span>
        </div>
        <div @click="handleUnsatisfy">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#808080"
              d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
            />
          </svg>
          <span>不满意</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  TEXT,
  ZONE_LIST,
  SXCQ_LIST,
  DETAIL,
  FAQ,
  CHAT,
  ANSWER,
  QUESTION,
  NEW_QUESTION
} from "../config/messageType";
import CollapseList from "./collapse-list";
import SxDetail from "./sx-detail";
import NewDetail from "./new-detail";
import messageItemAnswer from './message-item-answer'
export default {
  components: {
    CollapseList,
    SxDetail,
    NewDetail,
    messageItemAnswer
  },
  props: ["item", "type", "content", "transfer", "hidefooter"],
  data() {
    return {
      typeMap: {
        TEXT,
        ZONE_LIST,
        SXCQ_LIST,
        DETAIL,
        FAQ,
        CHAT,
        ANSWER,
        QUESTION,
        NEW_QUESTION
      },
      collapse: true
    };
  },
  computed: {
    // answerDispaly(){

    // },
    innerCont() {
      if (this.transfer && this.type === this.typeMap.TEXT) {
        // 只转义用户输入的文本内容，后台返回和自动回复的不转义
        return this.htmlEncodeByRegExp(this.content);
      } else {
        return this.content;
      }
    }
  },
  methods: {
    sendNode(node, type) {
      this.$parent.$emit(`send${type}`, node);
    },
    handleSatisfy() {
      this.$emit("satisfy", this.item);
    },
    handleUnsatisfy() {
      this.$emit("unsatisfy", this.item);
    },
    handleNewAnswer(data) {
      console.log("fu",data)
      this.$emit("newanswer",data);
    },
    handleAnswer(question) {
      this.$emit("selectquestion", question);
    },
    handleCollapse(){
      this.collapse = !this.collapse
    },
    htmlEncodeByRegExp(str) {
      let s = "";
      if (str.length == 0) return "";
      s = str.replace(/&/g, "&amp;");
      s = s.replace(/</g, "&lt;");
      s = s.replace(/>/g, "&gt;");
      s = s.replace(/ /g, "&nbsp;");
      s = s.replace(/'/g, "&#39;");
      s = s.replace(/"/g, "&quot;");
      return s;
    }
  }
};
</script>
