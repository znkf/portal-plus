<template>
  <a-card :bordered="false">
    <div v-show="!showWorkerDetail">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <!-- <a-col :md="8" :sm="24">
              <a-form-item label="发起人">
                <a-input v-model="queryParam.name" placeholder="请输入发起人姓名" />
              </a-form-item>
            </a-col>-->

            <a-col :md="8" :sm="24">
              <a-form-item label="主题">
                <a-input v-model="queryParam.phone" placeholder="请输入主题" />
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
          <a @click="handleRowClick(record)">督办</a>
        </template>
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
import { mkdata, mkdata2 } from "@/config/mock-data";
let data = [];
let currentTime = new Date().getTime();

for (let i = 0; i < 20; i++) {
  // let code = "";
  // const possible =
  //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  // for (let i = 0; i < 30; i++) {
  //   code += possible.charAt(Math.floor(Math.random() * possible.length));
  // }
  currentTime = currentTime - (Math.random() * 2 + 1) * i * 60 * 1000;
  const obj = Object.assign(
    {},
    { title: mkdata2[i].title },
    { dept: mkdata2[i].dept },
    { type: mkdata2[i].type },
    { updateTime: new Date(currentTime).toLocaleString() },
    { replyList: mkdata2[i].replyList },
    {
      desc: mkdata2[i].desc
    }
  );
  data.push(obj);
}
const columns = [
  {
    title: "主题",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "处理部门",
    dataIndex: "dept",
    key: "dept"
  },
  {
    title: "类别",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "提交时间",
    dataIndex: "updateTime",
    key: "updateTime"
  },
  // {
  //   title: "状态",
  //   scopedSlots: { customRender: "status" },
  //   width: 100
  // },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
    width: 80
  }
];
export default {
  name: "TableList",
  components: {
    workerOrderDetail: () => import("./worker-order-supervise-detail.vue")
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
