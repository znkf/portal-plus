// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView } from "@/layouts";
// 路由配置表
export const asyncRouterMap = [
  {
    path: "/",
    name: "index",
    component: BasicLayout,
    meta: { title: "首页" },
    redirect: "/worker",
    children: [
      {
        path: "/worker",
        component: RouteView,
        redirect: "/worker/assigned",
        name: "worker",
        meta: {
          title: "工单管理",
          icon: "setting",
          keepAlive: false,
          permission: ["P001", "P002", "P003", "P004"]
        },
        children: [
          {
            path: "/worker/assigned",
            name: "workerassigned",
            component: () =>
              import("@/views/worker-order/worker-order-assigned"),
            meta: { title: "工单分派", keepAlive: false, permission: ["P001"] },
          },
          {
            path: "/worker/reply",
            name: "workerreply",
            component: () => import("@/views/worker-order/worker-order-reply"),
            meta: { title: "工单回复", keepAlive: false, permission: ["P002"] },
          },
          {
            path: "/worker/approval",
            name: "workerapproval",
            component: () =>
              import("@/views/worker-order/worker-order-approval"),
            meta: { title: "工单审批", keepAlive: false, permission: ["P003"] },
          },
          {
            path: "/worker/rate",
            name: "workerrate",
            component: () =>
              import("@/views/worker-order/worker-order-rate"),
            meta: { title: "工单质检", keepAlive: false, permission: ["P004"] },
          },
          {
            path: "/worker/rvisit",
            name: "workerrvisit",
            component: () =>
              import("@/views/worker-order/worker-order-rvisit"),
            meta: { title: "工单回访", keepAlive: false, permission: ["P005"] },
          },
          {
            path: "/worker/supervise",
            name: "workersupervise",
            component: () =>
              import("@/views/worker-order/worker-order-supervise"),
            meta: { title: "工单督办", keepAlive: false, permission: ["P006"] },
          },
          
        ],
      },
      {
        path: "/role",
        component: RouteView,
        redirect: "/system/user",
        name: "roles",
        meta: {
          title: "用户与权限管理",
          icon: "setting",
          keepAlive: false,
          permission: ["P020", "P021"],
        },
        children: [
          {
            path: "/system/user",
            name: "systemuser",
            component: () => import("@/views/role/system-user"),
            meta: {
              title: "用户列表",
              keepAlive: false,
              permission: ["P020"],
            },
          },
          {
            path: "/system/role",
            name: "systemrole",
            component: () => import("@/views/role/system-role"),
            meta: { title: "角色列表", keepAlive: false, permission: ["P021"] },
          },
        ],
      },
      {
        path: "/workersetting",
        component: RouteView,
        redirect: "/workersetting/setting1",
        name: "workersetting",
        meta: {
          title: "工单配置",
          icon: "setting",
          keepAlive: false,
          permission: ["P001", "P002", "P003", "P004"]
        },
        children: [
          {
            path: "/workersetting/setting1",
            name: "workersetting1",
            component: () =>
              import("@/views/worker-order-setting/worker-order-typesetting"),
            meta: { title: "工单类型配置", keepAlive: false, permission: ["P001"] },
          },
          {
            path: "/workersetting/setting2",
            name: "workersetting2",
            component: () =>
              import("@/views/worker-order-setting/worker-order-stepsetting"),
            meta: { title: "工单流程配置", keepAlive: false, permission: ["P001"] },
          },
          {
            path: "/workersetting/setting3",
            name: "workersetting3",
            component: () =>
              import("@/views/worker-order-setting/worker-order-codesetting"),
            meta: { title: "工单属性配置", keepAlive: false, permission: ["P001"] },
          }
        ],
      },
      {
        path: "/api",
        component: RouteView,
        redirect: "/api/api1",
        name: "online",
        meta: {
          title: "接口配置管理",
          icon: "setting",
          keepAlive: false,
          permission: ["P001", "P002", "P003"]
        },
        children: [
          {
            path: "/api/api2",
            name: "api2",
            component: () =>
              import("@/views/api/api2"),
            meta: { title: "接口管理", keepAlive: false, permission: ["P001"] },
          },
          {
            path: "/api/api3",
            name: "api3",
            component: () =>
              import("@/views/api/api3"),
            meta: { title: "接入管理", keepAlive: false, permission: ["P001"] },
          }
        ],
      },
    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  }
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: "/user",
    component: UserLayout,
    redirect: "/user/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Login"),
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Register"),
      },
      {
        path: "register-result",
        name: "registerResult",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/RegisterResult"),
      },
      {
        path: "recover",
        name: "recover",
        component: undefined,
      },
    ],
  },

  // {
  //   path: '/test',
  //   component: BlankLayout,
  //   redirect: '/test/home',
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'TestHome',
  //       component: () => import('@/views/Home')
  //     }
  //   ]
  // },

  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404"),
  },
];
