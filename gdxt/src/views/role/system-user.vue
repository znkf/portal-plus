<template>
  <a-card :bordered="false">
    <div v-show="!showWorkerDetail">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="用户名称">
                <a-input v-model="queryParam.name" placeholder="请输入用户名称" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="证件号">
                <a-input v-model="queryParam.phone" placeholder="请输入证件号" />
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <!--  @click="$refs.table.refresh(true)" -->
                <a-button type="primary">搜索</a-button>
                <!--  @click="handleModify({})" -->
                <a-button style="margin-left: 10px">导出excel</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <template slot="action" slot-scope="text,record">
          <a @click="handleRowClick(record)">回复处理</a>
        </template>
        <a slot="status" slot-scope="text">未分派</a>
      </a-table>
    </div>
    <worker-order-detail v-if="showWorkerDetail" @close="backTo" :item="currentEditItem" />
  </a-card>
</template>

<script>
import { formItemLayout, formTailLayout } from "@/config/formSetting";
import { updateAdmin, addAdmin, adminDownload } from "@/api/admin";
import { downloadRequest } from "@/utils/util";
// #2e5aa6
import moment from "moment";
let data = [];
const roles = ["管理员", "运营人员", "审核人员", "运维人员"];
const names = ["刘高文", "刘洪伍", "张骞", "徐玉", "高威"];
const genderes = ["男", "男", "男", "女", "男"];

for (let i = 0; i < 5; i++) {
  let code = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  const obj = Object.assign(
    {},
    { code },
    { role: roles[parseInt(Math.random() * 3)] },
    { name: names[i] },
    { gender: genderes[i] },
    { updateTime: new Date().toLocaleString() },
    { status: parseInt(Math.random()) % 2 }
  );
  data.push(obj);
}
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender"
  },
  {
    title: "注册时间",
    dataIndex: "updateTime",
    key: "updateTime"
  },
  {
    title: "角色权限",
    dataIndex: "role",
    key: "role"
  }
];
export default {
  name: "TableList",
  components: {
    workerOrderDetail: () => import("./worker-order-reply-detail")
  },
  filters: {
    roleListFilter(roleList) {
      return roleList.map(p => p.name).join(",");
    },
    statusFilter(status) {
      // eslint-disable-next-line eqeqeq
      return status == 1 ? "是" : "否";
    }
  },
  data() {
    return {
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        identityCardCode: "",
        department: "",
        phone: "",
        name: "",
        company: ""
      },
      // 表头
      columns: columns,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return [];
      },
      showWorkerDetail: false,
      data: data,
      selectedRowKeys: [],
      selectedRows: [],
      formItemLayout,
      formTailLayout,
      userEditVisible: false,
      currentEditItem: {}
    };
  },
  created() {},
  methods: {
    backTo() {
      this.currentEditItem = {};
      this.showWorkerDetail = false;
    },
    handleRowClick(row) {
      console.log("handleRowClick:", row);
      this.currentEditItem = row;
      this.showWorkerDetail = true;
    },
    handleCustomRow(record) {
      return {
        props: {},
        on: {
          // 事件
          click: event => {
            this.currentEditItem = record;
          } // 点击行
        }
      };
    },
    handleRowClassNames(record, index) {
      // eslint-disable-next-line eqeqeq
      if (
        record &&
        this.currentEditItem &&
        record.key == this.currentEditItem.key
      )
        return "cus-row-selected";
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    closeModifyModal() {
      this.userEditVisible = false;
    },
    handleModify(item) {
      this.userEditVisible = true;
      this.currentEditItem = item;
    },
    handleEditorOk(parameter) {
      const birthDate = parameter.birthDate;
      const dateString = moment(birthDate).format("YYYY-MM-DD");
      parameter.birthDate = dateString;
      if (this.currentEditItem && this.currentEditItem.name) {
        const { id } = this.currentEditItem;
        parameter.id = id;
        updateAdmin({ ...parameter }).then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.errcode == 200) {
            this.currentEditItem = {};
            this.userEditVisible = false;
            setTimeout(() => {
              this.$refs.table.loadData();
              this.$message.success("修改信息成功！");
            }, 200);
          }
        });
      } else {
        addAdmin({ ...parameter }).then(res => {
          if (res.errcode == 200) {
            this.userEditVisible = false;
            setTimeout(() => {
              this.$refs.table.refresh(true);
              this.$message.success("添加成功！");
            }, 200);
          }
        });
      }
    },
    // 导出
    onDownload() {
      downloadRequest({
        url: adminDownload(this.queryParam),
        fileName: "管理员"
      });
    }
  }
};
</script>
