import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'

import mixin from '@/utils/mixin';

Vue.prototype.$bus = new Vue() // event Bus 用于兄弟组件的通信。

App.mpType = 'app'

Vue.use(uView)

Vue.mixin(mixin)

Vue.config.productionTip = false

const app = new Vue({
  ...App
})
app.$mount()
