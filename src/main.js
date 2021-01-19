import Vue from "vue";
import App from "./App";
import store from "@/store";
import uView from "uview-ui";

import mixin from "@/utils/mixin";
import api from "@/api/api";

import { http } from "@/utils/http";
import auth from "./components/auth/auth.vue";
import empty from "./components/empty/empty.vue";

import router from "./router";
import routerLink from "../node_modules/uni-simple-router/component/router-link.vue";
Vue.component("router-link", routerLink);
Vue.component("auth", auth);
Vue.component("empty", empty);
Vue.prototype.$bus = new Vue(); // event Bus 用于兄弟组件的通信。

App.mpType = "app";

Vue.prototype.$http = http;
Vue.prototype.API = api;

Vue.use(uView);

Vue.mixin(mixin);

Vue.config.productionTip = false;

const app = new Vue({
  ...App,
  store,
});
app.$mount();
