<template>
  <div class="gw-body-content">
    <div v-if="!showDatil">
      <div class="title-normal title-mg1">互动场景</div>
      <div class="hd-list">
        <div class="hd-cell" @click="toTousu">
          <div class="hd-icon">
            <img src="../../assets/hd_3.png" alt />
          </div>
          <div class="hd-label">
            <div class="hd-label__tille">服务建议</div>
            <div class="hd-label__desc">对线上，线下政务服务提出建议。</div>
          </div>
        </div>
        <div class="hd-cell" @click="handleShowDetail">
          <div class="hd-icon">
            <img src="../../assets/hd_4.png" alt />
          </div>
          <div class="hd-label">
            <div class="hd-label__tille">服务点赞</div>
            <div class="hd-label__desc">对线上，线下政务服务提出表扬。</div>
          </div>
        </div>

        <div class="hd-cell" @click="toTousu">
          <div class="hd-icon">
            <img src="../../assets/hd_2.png" alt />
          </div>
          <div class="hd-label">
            <div class="hd-label__tille">事项投诉</div>
            <div class="hd-label__desc">对用户已办理且完结的事项进行投诉。</div>
          </div>
        </div>

        <div class="hd-cell" @click="toZhuiban">
          <div class="hd-icon">
            <img src="../../assets/hd_5.png" alt />
          </div>
          <div class="hd-label">
            <div class="hd-label__tille">事项追办</div>
            <div class="hd-label__desc">对用户已办理且办结超时的事项进行追办。</div>
          </div>
        </div>
        <div class="hd-cell" @click="toZNKF">
          <div class="hd-icon">
            <img src="../../assets/hd_1.png" alt />
          </div>
          <div class="hd-label">
            <div class="hd-label__tille">事项咨询</div>
            <div class="hd-label__desc">对具体某个事项咨询。可咨询事项有关的政策，流程等。</div>
          </div>
        </div>
        <div class="hd-cell" @click="toZNKF">
          <div class="hd-icon">
            <img src="../../assets/hd_7.png" alt />
          </div>
          <div class="hd-label">
            <div class="hd-label__tille">开放咨询</div>
            <div class="hd-label__desc">开放式咨询，可对线上，线下政府提供的政务服务提出咨询。</div>
          </div>
        </div>
        <div class="hd-cell" @click="toZNKF">
          <div class="hd-icon">
            <img src="../../assets/hd_6.png" alt />
          </div>
          <div class="hd-label">
            <div class="hd-label__tille">困难求助</div>
            <div class="hd-label__desc">对用户在使用政务使用过程中因各种原因，出现困难无法正常接受政务服务的情况进行求助。</div>
          </div>
        </div>
      </div>
      <div class="title-normal title-mg2">办件满意度排名</div>
      <div class="title-underline"></div>
      <div>
        <div class="hd-btns">
          <!-- evalMenu -->
          <div
            v-for="u in evalMenu"
            :key="u.entityCode"
            :class="{active:actkey==u.entityCode,'hd-button':true}"
            @click="handleNavClick(u)"
          >{{u.entityName}}</div>

          <!-- <div :class="{active:actkey=='t1','hd-button':true}" @click="handleNavClick('t1')">政务服务大厅</div>
          <div :class="{active:actkey=='t2','hd-button':true}" @click="handleNavClick('t2')">政务服务网</div>
          <div :class="{active:actkey=='t3','hd-button':true}" @click="handleNavClick('t3')">微信小程序</div>-->
        </div>
        <div class="hd-rates">
          <div class="hd-col-50">
            <div>
              <div class="col-title">满意度排名</div>
              <div class="hd-table">
                <div class="hd-tr tr-header">
                  <div class="hd-td">区域</div>
                  <div class="hd-td">好评数</div>
                  <div class="hd-td">差评数</div>
                  <div class="hd-td">评价从高到低</div>
                </div>
                <div class="statistic-voList">
                  <div class="hd-tr" v-for="r in outStatisticVoList">
                    <div class="hd-td" :title="r.regionName">{{r.regionName}}</div>
                    <div class="hd-td">{{r.goodCount||'0'}}</div>
                    <div class="hd-td">{{r.badCount||'0'}}</div>
                    <div class="hd-td">
                      <div class="hd-stars">
                        <img v-for="i in parseInt(r.score/2)" src="../../assets/star_l1.png" alt />
                        <img v-for="i in 5-parseInt(r.score/2)" src="../../assets/star_d1.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="hd-col-50">
            <div>
              <div class="col-title">部门满意度排名</div>
              <div class="hd-table">
                <div class="hd-tr tr-header">
                  <div class="hd-td">区域</div>
                  <div class="hd-td">好评数</div>
                  <div class="hd-td">差评数</div>
                  <div class="hd-td">
                    <span>评价从高到低</span>
                    <span></span>
                  </div>
                </div>
                <div class="statistic-voList">
                  <div class="hd-tr" v-for="r in outStatisticVoList2">
                    <div class="hd-td" :title="r.departmentName">{{r.departmentName}}</div>
                    <div class="hd-td">{{r.goodCount||'0'}}</div>
                    <div class="hd-td">{{r.badCount||'0'}}</div>
                    <div class="hd-td">
                      <div class="hd-stars">
                        <img v-for="i in parseInt(r.score/2)" src="../../assets/star_l1.png" alt />
                        <img v-for="i in 5-parseInt(r.score/2)" src="../../assets/star_d1.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="title-normal title-mg3">综合满意度排名</div>
      <div class="title-underline"></div>
      <div class="total-rate">
        <div class="total-rate__item">
          <div class="rate-item__title">差评数</div>
          <div class="rate-item__num">
            <span>59</span>
            <span class="num_samll">条</span>
          </div>
        </div>
        <div class="total-rate__item">
          <div class="rate-item__title">好评数</div>
          <div class="rate-item__num">
            <span>111159</span>
            <span class="num_samll">条</span>
          </div>
        </div>
        <div class="total-rate__item">
          <div class="rate-item__title">好评数</div>
          <div class="rate-item__num">
            <span>100%</span>
          </div>
        </div>
        <div class="total-rate__item">
          <div class="rate-item__title">
            <span class="num_samll">市平均分</span>
          </div>
          <div class="rate-item__num">
            <span>9.8</span>
            <span class="num_samll">分</span>
          </div>
        </div>
      </div>
      <div class="title-normal title-mg3">未按期办结</div>
      <div class="title-underline"></div>
      <div class="total-rate rate-chart">
        <div class="total-rate__item item-chart" id="pieContainer"></div>
        <div class="total-rate__item">
          <div class="rate-item__title">已办结</div>
          <div class="rate-item__num">
            <span>10876</span>
            <span class="num_samll">条</span>
          </div>
        </div>
        <div class="total-rate__item">
          <div class="rate-item__title">公众来信</div>
          <div class="rate-item__num">
            <span>15222</span>

            <span class="num_samll">条</span>
          </div>
        </div>
        <div class="total-rate__item">
          <div class="rate-item__title">回复信件</div>
          <div class="rate-item__num">
            <span>10888</span>

            <span class="num_samll">条</span>
          </div>
        </div>
      </div>
      <div class="title-normal title-mg3">依法可公开的咨询投诉</div>
      <div class="title-underline"></div>
      <div class="hd-table2">
        <table>
          <tr class="hd-table2-header">
            <td>问题描述</td>
            <td>区域</td>
            <td>进度</td>
          </tr>
          <tr class="hd-table2-row">
            <td>投诉岳麓区和馨园夜宵店吵闹问题</td>
            <td>芙蓉区</td>
            <td>已办结</td>
          </tr>
          <tr class="hd-table2-row">
            <td>投诉岳麓区和馨园夜宵店吵闹问题</td>
            <td>芙蓉区</td>
            <td>已办结</td>
          </tr>
          <tr class="hd-table2-row">
            <td>投诉岳麓区和馨园夜宵店吵闹问题</td>
            <td>芙蓉区</td>
            <td>已办结</td>
          </tr>
          <tr class="hd-table2-row">
            <td>投诉岳麓区和馨园夜宵店吵闹问题</td>
            <td>芙蓉区</td>
            <td>已办结</td>
          </tr>
          <tr class="hd-table2-row">
            <td>投诉岳麓区和馨园夜宵店吵闹问题</td>
            <td>芙蓉区</td>
            <td>已办结</td>
          </tr>
          <tr class="hd-table2-row">
            <td>投诉岳麓区和馨园夜宵店吵闹问题</td>
            <td>芙蓉区</td>
            <td>已办结</td>
          </tr>
          <tr class="hd-table2-row">
            <td>投诉岳麓区和馨园夜宵店吵闹问题</td>
            <td>芙蓉区</td>
            <td>已办结</td>
          </tr>
        </table>
      </div>
      <div class="title-normal title-mg3">好评差评TOP5</div>
      <div class="title-underline"></div>
      <div style="margin-top:32px;">
        <div class="hd-col-50" style="height:413px">
          <div class="col-title" style="margin-bottom:32px">好评最多Top5</div>
          <div class="eval-list">
            <div class="eval-list__cell" v-for="e in goodEvalTop5" :key="e.tagId">
              <div class="eval-cell-title">
                <span>{{ e.tagName }}</span>
                <span class="title-small">{{ e.value }}</span>
              </div>
              <div class="eval-cell-label eval-good">
                <div class="eval-cell-label__child" :style="{width:e.percent}"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="hd-col-50" style="height:413px">
          <div class="col-title" style="margin-bottom:32px">差评最多Top5</div>
          <div class="eval-list">
            <div class="eval-list__cell" v-for="e in badEvalTop5" :key="e.tagId">
              <div class="eval-cell-title">
                <span>{{ e.tagName }}</span>
                <span class="title-small">{{ e.value }}</span>
              </div>
              <div class="eval-cell-label eval-bad">
                <div class="eval-cell-label__child" :style="{width:e.percent}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDatil">
      <div class="title-normal title-mg3">
        <span class="nav-back" @click="back">首页</span>
        <span class="tow">></span>
        <span>评价</span>
      </div>
      <div class="title-underline"></div>
      <div>
        <div class="rate-container">
          <div class="rate-form">
            <div class="rate-form-item">
              <div class="rate-form-item__label">大厅或窗口</div>
              <div class="rate-form-item__control">
                <input type="text" placeholder="请选择大厅或者窗口" />
              </div>
            </div>
            <div class="rate-form-item">
              <div class="rate-form-item__label">服务满意度</div>
              <div class="rate-form-item__control">
                <div class="rate-stars">
                  <img src="../../assets/star_l1.png" alt />
                  <img src="../../assets/star_l1.png" alt />
                  <img src="../../assets/star_l1.png" alt />
                  <img src="../../assets/star_l1.png" alt />
                  <img src="../../assets/star_l1.png" alt />
                </div>
              </div>
            </div>
            <div class="rate-form-item flex-start">
              <div class="rate-form-item__label">您的建议</div>
              <div class="rate-form-item__control">
                <textarea placeholder="请描述您的问题，帮助我们改进…"></textarea>
              </div>
            </div>
            <div style="text-align:right;">
              <div class="rate-submit">提交评价</div>
            </div>
          </div>
          <div class="rate-p">
            <div class="col-title">最新评价</div>
            <div class="rate-table">
              <table>
                <tr class="rate-table-header">
                  <td>区域</td>
                  <td>评价从高到低</td>
                </tr>
                <tr>
                  <td>评价了市直政务大厅</td>
                  <td>
                    <div class="rate-table-stars">
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_d.png" alt />
                      <img src="../../assets/star_d.png" alt />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>评价了市直政务大厅</td>
                  <td>
                    <div class="rate-table-stars">
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_d.png" alt />
                      <img src="../../assets/star_d.png" alt />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>评价了市直政务大厅</td>
                  <td>
                    <div class="rate-table-stars">
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_d.png" alt />
                      <img src="../../assets/star_d.png" alt />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>评价了市直政务大厅</td>
                  <td>
                    <div class="rate-table-stars">
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_d.png" alt />
                      <img src="../../assets/star_d.png" alt />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>评价了市直政务大厅</td>
                  <td>
                    <div class="rate-table-stars">
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_d.png" alt />
                      <img src="../../assets/star_d.png" alt />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>评价了市直政务大厅</td>
                  <td>
                    <div class="rate-table-stars">
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_d.png" alt />
                      <img src="../../assets/star_d.png" alt />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>评价了市直政务大厅</td>
                  <td>
                    <div class="rate-table-stars">
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_l.png" alt />
                      <img src="../../assets/star_d.png" alt />
                      <img src="../../assets/star_d.png" alt />
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
// getStatistics,
import { getEvalCount, getStatistics, getPositions } from "../../api/admin";
const pieOption = {
  title: {
    text: ""
  },
  tooltip: {
    trigger: "item",
    formatter: a => {
      return a.name + ":" + a.value;
    }
  },
  label: {
    show: false,
    position: "center"
  },
  // color: ['#ccc', '#1771fb', '#60c539'],
  legend: {
    type: "scroll",
    orient: "horizontal",

    data: ["已经办结", "公众来信", "回复信件"]
  },
  series: [
    {
      name: "性别分布",
      type: "pie",
      radius: "55%",
      center: ["40%", "50%"],
      data: [
        {
          name: "已经办结",
          value: 10876
        },
        {
          name: "公众来信",
          value: 15222
        },
        {
          name: "回复信件",
          value: 10888
        }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
};
export default {
  // 互动场景
  name: "hdcj",
  data() {
    return {
      pieOption,
      showDatil: false,
      actkey: "hallAffair",
      evalMenu: [],
      outStatisticVoList: [],
      outStatisticVoList2: [],
      goodEvalTop5: [],
      badEvalTop5: []
    };
  },
  mounted() {
    this.initpie();
    this.getEvalCount();
    this.getPositions();
  },
  methods: {
    getPositions() {
      getPositions({
        regionCode: 430100000000,
        startTime: 20200501000000,
        endTime: 20200531235959,
        evalEntityCode: "hallAffair",
        type: 1,
        pageNo: 1,
        pageSize: 5
      }).then(res => {
        const target = res.data.pageData[0];
        if (target) {
          this.goodEvalTop5 = res.data.pageData.map(m => {
            const { value } = m;
            const percent = parseInt((value / target.value) * 100) + "%";
            return { ...m, percent };
          });
        }
      });
      getPositions({
        regionCode: 430100000000,
        startTime: 20200501000000,
        endTime: 20200531235959,
        evalEntityCode: "hallAffair",
        type: 2,
        pageNo: 1,
        pageSize: 5
      }).then(res => {
        const target = res.data.pageData[0];
        if (target) {
          this.badEvalTop5 = res.data.pageData.map(m => {
            const { value } = m;
            const percent = parseInt((value / target.value) * 100) + "%";
            return { ...m, percent };
          });
        }
      });
    },
    getEvalCount() {
      // // regionCode = 430100000000 & startTime=20200501000000 & endTime=20200531235959 & type=1
      getEvalCount({
        regionCode: 430100000000,
        startTime: 20200501000000,
        endTime: 20200531235959,
        type: 1
      }).then(res => {
        let data = (res.data || [])
          .sort((a, b) => b.evalCount - a.evalCount)
          .filter(a => {
            return a.entityCode !== "eAppAffair" && a.entityCode !== "sms";
          });
        this.evalMenu = data;
        this.handleNavClick(data[0]);
      });
    },
    toTousu() {
      window.open(
        "http://wlwz.changsha.gov.cn/webapp/cs/personsite/personEmail.jsp"
      );
    },
    toZNKF() {
      window.open("http://zwfw-new.hunan.gov.cn/znkf/portal-plus/");
    },
    toZhuiban() {
      window.open("http://zwfw-new.hunan.gov.cn/yhzx//my-comment");
    },
    handleShowDetail() {
      window.open("http://zwfw-new.hunan.gov.cn/ping/general-evaluation/");
      // this.showDatil = true;
    },
    back() {
      this.showDatil = false;
    },
    handleNavClick(menu) {
      this.actkey = menu.entityCode;
      // http://zwfw-new.hunan.gov.cn/ping/apis/statistics?regionCode=430100000000&startTime=20200501000000&endTime=20200531235959&evalEntityCode=yssAffair&type=1&pageNo=1&pageSize=2000&avgScoreSort=desc
      // regionCode = 430100000000 & startTime=20200501000000 & endTime=20200531235959 & evalEntityCode=egovAffair & type=1 & pageNo=1 & pageSize=2000 & avgScoreSort=desc
      // regionCode=430100000000&startTime=20200501000000&endTime=20200531235959&evalEntityCode=yssAffair&type=2&pageNo=1&pageSize=2000&avgScoreSort=desc
      getStatistics({
        regionCode: 430100000000,
        startTime: 20200501000000,
        endTime: 20200531235959,
        evalEntityCode: menu.entityCode,
        type: 1,
        pageNo: 1,
        pageSize: 2000,
        avgScoreSort: "desc"
      }).then(res => {
        this.outStatisticVoList = res.data.outStatisticVoList;
        console.log("getStatistics:", res);
      });
      getStatistics({
        regionCode: 430100000000,
        startTime: 20200501000000,
        endTime: 20200531235959,
        evalEntityCode: menu.entityCode,
        type: 2,
        pageNo: 1,
        pageSize: 2000,
        avgScoreSort: "desc"
      }).then(res => {
        this.outStatisticVoList2 = res.data.outStatisticVoList;
        console.log("getStatistics2:", res);
      });
    },
    initpie() {
      var dom = document.getElementById("pieContainer");
      var myChart = echarts.init(dom, {}, { renderer: "svg" });
      myChart.setOption(this.pieOption, true);
    }
  }
};
</script>

<style lang="less" scoped>
.statistic-voList{
  max-height:400px;overflow: hidden;overflow-y: auto;
}
.eval-list {
  .eval-list__cell {
    margin-bottom: 32px;
    .eval-cell-title {
      font-family: FZLTXHJW--GB1-0;
      font-size: 18px;
      letter-spacing: 1.88px;
      border-collapse: collapse;
      color: #333;
      line-height: 1;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .title-small {
        font-size: 14px;
      }
    }
    .eval-good {
      background-color: rgba(66, 147, 244, 0.1);
      .eval-cell-label__child {
        background-image: -webkit-gradient(
          linear,
          left top,
          right top,
          from(#c6e0ff),
          to(#4293f4)
        );
        background-image: linear-gradient(90deg, #c6e0ff, #4293f4);
      }
    }
    .eval-bad {
      background-color: rgba(241, 57, 57, 0.1);
      .eval-cell-label__child {
        background-image: -webkit-gradient(
          linear,
          left top,
          right top,
          from(#ffedc8),
          to(#f13939)
        );
        background-image: linear-gradient(90deg, #ffedc8, #f13939);
      }
    }
    .eval-cell-label {
      display: block;
      height: 0.3rem;
      position: relative;
      .eval-cell-label__child {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
}
.rate-submit {
  background: #2e5aa6;
  border-radius: 8px;
  border-radius: 8px;
  padding: 14px 40px;
  display: inline-block;
  font-family: FZLTXHJW--GB1-0;
  font-size: 18px;
  color: #ffffff;
  letter-spacing: 1.88px;
}
.rate-table-stars {
  img {
    width: 24px;
    height: 24px;
    margin-left: 8px;
    &:last-child {
      margin-left: 0;
    }
  }
}
.rate-table {
  table {
    width: 100%;
    border-collapse: collapse;
    .rate-table-header td {
      font-family: FZLTXHJW--GB1-0;
      font-size: 18px;
      color: #666666;
      letter-spacing: 1.88px;
      border-bottom: 1px solid #d8d8d8;
    }
    td {
      padding: 17px 0;
      font-family: FZLTXHJW--GB1-0;
      font-size: 18px;
      color: #333333;
      letter-spacing: 1.88px;
    }
  }
}
.rate-container {
  margin: 60px 0;
}
.rate-form {
  flex: 1;
}
.rate-form-item.flex-start {
  align-items: flex-start;
  .rate-form-item__label {
    margin-top: 20px;
  }
}
.rate-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 46px;
  .rate-form-item:last-child {
    margin-bottom: 40px;
  }
  .rate-form-item__label {
    width: 100px;
    font-family: FZLTXHJW--GB1-0;
    font-size: 18px;
    color: #333333;
    letter-spacing: 1.88px;
  }
  .rate-form-item__control2 {
  }
  .rate-form-item__control {
    flex: 1;
    margin-left: 38px;
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      font-family: FZLTXHJW--GB1-0;
      font-size: 18px;
      color: #cccccc;
      letter-spacing: 1.88px;
    }

    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-family: FZLTXHJW--GB1-0;
      font-size: 18px;
      color: #cccccc;
      letter-spacing: 1.88px;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      font-family: FZLTXHJW--GB1-0;
      font-size: 18px;
      color: #cccccc;
      letter-spacing: 1.88px;
    }
    textarea {
      display: inline-block;
      width: 100%;
      height: 264px;
      border: 1px solid #c2cadc;
      border-radius: 4px;
      border-radius: 4px;
      padding: 20px 20px;
      font-family: FZLTXHJW--GB1-0;
      font-size: 18px;
      color: #333;
      letter-spacing: 1.88px;
      resize: none;
    }
    input {
      display: inline-block;
      width: 100%;
      height: 64px;
      border: 1px solid #c2cadc;
      border-radius: 4px;
      border-radius: 4px;
      padding: 0 20px;
      font-family: FZLTXHJW--GB1-0;
      font-size: 18px;
      color: #333;
      letter-spacing: 1.88px;
    }
  }
}
.rate-container {
  display: flex;
  align-items: flex-start;
}
.rate-p {
  width: 430px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #c2cadc;
  min-height: 100px;
  margin-left: 32px;
  padding: 24px 30px;
}
.tow {
  margin: 0 20px;
  font-family: FZLTXHJW--GB1-0;
  font-size: 24px;
  color: #000000;
  letter-spacing: 2.5px;
}
.nav-back {
  font-family: FZLTXHJW--GB1-0;
  font-size: 24px;
  color: #000000;
  letter-spacing: 2.5px;
  cursor: pointer;
}
.hd-table2 {
  margin-top: 32px;

  table {
    width: 100%;
    font-family: FZLTXHJW--GB1-0;
    font-size: 18px;
    letter-spacing: 1.88px;
    border-collapse: collapse;
    color: #333;
    tr.hd-table2-row:nth-of-type(2n) {
      background: #f8fbff;
    }
    tr {
      background: #fffcf4;
    }
    .hd-table2-header {
      td,
      tr {
        background: #c2cadc;
      }
    }
    td {
      padding: 15px 20px;
    }
  }
}
.total-rate.rate-chart {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border: 0;
  align-items: flex-start;
  .item-chart {
    width: 300px;
    flex-shrink: 0;
    flex-grow: 0;
    height: 198px;
  }
}
.total-rate {
  border: 1px solid #c2cadc;
  height: 198px;
  margin-top: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 80px;

  .rate-item__title {
    font-family: FZLTXHJW--GB1-0;
    font-size: 18px;
    color: #000000;
    letter-spacing: 1.88px;
    margin-bottom: 24px;
  }
  .rate-item__num {
    font-family: FZLTXHJW--GB1-0;
    font-size: 48px;
    color: #000000;
    letter-spacing: 0;
    .num_samll {
      font-size: 18px;
      letter-spacing: 1.88px;
      margin-left: 8px;
    }
  }
}
.title-mg1 {
  margin: 32px 0;
}
.title-mg2 {
  margin-top: 15px;
  margin-bottom: 16px;
}
.title-mg3 {
  margin-top: 32px;
  margin-bottom: 16px;
}
.rate-stars {
  img {
    width: 36px;
    height: 36px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.hd-stars {
  img {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.hd-tr.tr-header {
  border-bottom: 1px solid #d8d8d8;
  .hd-td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: FZLTXHJW--GB1-0;
    font-size: 18px;
    color: #666666;
    letter-spacing: 1.88px;
  }
}
.hd-tr {
  padding: 16px 0;
  .hd-td {
    display: inline-block;
    vertical-align: middle;
    font-family: FZLTXHJW--GB1-0;
    font-size: 18px;
    color: #333333;
    letter-spacing: 1.88px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hd-td:nth-of-type(1) {
    width: 179px;
  }
  .hd-td:nth-of-type(2) {
    width: 90px;
  }
  .hd-td:nth-of-type(3) {
    width: 90px;
    text-align: center;
  }
  .hd-td:nth-of-type(4) {
    width: 189px;
    text-align: left;
  }
}
.col-title {
  font-family: FZLTXHJW--GB1-0;
  font-size: 24px;
  color: #000000;
  letter-spacing: 2.5px;
}
.hd-col-50 {
  width: 590px;
  display: inline-block;
  vertical-align: top;
  border: 1px solid #c2cadc;
  padding: 24px 20px;
}
.hd-col-50:nth-of-type(2n + 2) {
  margin-left: 20px;
}
.hd-btns {
  margin-top: 24px;
  margin-bottom: 24px;
}
.hd-button.active,
.hd-button:hover {
  background: #2e5aa6;
  color: #fff;
}
.hd-button {
  cursor: pointer;
  font-family: FZLTXHJW--GB1-0;
  font-size: 18px;
  color: #000000;
  letter-spacing: 1.88px;
  width: 160px;
  height: 48px;
  background: #f1f2f3;
  margin-right: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  line-height: 48px;
  transition: all 0.2s;
}
.title-underline {
  height: 3px;
  background: #333333;
}
.hd-list {
  display: flex;
  flex-wrap: wrap;
  .hd-cell {
    margin-bottom: 17px;
    margin-left: 17px;
    cursor: pointer;
    .hd-icon {
      height: 170px;
      border: 1px solid #c2cadc;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hd-label__tille {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #000000;
      margin: 12px 0 10px 0;
    }
    .hd-label__desc {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #666666;
      text-align: justify;
    }

    padding: 20px 15px;
    width: 287px;
    height: 326px;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .hd-cell:nth-of-type(4n + 1) {
    margin-left: 0;
  }
}
</style>