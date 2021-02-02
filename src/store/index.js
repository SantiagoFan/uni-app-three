import Vue from 'vue'
import Vuex from 'vuex'
import { http } from '@/utils/http.js'
import api from '@/api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    loginPopupShow: false,
    patientInfo: null,
    livePatientInfo: null,
    patientList: [],
    patientListLoad: false, //是否已完成加载
  },
  getters: {
    getToken() {
      return uni.getStorageSync('token')
    },
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setPatientInfo(state, patientInfo) {
      state.patientInfo = patientInfo
    },
    setLivePatientInfo(state, livePatientInfo) {
      state.livePatientInfo = livePatientInfo
    },
    setLoginPopupShow(state, data) {
      if (data) {
        uni.hideTabBar()
      } else {
        uni.showTabBar()
      }
      state.loginPopupShow = data
    },
    setPatientList(state, data) {
      state.patientList = data
      state.patientListLoad = true
    },
  },
  actions: {
    login({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        uni.showLoading({
          title: '登录中',
        })
        uni.login({
          provider: 'weixin',
          success: function(loginRes) {
            console.info('登录结果', loginRes)
            if (loginRes.errMsg == 'login:ok') {
              let code = loginRes.code
              http
                .post(api.GET_TOKEN, { code }, false)
                .then((res) => {
                  // uni.showToast({
                  //   title: '登录结果'+JSON.stringify(res),
                  //   icon:'none'
                  // });
                  uni.hideLoading()
                  if (res.code === 20000) {
                    uni.setStorageSync('token', res.token)
                    commit('setUserInfo', res.data)
                    commit('setPatientInfo', res.patientInfo)
                    commit('setLivePatientInfo', res.livePatientInfo)
                    resolve()
                  } else {
                    reject()
                  }
                })
                .catch((res) => {
                  uni.showToast({
                    title: '登录结果' + JSON.stringify(res),
                    icon: 'none',
                    duration: 10000,
                  })
                  console.log('GET_TOKEN', res)
                  reject()
                })
            }
          },
          fail: function(es) {
            uni.hideLoading()
            console.log('login,fail')
          },
        })
      })
    },
    // getDefaultPatient({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     http
    //       .post(api.DEFAULT_PATIENT)
    //       .then((res) => {
    //         commit('setPatientInfo', res.data)
    //         resolve()
    //       })
    //       .catch(() => {
    //         reject()
    //       })
    //   })
    // },
    checkAuth({ state, commit }) {
      if (state.userInfo && !state.userInfo.nickname) {
        commit('setLoginPopupShow', true)
        //打开授权弹框
        console.log('打开授权弹框')
      }
    },
    loadPatientList({ state, commit }, isUpdate) {
      //加载完不重新加载 isUpdate 强制更新标识
      if (state.patientListLoad && !isUpdate) {
        return
      }
      http.post(api.PATIENT_LIST).then((res) => {
        commit('setPatientList', res.data)
      })
    },
  },
})
