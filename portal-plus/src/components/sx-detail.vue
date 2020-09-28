<template>
  <div class="sx-detail" v-if="detail.AUDIT_ITEM&&detail.AUDIT_ITEM.TASK_NAME">
    <div class="sx-detail__title">《{{detail.AUDIT_ITEM.TASK_NAME}}》</div>
    <div class="sx-detail__body">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="受理条件" key="1">
          <text-dot :msg="detail.AUDIT_ITEM.ACCEPT_CONDITION || '无'" ref="condition"></text-dot>
        </a-tab-pane>
        <a-tab-pane tab="材料清单" key="2">
          <table class="detail_table">
            <tr class="detail_table_header">
              <td>材料名称</td>
              <td style="min-width:100px">材料要求</td>
              <td style="min-width:90px">来源渠道</td>
            </tr>
            <tr v-for="m in materiales">
              <td>{{m.MATERIAL_NAME}}</td>
              <td>
                <div>{{m.MATERIAL_TYPE_TEXT}}:{{m.MATERIAL_TYPE==1?m.PAGE_NUM:m.PAGE_COPYNUM}}</div>
                <div>材料形式:{{m.ZZHDZB_TEXT}}</div>
              </td>
              <td>{{m.SOURCE_TYPE_TEXT}}</td>
            </tr>
          </table>
          <!-- <text-dot :msg="material" ref="material"></text-dot> -->
        </a-tab-pane>
        <a-tab-pane tab="办理流程" key="3">
          <a-steps direction="vertical" size="small">
            <a-step v-for="i in detail.AUDIT_FLOW_CHART" :key="i.ID">
              <template slot="title">
                <div class="step_title">
                  <div class="step_name">{{i.NAME}}</div>
                  <div class="step_tips">
                    <span>工作时限：{{i.TIME}}工作日</span>
                    <span style="margin-left:10px;">处理人：{{i.ASSIGNE}}</span>
                  </div>
                </div>
              </template>
              <template slot="description">
                <div class="step_description">{{i.DETAIL}}</div>
              </template>
            </a-step>
          </a-steps>
          <!-- <text-dot :msg="process" ref="process"></text-dot> -->
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="sx-detail__footer">
      <div class="tip" v-if="!detail.AUDIT_ITEM.TRANSACT_WEB_URL">该事项暂不支持网上办理</div>
      <template v-else>
        <a class="sx-priamry" @click="handleBanliClick(detail)">立即办理</a>
        <!-- target="_blank" :href="bsznUrl" -->
        <a class="sx-default" @click="handleBsznClick(detail)">办事指南</a>
      </template>
    </div>
  </div>
</template>
<script>
import textDot from "./text-dot";
import { getWorkDetail } from "../core/api/yiBot";
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    textDot
  },

  computed: {
    materiales() {
      if (
        this.detail.AUDIT_MATERIAL_CONDITION &&
        this.detail.AUDIT_MATERIAL_CONDITION.length > 0
      ) {
        return this.detail.AUDIT_MATERIAL_CONDITION;
      } else if (
        this.detail.AUDIT_MATERIAL &&
        this.detail.AUDIT_MATERIAL.length > 0
      ) {
        return this.detail.AUDIT_MATERIAL;
      } else {
        return [];
      }
    },
    material() {
      if (
        this.detail.AUDIT_MATERIAL_CONDITION &&
        this.detail.AUDIT_MATERIAL_CONDITION.length > 0
      ) {
        const material = this.detail.AUDIT_MATERIAL_CONDITION.map(material => {
          const materialList = material.AUDIT_MATERIAL.map(
            (item, index) => `${index + 1}.${item.MATERIAL_NAME}`
          ).join("；");
          return `<span class="sx-content-title">${material.CONDITION_NAME}</span><br/>${materialList}`;
        }).join("<br/>");
        return material || "无";
      } else if (
        this.detail.AUDIT_MATERIAL &&
        this.detail.AUDIT_MATERIAL.length > 0
      ) {
        return (
          this.detail.AUDIT_MATERIAL.map(
            (material, index) => `${index + 1}.${material.MATERIAL_NAME}`
          ).join("；") || "无"
        );
      } else {
        return "无";
      }
    },
    process() {
      let process = "";
      if (this.detail.AUDIT_ITEM.WSBLLC) {
        process += `<span class="sx-content-title">网上办理流程</span><br/>${this.detail.AUDIT_ITEM.WSBLLC.replace(
          /\\n/g,
          "<br/>"
        ) || "无"}`;
      } else {
        process += '<span class="sx-content-title">网上办理流程</span><br/>无';
      }
      if (this.detail.AUDIT_ITEM.CKBLLC) {
        process += `<br/><span class="sx-content-title">窗口办理流程</span><br/>${this.detail.AUDIT_ITEM.CKBLLC.replace(
          /\\n/g,
          "<br/>"
        ) || "无"}`;
      } else {
        process +=
          '<br/><span class="sx-content-title">窗口办理流程</span><br/>无';
      }
      return process;
    },
    bsznUrl() {
      return (
        "http://zwfw-new.hunan.gov.cn/portal/guide/" +
        this.detail.AUDIT_ITEM.TASK_CODE
      );
    }
  },
  data() {
    return {};
  },
  methods: {
    handleBanliClick(detail) {
      //判断当前页面是否在小程序环境中， 注：首页是在小程序，嵌套网页，该网页才能再次跳转回小程序
      let smallPro = false;
      const approveCode = detail.AUDIT_ITEM.TASK_CODE;
      const approveId = detail.AUDIT_ITEM_EXTEND.TASK_GUID;
      const approveName = detail.AUDIT_ITEM.TASK_NAME;
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        wx.miniProgram.getEnv(res => {
          if (res.miniprogram) {
            smallPro = true;
            //小程序环境
            // AUDIT_ITEM.TASK_CODE
            wx.miniProgram.navigateTo({
              url: `/work/pages/work/guide-detail/index?id=${approveId}&code=${approveCode}&activekey=0&title=${approveName}`,
              success: function() {
                console.log("success");
              },
              fail: function() {
                console.log("跳转回小程序的页面fail");
              }
            });
          } else {
            smallPro = false;
            window.open(detail.AUDIT_ITEM.TRANSACT_WEB_URL);
          }
        });
      } else {
        window.open(detail.AUDIT_ITEM.TRANSACT_WEB_URL);
      }
    },
    handleBsznClick(detail) {
      //判断当前页面是否在小程序环境中， 注：首页是在小程序，嵌套网页，该网页才能再次跳转回小程序
      let smallPro = false;

      const approveCode = detail.AUDIT_ITEM.TASK_CODE;
      const approveId = detail.AUDIT_ITEM_EXTEND.TASK_GUID;
      const approveName = detail.AUDIT_ITEM.TASK_NAME;
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        wx.miniProgram.getEnv(function(res) {
          if (res.miniprogram) {
            smallPro = true;
            //小程序环境
            // AUDIT_ITEM.TASK_CODE
            wx.miniProgram.navigateTo({
              url: `/work/pages/work/guide-detail/index?id=${approveId}&code=${approveCode}&activekey=0&title=${approveName}`,
              success: function() {
                console.log("success");
              },
              fail: function() {
                console.log("跳转回小程序的页面fail");
              }
            });
          } else {
            smallPro = false;

            window.open(this.bsznUrl);
          }
        });
      } else {
        window.open(this.bsznUrl);
      }
    }
  }
};
</script>
<style>
.detail_table {
  width: 100%;
  border: 1px solid #e8e8e8;
}
.detail_table td {
  padding: 2px 10px;
  border-bottom: 1px solid #e8e8e8;
}
.detail_table .detail_table_header td {
  padding: 10px;
  background: #2e5aa6;
  color: #fff;
}
.step_name {
  color: #000;
  font-size: 16px;
}
.step_title {
  display: flex;
  justify-content: space-between;
}
.step_tips {
  color: rgba(9, 41, 77, 0.4);
  font-size: 13px;
}
.sx-detail .ant-steps-item-process .ant-steps-item-icon,
.sx-detail .ant-steps-item-wait .ant-steps-item-icon,
.sx-detail .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
  background: #2e5aa6;
  color: #fff;
  border-color: #2e5aa6;
}

.step_description {
  background: #2e5aa6;
  padding: 12px;
  margin: 12px 0;
  color: #fff;
}
.ant-steps-item-title {
  width: 100%;
}
.sx-detail .sx-detail__title {
  font-size: 14px;
  font-weight: bold;
}
a.sx-priamry {
  color: #ffffff;
  background: #2e5aa6;
  display: inline-block;
  width: 80px;
  height: 26px;
  font-size: 14px;
  text-align: center;
  line-height: 26px;
  border: 1px solid #2e5aa6;
}
a.sx-default {
  border: 1px solid #fff;
  color: #2e5aa6;
  background: #fff;
  display: inline-block;
  width: 80px;
  height: 26px;
  font-size: 14px;
  text-align: center;
  line-height: 26px;
  margin-left: 16px;
}
.sx-detail__footer {
  margin-top: 15px;
  padding-top: 10px;
  position: relative;
  text-align: right;
  min-width: auto;
  background: transparent;
  border: none;
  border-top: 1px solid #e8e8e8;
}
.ant-tabs-nav .ant-tabs-tab-active {
  color: #2e5aa6;
  font-weight: bold;
}
.ant-tabs-nav .ant-tabs-tab:hover {
  color: #2e5aa6;
}
.ant-tabs-ink-bar {
  background-color: #2e5aa6;
}
.sx-detail .ant-tabs-nav .ant-tabs-tab {
  padding: 8px 16px;
}
.ant-tabs-nav .ant-tabs-tab {
  margin: 0 20px 0 0;
}
</style>