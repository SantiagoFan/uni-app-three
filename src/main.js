import Vue from "vue";
import App from "./App";
import store from "@/store";
import uView from "uview-ui";

import mixin from "@/utils/mixin";

import { httpPost, httpGet } from "@/utils/request.js";

import router from "./router";
import routerLink from "../node_modules/uni-simple-router/component/router-link.vue";
Vue.component("router-link", routerLink);

Vue.prototype.$bus = new Vue(); // event Bus 用于兄弟组件的通信。

App.mpType = "app";

Vue.prototype.$post = httpPost;
Vue.prototype.$get = httpGet;

Vue.use(uView);

Vue.mixin(mixin);

Vue.config.productionTip = false;

const app = new Vue({
  ...App,
  store,
});
app.$mount();
