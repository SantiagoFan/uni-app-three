import Vue from 'vue'
import App from './App'
import store from '@/store'
import uView from 'uview-ui'
import { http } from '@/utils/http'
import api from "@/api/api.js"

import mixin from '@/utils/mixin';

Vue.prototype.$bus = new Vue() // event Bus 用于兄弟组件的通信。
Vue.prototype.$http = http
Vue.prototype.API = api;
App.mpType = 'app'

Vue.use(uView)

Vue.mixin(mixin)

Vue.config.productionTip = false

const app = new Vue({
  ...App,
  store
})
app.$mount()
