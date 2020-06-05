<template>
  <div>
    <a-card :bordered="false">
      <div slot="extra" class="extra-wrapper">
        <div class="extra-item">
          <a
            v-for="a in accountType"
            :key="a.label"
            :class="dayRange_1==a.value?'active':''"
            @click="handleUserTypeClick('card1',a.value)"
          >{{ a.label }}</a>
          <a-divider type="vertical" />
          <a
            v-for="d in dayRange"
            :key="d.label"
            :class="accountType_1==d.value?'active':''"
            @click="selectCardTimeRange('card1',d.value)"
          >{{ d.label }}</a>
        </div>
        <!-- <a-range-picker
          :style="{ width: '230px' }"
          :disabledDate="disabledDate"
          format="YYYY-MM-DD"
          @change="handleCard1DateRangeChange"
        />-->
      </div>
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :md="12">
          <div id="pieContainer" style="height:300px"></div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12">
          <div id="barContainer" style="height:300px"></div>
        </a-col>
      </a-row>
    </a-card>

    <a-card style="margin-top:20px" :bordered="false">
      <!-- <div slot="extra" class="extra-wrapper">
        <div class="extra-item">
          <a
            v-for="a in accountType"
            :key="a.label"
            :class="dayRange_2==a.value?'active':''"
            @click="handleUserTypeClick('card2',a.value)"
          >{{ a.label }}</a>
          <a-divider type="vertical" />
          <a
            v-for="d in dayRange"
            :key="d.label"
            :class="accountType_2==d.value?'active':''"
            @click="selectCardTimeRange('card2',d.value)"
          >{{ d.label }}</a>
        </div>
      </div> -->
      <a-row>
        <a-col :xs="24" :sm="24" :md="14">
          <div id="chinaMapContainer" style="height:500px"></div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="10">
          <rank-list title="使用人数排行" :list="rankList" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { RankList } from "@/components";
import "./china";
import moment from "moment";
import echarts from "echarts";
import { barOption, pieOption } from "./chartOption";
import { getVisitPortrait } from "@/api/admin";

export default {
  components: {
    RankList
  },
  data() {
    return {
      barOption,
      pieOption,
      rankList: [],
      barChart: null,
      pieChart: null,
      chinaChart: null,
      dayRange_1: 1,
      accountType_1: 2,
      dayRange_2: 1,
      accountType_2: 2,
      accountType: [
        { label: "新增用户", value: 1 },
        { label: "活跃用户", value: 2 }
      ],
      dayRange: [
        { label: "昨天", value: 1 },
        { label: "近7天", value: 2 },
        { label: "近30天", value: 3 }
      ],
      card1loading: false,
      card2loading: false
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.chartResize();
      }, 0);
    });
    this.initPage();
  },
  methods: {
    initPage() {
      this.getCard1Data();
      // this.getCard2Data();
    },
    handleUserTypeClick(type, value) {
      // type card1 card2
      if (type === "card1") {
        this.dayRange_1 = value;
        this.getCard1Data();
      } else if (type === "card2") {
        this.dayRange_2 = value;
        this.getCard2Data();
      }
    },
    selectCardTimeRange(type, value) {
      if (type === "card1") {
        this.accountType_1 = value;
        this.getCard1Data();
      } else if (type === "card2") {
        this.accountType_2 = value;
        this.getCard2Data();
      }
    },
    getCard1Data() {
      // this.card1loading = true;
      const userType = this.dayRange_1;
      const cycleType = this.accountType_1;
      this.getVisitPortrait({ userType, cycleType }).then(res => {
        const data = res.data;
        const { ages, genders, province } = data;
        this.initPie(genders);
        this.initBar(ages);
        this.initChinaMap(province);
        // this.card1loading = false;
      });
    },
    getCard2Data() {
      // this.card2loading = true;
      const userType = this.dayRange_2;
      const cycleType = this.accountType_2;
      this.getVisitPortrait({ userType, cycleType }).then(res => {
        const data = res.data;
        const { province } = data;
        this.initChinaMap(province);
        // this.card2loading = false;
      });
    },
    getVisitPortrait({ userType, cycleType }) {
      return getVisitPortrait({ userType, cycleType });
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().subtract(1, "days");
    },
    getRecentDays(day) {
      const endDate = moment()
        .subtract(1, "days")
        .format("YYYYMMDD");
      const startDate = moment()
        .subtract(day, "days")
        .format("YYYYMMDD");
      return { startDate, endDate };
    },
    handleCard1DateRangeChange(moments) {
      if (moments && moments.length === 2) {
        const startDate = moments[0].format("YYYYMMDD");
        const endDate = moments[1].format("YYYYMMDD");
        this.accountType_1 = 100000;
        console.log(startDate, endDate);
        // this.getVisitStatistics(startDate, endDate)
      }
    },
    chartResize() {
      if (this.barChart) {
        this.barChart.resize();
      }
      if (this.pieChart) {
        this.pieChart.resize();
      }
      if (this.chinaChart) {
        this.chinaChart.resize();
      }
    },
    initBar(ages) {
      const xAxisData = [];
      const seriesData = [];
      if (ages && ages.length) {
        for (let i = 0; i < ages.length; i++) {
          const age = ages[i];
          const { name, value } = age;
          xAxisData.push(name);
          seriesData.push({ name, value });
        }
      }
      this.barOption.xAxis.data = xAxisData;
      this.barOption.series[0].data = seriesData;
      var dom = document.getElementById("barContainer");
      var myChart = echarts.init(dom, {}, { renderer: "svg" });
      myChart.setOption(this.barOption, true);
      this.barChart = myChart;
    },
    initPie(genders) {
      const xAxisData = [];
      const seriesData = [];
      if (genders && genders.length) {
        for (let i = 0; i < genders.length; i++) {
          const gender = genders[i];
          const { name, value } = gender;
          xAxisData.push(name);
          seriesData.push({ name, value });
        }
      }
      this.pieOption.legend.data = xAxisData;
      this.pieOption.series[0].data = seriesData;
      var dom = document.getElementById("pieContainer");
      var myChart = echarts.init(dom, {}, { renderer: "svg" });
      myChart.setOption(this.pieOption, true);
      this.pieChart = myChart;
    },
    initChinaMap(provinces) {
      console.log(provinces);
      /* eslint-disable */
      const name_title = "地区分布";
      const subname = "";
      const nameColor = "rgba(0, 0, 0, 0.85)";
      const name_fontFamily = "等线";
      const subname_fontSize = 15;
      const name_fontSize = 18;
      const mapName = "china";
      const provincesData = [];
      let rankList = [];
      for (let i = 0; i < provinces.length; i++) {
        const province = provinces[i];
        let { name, value } = province;
        const newname = name.replace("省", "");
        if (value) {
          provincesData.push({ name: newname, value });
        }
        rankList.push({ name, total: value, value });
      }
      rankList = rankList.sort((a, b) => b.value - a.value).slice(0, 10);
      this.rankList = rankList;
      var data = [
        { name: "北京", value: 177 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 66 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 67 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 }
      ];
      var geoCoordMap = {};
      // var toolTipData = [
      //   {
      //     name: "北京",
      //     value: [
      //       { name: "男性", value: 95 },
      //       { name: "女性", value: 82 }
      //     ]
      //   },
      //   {
      //     name: "天津",
      //     value: [
      //       { name: "男性", value: 22 },
      //       { name: "女性", value: 20 }
      //     ]
      //   },
      //   {
      //     name: "河北",
      //     value: [
      //       { name: "男性", value: 60 },
      //       { name: "女性", value: 42 }
      //     ]
      //   },
      //   {
      //     name: "山西",
      //     value: [
      //       { name: "男性", value: 40 },
      //       { name: "女性", value: 41 }
      //     ]
      //   },
      //   {
      //     name: "内蒙古",
      //     value: [
      //       { name: "男性", value: 23 },
      //       { name: "女性", value: 24 }
      //     ]
      //   },
      //   {
      //     name: "辽宁",
      //     value: [
      //       { name: "男性", value: 39 },
      //       { name: "女性", value: 28 }
      //     ]
      //   },
      //   {
      //     name: "吉林",
      //     value: [
      //       { name: "男性", value: 41 },
      //       { name: "女性", value: 41 }
      //     ]
      //   },
      //   {
      //     name: "黑龙江",
      //     value: [
      //       { name: "男性", value: 35 },
      //       { name: "女性", value: 31 }
      //     ]
      //   },
      //   {
      //     name: "上海",
      //     value: [
      //       { name: "男性", value: 12 },
      //       { name: "女性", value: 12 }
      //     ]
      //   },
      //   {
      //     name: "江苏",
      //     value: [
      //       { name: "男性", value: 47 },
      //       { name: "女性", value: 45 }
      //     ]
      //   },
      //   {
      //     name: "浙江",
      //     value: [
      //       { name: "男性", value: 57 },
      //       { name: "女性", value: 57 }
      //     ]
      //   },
      //   {
      //     name: "安徽",
      //     value: [
      //       { name: "男性", value: 57 },
      //       { name: "女性", value: 52 }
      //     ]
      //   },
      //   {
      //     name: "福建",
      //     value: [
      //       { name: "男性", value: 59 },
      //       { name: "女性", value: 57 }
      //     ]
      //   },
      //   {
      //     name: "江西",
      //     value: [
      //       { name: "男性", value: 49 },
      //       { name: "女性", value: 42 }
      //     ]
      //   },
      //   {
      //     name: "山东",
      //     value: [
      //       { name: "男性", value: 67 },
      //       { name: "女性", value: 52 }
      //     ]
      //   },
      //   {
      //     name: "河南",
      //     value: [
      //       { name: "男性", value: 69 },
      //       { name: "女性", value: 68 }
      //     ]
      //   },
      //   {
      //     name: "湖北",
      //     value: [
      //       { name: "男性", value: 60 },
      //       { name: "女性", value: 56 }
      //     ]
      //   },
      //   {
      //     name: "湖南",
      //     value: [
      //       { name: "男性", value: 62 },
      //       { name: "女性", value: 52 }
      //     ]
      //   },
      //   {
      //     name: "重庆",
      //     value: [
      //       { name: "男性", value: 47 },
      //       { name: "女性", value: 44 }
      //     ]
      //   },
      //   {
      //     name: "四川",
      //     value: [
      //       { name: "男性", value: 65 },
      //       { name: "女性", value: 60 }
      //     ]
      //   },
      //   {
      //     name: "贵州",
      //     value: [
      //       { name: "男性", value: 32 },
      //       { name: "女性", value: 30 }
      //     ]
      //   },
      //   {
      //     name: "云南",
      //     value: [
      //       { name: "男性", value: 42 },
      //       { name: "女性", value: 41 }
      //     ]
      //   },
      //   {
      //     name: "西藏",
      //     value: [
      //       { name: "男性", value: 5 },
      //       { name: "女性", value: 4 }
      //     ]
      //   },
      //   {
      //     name: "陕西",
      //     value: [
      //       { name: "男性", value: 38 },
      //       { name: "女性", value: 42 }
      //     ]
      //   },
      //   {
      //     name: "甘肃",
      //     value: [
      //       { name: "男性", value: 28 },
      //       { name: "女性", value: 28 }
      //     ]
      //   },
      //   {
      //     name: "青海",
      //     value: [
      //       { name: "男性", value: 5 },
      //       { name: "女性", value: 5 }
      //     ]
      //   },
      //   {
      //     name: "宁夏",
      //     value: [
      //       { name: "男性", value: 10 },
      //       { name: "女性", value: 8 }
      //     ]
      //   },
      //   {
      //     name: "新疆",
      //     value: [
      //       { name: "男性", value: 36 },
      //       { name: "女性", value: 31 }
      //     ]
      //   },
      //   {
      //     name: "广东",
      //     value: [
      //       { name: "男性", value: 63 },
      //       { name: "女性", value: 60 }
      //     ]
      //   },
      //   {
      //     name: "广西",
      //     value: [
      //       { name: "男性", value: 29 },
      //       { name: "女性", value: 30 }
      //     ]
      //   },
      //   {
      //     name: "海南",
      //     value: [
      //       { name: "男性", value: 8 },
      //       { name: "女性", value: 6 }
      //     ]
      //   }
      // ];
      var dom = document.getElementById("chinaMapContainer");
      var myChart = echarts.init(dom);
      /*获取地图数据*/
      myChart.showLoading();
      var mapFeatures = echarts.getMap(mapName).geoJson.features;
      myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value || 0)
            });
          }
        }
        return res;
      };
      let option = {
        title: {
          text: name_title,
          subtext: subname,
          textStyle: {
            color: nameColor,
            fontFamily: name_fontFamily,
            fontSize: name_fontSize
          },
          subtextStyle: {
            fontSize: subname_fontSize,
            fontFamily: name_fontFamily
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (typeof params.value[2] == "undefined") {
              return (
                params.name + ":" + (isNaN(params.value) ? 0 : params.value)
              );
            } else {
              return "";
            }
          }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['credit_pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
          show: false,
          min: 0,
          max: 200,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            color: ["#1771fb", "#1771fb"] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
          }
        },
        /*工具按钮组*/
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         dataView: {
        //             readOnly: false
        //         },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#808080",
              borderColor: "#fff"
            },
            emphasis: {
              areaColor: "#4795f1"
            }
          }
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(provincesData),
            symbolSize: function(val) {
              return 0;
            },
            label: {
              show: false,
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            }
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            itemStyle: {
              borderColor: "#fff",
              normal: {
                areaColor: "#031525",
                borderColor: "#fff"
              },
              emphasis: {
                areaColor: "#4795f1"
              }
            },
            animation: false,
            data: provincesData
          }
          // ,
          // {
          //   name: '点',
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   symbol: 'pin', //气泡
          //   symbolSize: function(val) {
          //     var a = (maxSize4Pin - minSize4Pin) / (max - min)
          //     var b = minSize4Pin - a * min
          //     b = maxSize4Pin - a * max
          //     return a * val[2] + b
          //   },
          //   label: {
          //     normal: {
          //       show: true,
          //       textStyle: {
          //         color: '#fff',
          //         fontSize: 9
          //       }
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#F62157' //标志颜色
          //     }
          //   },
          //   zlevel: 6,
          //   data: convertData(data)
          // },
          // {
          //   name: 'Top 5',
          //   type: 'effectScatter',
          //   coordinateSystem: 'geo',
          //   data: convertData(
          //     data
          //       .sort(function(a, b) {
          //         return b.value - a.value
          //       })
          //       .slice(0, 5)
          //   ),
          //   symbolSize: function(val) {
          //     return val[2] / 10
          //   },
          //   showEffectOn: 'render',
          //   rippleEffect: {
          //     brushType: 'stroke'
          //   },
          //   hoverAnimation: true,
          //   label: {
          //     normal: {
          //       formatter: '{b}',
          //       position: 'right',
          //       show: true
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: 'yellow',
          //       shadowBlur: 10,
          //       shadowColor: 'yellow'
          //     }
          //   },
          //   zlevel: 1
          // }
        ]
      };
      myChart.setOption(option);
      this.chinaChart = myChart;
    }
  }
};
</script>
<style lang="less" scoped>
.chart-title {
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
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
