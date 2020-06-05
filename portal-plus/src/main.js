import 'babel-polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import Vue from "vue";
import App from "./App";
import store from "./store"
import Vuex from 'vuex'
import { Tabs,Cascader,Icon,Steps } from 'ant-design-vue';
import * as api from "./core/api/yiBot";
import VueJsonp from 'vue-jsonp'

Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.use(Tabs);
Vue.use(Steps);
Vue.use(Cascader);
Vue.use(Icon)
Vue.use(Vuex);
Vue.use(VueJsonp)
new Vue({
  store,
  el: "#app",
  render: h => h(App)
});

