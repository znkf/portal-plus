/*
 * @Author: wei.liu
 * @Date: 2020-03-03 14:20:58
 * @LastEditTime: 2020-03-03 15:17:38
 * @LastEditors: wei.liu
 * @Description:
 */
import Vue from "vue";
import router from "./router";
import store from "./store";

import NProgress from "nprogress"; // progress bar
import "@/components/NProgress/nprogress.less"; // progress bar custom style
import notification from "ant-design-vue/es/notification";
import { setDocumentTitle, domTitle } from "@/utils/domUtil";
import { ACCESS_TOKEN } from "@/store/mutation-types";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["login", "register", "registerResult"]; // no redirect whitelist
const defaultRoutePath = "/user/login";

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  to.meta &&
    typeof to.meta.title !== "undefined" &&
    setDocumentTitle(`${to.meta.title} - ${domTitle}`);
  if (to.path === "/user/login") {
    next();
    NProgress.done();
  } else {
    if (Vue.ls.get("userInfo")) {
      if (store.getters.roles.length === 0) {
        store.dispatch("getPermission").then((roles) => {
          if (!roles.length) {
            notification.error({
              message: "错误",
              description: "该用户暂无任何权限,无法登录",
            });
            store.dispatch("Logout").then(() => {
              next({
                path: "/user/login",
                query: { redirect: to.fullPath },
              });
            });
            NProgress.done();
            return;
          }
          store.dispatch("GenerateRoutes", { roles }).then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters);
            const redirect = decodeURIComponent(from.query.redirect || to.path);
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true });
            } else {
              // 跳转到目的路由
              next({ path: redirect });
            }
          });
        });
      } else {
        next();
      }
    } else {
      next({ path: "/user/login" });
      NProgress.done();
    }
    // if (!store.state.user.name) {
    //   store.dispatch('Logout').then(() => {
    //     next({ path: '/user/login', query: { redirect: to.fullPath } })
    //   })
    // }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
