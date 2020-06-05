<template>
  <div class="hd-footer">
    <div>
      <span class="f1">接入协议</span>
      <span class="v-line"></span>
      <span  class="f1">接入指南</span>
      <span class="v-line"></span>
      <span  class="f1">建议反馈</span>
      <span class="v-line"></span>
      <span  class="f1">关于我们</span>
    </div>
    <div style="margin-top:8px;">䈗XX-2019 XXXXXX All Right Reserved.（粤ICP备12010101号-XX）</div>
  </div>
</template>

<script>
export default {
  name: "hdfooter"
};
</script>

<style>
.v-line{
  display: inline-block;
  width: 1px;
  height: 15px;
  background: #fff;
  vertical-align: middle;
}
.f1{
  margin: 0 20px;
  display: inline-block;

  vertical-align: middle;
}
.hd-footer {
  background: #2b303b;
  height: 80px;
  margin-top: 80px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 20px;
  text-align: center;
  padding: 16px;
}
</style>