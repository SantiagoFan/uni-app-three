import Vue from "vue";
import Vuex from "vuex";
import { http } from "@/utils/http.js";
import api from "@/api/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    loginPopupShow: false,
    patientInfo: null,
  },
  getters: {
    getToken() {
      return uni.getStorageSync("token");
    },
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setPatientInfo(state, patientInfo) {
      state.patientInfo = patientInfo;
    },
    setLoginPopupShow(state, data) {
      state.loginPopupShow = data;
    },
  },
  actions: {
    login({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        uni.showLoading({
          title: "登录中",
        });
        uni.login({
          provider: "weixin",
          success: function(loginRes) {
            if (loginRes.errMsg == "login:ok") {
              let code = loginRes.code;
              http
                .post(api.GET_TOKEN, { code }, false, false)
                .then((res) => {
                  uni.hideLoading();
                  if (res.code === 20000) {
                    uni.setStorageSync("token", res.token);
                    commit("setUserInfo", res.data);
                    commit("setPatientInfo",res.patientInfo);
                    resolve();
                  } else {
                    reject();
                  }
                })
                .catch((res) => {
                  console.log("GET_TOKEN", res);
                  reject();
                });
            }
          },
          fail: function(es) {
            uni.hideLoading();
            console.log("login,fail");
          },
        });
      });
    },
    getDefaultPatient({ commit }) {
      return new Promise((resolve, reject) => {
        http
          .post(api.DEFAULT_PATIENT)
          .then((res) => {
            commit("setPatientInfo", res.data);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    checkAuth({ state, commit }) {
      if (state.userInfo && !state.userInfo.nickname) {
        commit("setLoginPopupShow", true);
        //打开授权弹框
        console.log("打开授权弹框");
      }
    },
  },
});
