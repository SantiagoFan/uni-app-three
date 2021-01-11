import Vue from "vue";
import Vuex from "vuex";
import {http} from "@/utils/http.js";
import api from "@/api/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    loginPopupShow: false,
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
    setLoginPopupShow(state,data){
      state.loginPopupShow = data;
    }
  },
  actions: {
    login({commit}) {
      return new Promise((resolve, reject) => {
        uni.showLoading({
          title: '登录中'
        });
        uni.login({
          provider: "weixin",
          success: function(loginRes) {
            if (loginRes.errMsg == "login:ok") {
              let code = loginRes.code;
              http.post(api.GET_TOKEN, {code}).then((res) => {
                uni.hideLoading();
                if(res.code===20000){
                  uni.setStorageSync("token",res.token)
                  commit("setUserInfo",res.data)
                  resolve()
                }else{
                  reject()
                }
              }).catch(res=>{
                console.log('GET_TOKEN',res)
                reject()
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
    checkAuth({state,commit}){
      if(state.userInfo&&!state.userInfo.nickname){
        commit('setLoginPopupShow', true);
        //打开授权弹框
        console.log("打开授权弹框")
      }
    }
  },
});
