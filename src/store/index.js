import Vue from "vue";
import Vuex from "vuex";
import { httpPost } from "@/utils/request.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
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
  },
  actions: {
    login() {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: "weixin",
          success: function(loginRes) {
            if (loginRes.errMsg == "login:ok") {
              let code = loginRes.code;
              httpPost("aaa", { code }).then((res) => {
                console.log(res);
              });
            }
          },
          fail: function(es) {
            console.log("login,fail");
          },
        });
      });
    },
  },
});
