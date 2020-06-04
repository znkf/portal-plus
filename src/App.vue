<template>
  <div style="height:100%;">
    <PC v-if="flag" />
    <Mobile v-else />
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  components: {
    PC: () => import("./view/PC/index.vue"),
    Mobile: () => import("./view/Mobile/index.vue")
  },
  created() {
    if (this.isPC()) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  },

  methods: {
    isPC() {
      let userAgentInfo = navigator.userAgent;
      let Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      let flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
  }
};
</script>
<style>
body {
  -webkit-font-smoothing: antialiased;
}
</style>
