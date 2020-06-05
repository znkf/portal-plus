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
          <a-icon class="group-icon" type="copy" />
          <span>工单详情</span>
        </div>
        <table class="common-table">
          <tr>
            <td>主题</td>
            <td>{{ item.title }}</td>
            <td>处理部门</td>
            <td>{{ item.dept }}</td>
          </tr>
          <tr>
            <td>问题类型</td>
            <td>{{ item.type }}</td>
            <td>处理时间</td>
            <td>{{ item.updateTime }}</td>
          </tr>
          <tr>
            <td>问题描述</td>
            <td colspan="3">
              <p style="white-space: pre-wrap;">{{ item.desc }}</p>
            </td>
          </tr>
        </table>
      </div>
      <div class="detail-group">
        <div class="group-title">
          <a-icon class="group-icon" type="copy" />
          <span>工单分派</span>
        </div>
        <div style="margin-top:40px">
          <a-form :form="form">
            <a-form-item
              label="受理部门"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-cascader style="width:300px;" :options="treeOptions" placeholder="请选择" />
              <!-- <a-select
                placeholder="请选择受理部门"
                style="width:300px;"
                @change="handleSelectChange"
              >
                <a-select-option value="male">受部门1</a-select-option>
                <a-select-option value="female">受部门1</a-select-option>
                <a-select-option value="female1">受部门1</a-select-option>
                <a-select-option value="female2">受部门1</a-select-option>
                <a-select-option value="female3">受部门1</a-select-option>
              </a-select>-->
            </a-form-item>
            <a-form-item
              label="受理人"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-select placeholder="请选择受理人" style="width:300px;" @change="handleSelectChange">
                <a-select-option value="male">受理人1</a-select-option>
                <a-select-option value="female">受理人2</a-select-option>
                <a-select-option value="female1">受理人3</a-select-option>
                <a-select-option value="female2">受理人4</a-select-option>
                <a-select-option value="female3">受理人5</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              :label-col="formTailLayout.labelCol"
              :wrapper-col="formTailLayout.wrapperCol"
            >
              <a-button type="primary">确定</a-button>
              <a-button style="margin-left:10px;">关闭</a-button>
            </a-form-item>
          </a-form>
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    }
  }
};
</script>

<style>
</style>