<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 20:34:15
 * @LastEditTime: 2019-10-20 15:30:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="m-editor__container" v-click-outside="handleClickOutside">
    <div class="m-editor__tools">
      <div class="apps">
        <template v-if="!smallPro2">
          <div
            class="tool"
            v-for="(item,index) in apps1"
            :key="index"
            @click="handleAppHrefClick(item.url)"
          >{{ item.name }}</div>
          <div class="tool more" @click="handleMore" v-if="moreVisible">更多应用</div>
        </template>
      </div>
      <div class="tool" @click="contactUs">联系我们</div>
    </div>
    <div class="m-editor__textarea">
      <textarea
        v-model="message"
        @input="handleInput"
        class="message-text"
        :placeholder="placeholder"
        @keyup.enter="sendMessage"
        @focus="handleFoucs"
        ref="textareaRef"
      ></textarea>
    </div>
    <div class="m-editor__footer">
      <!-- <span style="color:#ccc;">请选择: </span> -->
      <span @click="handlePickerVisible" class="m-picker">{{pickValuesString}}</span>
      <div class="m-editor__btn" @click="sendMessage">发送</div>
    </div>
    <picker-m :value.sync="showPicker" :columns="pickerColumns" :pickValues="pickValues" @change="pickerChange" @confirm="handlePickerConfirm" :loading="loading"/>
  </div>
</template>

<script>
import ClickOutside from "../directives/click-outside.js";
import PickerM from "./picker-m"
// const wx = require('weixin-js-sdk');
export default {
  name: "customer-textarea",
  props: {
    placeholder: String,
    value: String,
    fetchSuggestions: Function,
    moreApps: Array,
    smallpro: Boolean,
    pickerColumns: Array,
    pickValues:Array,
    loading: Boolean
  },
  directives: {
    ClickOutside
  },
  components: {
    PickerM
  },
  data() {
    return {
      message: this.value || "",
      suggestions: [],
      timer: null,
      isFoucs: false,
      smallPro2: false,
      showPicker: false
    };
  },
  computed: {
    apps1() {
      if (this.moreApps && this.moreApps.length)
        return this.moreApps.slice(0, 3);
      return [];
    },
    moreVisible() {
      if (this.moreApps && this.moreApps.length && this.moreApps.length > 3) {
        return true;
      }
      return false;
    },
    pickValuesString(){
      if(this.pickValues&&this.pickValues.length){
        return this.pickValues.join(',')
      }
      return '请选择'
    }
  },
  watch: {
    value(val, oldValue) {
      this.message = val || "";
    }
  },
  created() {
    // if (!(navigator.userAgent.toLowerCase().indexof("MicroMessage") == -1)) {

    // }
    wx.miniProgram.getEnv(res => {
      if (res.miniprogram) {
        this.smallPro2 = true;
      } else {
        this.smallPro2 = false;
      }
    });
  },
  methods: {
   
    handlePickerVisible() {
      this.showPicker = true;
    },
    pickerChange(args) {
      this.$emit('pickChange',{...args})
    },
    handlePickerConfirm(args) {
      this.$emit('pickConfirm',{...args})
    },
    handleMore() {
      console.log("showMore");
      this.$emit("showmore");
    },
    contactUs() {
      this.$emit("contactus");
    },
    handleAppHrefClick(href) {
      window.location.href = href;
    },
    sendMessage() {
      this.$emit("confirm", this.message);
      clearTimeout(this.timer);
      this.suggestions = [];
    },
    handleInput(event) {
      const value = event.target.value;
      this.$emit("input", value);
      // console.log(value)
      if (this.message === "") {
        this.suggestions = [];
      }
      if (!this.fetchSuggestions) return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.fetchSuggestions(value, this.handleSuggestions);
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
      this.message = value;
      this.$emit("input", value);
      this.suggestions = [];
      this.$refs.textareaRef && this.$refs.textareaRef.focus();
    }
  }
};
</script>

<style lang="less" scoped>
// ****************//
.m-editor__container {
  flex-shrink: 0;
  border-top: 1px solid #ccc;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 16px;
}
.apps {
  display: flex;
  flex-wrap: wrap;
}
.m-editor__tools {
  padding: 6px 0;
  .tool {
    display: inline-block;
    font-size: 12px;
    padding: 3px 3px;
    height: 27px;
    border: 1px solid #ccc;
    border-radius: 2px;
    flex-shrink: 0;
    width: 65px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin: 2px;
    &:active {
      opacity: 0.65;
    }
  }
  .more {
    color: #ccc;
  }
}
.m-editor__btn {
  background: #2e5aa6;
  color: #fff;
  height: 40px;
  width: 90px;
  line-height: 40px;
  text-align: center;
  border-radius: 2px;
  display: inline-block;
}
.m-editor__btn:active {
  opacity: 0.65;
}
.m-editor__footer {
  text-align: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.m-picker{
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
      padding: 2px 5px;
    border: 1px solid #ccc;
}
.m-editor__tools {
  display: flex;
  justify-content: space-between;
}

.m-editor__textarea textarea {
  border: 1px solid #ccc;
  resize: none;
  width: 100%;
  padding: 8px;
  height: 60px;
  border-radius: 2px;
  box-shadow: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}
.m-editor__textarea textarea:focus {
  box-shadow: none;
  outline: none;
}
</style>
