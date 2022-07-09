import { http } from '@/utils/http.js'
/**
 * 用户基本信息
 */
const state={
  userInfo:null
}
const mutations={
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
}
const actions ={
  /**
   * 用户登录（不需要授权）
   */
  async login(){
    uni.showLoading({ title: '登录中' })
    // 1.回去提供商
    [error,res] = await uni.getProvider({service: 'oauth'  })
    // 2.获取 code
    // 3.获取 服务器 jwt_token
    // 4.获取信息
  },
  /**
   * 更新用户信息
   */
  updateInfo(){
    console.info('ddd')
  },
  //-----------------------------------弃用下面的-------------------------------------------
  login({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      uni.showLoading({ title: '登录中' })
      // 分运行环境进行登录
      uni.getProvider({
        service: 'oauth',
        success: function (res) {
          let provider = res.provider[0]
          console.info("当前服务提供商:",provider)
          uni.login({
            provider: provider,
            success: function(loginRes) {
              console.info('登录结果', loginRes)
              if (loginRes.errMsg == 'login:ok') {
                let code = loginRes.code
                http.post(api.GET_TOKEN, { code,provider }, false)
                  .then((res) => {
                    uni.hideLoading()
                    if (res.code === 20000) {
                      uni.setStorageSync('token', res.token)
                      commit('setUserInfo', res.data)
                      resolve()
                    } else {
                      reject()
                    }
                  })
                  .catch((res) => {
                    uni.hideToast();//
                    uni.showModal({
                      title: '提示',
                      content: res.data.message,
                      showCancel:false
                  });
                    reject()
                  })
              }
            },
            fail: function(es) {
              uni.hideLoading()
              console.log('login,fail')
              console.log(es)
            },
          })
          //---
        }
      });
      
    })
  },
  checkAuth({ state, commit }) {
    console.info('授权信息（state.userInfo）：',state.userInfo)
    if (state.userInfo && !state.userInfo.nickname) {
      commit('setLoginPopupShow', true)
      //打开授权弹框
      console.log('打开授权弹框')
      return false
    }
    return true
  },
  // 更新用户昵称
  updateNickName({state,commit},nickname){
    console.info('updateNickName',nickname)
    if(state.userInfo&& (!state.userInfo.nickname||state.userInfo.nickname=='未设置')){
      state.userInfo.nickname = nickname
      console.info('updateNickName 成功1',state.userInfo)
      // 更新数据库
      http.post(api.UPDATE_USERINFO, {
        headimgurl: state.userInfo.headimgurl,
        nickname: state.userInfo.nickname,
      }).then((res) => {
        console.info('updateNickName 成功2',res)
      });
    }
  }

}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
