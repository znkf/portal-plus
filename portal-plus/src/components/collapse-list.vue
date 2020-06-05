
<template>
  <div>
    <div v-for="(node, index) in innerList" :key="index">
      <div
        v-if="node.cs_type === 'leaf'"
        class="message-item-node leaf content-warn"
        @click="sendNode(node, 'Leaf')"
      >
        <div v-html="node.name"></div>
      </div>
      <div
        v-else-if="node.cs_type === 'node'"
        class="message-item-node node content-warn"
        @click="sendNode(node, 'Node')"
      >
        <div v-html="node.name" v-if="!node.lowData"></div>
        <div v-if="node.lowData">
          <div v-html="node.name"></div>
        </div>
      </div>
    </div>
    <div v-if="exceed" class="message-item-node">
      <span
        style="background:transparent;"
        @click="isCollapse = !isCollapse"
        :class="['arrow', isCollapse ? 'arrow-down' : 'arrow-up']"
      >{{isCollapse ? '展开' : '收起'}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "collapse-list",
  props: {
    limit: {
      type: Number,
      default: 3
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      limitList: [],
      isCollapse: false
    };
  },
  computed: {
    exceed() {
      return this.list && this.list.length > this.limit;
    },
    innerList() {
      return this.isCollapse ? this.limitList : this.list;
    }
  },
  created() {
    if (this.exceed) {
      this.limitList = this.list.slice(0, this.limit);
      this.isCollapse = true;
    }
  },
  methods: {
    sendNode(node, type) {
      this.$emit("sendNode", node, type);
    }
  }
};
</script>

<style lang="less" scoped>
@primary-color: #3e97df;
@default-color: #ebf4fb;
@hover-color: #ecf5fc;
@white: #ffffff;
.content-warn {
  color: #2e5aa6;
}
.arrow {
  position: relative;
  color: @primary-color;
  background: @white;
  white-space: nowrap;
  padding: 0 10px 0 0;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    right: -5px;
    top: 50%;
    border-right: 2px solid @primary-color;
    border-bottom: 2px solid @primary-color;
  }
}
.arrow-down:after {
  transform: translateY(-75%) rotate(45deg);
}
.arrow-up:after {
  transform: translateY(-25%) rotate(-135deg);
}
.message-item-node-poptips {
  /deep/ .gd-poptips-text {
    padding: 0;
  }
  /deep/ .gd-poptips-content {
    text-align: left;
  }
  /deep/ .gd-poptips-box-top {
    left: 100%;
  }
}
</style>
