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
            <div class="content-50">
              <div class="col-title">满意度排名</div>
              <div class="hd-table">
                <div class="hd-tr tr-header">
                  <div class="hd-td">区域</div>
                  <div class="hd-td">好评数</div>
                  <div class="hd-td">差评数</div>
                  <div class="hd-td">
                    <span>评价从高到低</span>
                    <img style="margin-left:8px;" src="../../assets/paixu.png" alt />
                  </div>
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
            <div class="content-50">
              <div class="col-title">部门满意度排名</div>
              <div class="hd-table">
                <div class="hd-tr tr-header">
                  <div class="hd-td">区域</div>
                  <div class="hd-td">好评数</div>
                  <div class="hd-td">差评数</div>
                  <div class="hd-td">
                    <span>评价从高到低</span>
                    <img style="margin-left:8px;" src="../../assets/paixu.png" alt />
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
      <div class="title-normal title-mg3">好评差评TOP5</div>
      <div class="title-underline"></div>
      <div style="margin-top:32px;margin-left:-0.75rem;margin-right:-0.75rem;">
        <div class="hd-col-50">
          <div class="content-50">
            <div class="col-title" style="margin-bottom:32px">好评最多TOP5</div>
            <div class="eval-list" style="height:16rem;">
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
        </div>
        <div class="hd-col-50">
          <div class="content-50">
            <div class="col-title" style="margin-bottom:32px">吐槽最多TOP5</div>
            <div class="eval-list" style="height:16rem;">
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
      <div class="title-normal title-mg3">评价详情</div>
      <div class="title-underline"></div>
      <div>
        <div class="hd-btns">
          <!-- evalMenu -->
          <!--  -->
          <!-- , -->
          <div
            v-for="u in allEvalTypes"
            :key="u.starNumber"
            :class="{active:evalkey==u.starNumber,'hd-button':true,'type-bnt':true}"
            @click="getEvals(u.starNumber)"
          >
            <div style="margin-bottom:0.3rem">{{u.starName}}</div>
            <div>({{u.sumCount}})</div>
          </div>
        </div>
      </div>
      <div class="eval-detail-list">
        <div v-if="singleEval&&singleEval.pageData&&singleEval.pageData.length">
          <div class="eval-detail-item" v-for="s in singleEval.pageData">
            <div class="eval-item-header">
              <div class="eval-header-avat">
                <img
                  src="data:image/png;base64,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"
                  alt
                />
              </div>
              <div class="eval-header-name">
                <div class="eval-name">{{ s.userName }}</div>
                <div class="eval-date">
                  {{s.evalEntityName}}
                  <span></span>
                  {{ s.evalTime|filterTime }}
                </div>
              </div>
            </div>
            <div class="eval-item-content">
              <div class="eval-item-body">
                <div class="eval-item-star">
                  <img v-for="i in s.generalStars" src="../../assets/star_l1.png" alt />
                  <img v-for="i in 5-s.generalStars" src="../../assets/star_d1.png" alt />
                </div>
                <div class="eval-tag-list">
                  <span v-for="t in s.tagList" :key="t.tagId">{{ t.tagName }}</span>
                </div>
                <div class="eval-item-evt">评价事项：{{s.affairName}}</div>
              </div>
            </div>
          </div>
          <div class="eval-pagination" v-if="singleEval&&singleEval.pageTotal">
            <span
              class="eval-pagination-btn"
              v-if="singleEval.pageNo&&singleEval.pageNo>1"
              @click="incrPagenum"
            >
              <div class="eval-container">
                <div class="eval-arr arr-left"></div>
              </div>
            </span>
            <input type="number" min="1" v-model="pagenum" :max="singleEval.pageTotal"/>
            <span>/</span>
            <span>{{singleEval.pageTotal||0}}</span>
            <span class="eval-pagination-btn" @click="getEvalData">跳转</span>
            <span class="eval-pagination-btn" @click="decrPagenum">
              <div class="eval-container">
                <div class="eval-arr arr-right"></div>
              </div>
            </span>
          </div>
        </div>
        <div v-else style="text-align:center;">暂无评价</div>
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
          <tr class="hd-table2-row" v-for="mk in mkdata2">
            <td>{{mk.title}}</td>
            <td>{{mk.dept}}</td>
            <td>已办结</td>
          </tr>
        </table>
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

    <div class="gd-page-loading" v-show="loading">
      <div class="gd-page-loading-mask"></div>
      <div class="gd-page-loading-box">
        <div class="gd-loading"></div>
        <div class="loading-text">加载中</div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
// getStatistics,
import {
  getEvalCount,
  getStatistics,
  getPositions,
  gerEvalType,
  getEvals
} from "../../api/admin";
import { mkdata2 } from '../../api/mock-data'
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
      mkdata2,
      pagenum: 1,
      pieOption,
      showDatil: false,
      actkey: "hallAffair",
      evalMenu: [],
      outStatisticVoList: [],
      outStatisticVoList2: [],
      goodEvalTop5: [],
      badEvalTop5: [],
      allEvalTypes: [],
      singleEval: {
        pageData: []
      },
      evalkey: 0,
      loading:false
    };
  },
  filters: {
    filterTime(val) {
      if (!val) return "";
      const year = val.substr(0, 4);
      const month = val.substr(4, 2);
      const day = val.substr(6, 2);
      const hour = val.substr(8, 2);
      const minute = val.substr(10, 2);
      const sencods = val.substr(12, 2);
      return `${year}-${month}-${day} ${hour}:${minute}:${sencods}`;
    }
  },
  mounted() {
    this.initpie();
    this.getEvalCount();
    this.getPositions();
    this.gerEvalType();
    this.getEvals();
  },
  methods: {
    incrPagenum() {
      this.pagenum--;
      this.getEvalData();
    },
    decrPagenum() {
      this.pagenum++;
      this.getEvalData();
    },
    gerEvalType() {
      // ?regionCode = 430100000000 & evalEntityCode=hallAffair & startTime=20200501000000 & endTime=20200531235959
      gerEvalType({
        regionCode: 430100000000,
        startTime: 20200501000000,
        endTime: 20200531235959,
        evalEntityCode: "hallAffair"
      }).then(res => {
        console.log("获取所有的评价类型:", res);
        this.allEvalTypes = res.data.map(r => {
          return { ...r, id: parseInt(Math.random() * 99999) };
        });
      });
    },
    // ?regionCode = 430100000000 & startTime=20200501000000 & evalEntityCode=hallAffair & endTime=20200531235959 & pageSize=5 & pageNo=1 & generalStars=5
    // & commentFromPage=undefined & pageOperation=dn & lastRecord=
    paginationChange() {},
    getEvalData() {
      const evalkey = this.evalkey;
      const pagenum = this.pagenum;
      this.loading = true
      getEvals({
        regionCode: 430100000000,
        startTime: 20200501000000,
        endTime: 20200531235959,
        evalEntityCode: "hallAffair",
        commentFromPage: "",
        pageOperation: "dn",
        lastRecord: "",
        generalStars: evalkey,
        pageNo: pagenum,
        pageSize: 5
      }).then(res => {
        console.log("获取单个评价详情:", res);
        this.singleEval = res.data;
        this.loading = false
      });
    },
    getEvals(star = 0) {
      this.evalkey = star;
      this.pagenum = 1;
      this.getEvalData();
    },
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
.gd-page-loading-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.gd-page-loading-box {
  width: 160px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 24px 0;
}
.loading-text {
  padding: 15px;
  padding-bottom: 0;
  line-height: 1.2;
  font-size: 12px;
}
.gd-page-loading-box .gd-loading {
  font-size: 78px;
}
@keyframes ani-circle {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

.gd-loading {
  display: inline-block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 0.08em solid rgba(0, 0, 0, 0.1);
  border-top-color: currentColor !important;
  -webkit-animation: ani-circle 0.8s linear infinite;
  animation: ani-circle 0.8s linear infinite;
}
.gd-page-loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  z-index: 1005;
  opacity: 1;
  /* visibility: hidden; */
  visibility: visible;
}

.eval-pagination {
  margin-top: 32px;
  * {
    display: inline-block;
    vertical-align: middle;
  }
  *:not(:last-child) {
    margin-right: 0.5em;
  }
  .eval-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .eval-arr {
      content: "";
      position: absolute;
      border: 2px solid #3e97df;
      transform: rotateZ(45deg);
      width: 8px;
      height: 8px;
    }
    .arr-left {
      border-top: 0;
      border-right: 0;
    }
    .arr-right {
      border-bottom: 0;
      border-left: 0;
    }
  }
  input {
    border: 1px solid #c5c8ca;
    height: 38px;
    transition: all 0.2s;
    outline: 0;
    padding: 0 0.9em;
    border: 1px solid #ccc;
    border-radius: 0.3em;
    width: 80px;
    text-align: center;
  }
  .eval-pagination-btn {
    transition: all 0.2s;
    height: 38px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    border: none;
    outline: 0;
    padding: 0 2em;
    color: #3e97df;
    background: #ebf4fb;
    border-radius: 0.3em;
    line-height: 38px;
    position: relative;
  }
  span {
    font-size: 14px;
  }
}
.eval-tag-list {
  span {
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 0.7rem;
    line-height: 0.7rem;
    color: #45484b;
    text-align: center;
    border: 1px solid #c5c8ca;
    border-radius: 0.95rem;
    padding: 0.45rem 0.8rem;
    margin: 0 0.6rem 0.6rem 0;
  }
}
.eval-detail-list {
  .eval-detail-item {
    border-bottom: 1px solid #dfe1e2;
    padding: 1.2rem 0;
    .eval-item-header {
      display: flex;
      .eval-header-avat {
        width: 1.6rem;
        height: 1.6rem;
        flex-shrink: 0;
        flex-grow: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .eval-header-name {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 0.5rem;
        .eval-name {
          font-size: 0.7rem;
        }
        .eval-date {
          display: inline-block;
          width: 60%;
          text-align: right;
          font-size: 0.6rem;
          line-height: 1em;
          color: #9ea4a9;
          span {
            display: inline-block;
            vertical-align: middle;
            height: 14px;
            width: 1px;
            background: #c5c8ca;
            margin: 0 0.25rem;
          }
        }
      }
    }
    .eval-item-content {
      padding-left: 2.1rem;
      .eval-item-body {
        .eval-item-star {
          img {
            display: inline-block;
            width: 1.1rem;
            height: 1.1rem;
            margin-right: 0.35rem;
          }
        }
        .eval-item-evt {
          font-size: 0.6rem;
          line-height: 1.1rem;
          color: #9ea4a9;
        }
      }
    }
  }
}
.statistic-voList {
  max-height: 400px;
  overflow: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: transparent;
  }
}
.eval-list {
  .eval-list__cell {
    margin-bottom: 2rem;
    .eval-cell-title {
      font-family: FZLTXHJW--GB1-0;
      font-size: 0.9rem;
      letter-spacing: 1.88px;
      border-collapse: collapse;
      color: #333;
      line-height: 1;
      margin-bottom: 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .title-small {
        font-size: 0.7rem;
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
  border-radius: 0.4rem;
  border-radius: 0.4rem;
  padding: 0.7rem 2rem;
  display: inline-block;
  font-family: FZLTXHJW--GB1-0;
  font-size: 0.9rem;
  color: #ffffff;
  letter-spacing: 1.88px;
}
.rate-table-stars {
  img {
    width: 2.2rem;
    height: 2.2rem;
    margin-left: 0.4rem;
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
      font-size: 0.9rem;
      color: #666666;
      letter-spacing: 1.88px;
      border-bottom: 1px solid #d8d8d8;
    }
    td {
      padding: 0.8rem 0;
      font-family: FZLTXHJW--GB1-0;
      font-size: 0.9rem;
      color: #333333;
      letter-spacing: 1.88px;
    }
  }
}
.rate-container {
  margin: 3rem 0;
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
  margin-bottom: 2.3rem;
  .rate-form-item:last-child {
    margin-bottom: 2rem;
  }
  .rate-form-item__label {
    width: 5rem;
    font-family: FZLTXHJW--GB1-0;
    font-size: 0.9rem;
    color: #333333;
    letter-spacing: 1.88px;
  }
  .rate-form-item__control2 {
  }
  .rate-form-item__control {
    flex: 1;
    margin-left: 1.9rem;
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
      font-size: 0.9rem;
      color: #cccccc;
      letter-spacing: 1.88px;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      font-family: FZLTXHJW--GB1-0;
      font-size: 0.9rem;
      color: #cccccc;
      letter-spacing: 1.88px;
    }
    textarea {
      display: inline-block;
      width: 100%;
      height: 13.2rem;
      border: 1px solid #c2cadc;
      border-radius: 4px;
      border-radius: 4px;
      padding: 1rem 1rem;
      font-family: FZLTXHJW--GB1-0;
      font-size: 0.9rem;
      color: #333;
      letter-spacing: 1.88px;
      resize: none;
    }
    input {
      display: inline-block;
      width: 100%;
      height: 3.2rem;
      border: 1px solid #c2cadc;
      border-radius: 4px;
      border-radius: 4px;
      padding: 0 1rem;
      font-family: FZLTXHJW--GB1-0;
      font-size: 0.9rem;
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
  width: 21.5rem;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #c2cadc;
  min-height: 5rem;
  margin-left: 1.6rem;
  padding: 2.2rem 1.5em;
}
.tow {
  margin: 0 1rem;
  font-family: FZLTXHJW--GB1-0;
  font-size: 2.2rem;
  color: #000000;
  letter-spacing: 2.5px;
}
.nav-back {
  font-family: FZLTXHJW--GB1-0;
  font-size: 2.2rem;
  color: #000000;
  letter-spacing: 2.5px;
  cursor: pointer;
}
.hd-table2 {
  margin-top: 1.6rem;

  table {
    width: 100%;
    font-family: FZLTXHJW--GB1-0;
    font-size: 0.9rem;
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
      padding: 0.75rem 1rem;
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
    width: 15rem;
    flex-shrink: 0;
    flex-grow: 0;
    height: 9.9rem;
  }
}
.total-rate {
  border: 1px solid #c2cadc;
  height: 9.9rem;
  margin-top: 1.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 4rem;

  .rate-item__title {
    font-family: FZLTXHJW--GB1-0;
    font-size: 0.9rem;
    color: #000000;
    letter-spacing: 1.88px;
    margin-bottom: 2.2rem;
  }
  .rate-item__num {
    font-family: FZLTXHJW--GB1-0;
    font-size: 2.4rem;
    color: #000000;
    letter-spacing: 0;
    .num_samll {
      font-size: 0.9rem;
      letter-spacing: 1.88px;
      margin-left: 0.4rem;
    }
  }
}
.title-mg1 {
  margin: 1.6rem 0;
}
.title-mg2 {
  margin-top: 0.75rem;
  margin-bottom: 0.8rem;
}
.title-mg3 {
  margin-top: 1.6rem;
  margin-bottom: 0.8rem;
}
.rate-stars {
  img {
    width: 1.8rem;
    height: 1.8rem;
    display: inline-block;
    vertical-align: middle;
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
.hd-stars {
  img {
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.35rem;
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
    font-size: 0.9rem;
    color: #666666;
    letter-spacing: 1.88px;
  }
}
.hd-tr {
  padding: 0.8rem 0;
  white-space: nowrap;
  .hd-td {
    display: inline-block;
    vertical-align: middle;
    font-family: FZLTXHJW--GB1-0;
    font-size: 0.9rem;
    color: #333333;
    letter-spacing: 1.88px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hd-td:nth-of-type(1) {
    width: 8.95rem;
  }
  .hd-td:nth-of-type(2) {
    width: 4.5rem;
  }
  .hd-td:nth-of-type(3) {
    width: 4.5rem;
    text-align: center;
  }
  .hd-td:nth-of-type(4) {
    width: 9.35rem;
    text-align: left;
  }
}
.col-title {
  font-family: FZLTXHJW--GB1-0;
  font-size: 1.35rem;
  color: #000000;
  letter-spacing: 2.5px;
}
.hd-rates {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
}
.hd-col-50 {
  width: 50%;
  // width: 29.5rem;
  display: inline-block;
  vertical-align: top;
  padding: 0 0.75rem;
  .content-50 {
    padding: 2.2rem 1rem;
    border: 1px solid #c2cadc;
  }
}
// .hd-col-50:nth-of-type(2n + 2) {
//   margin-left: 1rem;
// }
.hd-btns {
  margin-top: 2.2rem;
  margin-bottom: 2.2rem;
}
.hd-button.active,
.hd-button:hover {
  background: #2e5aa6;
  color: #fff;
}
.hd-button.type-bnt {
  font-size: 0.8rem;
  margin-bottom: 1rem;
  width: 9rem;
}
.hd-button {
  cursor: pointer;
  font-family: FZLTXHJW--GB1-0;
  font-size: 0.9rem;
  color: #000000;
  letter-spacing: 1.88px;
  width: 10rem;
  // height: 2.4rem;
  background: #f1f2f3;
  margin-right: 1rem;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 0.7rem 1.5rem;
  // line-height: 2.4rem;
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
    margin-bottom: 0.85rem;
    margin-left: 0.85rem;
    cursor: pointer;
    .hd-icon {
      height: 8.5rem;
      border: 1px solid #c2cadc;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hd-label__tille {
      font-family: PingFangSC-Medium;
      font-size: 1.2rem;
      color: #000000;
      margin: 0.6rem 0 0.5rem 0;
    }
    .hd-label__desc {
      font-family: PingFangSC-Regular;
      font-size: 0.8rem;
      color: #666666;
      text-align: justify;
    }

    padding: 1rem 0.75rem;
    width: 14.35rem;
    height: 16.3rem;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .hd-cell:nth-of-type(4n + 1) {
    margin-left: 0;
  }
}
</style>