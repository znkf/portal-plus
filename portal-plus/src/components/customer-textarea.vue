<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 20:34:15
 * @LastEditTime: 2019-10-20 15:30:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="yz-room-message" v-click-outside="handleClickOutside">
    <!-- <div class="suggestion-list" v-if="suggestions&&suggestions.length">
      <div
        class="suggestion-item"
        v-for="s in suggestions"
        :key="s.id"
        @click="handleSuggestion(s.question)"
      >{{s.question}}</div>
    </div>-->
    <textarea
      v-model="message"
      @input="handleInput"
      class="message-text"
      placeholder="请输入您的问题"
      @keyup.enter="sendMessage"
      @focus="handleFoucs"
      ref="textareaRef"
    ></textarea>

    <button class="message-btn" :class="{'active': !message}" @click="sendMessage">发送</button>
    <div class="suggestions" v-if="suggestions && suggestions.length">
      <ul>
        <li
          v-for="item in suggestions"
          :title="item.question"
          :key="item.question"
          @click="onSelectSuggestion(item.question, $event)"
        >{{item.question}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from "../directives/click-outside.js";
export default {
  name: "customer-textarea",
  props: {
    placeholder: String,
    value: String,
    fetchSuggestions: Function
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      message: this.value || "",
      suggestions: [],
      timer: null,
      isFoucs: false
    };
  },
  watch: {
    value(val, oldValue) {
      this.message = val || "";
    },
    isFoucs(val, oldVal) {
      !val && this.fetchSuggestions([]);
    }
  },
  methods: {
    handleSuggestion(question) {
      this.$emit("confirm", question);
      this.suggestions = [];
    },
    sendMessage() {
      clearTimeout(this.timer);
      this.$emit("confirm", this.message);
      this.message = "";
      this.fetchSuggestions([]);
      this.suggestions = [];
    },
    handleInput(event) {
      const value = event.target.value;
      this.$emit("input", value);
      // console.log(value)
      if (this.message === "") {
        this.suggestions = [];
      }
      if (value == "") {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        return;
      }
      if (!this.fetchSuggestions) return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$api.smartbox({ text: value }).then(s => {
          this.suggestions = s.info;
        });
        this.timer = null;
      }, 200);
    },
    handleFoucs(event) {
      this.isFoucs = true;
      this.handleInput(event);
    },
    handleClickOutside() {
      this.isFoucs = false;
      clearTimeout(this.timer);
      this.suggestions = null;
    },
    handleSuggestions(suggList) {
      if (!this.message || !this.isFoucs) {
        this.suggestions = [];
        return;
      }
      this.suggestions = (suggList || []).map(item => {
        if (item.length >= 21) {
          return {
            value: item,
            display: item,
            title: item
          };
        } else {
          return { value: item, display: item };
        }
      });
    },
    onSelectSuggestion(value, ev) {
      this.$emit("confirm", value);
      this.message = "";
      this.suggestions = [];
    }
  }
};
</script>

<style lang="less" scoped>
.yz-room-message {
  position: relative;
  height: 142px;
  padding: 14px 20px;
  box-shadow: 0 -1px 0 0 #eaeaea;
  & .message-text {
    width: 100%;
    height: 120px;
    border: none;
    resize: none;
    outline: 0;
    font-family: "PingFangSC-Regular";
    font-size: 14px;
    color: #112534;
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #bfbfbf;
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #bfbfbf;
      opacity: 1;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #bfbfbf;
      opacity: 1;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #bfbfbf;
    }
  }
  & .message-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 109px;
    height: 39px;
    // background-color: rgba(62, 151, 223, .3);
    background-color: #2e5aa6;
    font-family: "PingFangSC-Medium";
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    border: none;

    &.z-active {
      cursor: pointer;
      background-color: rgba(62, 151, 223, 1);
    }
  }

  .suggestions {
    position: absolute;
    z-index: 10;
    bottom: 100%;
    background: #ffffff;
    box-shadow: 0 2px 15px 0 rgba(13, 28, 40, 0.1);
    padding: 11px 0;
    li {
      box-sizing: border-box;
      width: 340px;
      font-size: 14px;
      line-height: 28px;
      padding: 0 26px 0 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: #f1f2f3;
        cursor: pointer;
      }
    }
  }
}
</style>
