import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 子模块自动引入
const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


export default new Vuex.Store({
  modules
})
