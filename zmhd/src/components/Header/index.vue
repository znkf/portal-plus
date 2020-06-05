<template>
  <div class="gw-web-header">
    <div class="header-h1">
      <img src="../../assets/parentHomeLogo.png" alt />
      <!-- <div class="header-logo">
        <img src="../../assets/logo.png" alt />
      </div>
      <div class="header-label">
        <div class="header-label-l1"></div>
        <div class="header-label-l2"></div>
      </div>-->
    </div>
    <div class="header-h2">
      <div class="header-h2-container">
        <div class="header-h2-title">长沙欢迎您</div>
        <div class="header-h2-search">
          <input type="text" placeholder="搜索您要办理的事项" v-model="keyword" />
          <div class="header-h2-search__button" @click="toSearch">
            <img src="../../assets/search.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zfheader",
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    toSearch() {
      const keyword = encodeURIComponent(this.keyword);
      if (this.keyword.trim()) {
        window.open(
          "http://zwfw-new.hunan.gov.cn/portal/search?region=430100000000&keyword=" +
            keyword +
            "&areaCode=430100000000&departmentCode=&type=all&onlyCorrespondingLevel=false&onlyOnlineable=false"
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header-h2-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.9rem;
}
.gw-web-header {
  background: #2b303b;
  .header-h1 {
    padding: 0 20px;
    align-items: center;
    display: flex;
    height: 60px;
    color: #fff;
    .header-logo {
      display: inline-block;
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
      margin-right: 6px;
    }
  }
  .header-h2 {
    background: url("../../assets/header-bg.png");
    height: 320px;
    color: #fff;
    // padding-left: 120px;
    padding-top: 80px;
    padding-bottom: 80px;
    .header-h2-title {
      max-width: 1200px;
      margin: 0 auto;
      background: rgba(0, 0, 0, 0.5);
      font-family: FZLTCHK--GBK1-0;
      font-size: 48px;
      color: #ffffff;
      letter-spacing: 5px;
      display: inline-block;
      padding: 6px 7px;
      height: 60px;
      line-height: 1;
    }
    .header-h2-search {
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      height: 64px;
      width: 640px;
      display: flex;
      align-items: center;
      margin-top: 36px;
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #919eab;
        line-height: 32px;
      }

      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #919eab;
        line-height: 32px;
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #919eab;
        line-height: 32px;
      }
      input {
        display: inline-block;
        flex: auto;
        height: 100%;
        border: 0ch;
        outline: none;
        box-shadow: 0;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #333;
        line-height: 32px;
        padding: 0 20px;
      }
      .header-h2-search__button {
        cursor: pointer;
        img {
          width: 32px;
          height: 32px;
        }
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        width: 64px;
        height: 64px;
        background: #4a62e7;
        border-radius: 0 4px 4px 0;
        border-radius: 0px 4px 4px 0px;
      }
    }
  }
}
</style>