<template>
  <div class="main">
    <a-form
      id="formLogin"
      ref="formLogin"
      class="user-layout-login"
      :form="form"
      @submit="handleSubmit"
    >
      <a-alert
        v-if="isLoginError"
        type="error"
        showIcon
        style="margin-bottom: 24px;"
        message="账户或密码错误"
      />
      <a-form-item>
        <a-input
          v-decorator="['username', {rules: [{ required: true, message: '请输入帐户名' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}]"
          size="large"
          type="text"
          placeholder="账户"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          v-decorator="['password', {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}]"
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码"
        >
          <!-- 123456 -->
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <!-- <a-form-item>
        <a-row>
          <a-col :span="15">
            <a-input
              v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
              size="large"
              type="text"
              autocomplete="false"
              placeholder="请输入验证码"
            >
              <a-icon slot="prefix" type="history" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-col>
          <a-col :span="9">
            <div class="verify-image" @click="freshVerify">
              <img :src="image" />
            </div>
          </a-col>
        </a-row>
      </a-form-item> -->
      <!-- <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
      </a-form-item>-->
      <a-form-item style="margin-top:50px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// import md5 from 'md5'
// import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";
import { loginVerify } from "@/api/admin";
const CryptoJS = require("crypto-js");
// import { aes } from "../../utils/aes";
export default {
  // components: {
  //   TwoStepCaptcha
  // },
  data() {
    return {
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      image: "",
      verifyKey: "",
      captcha: ""
    };
  },
  created() {
    // loginVerify
    // get2step({})
    //   .then(res => {
    //     this.requiredTwoStepCaptcha = res.result.stepCode
    //   })
    //   .catch(() => {
    //     this.requiredTwoStepCaptcha = false
    //   })
    // this.requiredTwoStepCaptcha = true

    // this.freshVerify();
  },
  methods: {
    ...mapActions(["Login", "Logout"]),
    freshVerify() {
      loginVerify().then(res => {
        this.image = res.data.image;
        this.verifyKey = res.data.key;
      });
    },
    pAES(value) {
      const key = CryptoJS.enc.Utf8.parse(this.verifyKey);
      const plaintText = value; // 明文
      let encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      // console.log("加密前：" + plaintText);
      // console.log("加密后：" + encryptedData);
      // encryptedData = "z8LW6+vexDrePguc+tu1pg==";
      encryptedData = encryptedData.ciphertext.toString();
      const encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedData);

      console.log("加密后十六进制密文：",String(encryptedHexStr));
      return String(encryptedHexStr);
    },
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this;
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }
      callback();
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this;

      state.loginBtn = true;

      const validateFieldsKey = ["username", "password", "captcha"];

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log("login form", values);
          const loginParams = { ...values };
          delete loginParams.username;
          loginParams["username"] = values.username //this.pAES(values.username);
          // loginParams[!state.loginType ? 'email' : 'username'] = values.username
          loginParams.pwd = values.password //this.pAES(values.password); // md5()
          // loginParams.captcha = values.captcha;
          delete loginParams["password"];
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    },
    loginSuccess(res) {
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      this.$router.push({ path: "/" });
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: "欢迎",
          description: `${timeFix()}，欢迎回来`
        });
      }, 1000);
      this.isLoginError = false;
    },
    requestFailed(handler) {
      this.isLoginError = true;
    }
  }
};
</script>

<style lang="less" scoped>
.verify-image {
  text-align: center;
  cursor: pointer;
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
