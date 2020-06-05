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
        <div class="group-title">
          <a-icon class="group-icon" type="copy" />
          <span>工单详情</span>
        </div>
        <table class="common-table">
          <tr>
            <td>工单号</td>
            <td>{{ item.code }}</td>
            <td>问题标题</td>
            <td>{{ item.title }}</td>
          </tr>
          <tr>
            <td>发起人</td>
            <td>{{ item.name1 }}</td>
            <td>问题类型</td>
            <td>{{ item.type }}</td>
          </tr>
          <tr>
            <td>提交时间</td>
            <td>{{ item.updateTime }}</td>
            <td>状态</td>
            <td>{{ item.status }}</td>
          </tr>
          <tr>
            <td>问题描述</td>
            <td colspan="3">问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述</td>
          </tr>
        </table>
      </div>
      <div class="detail-group">
        <div class="group-title">
          <a-icon class="group-icon" type="copy" />
          <span>工单回复</span>
        </div>
        <a-textarea
          v-model="replycontent"
          placeholder="请输入"
          :rows="6"
          :auto-size="{ minRows: 4, maxRows: 8 }"
          style="auto-size:none"
        />
        <div style="margin-top:20px;text-align:right;">
          <a-button type="primary">确定</a-button>
        </div>
        <div  style="margin-top:20px;margin-bottom:10px;">快捷回复</div>
        <div class="reply-qk-box">
          <div v-for="q in quickList" :key="q.id" @click="quickReply(q)">{{ q.content }}</div>
        </div>
      </div>
      <div class="detail-group">
        <div class="group-title">
          <a-icon class="group-icon" type="copy" />
          <span>沟通记录</span>
        </div>
        <div style="margin-top:10px">
          <div class="reply-list">
            <div class="reply-cell">
              <div class="cell-avt">
                <a-avatar :size="40" icon="user" />
              </div>
              <div class="cell-content">
                <div class="cell-content__header">
                  <div class="cell-name">技术部-James</div>
                  <div class="cell-time">2017-05-15 17:12:03</div>
                </div>
                <div class="cell-content__text">
                  您好，目前查看服务器负载正常，telnet 80、22也没有问题，建议您在关闭了iptables的情况下，检查一下服务器端的web访问日志，看是
                  否是应用程序存在问题，请了解。
                </div>
              </div>
            </div>
            <div class="reply-cell">
              <div class="cell-avt">
                <a-avatar :size="40" icon="user" />
              </div>
              <div class="cell-content">
                <div class="cell-content__header">
                  <div class="cell-name">技术部-James</div>
                  <div class="cell-time">2017-05-15 17:12:03</div>
                </div>
                <div class="cell-content__text">
                  您好，目前查看服务器负载正常，telnet 80、22也没有问题，建议您在关闭了iptables的情况下，检查一下服务器端的web访问日志，看是
                  否是应用程序存在问题，请了解。
                </div>
              </div>
            </div>
            <div class="reply-cell">
              <div class="cell-avt">
                <a-avatar :size="40" icon="user" />
              </div>
              <div class="cell-content">
                <div class="cell-content__header">
                  <div class="cell-name">技术部-James</div>
                  <div class="cell-time">2017-05-15 17:12:03</div>
                </div>
                <div class="cell-content__text">
                  您好，目前查看服务器负载正常，telnet 80、22也没有问题，建议您在关闭了iptables的情况下，检查一下服务器端的web访问日志，看是
                  否是应用程序存在问题，请了解。
                </div>
              </div>
            </div>
            <div class="reply-cell">
              <div class="cell-avt">
                <a-avatar :size="40" icon="user" />
              </div>
              <div class="cell-content">
                <div class="cell-content__header">
                  <div class="cell-name">技术部-James</div>
                  <div class="cell-time">2017-05-15 17:12:03</div>
                </div>
                <div class="cell-content__text">
                  您好，目前查看服务器负载正常，telnet 80、22也没有问题，建议您在关闭了iptables的情况下，检查一下服务器端的web访问日志，看是
                  否是应用程序存在问题，请了解。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
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
      replycontent: "",
      formLayout: "horizontal",
      formItemLayout: formItemLayoutSL,
      formTailLayout: formTailLayoutSL,
      form: this.$form.createForm(this, { name: "coordinated" }),
      quickList: [
        {
          id: 1,
          content: "驳回"
        },
        {
          id: 2,
          content: "通过"
        },
        {
          id: 3,
          content: "资料待完善"
        },
        {
          id: 4,
          content: "请尽快完成前置流程"
        },
        {
          id: 5,
          content: "请尽快完成前置流程"
        },
        {
          id: 6,
          content: "请尽快完成前置流程"
        },
        {
          id: 7,
          content: "请尽快完成前置流程"
        },
        {
          id: 8,
          content: "请尽快完成前置流程"
        },
        {
          id: 9,
          content: "请尽快完成前置流程"
        }
      ]
    };
  },
  methods: {
    bacoTo() {
      this.$emit("close");
    },
    quickReply(q) {
      this.replycontent = q.content;
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

<style scoped lang='less'>
.reply-qk-box {
  border: 1px solid #eee;
  border-radius: 4px;
  max-height: 300px;
  min-height: 130px;
  overflow: hidden;
  overflow-y: auto;
  div {
    padding: 10px 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
.reply-list {
  .reply-cell {
    display: flex;
    border-top: 1px solid #eee;
    align-items: flex-start;
    padding: 20px 0;
    .cell-avt {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      flex-grow: 0;
    }
    .cell-content {
      padding-left: 20px;
      .cell-content__header {
        display: flex;
        .cell-name {
          margin-right: 80px;
        }
        .cell-time {
        }
      }
      .cell-content__text {
        margin-top: 16px;
        font-size: 16px;
      }
    }
  }
}
</style>
