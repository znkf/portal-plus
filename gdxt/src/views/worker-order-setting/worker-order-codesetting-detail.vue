<template>
  <a-card :bordered="false">
    <a-modal
      title="添加新字段"
      width="400px"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div style="text-align:center;">
        <a-form :form="form">
          <!-- <a-form-item
            label="key"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input v-model="newCodeName" style="width:300px;" placeholder="输入属性字段名"></a-input>
          </a-form-item>-->
          <a-form-item
            label="字段名"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input v-model="newCodeKey" style="width:300px;" placeholder="输入key"></a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal
      title="编辑字段"
      width="500px"
      :visible="visible2"
      :confirm-loading="confirmLoading2"
      @ok="handleOk2"
      @cancel="handleCancel2"
    >
      <div class="code-list">
        <div v-for="p in plainOptions" :key="p.id" class="code-cell">
          <a-input
            v-if="p.isEdit"
            class="cell-label"
            :value="p.value"
            @change="handleCodeChange(p.id,$event)"
          ></a-input>
          <div v-else class="cell-label">{{ p.value }}</div>
          <div class="cell-edit">
            <template v-if="p.isEdit">
              <a @click="saveCodeOne(p.id)">保存</a>
              <a-divider type="vertical" />
              <a @click="deleCodeOne(p.id)">删除</a>
            </template>
            <template v-else>
              <a @click="editCodeOne(p.id)">编辑</a>
              <a-divider type="vertical" />
              <a @click="deleCodeOne(p.id)">删除</a>
            </template>
          </div>
        </div>
      </div>
    </a-modal>
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
          <span>工单属性配置</span>
        </div>
        <div style="margin-top:20px">
          <a-button @click="addCode">添加新属性</a-button>
          <a-button style="margin-left:10px;" @click="editCode">编辑属性</a-button>
        </div>
        <div style="margin-top:40px">
          <a-checkbox-group @change="onChange">
            <a-checkbox v-for="p in plainOptions" :key="p.id" :value="p.value">{{ p.label }}</a-checkbox>
          </a-checkbox-group>
        </div>
        <div style="margin-top:40px">
          <a-button type="primary">确定</a-button>
          <a-button style="margin-left:10px;">关闭</a-button>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
/*工单类型配置
投诉、建议、咨询、意见、留言、其他，
是否质检、是否回访、发起类型
工单属性
工单标题
工单类型
工单内容
工单状态
*/
const plainOptions = [
  {
    value: "工单属性",
    label: "工单属性",
    id: 1,
    isEdit: false
  },
  {
    value: "工单标题",
    label: "工单标题",
    id: 2,
    isEdit: false
  },
  {
    value: "工单类型",
    label: "工单类型",
    id: 3,
    isEdit: false
  },
  {
    value: "工单内容",
    label: "工单内容",
    id: 4,
    isEdit: false
  },
  {
    value: "工单状态",
    label: "工单状态",
    id: 5,
    isEdit: false
  }
];
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
      checkedList: [],
      formLayout: "horizontal",
      formItemLayout: formItemLayoutSL,
      formTailLayout: formTailLayoutSL,
      form: this.$form.createForm(this, { name: "coordinated" }),
      indeterminate: true,
      checkAll: false,
      plainOptions,
      ModalText: "Content of the modal",
      visible: false,
      visible2: false,
      confirmLoading: false,
      newCodeName: "",
      editVisible: false,
      confirmLoading2: false,
      newCodeKey: ""
    };
  },
  methods: {
    editCodeOne(id) {
      const target = this.plainOptions.filter(p => p.id === id)[0];
      if (target) {
        target.isEdit = true;
      }
    },
    saveCodeOne(id) {
      const target = this.plainOptions.filter(p => p.id === id)[0];
      if (target) {
        target.isEdit = false;
      }
    },
    deleCodeOne(id) {
      const targetes = this.plainOptions.filter(p => p.id !== id);
      this.plainOptions = targetes;
    },
    handleCodeChange(id, evt) {
      const target = this.plainOptions.filter(p => p.id === id)[0];
      if (target) {
        target.isEdit = true;
        target.label = evt.target.value;
        target.value = evt.target.value;
      }
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
        if (this.newCodeName) {
          const obj = Object.assign(
            {},
            { label: this.newCodeName },
            { value: this.newCodeName },
            { id: this.plainOptions.length + 1 },
            { isEdit: false }
          );
          this.plainOptions.push(obj);
        }
      }, 1000);
    },
    handleOk2(e) {
      this.confirmLoading2 = true;
      setTimeout(() => {
        this.visible2 = false;
        this.confirmLoading2 = false;
      }, 1000);
    },
    handleCancel2(e) {
      this.visible2 = false;
    },
    editCode() {
      this.visible2 = true;
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    addCode() {
      this.visible = true;
    },
    bacoTo() {
      this.$emit("close");
    },
    onChange(checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      });
    }
  }
};
</script>

<style lang="less" scoped>
.code-list {
  .code-cell {
    .cell-label {
      flex: 1;
    }
    div.cell-label {
      padding: 6px 0;
    }
    display: flex;
    align-items: center;
    .cell-edit {
      margin-left: 20px;
      width: 120px;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }
}
</style>
