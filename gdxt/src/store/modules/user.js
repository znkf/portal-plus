import Vue from "vue";
import {
  login,
  getInfo,
  searchPermission,
  getCardType,
  getDict,
} from "@/api/admin";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { welcome } from "@/utils/util";
// 事项对接方式
const user = {
  state: {
    token: "",
    name: "",
    welcome: "",
    avatar: "",
    roles: [],
    info: {},
    cardTypes: [],
    allCard: [],
    messageType: [], // 消息类型
    noticeType: [], // 公告类型
    eventDJType: [], // 事项对接类型
    itemDockingMode: [], // 对接方式
    collectionType: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name;
      state.welcome = welcome;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_CARDTYPES: (state, cardTypes) => {
      state.cardTypes = cardTypes;
    },
    SET_ALLCARDS: (state, allCards) => {
      state.allCard = allCards;
    },
    SET_NOTICETYPES: (state, noticeType) => {
      state.noticeType = noticeType;
    },
    SET_MESSAGETYPES: (state, messageType) => {
      state.messageType = messageType;
    },
    SET_EVENTDJTYPES: (state, eventDJType) => {
      state.eventDJType = eventDJType;
    },
    SET_ITEMDOCKINGMODE(state, itemDockingMode) {
      state.itemDockingMode = itemDockingMode;
    },
    SET_COLLECTIONTYPE(state, collectionType) {
      state.collectionType = collectionType;
    },
  },

  actions: {
    GetCard({ commit, state }) {
      if (state.allCard && state.allCard.length) return;
      getCardType().then((res) => {
        const obj = {};
        const newData = res.data.reduce((cur, next) => {
          if (!obj[next.cardTypeName]) {
            obj[next.cardTypeName] = true;
            const cardType = {
              cardName: next.cardTypeName,
              cardType: next.cardType,
            };
            cur.push(cardType);
          }
          return cur;
        }, []);
        commit("SET_CARDTYPES", newData);
        commit("SET_ALLCARDS", res.data);
      });
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        if (userInfo.pwd.includes("aaa")) {
          reject();
        } else {
          commit("SET_NAME", { name: userInfo.username, welcome: welcome() });
          Vue.ls.set(
            "userInfo",
            JSON.stringify(userInfo),
            7 * 24 * 60 * 60 * 1000
          );
          resolve();
        }
        // login(userInfo)
        //   .then(({ data }) => {
        //     const token = data.token;
        //     Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000);
        //     commit("SET_TOKEN", token);
        //     commit("SET_NAME", { name: data.admin.name, welcome: welcome() });
        //     commit("SET_AVATAR", data.admin.avatar);
        //     resolve();
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     reject(error);
        //   });
      });
    },
    getPermission({ commit }) {
      return new Promise((resolve, reject) => {
        const roles = [
          "P001",
          "P002",
          "P003",
          "P004",
          "P005",
          "P006",
          "P020",
          "P021",
        ];
        const userInfo = Vue.ls.get("userInfo");
        commit("SET_NAME", {
          name: JSON.parse(userInfo).username,
          welcome: welcome(),
        });

        commit("SET_ROLES", roles);
        resolve(roles);
      });
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(({ data }) => {
            commit("SET_NAME", { name: data.name, welcome: welcome() });
            // if (result.role && result.role.length > 0) {
            //   const role = result.role
            //   commit('SET_ROLES', role)
            //   commit('SET_INFO', result)
            // } else {
            //   reject(new Error('getInfo: roles must be a non-null array !'))
            // }
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取公告类型
    GetNoticeType({ commit, state }) {
      const noticeType = state.noticeType;
      if (!noticeType.length) {
        getDict("notice_type").then((res) => {
          commit("SET_NOTICETYPES", res.data);
        });
      }
    },
    // 获取公告类型
    GetMessageType({ commit, state }) {
      const messageType = state.messageType;
      if (!messageType.length) {
        getDict("message_type").then((res) => {
          commit("SET_MESSAGETYPES", res.data || []);
        });
      }
    },
    // 对接方式
    GetItemDockingMode({ commit, state }) {
      const itemDockingMode = state.itemDockingMode;
      if (!itemDockingMode.length) {
        getDict("items_docking_mode").then((res) => {
          commit("SET_ITEMDOCKINGMODE", res.data || []);
        });
      }
    },
    // collection_type
    // 获取收藏类型
    GetCollectionType({ commit, state }) {
      const collectionType = state.collectionType;
      if (!collectionType.length) {
        getDict("collection_type").then((res) => {
          console.log("收藏类型~~~>", res);
          commit("SET_COLLECTIONTYPE", res.data || []);
        });
      }
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        Vue.ls.remove(ACCESS_TOKEN);
        Vue.ls.remove("userInfo");

        resolve();
        // logout(state.token)
        //   .then(() => {
        //     resolve()
        //   })
        //   .catch(() => {
        //     resolve()
        //   })
        //   .finally(() => {
        //     commit('SET_TOKEN', '')
        //     commit('SET_ROLES', [])
        //     Vue.ls.remove(ACCESS_TOKEN)
        //   })
      });
    },
  },
};

export default user;
