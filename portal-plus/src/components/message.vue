<template>
  <div>
    <MessageItem
      :item="firstMsg"
      :type="firstMsg.contentType"
      :content="firstMsg.content"
      :transfer="firstMsg.send"
      :hidefooter="true"
      @satisfy="handleSatisfy"
      @unsatisfy="handleUnsatisfy"
      @newanswer="handleNewAnswers"
    />
    <div class="m-message__item" v-if="gqList&&gqList.length&&mobile">
      <div class="message__item__content you-like">
        <div class="item__content__title">猜你想问</div>
        <div class="like-list">
          <div
            class="like-list-item"
            v-for="(item, index) in gqList"
            :key="index"
            @click="handleSelectMessage(item)"
          >{{ item }}</div>
        </div>
      </div>
    </div>
    <!--  -->
    <MessageItem
      v-for="(item, index) in otherMsg"
      :key="index"
      :item="item"
      :type="item.contentType"
      :content="item.content"
      :transfer="item.send"
      @selectquestion='selectquestionQ'
      @satisfy="handleSatisfy"
      @unsatisfy="handleUnsatisfy"
      @newanswer="handleNewAnswers"
    />
  </div>
</template>
<script>
import MessageItem from "./message-item";

export default {
  components: {
    MessageItem
  },
  data() {
    return {};
  },
  computed: {
    firstMsg() {
      if (this.messageList && this.messageList.length)
        return this.messageList[0];
      return {};
    },
    otherMsg() {
      if (this.messageList && this.messageList.length)
        return this.messageList.slice(1);
      return [];
    }
  },
  props: {
    messageList: Array,
    gqList: Array,
    mobile:Boolean
  },
  methods: {
    selectquestionQ(question){
      this.$emit('selectquestion',question)
    },
    handleUnsatisfy(item) {
      this.$emit("unsatisfy",item);
    },
    handleSatisfy(item) {
      this.$emit("satisfy",item);
    },
    handleSelectMessage(item) {
      this.$emit("selectmessage", item);
    },
    handleNewAnswers(item) {
      console.log("我要答案",item)
      this.$emit("newanswer",item);
    },
  }
};
</script>
<style lang="less">
.customer-room-chat {
  padding: 30px 20px 50px;
  font-family: PingFangSC-Regular;

  & .chat-tip {
    width: 175px;
    height: 25px;
    line-height: 25px;
    margin: 0 auto;
    text-align: center;
    font-size: 12px;
    color: #777;
    background: #e5e5e5;
    border-radius: 4px;
  }
  & .chat-list-item {
    width: 100%;
    // overflow: hidden;
    margin-top: 30px;

    & .item-content {
      box-sizing: border-box;
      padding: 10px 14px;
      border-radius: 22px;

      &.item-left {
        float: left;
        background: #f2f2f2;
      }
      &.item-right {
        float: right;
        color: #fff;
        // background: #3E97DF;
        background: #2e5aa6;
        .node {
          color: #fff;
        }
      }
    }
  }
  .gd-tabs-bar {
    border-bottom: 1px solid #ddd;
    height: 34px;
    .gd-tabs-nav {
      font-size: 14px;
      line-height: 34px;
    }
    .gd-tabs-navlist {
      height: 34px;
    }
    .gd-tabs-line {
      bottom: -2px;
      height: 3px;
    }
  }
  .gd-tabs-pane {
    padding-top: 10px;
    .sx-content-title {
      margin-top: 10px;
    }
  }
}
.clearfix:after {
  content: " ";
  display: block;
  line-height: 0;
  height: 0;
  visibility: hidden;
  clear: both;
}
.content-warn {
  color: #2e5aa6;
}
.m-message__container {
  flex: auto;
  position: relative;
}
.m-message__list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px 16px;
  box-sizing: border-box;
}
.m-message__item {
  margin-bottom: 20px;
}
.message__item__content {
  display: inline-block;
  background: #f2f5f8;
  vertical-align: middle;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  max-width: 97%;
  // color: #000;
}
.bdr10{
  border-radius: 10px;
}
.robot-evaluate {
  padding-top: 6px;
  font-size: 12px;
}
.robot-evaluate > div {
  display: inline-block;
  vertical-align: middle;
  color: #808080;
  cursor: pointer;
}
.robot-evaluate svg {
  transform: scale(0.7);
  display: inline-block;
  vertical-align: middle;
}
.robot-evaluate span {
  display: inline-block;
  vertical-align: middle;
  margin-left: 3px;
}
.robot-evaluate > div:active {
  opacity: 0.55;
  transition: all 0.15s ease;
}
.robot-evaluate > div + div {
  margin-left: 16px;
}
.m__right .message__item__content {
  background: #2e5aa6;
  color: #fff;
  text-align: left;
}
.item__content__title {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 6px;
}
.item__content__title2{
  font-size: 12px;
}
.text+.you-like{
  margin-top: 10px;
}


.you-like,
.robot-question {
  width: 100%;
  border-radius: 10px;
}
.question-list{
  padding-top: 6px;
}
.question-list-item {
  font-size: 12px;
  color: #2e5aa6;
}
.question-list-label,
.question-list-item {
  margin-bottom: 8px;
  cursor: pointer;
}
.question-list-label {
  margin-top: 8px;
}
.question-list-item:active {
  opacity: 0.55;
}
.like-list {
  padding-top: 6px;
  display: flex;
  flex-wrap: wrap;
}
.like-list-item {
  width: 50%;
  flex-shrink: 0;
  color: #808080;
  margin-bottom: 8px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.m__right {
  text-align: right;
}
.search-highlight{
  color: red;
}
</style>
