<template>
  <div>
    <template v-if="item.relate&&item.relate.length">
      <div class="item__content__title">
        <span>{{item.answer}}</span>
        <div
          style="float:right;color:#808080;font-size:12px;"
          v-if="showMoreVisible"
          @click="handleCollapse"
        >
          <div class="answer-collapse" v-if="collapse">
            <div>展示更多</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#808080" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </div>
          <div v-else class="answer-collapse">
            <div>收起列表</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#808080" d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="question-list">
        <div
          class="question-list-item"
          @click="handleAnswer(r.qt)"
          v-for="(r,idx) in relates"
          :key="r.qt"
        >{{idx+1}}. {{r.qt}}</div>
      </div>
    </template>
    <template v-else>
      <div class="item__content__title2" v-html="item.answer"></div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      collapse: true
    };
  },
  computed: {
    showMoreVisible() {
      if (
        this.item &&
        this.item.relate &&
        this.item.relate.length &&
        this.item.relate.length > 5
      ) {
        return true;
      }
      return false;
    },
    relates() {
      if (this.item && this.item.relate && this.item.relate.length) {
        let relate = this.item.relate;
        if (this.collapse) {
          return relate.slice(0, 5);
        }
        return relate;
      }
      return [];
    }
  },
  methods: {
    handleCollapse() {
      this.collapse = !this.collapse;
    },
    handleAnswer(question) {
      this.$emit("handleItemClick", question);
    }
  }
};
</script>
<style>
.answer-collapse{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.answer-collapse svg{
  transform: scale(0.7);
  display: inline-block;
  vertical-align: middle;
}
</style>
