<template>
  <div class="home-page">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <a-card :border="false">
          <div class="analysis-item">
            <div class="analysis-icon">
              <icon type="book" />
            </div>
            <div class="analysis-label">
              <div class="label-meta">今日新增用户数</div>
              <div class="label-total">{{ todayNewUserVisit }}</div>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <a-card :border="false">
          <div class="analysis-item">
            <div class="analysis-icon">
              <icon type="area-chart" />
            </div>
            <div class="analysis-label">
              <div class="label-meta">当前活跃用户数</div>
              <div class="label-total">{{ curActiveUser }}</div>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <a-card :border="false">
          <div class="analysis-item">
            <div class="analysis-icon">
              <icon type="area-chart" />
            </div>
            <div class="analysis-label">
              <div class="label-meta">用户总数</div>
              <div class="label-total">{{ sumUser }}</div>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <a-card :border="false">
          <div class="analysis-item">
            <div class="analysis-icon">
              <icon type="area-chart" />
            </div>
            <div class="analysis-label">
              <div class="label-meta">月活用户数</div>
              <div class="label-total">{{ curMonthlyCount }}</div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <div class="home-chart">
      <a-card title="用户统计">
        <div slot="extra" class="extra-wrapper">
          <div class="extra-item">
            <!-- <a
            v-for="a in accountType"
            :key="a.label"
            :class="dayRange_2==a.value?'active':''"
          >{{ a.label }}</a>
            <a-divider type="vertical" />-->
            <a
              v-for="d in dayRange"
              :key="d.label"
              :class="accountType_2==d.value?'active':''"
              @click="getRecentActiveUser(d.value)"
            >{{ d.label }}</a>
          </div>
          <a-range-picker
            :style="{ width: '230px' }"
            :disabledDate="disabledDate"
            format="YYYY-MM-DD"
            @change="handleActiveTimeChange"
          />
        </div>
        <a-row>
          <a-col :xs="24" :sm="24" :md="6">
            <div style="height:300px;">
              <div class="analysis-item2">
                <div class="analysis-meta2">本月活跃用户数</div>
                <div class="analysis-total2">{{ curMonthCount }}</div>
                <!-- <Icon type="caret-down" /> -->
                <div class="analysis-percent">
                  <icon :type="(cmpMonthRate>=0?'caret-up':'caret-down')" />
                  <span class="percent-number">{{ cmpMonthRate }}%</span>同比上月
                </div>
              </div>
              <div class="analysis-item2">
                <div class="analysis-meta2">本周活跃数量</div>
                <div class="analysis-total2">{{ curWeekCount }}</div>
                <!-- <Icon type="caret-down" /> -->
                <div class="analysis-percent">
                  <icon :type="(curWeekCount>=0?'caret-up':'caret-down')" />
                  <span class="percent-number">{{ curWeekCount }}%</span>同比上周
                </div>
              </div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="18">
            <div id="lineContainer" style="height:300px"></div>
          </a-col>
        </a-row>
      </a-card>
      <a-card style="margin-top:10px" title="办件统计">
        <div slot="extra" class="extra-wrapper">
          <div class="extra-item">
            <!-- <a
            v-for="a in accountType"
            :key="a.label"
            :class="dayRange_2==a.value?'active':''"
          >{{ a.label }}</a>
            <a-divider type="vertical" />-->
            <a
              v-for="d in dayRange"
              :key="d.label"
              :class="accountType_1==d.value?'active':''"
              @click="getRecentWorkTotal(d.value)"
            >{{ d.label }}</a>
          </div>
          <a-range-picker
            :style="{ width: '230px' }"
            :disabledDate="disabledDate"
            format="YYYY-MM-DD"
            @change="handleWorkTimeChange"
          />
        </div>
        <a-row>
          <a-col :xs="24" :sm="24" :md="6">
            <div style="height:300px;">
              <div class="analysis-item2">
                <div class="analysis-meta2">本月办件总数</div>
                <div class="analysis-total2">{{ curMonthCount2 }}</div>
                <!-- <Icon type="caret-down" /> -->
                <div class="analysis-percent">
                  <icon :type="(cmpMonthRate>=0?'caret-up':'caret-down')" />
                  <span class="percent-number">{{ cmpMonthRate2 }}%</span>同比上月
                </div>
              </div>
              <div class="analysis-item2">
                <div class="analysis-meta2">本周办件次数</div>
                <div class="analysis-total2">{{ curWeekCount2 }}</div>
                <!-- <Icon type="caret-down" /> -->
                <div class="analysis-percent">
                  <icon :type="(curWeekCount>=0?'caret-up':'caret-down')" />
                  <span class="percent-number">{{ curWeekCount2 }}%</span>同比上周
                </div>
              </div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="24" :md="18">
            <div id="lineContainer2" style="height:300px"></div>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import Icon from "ant-design-vue/es/icon";
import echarts from "echarts";
import {
  getVisitCount,
  getVisitRate,
  getVisitStatistics,
  getStatisticsRate,
  getStatisticsTrend
} from "@/api/admin";
import moment from "moment";
export default {
  components: {
    Icon
  },
  data() {
    return {
      dayRange_1: 1,
      accountType_1: 7,
      dayRange_2: 1,
      accountType_2: 7,
      accountType: [
        { label: "新增用户", value: 0 },
        { label: "活跃用户", value: 1 }
      ],
      dayRange: [
        { label: "昨天", value: 1 },
        { label: "近7天", value: 7 },
        { label: "近30天", value: 30 }
      ],
      lineChart: null,
      lineChart2: null,
      todayNewUserVisit: 0, // 今日新增用户
      curActiveUser: 0, // 当前活跃用户
      sumUser: 0, // 总用户量
      curMonthlyCount: 0, // 当月活跃用户
      cmpMonthRate: 0, // 同比上月增长比
      curMonthCount: 0, // 本月访问量
      cmpWeekRate: 0, // 同比上周增长比
      curWeekCount: 0, // 本周访问量
      // 办件
      cmpMonthRate2: 0, // 同比上月增长比
      curMonthCount2: 0, // 本月访问量
      cmpWeekRate2: 0, // 同比上周增长比
      curWeekCount2: 0, // 本周访问量
      renderType: ""
    };
  },
  mounted() {
    this.initPage();
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.chartResize();
      }, 0);
    });
  },

  methods: {
    initPage() {
      this.initChart();
      this.getPageData();
    },
    initChart() {
      this.getRecentActiveUser(7);
      this.getRecentWorkTotal(7);
    },
    getPageData() {
      getVisitCount().then(res => {
        const data = res.data;
        const {
          todayNewUserVisit,
          curActiveUser,
          sumUser,
          curMonthlyCount
        } = data;
        this.todayNewUserVisit = todayNewUserVisit;
        this.curActiveUser = curActiveUser;
        this.sumUser = sumUser;
        this.curMonthlyCount = curMonthlyCount;
      });
      getVisitRate().then(res => {
        const data = res.data;
        const { cmpMonthRate, curMonthCount, cmpWeekRate, curWeekCount } = data;
        this.cmpMonthRate = cmpMonthRate;
        this.curMonthCount = curMonthCount;
        this.cmpWeekRate = cmpWeekRate;
        this.curWeekCount = curWeekCount;
      });
      getStatisticsRate().then(res => {
        const data = res.data;
        const { cmpMonthRate, curMonthCount, cmpWeekRate, curWeekCount } = data;
        this.cmpMonthRate2 = cmpMonthRate;
        this.curMonthCount2 = curMonthCount;
        this.cmpWeekRate2 = cmpWeekRate;
        this.curWeekCount2 = curWeekCount;
      });
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().subtract(1, "days");
    },
    chartResize() {
      if (this.lineChart) {
        this.lineChart.resize();
      }
      if (this.lineChart2) {
        this.lineChart2.resize();
      }
    },
    handleActiveTimeChange(moments) {
      if (moments && moments.length === 2) {
        const startDate = moments[0].format("YYYYMMDD");
        const endDate = moments[1].format("YYYYMMDD");
        this.accountType_2 = 100000;
        this.getVisitStatistics(startDate, endDate);
      }
    },
    getRecentDays(day, format) {
      const endDate = moment()
        .subtract(1, "days")
        .format(format);
      const startDate = moment()
        .subtract(day, "days")
        .format(format);
      return { startDate, endDate };
    },
    handleWorkTimeChange(moments) {
      if (moments && moments.length === 2) {
        const startDate = moments[0].format("YYYY-MM-DD");
        const endDate = moments[1].format("YYYY-MM-DD");
        this.accountType_2 = 100000;
        this.getStatisticsTrend(startDate, endDate);
      }
    },
    // 获取最近1 7 30天
    getRecentActiveUser(day) {
      const dateRangeObj = this.getRecentDays(day, "YYYYMMDD");
      this.accountType_2 = day;
      this.getVisitStatistics(dateRangeObj.startDate, dateRangeObj.endDate);
    },
    getRecentWorkTotal(day) {
      const dateRangeObj = this.getRecentDays(day, "YYYY-MM-DD");
      this.accountType_1 = day;
      this.getStatisticsTrend(dateRangeObj.startDate, dateRangeObj.endDate);
    },
    getStatisticsTrend(startDate, endDate) {
      getStatisticsTrend({
        endDate,
        startDate
      }).then(res => {
        this.renderWorkLine(res.data);
      });
    },
    // 获取选取时间段
    getVisitStatistics(startDate, endDate) {
      getVisitStatistics({
        endDate,
        startDate
      }).then(res => {
        this.renderUserLine(res.data);
      });
    },
    transformData(data) {
      const xAxisData = [];
      const seriesData = [];
      for (const prop in data) {
        const yyyy = prop.substr(0, 4);
        const mm = prop.substr(4, 2);
        const dd = prop.substr(6, 2);
        const _date = `${mm}-${dd}`;
        xAxisData.push(_date);
        seriesData.push(data[prop]);
      }
      return {
        xAxisData,
        seriesData
      };
    },
    renderUserLine(data) {
      const chartData = this.transformData(data);
      const option = {
        title: {
          subtext: "近一周活跃用户统计",
          padding: [5, 60]
        },
        color: ["#4eaaec"],
        grid: {
          left: "60"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#808080"
            }
          },
          backgroundColor: "#fff",
          padding: [10, 20],
          textStyle: {
            color: "#000"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: chartData.xAxisData,
          axisLine: {
            lineStyle: {
              color: "#808080"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#808080"
            }
          }
        },
        series: [
          {
            data: chartData.seriesData,
            type: "line",
            lineStyle: {
              color: "#4eaaec"
            },
            areaStyle: {
              color: "#dceefb"
            },
            smooth: true
          }
        ]
      };
      var dom = document.getElementById("lineContainer");
      var myChart = echarts.init(dom, {}, { renderer: "svg" });
      myChart.setOption(option, true);
      this.lineChart = myChart;
    },
    renderWorkLine(data) {
      const xAxisData = [];
      const seriesData = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const { date, count } = d;
        const ymd = date.split("-");
        const mm = ymd[1];
        const dd = ymd[2];
        const _date = `${mm}-${dd}`;
        xAxisData.push(_date);
        seriesData.push(count);
      }
      const option = {
        title: {
          subtext: "近一周活跃用户统计",
          padding: [5, 60]
        },
        color: ["#4eaaec"],
        grid: {
          left: "60"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "#808080"
            }
          },
          backgroundColor: "#fff",
          padding: [10, 20],
          textStyle: {
            color: "#000"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: "#808080"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#808080"
            }
          }
        },
        series: [
          {
            data: seriesData,
            type: "line",
            lineStyle: {
              color: "#4eaaec"
            },
            areaStyle: {
              color: "#dceefb"
            },
            smooth: true
          }
        ]
      };
      var dom = document.getElementById("lineContainer2");
      var myChart = echarts.init(dom, {}, { renderer: "svg" });
      myChart.setOption(option, true);
      this.lineChart2 = myChart;
    }
  }
};
</script>

<style lang="less" scoped>
.analysis-item {
  display: flex;
  align-items: center;
  background: #fff;
  /* padding: 26px; */
  border-radius: 4px;
}
.analysis-icon {
  font-size: 46px;
  color: #29bb9c;
}
.analysis-label {
  padding-left: 20px;
  font-size: 18px;
}
.label-meta {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #29bb9c;
}
.label-total {
  font-size: 24px;
  color: #000;
}
.home-page .home-chart .ant-card-body {
  padding: 0 !important;
}

.analysis-item2 {
  margin: 20px 20px 30px 0;
  .analysis-meta2 {
    font-size: 12px;
    color: #808080;
  }
  .analysis-total2 {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 3px;
  }
  .analysis-percent {
    font-size: 12px;
    color: #bfbfbf;
  }
  .percent-number {
    color: #b34747;
    margin: 0 4px;
  }
}
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;
    a {
      padding: 0 10px;
      border-radius: 4px;
      border: 1px solid transparent;
      height: 28px;
      line-height: 28px;
      margin: 8px;
      display: inline-block;
      color: rgba(0, 0, 0, 0.65);
      transition: all 0.15s ease;
      &:hover {
        color: #1890ff;
        border-color: #1890ff;
      }
    }
    a.active {
      color: #1890ff;
      border-color: #1890ff;
    }
  }
}
</style>
