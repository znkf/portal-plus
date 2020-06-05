<template>
  <div class="text-container">
    <p v-html="pMsg"></p>
    <span
    style="background:transparent;"
      v-if="isExceed"
      :class="['arrow', collapse ? 'arrow-down' : 'arrow-up']"
      @click="onCollapse">
        {{collapse ? '展开' : '收起'}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'text-dot',
  props: {
    line: { type: Number, default: 3 },
    msg: { type: String, required: true }
  },
  data() {
    return {
      pMsg: this.msg,
      DotMsg: '',
      collapse: true,
      isExceed: false,
      isDot: false
    }
  },
  mounted(){
    this.show()
  },
  methods: {
    show() {
      if (this.DotMsg) {
        this.pMsg = this.collapse ? this.DotMsg : this.msg
      } else {
        this.dot()
      }
    },
    onCollapse() {
      if (this.collapse) {
        this.pMsg = this.msg
        this.collapse = false
      } else {
        this.pMsg = this.DotMsg
        this.collapse = true
      }
    },
    dot() {
      let dom = this.$el.querySelector('p')
      let height = parseInt(window.getComputedStyle(dom)['height'])
      let lineHeight
      if (window.getComputedStyle(dom)['line-height'] === 'normal') {
        console.error("[warn] you'd better set css 'line-height' ")
        lineHeight = parseInt(window.getComputedStyle(dom)['font-size']) * 1.5
      } else {
        lineHeight = parseInt(window.getComputedStyle(dom)['line-height'])
      }
      while (height > lineHeight * this.line * 3) {
        this.isDot = true
        this.isExceed = true
        this.pMsg = this.pMsg.substring(0, this.pMsg.length / 2)
        dom.innerHTML = this.pMsg
        height = parseInt(window.getComputedStyle(dom)['height'])
      }
      while (height > lineHeight * this.line) {
        this.isDot = true
        this.isExceed = true
        this.pMsg = this.pMsg.replace(/(\s)*([a-zA-Z0-9]+|\W)$/, '')
        dom.innerHTML = this.pMsg
        height = parseInt(window.getComputedStyle(dom)['height'])
      }
      if (this.isExceed) {
        // this.pMsg = this.pMsg.substring(0, this.pMsg.length - 5) + '...'
        this.pMsg = this.pMsg.replace(/(([a-zA-Z0-9]+|\W){4})[^<.*?>]$/, '...')
        this.DotMsg = this.pMsg
      }
    }
  }
}
</script>

<style lang="less" scoped>
@primary-color: #3E97DF;
@default-color: #EBF4FB;
@hover-color: #ecf5fc;
@white: #FFFFFF;
.text-container {
  position: relative;
}
.arrow {
  position: absolute;
  right: 6px;
  bottom: 0;
  color: @primary-color;
  background: @white;
  white-space: nowrap;
  padding: 0 10px 0 5px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    right: 0;
    top: 50%;
    border-right: 2px solid @primary-color;
    border-bottom: 2px solid @primary-color;
  }
}
.arrow-down:after {
  transform: translateY(-75%)rotate(45deg);
}
.arrow-up:after {
  transform: translateY(-25%)rotate(-135deg);
}
</style>
