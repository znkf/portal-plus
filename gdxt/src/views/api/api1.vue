<template>
  <a-card :bordered="false">
    <div v-show="!showWorkerDetail">
      <div class="table-page-search-wrapper"></div>
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <template slot="action" slot-scope="text,record">
          <a>禁用</a>
          <a-divider type="vertical" />
          <a>启用</a>
          <a-divider type="vertical" />
          <a>删除</a>
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
for (let i = 0; i < 7; i++) {
  let code = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  const obj = Object.assign(
    {},
    { domain: "https://www." + code + ".com" },
    { desc: "功能说明_" + i },
    { port: parseInt(Math.random() * 80 + 8000) }
  );
  data.push(obj);
}
const columns = [
  {
    title: "域名",
    dataIndex: "domain",
    key: "domain"
  },
  {
    title: "端口号",
    dataIndex: "port",
    key: "port",
    width: 100
  },
  {
    title: "功能说明",
    dataIndex: "desc",
    key: "desc"
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
    width: 180
  }
];
export default {
  name: "TableList",
  components: {
    workerOrderDetail: () => import("./api1-detail")
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
