<template>
  <a-card :bordered="false">
    <div class="view-detail">
      <div class="detail-tools">
        <a-button-group>
          <!-- <a-button icon="retweet">刷新</a-button> -->
          <a-button icon="left" @click="bacoTo">返回</a-button>
        </a-button-group>
      </div>
      <div class="detail-group">
        <div class="group-title">
          <span>创建{{ item.title }}工单流程</span>
        </div>
        <div>
          <a-steps :current="steps.length-1" direction="vertical">
            <a-step v-for="s in steps" :key="s.id" @click="clickstep">
              <!-- <span slot="title">Finished</span> -->
              <template slot="title">
                <div v-if="!s.isedit">{{s.name}}</div>
                <a-input
                  v-else
                  v-model="s.name"
                  @change="handleNameChange(s.id,$event)"
                  style="margin-bottom:10px"
                  placeholder="步骤名称"
                ></a-input>
              </template>
              <template slot="description">
                <div style="margin-bottom:10px;">
                  <div v-if="!s.isedit">处理部门：芙蓉区</div>
                  <a-cascader v-else style="width:300px;" :options="treeOptions" placeholder="请选择" />
                  <!-- <a-select v-else value="female1" style="width:300px;" placeholder="处理部门">
                    <a-select-option value="female1">处理部门</a-select-option>
                    <a-select-option value="female2">处理部门</a-select-option>
                    <a-select-option value="female3">处理部门</a-select-option>
                  </a-select>-->
                </div>
                <!-- <div>
                  <div v-if="!s.isedit">处理人：部门1</div>
                  <a-select v-else value="female1" placeholder="处理人：部门1" style="width:300px;">
                    <a-select-option value="female1">处理人</a-select-option>
                    <a-select-option value="female2">处理人</a-select-option>
                    <a-select-option value="female3">处理人</a-select-option>
                  </a-select>
                </div>-->
                <div style="margin-top:20px;">
                  <template v-if="s.isedit">
                    <a @click="save(s.id)">保存</a>
                  </template>
                  <template v-else>
                    <a @click="edit(s.id)">编辑</a>
                  </template>

                  <a-divider type="vertical" />
                  <a @click="del(s.id)">删除</a>
                </div>
              </template>
            </a-step>
          </a-steps>
          <div style="margin-top:20px;">
            <div class="add-step" @click="addSetp"></div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { formItemLayoutSL, formTailLayoutSL } from "@/config/formSetting";

export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      formLayout: "horizontal",
      formItemLayout: formItemLayoutSL,
      formTailLayout: formTailLayoutSL,
      form: this.$form.createForm(this, { name: "coordinated" }),
      steps: [],
      treeOptions: [
        {
          value: "长沙市直",
          label: "长沙市直",
          children: [
            {
              value: "长沙市委宣传部（市新闻出版局、市版权局）",
              label: "长沙市委宣传部（市新闻出版局、市版权局）"
            },
            {
              value: "长沙市行政审批服务局",
              label: "长沙市行政审批服务局"
            },
            {
              value: "中共长沙市委机构编制委员会办公室",
              label: "中共长沙市委机构编制委员会办公室"
            },
            {
              value: "长沙市教育局",
              label: "长沙市教育局"
            },
            {
              value: "长沙市科技局",
              label: "长沙市科技局"
            },
            {
              value: "长沙市工业和信息化局",
              label: "长沙市工业和信息化局"
            },
            {
              value: "长沙市民宗局",
              label: "长沙市民宗局"
            },
            {
              value: "长沙市公安局",
              label: "长沙市公安局"
            },
            {
              value: "长沙市民政局",
              label: "长沙市民政局"
            },
            {
              value: "长沙市自然资源和规划局",
              label: "长沙市自然资源和规划局"
            },
            {
              value: "长沙市生态环境局",
              label: "长沙市生态环境局"
            },
            {
              value: "长沙市住房和城乡建设局",
              label: "长沙市住房和城乡建设局"
            },
            {
              value: "长沙市交通运输局",
              label: "长沙市交通运输局"
            },
            {
              value: "长沙市水利局",
              label: "长沙市水利局"
            },
            {
              value: "长沙市农业农村局",
              label: "长沙市农业农村局"
            },
            {
              value: "长沙市商务局",
              label: "长沙市商务局"
            },
            {
              value: "长沙市文化旅游广电局",
              label: "长沙市文化旅游广电局"
            },
            {
              value: "长沙市卫生健康委员会",
              label: "长沙市卫生健康委员会"
            },
            {
              value: "长沙市审计局",
              label: "长沙市审计局"
            },
            {
              value: "长沙市退役军人事务局",
              label: "长沙市退役军人事务局"
            },
            {
              value: "长沙市应急管理局",
              label: "长沙市应急管理局"
            }
          ]
        },
        {
          value: "芙蓉区",
          label: "芙蓉区",
          children: [
            {
              value: "芙蓉区发展和改革局",
              label: "芙蓉区发展和改革局"
            },
            {
              value: "芙蓉区教育局",
              label: "芙蓉区教育局"
            },
            {
              value: "芙蓉区工业和信息化局",
              label: "芙蓉区工业和信息化局"
            },
            {
              value: "芙蓉区住房城乡建设局（区人防办）",
              label: "芙蓉区住房城乡建设局（区人防办）"
            },
            {
              value: "芙蓉区城管局",
              label: "芙蓉区城管局"
            },
            {
              value: "芙蓉区统计局",
              label: "芙蓉区统计局"
            },
            {
              value: "芙蓉区人力资源和社会保障局",
              label: "芙蓉区人力资源和社会保障局"
            },
            {
              value: "芙蓉区委宣传部",
              label: "芙蓉区委宣传部"
            },
            {
              value: "芙蓉区行政执法局",
              label: "芙蓉区行政执法局"
            },
            {
              value: "芙蓉区委办公室",
              label: "芙蓉区委办公室"
            },
            {
              value: "芙蓉区统计局",
              label: "芙蓉区统计局"
            },
            {
              value: "芙蓉区司法局",
              label: "芙蓉区司法局"
            },
            {
              value: "芙蓉区环境保护局",
              label: "芙蓉区环境保护局"
            },
            {
              value: "芙蓉区委办公室",
              label: "芙蓉区委办公室"
            },
            {
              value: "芙蓉区司法局",
              label: "芙蓉区司法局"
            },
            {
              value: "芙蓉区医保局",
              label: "芙蓉区医保局"
            }
          ]
        },
        {
          value: "天心区",
          label: "天心区",
          children: [
            {
              value: "天心区发展和改革局",
              label: "天心区发展和改革局"
            },
            {
              value: "天心区教育局",
              label: "天心区教育局"
            },
            {
              value: "天心区工业和信息化局",
              label: "天心区工业和信息化局"
            },
            {
              value: "天心区住房城乡建设局（区人防办）",
              label: "天心区住房城乡建设局（区人防办）"
            },
            {
              value: "天心区城管局",
              label: "天心区城管局"
            },
            {
              value: "天心区统计局",
              label: "天心区统计局"
            },
            {
              value: "天心区人力资源和社会保障局",
              label: "天心区人力资源和社会保障局"
            },
            {
              value: "天心区委宣传部",
              label: "天心区委宣传部"
            },
            {
              value: "天心区行政执法局",
              label: "天心区行政执法局"
            },
            {
              value: "天心区委办公室",
              label: "天心区委办公室"
            },
            {
              value: "天心区统计局",
              label: "天心区统计局"
            },
            {
              value: "天心区司法局",
              label: "天心区司法局"
            },
            {
              value: "天心区环境保护局",
              label: "天心区环境保护局"
            },
            {
              value: "天心区委办公室",
              label: "天心区委办公室"
            },
            {
              value: "天心区司法局",
              label: "天心区司法局"
            },
            {
              value: "天心区医保局",
              label: "天心区医保局"
            }
          ]
        },
        {
          value: "岳麓区",
          label: "岳麓区",
          children: [
            {
              value: "岳麓区发展和改革局",
              label: "岳麓区发展和改革局"
            },
            {
              value: "岳麓区教育局",
              label: "岳麓区教育局"
            },
            {
              value: "岳麓区工业和信息化局",
              label: "岳麓区工业和信息化局"
            },
            {
              value: "岳麓区住房城乡建设局（区人防办）",
              label: "岳麓区住房城乡建设局（区人防办）"
            },
            {
              value: "岳麓区城管局",
              label: "岳麓区城管局"
            },
            {
              value: "岳麓区统计局",
              label: "岳麓区统计局"
            },
            {
              value: "岳麓区人力资源和社会保障局",
              label: "岳麓区人力资源和社会保障局"
            },
            {
              value: "岳麓区委宣传部",
              label: "岳麓区委宣传部"
            },
            {
              value: "岳麓区行政执法局",
              label: "岳麓区行政执法局"
            },
            {
              value: "岳麓区委办公室",
              label: "岳麓区委办公室"
            },
            {
              value: "岳麓区统计局",
              label: "岳麓区统计局"
            },
            {
              value: "岳麓区司法局",
              label: "岳麓区司法局"
            },
            {
              value: "岳麓区环境保护局",
              label: "岳麓区环境保护局"
            },
            {
              value: "岳麓区委办公室",
              label: "岳麓区委办公室"
            },
            {
              value: "岳麓区司法局",
              label: "岳麓区司法局"
            },
            {
              value: "岳麓区医保局",
              label: "岳麓区医保局"
            }
          ]
        },
        {
          value: "开福区",
          label: "开福区",
          children: [
            {
              value: "开福区发展和改革局",
              label: "开福区发展和改革局"
            },
            {
              value: "开福区教育局",
              label: "开福区教育局"
            },
            {
              value: "开福区工业和信息化局",
              label: "开福区工业和信息化局"
            },
            {
              value: "开福区住房城乡建设局（区人防办）",
              label: "开福区住房城乡建设局（区人防办）"
            },
            {
              value: "开福区城管局",
              label: "开福区城管局"
            },
            {
              value: "开福区统计局",
              label: "开福区统计局"
            },
            {
              value: "开福区人力资源和社会保障局",
              label: "开福区人力资源和社会保障局"
            },
            {
              value: "开福区委宣传部",
              label: "开福区委宣传部"
            },
            {
              value: "开福区行政执法局",
              label: "开福区行政执法局"
            },
            {
              value: "开福区委办公室",
              label: "开福区委办公室"
            },
            {
              value: "开福区统计局",
              label: "开福区统计局"
            },
            {
              value: "开福区司法局",
              label: "开福区司法局"
            },
            {
              value: "开福区环境保护局",
              label: "开福区环境保护局"
            },
            {
              value: "开福区委办公室",
              label: "开福区委办公室"
            },
            {
              value: "开福区司法局",
              label: "开福区司法局"
            },
            {
              value: "开福区医保局",
              label: "开福区医保局"
            }
          ]
        },
        {
          value: "雨花区",
          label: "雨花区",
          children: [
            {
              value: "雨花区发展和改革局",
              label: "雨花区发展和改革局"
            },
            {
              value: "雨花区教育局",
              label: "雨花区教育局"
            },
            {
              value: "雨花区工业和信息化局",
              label: "雨花区工业和信息化局"
            },
            {
              value: "雨花区住房城乡建设局（区人防办）",
              label: "雨花区住房城乡建设局（区人防办）"
            },
            {
              value: "雨花区城管局",
              label: "雨花区城管局"
            },
            {
              value: "雨花区统计局",
              label: "雨花区统计局"
            },
            {
              value: "雨花区人力资源和社会保障局",
              label: "雨花区人力资源和社会保障局"
            },
            {
              value: "雨花区委宣传部",
              label: "雨花区委宣传部"
            },
            {
              value: "雨花区行政执法局",
              label: "雨花区行政执法局"
            },
            {
              value: "雨花区委办公室",
              label: "雨花区委办公室"
            },
            {
              value: "雨花区统计局",
              label: "雨花区统计局"
            },
            {
              value: "雨花区司法局",
              label: "雨花区司法局"
            },
            {
              value: "雨花区环境保护局",
              label: "雨花区环境保护局"
            },
            {
              value: "雨花区委办公室",
              label: "雨花区委办公室"
            },
            {
              value: "雨花区司法局",
              label: "雨花区司法局"
            },
            {
              value: "雨花区医保局",
              label: "雨花区医保局"
            }
          ]
        },
        {
          value: "望城区",
          label: "望城区",
          children: [
            {
              value: "望城区发展和改革局",
              label: "望城区发展和改革局"
            },
            {
              value: "望城区教育局",
              label: "望城区教育局"
            },
            {
              value: "望城区工业和信息化局",
              label: "望城区工业和信息化局"
            },
            {
              value: "望城区住房城乡建设局（区人防办）",
              label: "望城区住房城乡建设局（区人防办）"
            },
            {
              value: "望城区城管局",
              label: "望城区城管局"
            },
            {
              value: "望城区统计局",
              label: "望城区统计局"
            },
            {
              value: "望城区人力资源和社会保障局",
              label: "望城区人力资源和社会保障局"
            },
            {
              value: "望城区委宣传部",
              label: "望城区委宣传部"
            },
            {
              value: "望城区行政执法局",
              label: "望城区行政执法局"
            },
            {
              value: "望城区委办公室",
              label: "望城区委办公室"
            },
            {
              value: "望城区统计局",
              label: "望城区统计局"
            },
            {
              value: "望城区司法局",
              label: "望城区司法局"
            },
            {
              value: "望城区环境保护局",
              label: "望城区环境保护局"
            },
            {
              value: "望城区委办公室",
              label: "望城区委办公室"
            },
            {
              value: "望城区司法局",
              label: "望城区司法局"
            },
            {
              value: "望城区医保局",
              label: "望城区医保局"
            }
          ]
        },
        {
          value: "长沙县",
          label: "长沙县",
          children: [
            {
              value: "长沙县发展和改革局",
              label: "长沙县发展和改革局"
            },
            {
              value: "长沙县教育局",
              label: "长沙县教育局"
            },
            {
              value: "长沙县工业和信息化局",
              label: "长沙县工业和信息化局"
            },
            {
              value: "长沙县住房城乡建设局（区人防办）",
              label: "长沙县住房城乡建设局（区人防办）"
            },
            {
              value: "长沙县城管局",
              label: "长沙县城管局"
            },
            {
              value: "长沙县统计局",
              label: "长沙县统计局"
            },
            {
              value: "长沙县人力资源和社会保障局",
              label: "长沙县人力资源和社会保障局"
            },
            {
              value: "长沙县委宣传部",
              label: "长沙县委宣传部"
            },
            {
              value: "长沙县行政执法局",
              label: "长沙县行政执法局"
            },
            {
              value: "长沙县委办公室",
              label: "长沙县委办公室"
            },
            {
              value: "长沙县统计局",
              label: "长沙县统计局"
            },
            {
              value: "长沙县司法局",
              label: "长沙县司法局"
            },
            {
              value: "长沙县环境保护局",
              label: "长沙县环境保护局"
            },
            {
              value: "长沙县委办公室",
              label: "长沙县委办公室"
            },
            {
              value: "长沙县司法局",
              label: "长沙县司法局"
            },
            {
              value: "长沙县医保局",
              label: "长沙县医保局"
            }
          ]
        },
        {
          value: "浏阳市",
          label: "浏阳市",
          children: [
            {
              value: "浏阳市发展和改革局",
              label: "浏阳市发展和改革局"
            },
            {
              value: "浏阳市教育局",
              label: "浏阳市教育局"
            },
            {
              value: "浏阳市工业和信息化局",
              label: "浏阳市工业和信息化局"
            },
            {
              value: "浏阳市住房城乡建设局（区人防办）",
              label: "浏阳市住房城乡建设局（区人防办）"
            },
            {
              value: "浏阳市城管局",
              label: "浏阳市城管局"
            },
            {
              value: "浏阳市统计局",
              label: "浏阳市统计局"
            },
            {
              value: "浏阳市人力资源和社会保障局",
              label: "浏阳市人力资源和社会保障局"
            },
            {
              value: "浏阳市委宣传部",
              label: "浏阳市委宣传部"
            },
            {
              value: "浏阳市行政执法局",
              label: "浏阳市行政执法局"
            },
            {
              value: "浏阳市委办公室",
              label: "浏阳市委办公室"
            },
            {
              value: "浏阳市统计局",
              label: "浏阳市统计局"
            },
            {
              value: "浏阳市司法局",
              label: "浏阳市司法局"
            },
            {
              value: "浏阳市环境保护局",
              label: "浏阳市环境保护局"
            },
            {
              value: "浏阳市委办公室",
              label: "浏阳市委办公室"
            },
            {
              value: "浏阳市司法局",
              label: "浏阳市司法局"
            },
            {
              value: "浏阳市医保局",
              label: "浏阳市医保局"
            }
          ]
        }
      ]
    };
  },
  methods: {
    bacoTo() {
      this.$emit("close");
    },
    handleNameChange(id, e) {
      const steps = this.steps;
      const target = steps.filter(s => s.id === id)[0];
      if (target) {
        target.name = e.target.value;
      }
    },
    edit(id) {
      const steps = this.steps;
      const target = steps.filter(s => s.id === id)[0];
      if (target) {
        target.isedit = true;
      }
    },
    del(id) {
      this.steps = this.steps.filter(s => s.id !== id);
    },
    save(id) {
      const steps = this.steps;
      const target = steps.filter(s => s.id === id)[0];
      if (target) {
        target.isedit = false;
      }
    },
    addSetp() {
      let step = {
        id: this.steps.length + 1,
        name: "步骤1",
        dept: "部门",
        zrr: "责任人",
        isedit: true
      };
      this.steps.push(step);
    },
    clickstep() {
      console.log("click step");
    }
  }
};
</script>

<style lang="less" scoped>
.add-step {
  background: #f5f5f5;
  width: 120px;
  height: 120px;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ddd;
}
.add-step:hover {
  border-color: @primary-color;
}
.add-step::after,
.add-step::before {
  position: absolute;
  content: "";
  background: #999999;
}
.add-step::after {
  width: 40px;
  height: 4px;
}
.add-step::before {
  width: 4px;
  height: 40px;
}
.ant-steps-item {
  cursor: pointer !important;
}
.ant-card-body {
  padding-top: 0;
}
</style>
