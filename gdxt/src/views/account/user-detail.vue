<template>
  <a-card :bordered="false">
    <div class="view-detail">
      <div class="detail-tools">
        <a-button-group>
          <!-- <a-button icon="retweet">刷新</a-button> -->
          <a-button icon="left" @click="close">返回</a-button>
        </a-button-group>
      </div>
      <div class="detail-group">
        <table class="detail-table">
          <tr>
            <td rowspan="5">
              <!-- isOnline -->
              <template v-if="currentEditUser.isOnline">
                <div class="icon-status online">
                  <!-- <a-icon type="cross" /> -->
                  <a-icon type="check" />
                </div>
                <div>在线</div>
              </template>
              <template v-else>
                <div class="icon-status">
                  <a-icon type="cross" />
                </div>
                <div>离线</div>
              </template>
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>{{ currentEditUser.name }}</td>
            <td>性别</td>
            <td>{{ currentEditUser.identityCardCode | filterSex }}</td>
          </tr>
          <tr>
            <td>手机号码</td>
            <td>{{ currentEditUser.mobilePhone }}</td>
            <td>身份证号</td>
            <td>{{ currentEditUser.identityCardCode }}</td>
          </tr>
          <tr>
            <td>年龄</td>
            <td>{{ currentEditUser.identityCardCode | filterAge }}</td>
            <td>生日</td>
            <td>{{ currentEditUser.identityCardCode | filterBirthday }}</td>
          </tr>
          <tr>
            <td>注册时间</td>
            <td>{{ currentEditUser.createTime }}</td>
            <td>最近登录时间</td>
            <td>{{ currentEditUser.lastTifTime }}</td>
          </tr>
        </table>
      </div>
      <div v-if="!isEdit" class="detail-group">
        <div class="group-title">
          <a-icon class="group-icon" type="solution" />
          <span>常用信息</span>
        </div>
        <table class="common-table">
          <tr>
            <td>民族</td>
            <td>{{ currentEditUser.nation }}</td>
            <td>邮箱</td>
            <td>{{ currentEditUser.email }}</td>
          </tr>
          <tr>
            <td>紧急联系人</td>
            <td>{{ currentEditUser.emergencyContact }}</td>
            <td>紧急联系人手机号</td>
            <td>{{ currentEditUser.emergencyContactPhone }}</td>
          </tr>
          <tr>
            <td>收件地址</td>
            <td>{{ currentEditUser.mailProvince }}{{ currentEditUser.mailCity }} {{ currentEditUser.mailDistrict }} {{ currentEditUser.mailDetailedAddress }}</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div v-else class="detail-group">
        <div class="group-title">
          <a-icon class="group-icon" type="solution" />
          <span>常用信息</span>
        </div>
        <div>
          <a-form :form="form">
            <a-form-item
              label="民族"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-select v-decorator="decorator_nation" placeholder="请选择" style="width:220px;">
                <a-select-option
                  v-for="nation in formNations"
                  :key="nation.displayName"
                  :value="nation.value"
                >{{ nation.displayName }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="邮箱"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input v-decorator="decorator_email" placeholder="请输入" style="width:220px;" />
            </a-form-item>
            <a-form-item
              label="紧急联系人"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="decorator_emergencyContact"
                placeholder="请输入"
                style="width:220px;"
                :maxLength="10"
              />
            </a-form-item>
            <a-form-item
              label="紧急联系人手机号"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="decorator_emergencyContactPhone"
                placeholder="请输入"
                style="width:220px;"
                :maxLength="11"
              />
            </a-form-item>
            <a-form-item
              label="收件地址"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-cascader
                v-decorator="decorator_Address"
                style="width:420px;"
                :options="treeData2"
                :loadData="loadData"
                placeholder="请选择"
                changeOnSelect
                @change="onChange"
              />
            </a-form-item>
            <a-form-item
              label="详细地址"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="decorator_detailedDddress"
                placeholder="请输入"
                style="width:420px;"
                :maxLength="200"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
              <a-button type="primary" @click="handleEditorOk">提交</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div v-if="!isEdit" class="detail-group">
        <div class="group-title">
          <a-icon class="group-icon" type="setting" />
          <span>设置信息</span>
        </div>
        <table class="setting-table">
          <tr>
            <td>常用信息自动填写</td>
            <td>30天免登录</td>
          </tr>
          <tr>
            <!-- <Icon type="cross" /> -->
            <td>
              <!-- <a-icon type="check" /> -->
              <CheckStatus :check="currentEditUser.isAutoFill" />
            </td>
            <td>
              <CheckStatus :check="currentEditUser.isKeepTifSession" />
            </td>
          </tr>
        </table>
      </div>
      <!-- <div v-else class="detail-group">
        <div class="group-title">
          <a-icon class="group-icon" type="setting" />
          <span>设置信息</span>
        </div>
        <div>
          <a-form :form="form2">
            <a-form-item
              label="常用信息自动填写"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-switch :checked="currentEditUser.isAutoFill" :disabled="true" />
            </a-form-item>
            <a-form-item
              label="30天免登录"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-switch :checked="currentEditUser.isKeepTifSession" :disabled="true" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
              <a-button type="primary" @click="handleEditorOk">提交</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>-->
    </div>
  </a-card>
</template>

<script>
import { CheckStatus } from "@/components";
import { province, city, area } from "@/config/address";
import { ADDRESS_DATA } from "@/store/mutation-types";
import {
  formNations,
  formItemLayoutS,
  formTailLayoutS
} from "@/config/formSetting";

import Vue from "vue";

export default {
  components: {
    CheckStatus
  },
  filters: {
    filterBirthday(val) {
      const cardno = val;
      const year = cardno.substring(6, 6 + 4);
      const month = cardno.substring(10, 10 + 2);
      const day = cardno.substring(12, 12 + 2);
      return `${year}-${month}-${day}`;
    },
    filterSex(val) {
      const cardno = val;
      let sex = cardno.substring(16, 17); //== 'X' ? 10 : cardno.substring(16,17);
      if (sex % 2) {
        sex = "男";
      } else {
        sex = "女";
      }
      return sex;
    },
    filterAge(val) {
      const cardno = val;
      const year = cardno.substring(6, 6 + 4);
      return new Date().getFullYear() - parseInt(year);
    }
  },
  props: {
    visiable: {
      type: Boolean,
      default: false
    },
    currentEditUser: {
      type: Object,
      default: function() {
        return {};
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      province,
      city,
      area,
      treeData2: [],
      formItemLayout: formItemLayoutS,
      formTailLayout: formTailLayoutS,
      formNations,
      form: this.$form.createForm(this, { name: "user_edit" })
    };
  },
  computed: {
    birthday() {
      const cardno = this.currentEditUser.identityCardCode;
      const year = cardno.substring(6, 6 + 4);
      const month = cardno.substring(10, 10 + 2);
      const day = cardno.substring(12, 12 + 2);
      return `${year}-${month}-${day}`;
    },
    age() {
      const cardno = this.currentEditUser.identityCardCode;
      const year = cardno.substring(6, 6 + 4);
      return new Date().getFullYear() - parseInt(year);
    },
    decorator_autoFill() {
      let initialValue = null;
      if (this.currentEditUser && "isAutoFill" in this.currentEditUser) {
        initialValue = this.currentEditUser.isAutoFill;
      }
      return ["isAutoFill", { initialValue: initialValue }];
    },
    decorator_loginType() {
      let initialValue = null;
      if (this.currentEditUser && "isKeepTifSession" in this.currentEditUser) {
        initialValue = this.currentEditUser.isKeepTifSession;
      }
      return ["isKeepTifSession", { initialValue: initialValue }];
    },
    decorator_nation() {
      let initialValue = null;
      if (this.currentEditUser && "nation" in this.currentEditUser) {
        initialValue = this.currentEditUser.nation;
      }
      return [
        "nation",
        {
          rules: [{ required: true, message: "请选择民族" }],
          initialValue: initialValue ? initialValue : undefined
        }
      ];
    },
    decorator_email() {
      let initialValue = null;
      if (this.currentEditUser && "email" in this.currentEditUser) {
        initialValue = this.currentEditUser.email;
      }
      return [
        "email",
        {
          rules: [
            { required: true, message: "请输入邮箱" },
            {
              validator: this.handleConfirmEmail
            }
          ],
          initialValue: initialValue
        }
      ];
    },
    decorator_emergencyContact() {
      let initialValue = null;
      if (this.currentEditUser && "emergencyContact" in this.currentEditUser) {
        initialValue = this.currentEditUser.emergencyContact;
      }
      return [
        "emergencyContact",
        {
          rules: [{ required: true, message: "请输入紧急联系人姓名" }],
          initialValue: initialValue
        }
      ];
    },
    decorator_emergencyContactPhone() {
      let initialValue = null;
      if (
        this.currentEditUser &&
        "emergencyContactPhone" in this.currentEditUser
      ) {
        initialValue = this.currentEditUser.emergencyContactPhone;
      }
      return [
        "emergencyContactPhone",
        {
          rules: [
            { required: true, message: "请输入紧急联系人手机号" },
            {
              validator: this.handleConfirmPhone
            }
          ],
          initialValue: initialValue
        }
      ];
    },
    decorator_detailedDddress() {
      let initialValue = null;
      if (
        this.currentEditUser &&
        "mailDetailedAddress" in this.currentEditUser
      ) {
        initialValue = this.currentEditUser.mailDetailedAddress;
      }
      return [
        "mailDetailedAddress",
        {
          rules: [{ required: true, message: "请输入紧急联系人详细地址" }],
          initialValue: initialValue
        }
      ];
    },
    decorator_Address() {
      let initialValue = [];
      if (this.currentEditUser && "mailProvince" in this.currentEditUser) {
        initialValue = [
          this.currentEditUser.mailProvince,
          this.currentEditUser.mailCity,
          this.currentEditUser.mailDistrict
        ];
      }
      return [
        "address",
        {
          rules: [{ required: true, message: "请选择收件地址" }],
          initialValue: initialValue
        }
      ];
    }
    // province city district
  },
  mounted() {
    this.initAddress();
    this.initTreeData();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleConfirmEmail(rule, value, callback) {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      // eslint-disable-next-line eqeqeq
      if (!value) {
        callback();
      }
      if (value != "" && !reg.test(value)) {
        // eslint-disable-next-line standard/no-callback-literal
        callback("邮箱格式不正确");
      }
      callback();
    },
    handleConfirmPhone(rule, value, callback) {
      const reg = /^1[3456789]\d{9}$/;
      // eslint-disable-next-line eqeqeq
      if (!value) {
        callback();
      }
      if (value != "" && !reg.test(value)) {
        // eslint-disable-next-line standard/no-callback-literal
        callback("手机号码格式不正确");
      }

      callback();
    },
    initAddress() {
      const province = this.province;
      const treeData = [];
      for (let i = 0; i < province.length; i++) {
        const p = province[i];
        // eslint-disable-next-line camelcase
        const { name, level, code, parent_code } = p;
        const obj = Object.assign(
          {},
          {
            value: name,
            label: name,
            code,
            level,
            parent_code,
            isLeaf: false
          }
        );
        treeData.push(obj);
      }
      this.treeData = treeData;
    },
    initTreeData() {
      const province = this.province;
      const city = this.city;
      const area = this.area;
      const treeData = Vue.ls.get(ADDRESS_DATA) || [];
      if (treeData && treeData.length) {
        this.treeData2 = treeData;
        return;
      }
      for (let i = 0; i < province.length; i++) {
        const p = province[i];
        // eslint-disable-next-line camelcase
        const { name, level, code, parent_code } = p;
        const lv1 = Object.assign(
          {},
          {
            value: name,
            label: name,
            code,
            level,
            parent_code,
            isLeaf: false
          }
        );
        // eslint-disable-next-line eqeqeq
        const targetCities = city.filter(c => c.parent_code == code);
        lv1.children = targetCities.map(c => {
          // eslint-disable-next-line camelcase
          const { name, level, code, parent_code } = c;
          // eslint-disable-next-line eqeqeq
          const targetAreaes = area.filter(a => a.parent_code == code);
          const children = targetAreaes.map(p => {
            // eslint-disable-next-line camelcase
            const { name, level, code, parent_code } = p;
            return Object.assign(
              {},
              {
                value: name,
                label: name,
                code,
                level,
                parent_code
              }
            );
          });
          return Object.assign(
            {},
            {
              value: name,
              label: name,
              code,
              level,
              parent_code,
              isLeaf: false,
              children
            }
          );
        });
        treeData.push(lv1);
      }
      this.treeData2 = treeData;
      Vue.ls.set(ADDRESS_DATA, treeData);
    },
    onChange(value) {},
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      // eslint-disable-next-line camelcase
      const { code, level, parent_code } = targetOption;
      if (level === 1) {
        // eslint-disable-next-line eqeqeq
        const targetCities = this.city.filter(c => c.parent_code == code);

        let children = [];
        if (targetCities && targetCities.length) {
          children = targetCities.map(p => {
            // eslint-disable-next-line camelcase
            const { name, level, code, parent_code } = p;
            return Object.assign(
              {},
              {
                value: name,
                label: name,
                code,
                level,
                parent_code,
                isLeaf: false
              }
            );
          });
        }
        targetOption.children = children;
      } else if (level === 2) {
        // eslint-disable-next-line eqeqeq
        const targetAreaes = this.area.filter(c => c.parent_code == code);
        let children = [];
        children = targetAreaes.map(p => {
          // eslint-disable-next-line camelcase
          const { name, level, code } = p;
          return Object.assign(
            {},
            {
              value: name,
              label: name,
              code,
              level,
              parent_code
            }
          );
        });
        targetOption.children = children;
      }
      targetOption.loading = false;
      this.treeData = [...this.treeData];
    },
    handleEditorOk() {
      // 测试
      // this.$emit('ok', {})
      this.form.validateFields(err => {
        if (!err) {
          const formValue = this.form.getFieldsValue();
          console.log(formValue);
          this.$emit("save", {
            ...formValue,
            isAutoFill: this.currentEditUser.isAutoFill,
            isKeepTifSession: this.currentEditUser.isKeepTifSession
          });
          this.form.resetFields();
        }
      });
    }
  }
};
</script>
