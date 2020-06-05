
<template>
  <a-modal
    title="编辑用户信息"
    :confirmLoading="confirmLoading"
    :visible="visible"
    :width="700"
    :footer="null"
    @cancel="closeModifyModal"
  >
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="民族"
      >
        <a-select v-decorator="decorator_nation" placeholder="请选择">
          <a-select-option
            v-for="nation in formNations"
            :key="nation.displayName"
            :value="nation.value"
          >{{ nation.displayName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="收件地址"
      >
        <a-cascader
          v-decorator="decorator_Address"
          :options="treeData2"
          :loadData="loadData"
          placeholder="请选择"
          changeOnSelect
          @change="onChange"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="详细地址"
      >
        <a-input v-decorator="decorator_detailedDddress" placeholder="请输入" />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="邮箱"
      >
        <a-input v-decorator="decorator_email" placeholder="请输入" />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="紧急联系人"
      >
        <a-input v-decorator="decorator_emergencyContact" placeholder="请输入" />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="紧急联系人手机号"
      >
        <a-input v-decorator="decorator_emergencyContactPhone" placeholder="请输入" />
      </a-form-item>
      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <a-button @click="closeModifyModal">取消</a-button>
        <a-button
          style="margin-left:10px;"
          type="primary"
          :loading="confirmLoading"
          @click="handleEditorOk"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { formNations, formItemLayoutS, formTailLayoutS } from '@/config/formSetting'
import { province, city, area } from '@/config/address'
import Vue from 'vue'
import { ADDRESS_DATA } from '@/store/mutation-types'

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: {
    visible: {
      type: Boolean,
      value: false
    },
    confirmLoading: {
      type: Boolean,
      value: false
    },
    // eslint-disable-next-line vue/require-default-prop
    item: {
      type: Object,
      value: {}
    }
  },
  data() {
    return {
      formItemLayout: formItemLayoutS,
      formTailLayout: formTailLayoutS,
      formNations,
      form: this.$form.createForm(this, { name: 'user_edit' }),
      province,
      city,
      area,
      treeData: [],
      treeData2: []
    }
  },
  computed: {
    decorator_nation() {
      let initialValue = null
      if (this.item && 'nation' in this.item) {
        initialValue = this.item.nation
      }
      return ['nation', { rules: [{ required: true, message: '请选择民族' }], initialValue: initialValue }]
    },
    decorator_email() {
      let initialValue = null
      if (this.item && 'email' in this.item) {
        initialValue = this.item.email
      }
      return [
        'email',
        {
          rules: [
            { required: true, message: '请输入邮箱' },
            {
              validator: this.handleConfirmEmail
            }
          ],
          initialValue: initialValue
        }
      ]
    },
    decorator_emergencyContact() {
      let initialValue = null
      if (this.item && 'emergencyContact' in this.item) {
        initialValue = this.item.emergencyContact
      }
      return [
        'emergencyContact',
        { rules: [{ required: true, message: '请输入紧急联系人姓名' }], initialValue: initialValue }
      ]
    },
    decorator_emergencyContactPhone() {
      let initialValue = null
      if (this.item && 'emergencyContactPhone' in this.item) {
        initialValue = this.item.emergencyContactPhone
      }
      return [
        'emergencyContactPhone',
        { rules: [{ required: true, message: '请输入紧急联系人姓名' }], initialValue: initialValue }
      ]
    },
    decorator_detailedDddress() {
      let initialValue = null
      if (this.item && 'mailDetailedAddress' in this.item) {
        initialValue = this.item.detailedDddress
      }
      return [
        'mailDetailedAddress',
        { rules: [{ required: true, message: '请输入紧急联系人姓名' }], initialValue: initialValue }
      ]
    },
    decorator_Address() {
      let initialValue = []
      if (this.item && 'province' in this.item) {
        initialValue = [this.item.province, this.item.city, this.item.district]
      }
      return ['address', { rules: [{ required: true, message: '请输入紧急联系人姓名' }], initialValue: initialValue }]
    }
  },
  created() {
    this.initAddress();
    this.initTreeData();
  },
  methods: {
    handleConfirmEmail(rule, value, callback) {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      // eslint-disable-next-line eqeqeq
      if (value != '' && !reg.test(value)) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('邮箱格式不正确')
      }
      callback()
    },
    initAddress() {
      const province = this.province
      const treeData = []
      for (let i = 0; i < province.length; i++) {
        const p = province[i]
        // eslint-disable-next-line camelcase
        const { name, level, code, parent_code } = p
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
        )
        treeData.push(obj)
      }
      this.treeData = treeData
    },
    initTreeData() {
      const province = this.province
      const city = this.city
      const area = this.area
      const treeData = Vue.ls.get(ADDRESS_DATA) || []
      if (treeData && treeData.length) {
        this.treeData2 = treeData
        return
      }
      for (let i = 0; i < province.length; i++) {
        const p = province[i]
        // eslint-disable-next-line camelcase
        const { name, level, code, parent_code } = p
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
        )
        // eslint-disable-next-line eqeqeq
        const targetCities = city.filter(c => c.parent_code == code)
        lv1.children = targetCities.map(c => {
          // eslint-disable-next-line camelcase
          const { name, level, code, parent_code } = c
          // eslint-disable-next-line eqeqeq
          const targetAreaes = area.filter(a => a.parent_code == code)
          const children = targetAreaes.map(p => {
            // eslint-disable-next-line camelcase
            const { name, level, code, parent_code } = p
            return Object.assign(
              {},
              {
                value: name,
                label: name,
                code,
                level,
                parent_code
              }
            )
          })
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
          )
        })
        treeData.push(lv1)
      }
      this.treeData2 = treeData
      Vue.ls.set(ADDRESS_DATA, treeData)
    },
    handleEditorOk() {
      // 测试
      // this.$emit('ok', {})
      this.form.validateFields(err => {
        if (!err) {
          const formValue = this.form.getFieldsValue()
          this.$emit('ok', formValue)
          this.form.resetFields()
        }
      })
    },
    closeModifyModal() {
      this.$emit('cancel')
      this.form.resetFields()
    },
    onChange(value) {},
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      // eslint-disable-next-line camelcase
      const { code, level, parent_code } = targetOption
      if (level === 1) {
        // eslint-disable-next-line eqeqeq
        const targetCities = this.city.filter(c => c.parent_code == code)

        let children = []
        if (targetCities && targetCities.length) {
          children = targetCities.map(p => {
            // eslint-disable-next-line camelcase
            const { name, level, code, parent_code } = p
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
            )
          })
        }
        targetOption.children = children
      } else if (level === 2) {
        // eslint-disable-next-line eqeqeq
        const targetAreaes = this.area.filter(c => c.parent_code == code)
        let children = []
        children = targetAreaes.map(p => {
          // eslint-disable-next-line camelcase
          const { name, level, code } = p
          return Object.assign(
            {},
            {
              value: name,
              label: name,
              code,
              level,
              parent_code
            }
          )
        })
        targetOption.children = children
      }
      targetOption.loading = false
      this.treeData = [...this.treeData]
    }
  }
}
</script>
