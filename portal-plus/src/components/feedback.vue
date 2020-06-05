<style lang="less">
.feedback {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
}

.m-header span {
  display: inline-block;
  vertical-align: middle;
}
.feedback-mask {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}
.feedback-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  z-index: 2;
  background: #fff;
}
.feedback-header {
  position: relative;
  padding: 12px 80px;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-weight: bold;
}
.feedback-header .close2 {
  position: absolute;
  top: 0;
  padding: 12px;
  right: 8px;
  color: #808080;
}

.feedback-textarea textarea {
  border: 1px solid #ccc;
  resize: none;
  width: 100%;
  padding: 8px;
  border-radius: 2px;
  display: inline-block;
  vertical-align: middle;
  box-shadow: none;
  outline: none;
  -webkit-appearance: none;appearance: none;
}
.feedback-textarea textarea:focus {
  box-shadow: none;
  outline: none;
  -webkit-appearance: none;appearance: none;
}
.m-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.feedback-content {
  padding: 12px 20px;
}
.feedback-content__label {
  font-weight: bold;
}
.feedback-item {
  padding: 10px 0;
}
.radio-ck {
  display: inline-block;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 2px;
  position: relative;
}

.checkbox:checked + .radio-ck {
  border-color: #2E5AA6;
  background: #2E5AA6;
}

.checkbox:checked + .radio-ck::after {
  content: "";
  width: 15px;
  height: 8px;
  border: 2px solid #fff;
  transform: rotateZ(-45deg);
  border-top: 0;
  border-right: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: -2px;
  bottom: 0;
  margin: auto;
}

.checkbox {
  display: none;
}
.radio-ck,
.radio-label {
  display: inline-block;
  vertical-align: middle;
}
.radio-label {
  margin-left: 20px;
}
.feedback-list {
  padding: 10px 0;
}
.feedback-btn {
  background: #2E5AA6;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
  margin-top: 20px;
  &:active {
    opacity: 0.55;
  }
}

.m-header {
  font-size: 18px;
  padding: 12px 16px;
  font-weight: bold;
  flex-shrink: 0;
  border-bottom: 1px solid #ccc;
}
</style>

<template>
  <transition name="slidein">
      <div class="feedback" v-if="visible">
        <div class="feedback-mask" @click="close"></div>
        <div class="feedback-container">
          <div class="feedback-header">
            <div class>反馈</div>
            <div class="close2" @click="close">关闭</div>
          </div>
          <div class="feedback-content">
            <div class="feedback-content__label">请告诉我们对您没有帮助的原因，我们将会继续改进：</div>
            <!-- <div class="feedback-list">
              
              <div class="feedback-item" v-for="option in options" :key="option.Id" >
                <label :for="option.Id">
                  <input class="checkbox" :id="option.Id" type="checkbox" name="feedback" v-model="selects" :value="option"/>
                  <span class="radio-ck"></span>
                  <span class="radio-label">{{option.Content}}</span>
                </label>
              </div>
              <div class="feedback-item">
                <label for="c4555">
                  <input class="checkbox" id="c4555" type="checkbox" name="feedback" v-model="selectOther" :value="selectOther"/>
                  <span class="radio-ck"></span>
                  <span class="radio-label">其他</span>
                </label>
              </div>
            </div> -->
            <div class="feedback-textarea" >
              <textarea rows="3" placeholder="请简单描述没有帮助的原因" v-model="message"></textarea>
            </div>
            <div class="feedback-btn" @click="confirm">提交反馈</div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>

export default {
  data() {
    return {
      feedBackShow: false,
      options: [],
      selects:[],
      message: "",
      selectOther: false
    };
  },
  props: {
    
    visible: {
      type: Boolean,
      default: false
    },
    fbOptions: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    confirm() {
      const OtherOption = {
        Id: 1,
        Content: "其他",
        check: this.selectOther
      };
      this.$emit("confirm", {
        description: this.message
      });
      this.close();
    },
    close() {
      this.$emit("close");
      this.message = "";
      this.selectOther = false;
    }
  }
};
</script>
