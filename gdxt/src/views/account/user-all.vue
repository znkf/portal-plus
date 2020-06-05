<template>
  <div>
    <a-card v-show="!showDetail" :bordered="false">
      <div>
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="证件号码">
                  <a-input v-model="queryParam.cardCode" placeholder="请输入证件号码" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="用户姓名">
                  <a-input v-model="queryParam.name" placeholder="请输入用户姓名" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="手机号码">
                  <a-input v-model="queryParam.phone" placeholder="请输入手机号码" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="起始注册时间">
                  <a-date-picker
                    v-model="queryParam.startRegistTime"
                    showTime
                    placeholder="请选择时间"
                    style="width:100%;"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="截止注册时间">
                  <a-date-picker
                    v-model="queryParam.endRegistTime"
                    showTime
                    placeholder="请选择时间"
                    style="width:100%;"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="!advanced && 8 || 24" :sm="24">
                <span
                  class="table-page-search-submitButtons"
                  :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
                >
                  <a-button type="primary" @click="$refs.table.refresh(true)">搜索</a-button>
                  <a-button style="margin-left: 10px" @click="onDownload">导出excel</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>

        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadData"
          showPagination="auto"
          :customRow="handleCustomRow"
          :rowClassName="handleRowClassNames"
          :scroll="{ x: 1200 }"
        >
          <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
          <span
            slot="gender"
            slot-scope="text, record, index"
          >{{ record.identityCardCode | filterSex }}</span>
          <span
            slot="birthDate"
            slot-scope="text, record, index"
          >{{ record.identityCardCode | filterBirthday }}</span>
          <span slot="isOnline" slot-scope="text, record, index">{{ text?'在线':'离线' }}</span>
          <span slot="action" slot-scope="text, record">
            <template>
              <!-- <a-popconfirm
                title="确认删除该用户？"
                okText="删除"
                cancelText="取消"
                @confirm="handleDelete(record)"
              >
              </a-popconfirm> -->
              <a @click="viewRowDetail(record)">查看详情</a>
              <a-divider type="vertical" />
              <a @click="handleModify(record)">修改</a>
            </template>
          </span>
        </s-table>

        <!-- <modal-edit-user
          :item="currentEditUser"
          :visible="userEditVisible"
          :confirmLoading="confirmLoading"
          @ok="handleEditorOk"
          @cancel="closeModifyModal"
        />-->
      </div>
    </a-card>
    <template v-if="showDetail">
      <user-detail
        :currentEditUser="currentEditUser"
        :isEdit="userEditVisible"
        @save="handleEditorOk"
        @close="backTable"
      />
    </template>
  </div>
</template>

<script>
import { STable, CheckStatus } from "@/components";
// import modalEditUser from "./modal-edit-user"
import {
  formItemLayout,
  formTailLayout,
  formNations
} from "@/config/formSetting";
import { searchUser, updateUser, deleteUser, userDownload } from "@/api/admin";
import { columnsUserAll } from "./table-columns-config";
import { getTableData, downloadRequest } from "@/utils/util";
import moment from "moment";
export default {
  name: "TableList",
  components: {
    STable,
    // modalEditUser,
    CheckStatus,
    userDetail: () => import("./user-detail")
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
    }
  },
  data() {
    return {
      userEditVisible: false,
      confirmLoading: false,
      pageLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        cardCode: "",
        phone: "",
        name: ""
      },
      showDetail: false,
      // 表头
      columns: columnsUserAll,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const resParam = {
          pageNum: parameter.pageNo - 1,
          pageSize: parameter.pageSize
        };
        // moment(this.item.startRegistTime)
        const queryParam = { ...this.queryParam };
        queryParam.startRegistTime = queryParam.startRegistTime
          ? moment(queryParam.startRegistTime).format("YYYY-MM-DD HH:mm:ss")
          : "";
        queryParam.endRegistTime = queryParam.endRegistTime
          ? moment(queryParam.endRegistTime).format("YYYY-MM-DD HH:mm:ss")
          : "";
        // startRegistTime endRegistTime
        return searchUser(Object.assign(resParam, queryParam)).then(res => {
          const resData = getTableData(parameter, res);
          return resData;
        });
      },
      selectedRowKeys: [],
      selectedRows: [],
      formItemLayout,
      formTailLayout,
      formNations,
      // custom table alert & rowSelection
      currentEditUser: {}
    };
  },
  methods: {
    // backTable
    backTable() {
      this.showDetail = false;
    },
    saveUserInfo(info) {},
    // 查看详情
    viewRowDetail(record) {
      this.showDetail = true;
      this.userEditVisible = false;
      this.currentEditUser = record;
    },
    // 自定义行 用来呈现点击选中样式
    handleCustomRow(record) {
      return {
        props: {},
        on: {
          // 点击行
          click: event => {
            this.currentEditUser = record;
          }
        }
      };
    },
    handleRowClassNames(record, index) {
      // eslint-disable-next-line eqeqeq
      if (
        record &&
        this.currentEditUser &&
        // eslint-disable-next-line eqeqeq
        record.key == this.currentEditUser.key
      ) {
        return "cus-row-selected";
      }
    },
    handleDelete(param) {
      deleteUser({ id: param.id }).then(res => {
        setTimeout(() => {
          this.$refs.table.loadData();
          this.$message.success("删除用户成功！");
        }, 200);
      });
    },
    closeModifyModal() {
      this.userEditVisible = false;
    },
    handleModify(item) {
      this.userEditVisible = true;
      this.showDetail = true;
      this.currentEditUser = item;
    },
    handleEditorOk(param) {
      this.confirmLoading = true;
      const { address } = param;
      const mailProvince = address[0];
      const mailCity = address[1];
      const mailDistrict = address[2];
      const { id } = this.currentEditUser;
      delete param.address;
      param.mailProvince = mailProvince;
      param.mailCity = mailCity;
      param.mailDistrict = mailDistrict;
      param.id = id;
      this.showDetail = false;
      console.log("updateUserinfo~~~>", param);
      updateUser(param).then(res => {
        this.userEditVisible = false;
        this.confirmLoading = false;
        setTimeout(() => {
          this.$refs.table.loadData();
          this.$message.success("修改用户信息成功！");
        }, 200);
      });
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    // 下载
    onDownload() {
      downloadRequest({
        fileName: "所有用户",
        url: userDownload(this.queryParam, "")
      });
    }
  }
};
</script>

