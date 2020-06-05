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
          <span>工单类型配置</span>
        </div>
        <div style="margin-top:40px">
          <a-form :form="form">
            <a-form-item
              label="是否需要质检"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-select
                v-decorator="[
          'val1',
          { rules: [{ required: true, message: '是否需要质检' }] },
        ]"
                placeholder="是否需要质检"
                style="width:300px;"
                @change="handleSelectChange"
              >
                <a-select-option value="male">是</a-select-option>
                <a-select-option value="female">否</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="是否要回访"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-select
                v-decorator="[
          'val1',
          { rules: [{ required: true, message: '是否要回访' }] },
        ]"
                placeholder="是否要回访"
                style="width:300px;"
                @change="handleSelectChange"
              >
                <a-select-option value="male">是</a-select-option>
                <a-select-option value="female">否</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="发起类型"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-select
                v-decorator="[
          'val1',
          { rules: [{ required: true, message: '发起类型' }] },
        ]"
                placeholder="发起类型"
                style="width:300px;"
                @change="handleSelectChange"
              >
                <a-select-option :value="t" v-for="t in types">{{t}}</a-select-option>

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
const types = ["咨询", "建议", "意见", "其他", "投诉", "留言"];
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
      types
    };
  },
  methods: {
    bacoTo() {
      this.$emit('close')
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