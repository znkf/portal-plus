<template>
  <a-card :bordered="false">
    <div v-show="!showWorkerDetail">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="角色编号">
                <a-input v-model="queryParam.name" placeholder="请输入发起人姓名" />
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="角色名称">
                <a-input v-model="queryParam.phone" placeholder="请输入工单名称" />
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
                <!-- <a-button style="margin-left: 10px">导出excel</a-button> -->
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
const data = [
  {
    name: "超级管理员",
    right: "拥有全局所有的权限。用于开发人员修改或初始化配置数据，不对外开放"
  },
  {
    name: "管理员",
    right: "对人员权限进行管理"
  },
  {
    name: "运营人员",
    right: "对知识库进行管理并可查看、处理回复所管辖站点的咨询投诉工单"
  },
  {
    name: "审核人员",
    right: "对运营人员的操作进行审核"
  },
  {
    name: "运维人员",
    right: "对统计分析等功能进行管理"
  }
];
const columns = [
  {
    title: "角色名字",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "权限范围",
    dataIndex: "right",
    key: "right"
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
