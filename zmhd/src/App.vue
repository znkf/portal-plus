<template>
  <div id="app" class="zf-web-container">
    <Header />
    <hdcj></hdcj>
    <Footer />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Header: () => import("./components/Header/index"),
    hdcj: () => import("./components/HDCJ/index"),
    Footer: () => import("./components/Footer/index")
  },
  created() {}
};
</script>

<style lang="less">
#app {
  min-height: 100%;
}
.gw-body-content {
  max-width: 1200px;
  margin: 0 auto;
  min-width: 1200px;
}
@media screen and (max-width: 1599px) {
  .gw-body-content {
    width: 1200px;
    padding: 0 1.9rem;
  }
}
@media screen and (max-width: 1199px) {
  .gw-body-content {
    width: 100%;
    margin: 0 auto;
  }
}
@media screen and (max-width: 1023px) {
  .gw-body-content {
    width: 100%;
    margin: 0 auto;
  }
}

.title-normal {
  font-family: FZLTCHK--GBK1-0;
  font-size: 24px;
  color: #000000;
  letter-spacing: 2.5px;
}
</style>
