<template>
  <a-card :bordered="false">
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
              <a-button style="margin-left: 10px" :loading="loading" @click="onDownload">导出excel</a-button>
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
      <span slot="isOnline" slot-scope="text, record, index">{{ text?'在线':'离线' }}</span>
      <span slot="gender" slot-scope="text, record, index">{{ record.identityCardCode | filterSex }}</span>
      <span
        slot="birthDate"
        slot-scope="text, record, index"
      >{{ record.identityCardCode | filterBirthday }}</span>
      <span slot="cardType" slot-scope="text">
        <ellipsis :length="8" tooltip>{{ text }}</ellipsis>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import moment from "moment";
import { STable, Ellipsis } from "@/components";
import { searchUser, userDownload } from "@/api/admin";
import { columnsUserOnline } from "./table-columns-config";
import { getTableData, downloadRequest } from "@/utils/util";

export default {
  name: "TableList",
  components: {
    STable,
    Ellipsis
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
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        cardCode: "",
        phone: "",
        name: "",
        isOnline: 1
      },
      // 表头
      columns: columnsUserOnline,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const resParam = {
          pageNum: parameter.pageNo - 1,
          pageSize: parameter.pageSize
        };
        const queryParam = { ...this.queryParam };
        queryParam.startRegistTime = queryParam.startRegistTime
          ? moment(queryParam.startRegistTime).format("YYYY-MM-DD HH:mm:ss")
          : "";
        queryParam.endRegistTime = queryParam.endRegistTime
          ? moment(queryParam.endRegistTime).format("YYYY-MM-DD HH:mm:ss")
          : "";
        return searchUser(Object.assign(resParam, queryParam)).then(
          res => {
            const resData = getTableData(parameter, res);
            return resData;
          }
        );
      },
      selectedRowKeys: [],
      selectedRows: [],
      // custom table alert & rowSelection
      currentEditUser: {},
      loading: false
    };
  },
  methods: {
    handleCustomRow(record) {
      return {
        props: {},
        on: {
          // 事件
          click: event => {
            this.currentEditUser = record;
          } // 点击行
        }
      };
    },
    handleRowClassNames(record, index) {
      // eslint-disable-next-line eqeqeq
      if (
        record &&
        this.currentEditUser &&
        record.key == this.currentEditUser.key
      )
        return "cus-row-selected";
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      };
    },
    // 下载
    onDownload() {
      downloadRequest({
        url: userDownload(this.queryParam, 1),
        fileName: "在线用户"
      });
    }
  }
};
</script>
