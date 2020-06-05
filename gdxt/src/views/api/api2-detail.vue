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
        <detail-list title="域名">
          <detail-list-item :term="item.desc">http://smartgate.changsha.gov.cn/</detail-list-item>
        </detail-list>
        <a-divider style="margin-bottom: 32px" />
        <detail-list title="事项目录信息">
          <detail-list-item
            term="api"
          >http://smartgate.changsha.gov.cn/ebus/cssg_kc_zwfwsxgl/exchangeDataInterface/v2/getCsRightsListByPage</detail-list-item>
        </detail-list>
        <div>
          <a-button type="primary">启用</a-button>
          <a-button style="margin-left:10px;" type="danger">禁用</a-button>
          <a-button style="margin-left:10px;" @click="showDetailModal">查看详情</a-button>
        </div>
        <a-divider style="margin-bottom: 32px" />
        <detail-list title="组织机构">
          <detail-list-item
            term="api"
          >http://smartgate.0x5f81.cn/ebus/cssg_kc_zwfwsxgl/exchangeDataInterface/v1/getOrgInfoById</detail-list-item>
        </detail-list>
        <div>
          <a-button type="primary">启用</a-button>
          <a-button style="margin-left:10px;" type="danger">禁用</a-button>
          <a-button style="margin-left:10px;" @click="showDetailModal">查看详情</a-button>
        </div>
        <a-divider style="margin-bottom: 32px" />
        <detail-list title="事项基本信息">
          <detail-list-item
            term="api"
          >http://smartgate.changsha.gov.cn/ebus/cssg_kc_zwfwsxgl/exchangeDataInterface/v2/getApproveInfoBasicByPage</detail-list-item>
        </detail-list>
        <div>
          <a-button type="primary">启用</a-button>
          <a-button style="margin-left:10px;" type="danger">禁用</a-button>
          <a-button style="margin-left:10px;" @click="showDetailModal">查看详情</a-button>
        </div>
        <a-divider style="margin-bottom: 32px" />
        <detail-list title="行政权力">
          <detail-list-item
            term="api"
          >http://smartgate.changsha.gov.cn/ebus/cssg_kc_zwfwsxgl/exchangeDataInterface/v2/getRightsTempByPage</detail-list-item>
        </detail-list>
        <div>
          <a-button type="primary">启用</a-button>
          <a-button style="margin-left:10px;" type="danger">禁用</a-button>
          <a-button style="margin-left:10px;" @click="showDetailModal">查看详情</a-button>
        </div>
        <a-divider style="margin-bottom: 32px" />
        <detail-list title="事项明细">
          <detail-list-item
            term="api"
          >http://smartgate.changsha.gov.cn/ebus/sxml_be/event/getAuditItemDetail_Cur</detail-list-item>
        </detail-list>
        <div>
          <a-button type="primary">启用</a-button>
          <a-button style="margin-left:10px;" type="danger">禁用</a-button>
          <a-button style="margin-left:10px;" @click="showDetailModal">查看详情</a-button>
        </div>
      </div>
    </div>
    <a-modal title="映射详情" width="800px" :visible="visible" :footer="null" @cancel="closeModal">
      <div>
        <a-row :gutter="16">
          <a-col :span="12">
            <div>接入接口字段</div>
            <div class="api-code-list">
              <div v-for="i in code1" :key="i" class="api-cell">{{ i }}</div>
            </div>
          </a-col>
          <a-col :span="12">
            <div>内部映射字段</div>
            <div class="api-code-list">
              <div v-for="i in code2" :key="i" class="api-cell">{{ i }}</div>
            </div>
          </a-col>
          <a-col :span="24">
            <a-row :gutter="16">
              <a-col v-if="addnewCode" :span="12">
                <div>
                  <input v-model="newcode1" class="add-input" type="text" />
                </div>
              </a-col>
              <a-col v-if="addnewCode" :span="12">
                <div>
                  <input v-model="newcode2" class="add-input" type="text" />
                </div>
              </a-col>
              <a-col :span="12">
                <a-button v-if="!addnewCode" class="add-btn" type="primary" @click="addCode()">添加</a-button>
                <a-button v-else class="add-btn" type="primary" @click="saveCode()">保存</a-button>
              </a-col>
              <a-col :span="12">
                <a-button type="primary" class="add-btn" @click="deleCode()">删除</a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </a-card>
</template>

<script>
import { formItemLayoutSL, formTailLayoutSL } from "@/config/formSetting";
import DetailList from "@/components/tools/DetailList";
const DetailListItem = DetailList.Item;
const code1 = [
  "id",
  "code",
  "name",
  "modify_time",
  "modify_user",
  "create_user"
];
const code2 = [
  "userId",
  "user_code",
  "user_name",
  "update_time",
  "operator_id",
  "creator_id"
];
/*id userId
code user_code
name user_name
modify_time update_time
modify_user operator_id
create_user creator_id*/
export default {
  components: {
    DetailList,
    DetailListItem
  },
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
      visible: false,
      formLayout: "horizontal",
      formItemLayout: formItemLayoutSL,
      formTailLayout: formTailLayoutSL,
      form: this.$form.createForm(this, { name: "coordinated" }),
      code1,
      code2,
      editcode1: false,
      editcode2: false,
      newcode1: "",
      newcode2: "",
      addnewCode: false
    };
  },
  methods: {
    addCode(key) {
      this.addnewCode = true;
    },
    saveCode(key) {
      if (this.newcode1 && this.newcode2) {
        this.code1.push(this.newcode1);
        this.code2.push(this.newcode2);
        this.newcode1 = "";
        this.newcode2 = "";
      }
      this.addnewCode = false;
    },
    deleCode() {
      this.code1.pop();
      this.code2.pop();
    },
    closeModal() {
      this.visible = false;
    },
    showDetailModal() {
      this.visible = true;
    },
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

<style lang="less" scoped>
.add-input {
  width: 100%;
  margin-top: 6px;
  outline: none;
  box-shadow: none;
  border: 1px solid #eee;
  padding: 6px 20px;
}
.add-btn {
  width: 100%;
  text-align: center;
  margin-top: 4px;
}
.api-code-list {
  margin-top: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0 20px;
  .api-cell {
    padding: 10px 0;
    border-bottom: 1px solid #eeeeee;
    &:last-child {
      border-width: 0;
    }
  }
}
</style>