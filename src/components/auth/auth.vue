<template>
  <view>
    <view class="loginMask" v-if="loginPopupShow" @click="closePopup"></view>
    <view class="loginPopup" v-if="loginPopupShow">
      <view class="loginBox">
        <view class="logo-wrapper">
          <image class="logo" :src="base.logoUrl"></image>
          <text>{{$config('name')}}</text>
        </view>
        <view class="platformName">{{ base.platformName }}</view>
        <view class="description" v-if="base.description">{{
          base.description
        }}</view>
      </view>
      <!-- #ifdef MP-WEIXIN -->
      <button
        type="primary"
        class="btn"
        hover-class="active"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
      >
        授权登录
      </button>
      <!-- #endif -->
      <!-- #ifdef MP-ALIPAY -->
      <button
        type="primary"
        size="default"
        open-type="getAuthorize"
        scope="userInfo"
        @getAuthorize="getAuthorize"
      >
        授权登录
      </button>
      <!-- #endif -->
    </view>
  </view>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      base: {
        logoUrl:require("@/static/image/logo.png"),
        platformName:'申请获得您的公开信息（头像，昵称等）',
        description:'',


      },
    };
  },
  computed: {
    ...mapState(["userInfo", "loginPopupShow"]),
  },
  created(){
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setLoginPopupShow']),
    // 微信登录
    getUserInfo(e) {
      console.info(e)
      if (e.detail.errMsg == "getUserInfo:fail auth deny") {
        uni.showToast({
          title: "请同意授权",
          icon: "none",
        });
      } else {
        var info = e.detail.userInfo;
        var data = {
          headimgurl: info.avatarUrl,
          nickname: info.nickName,
        };
        this.$http.post(this.API.UPDATE_USERINFO, data).then((res) => {
          if (res.code == 20000) {
            uni.showToast({
              title: res.message,
              icon: "none",
            });
            this.setUserInfo(res.data);
            this.setLoginPopupShow(false);
          }
        });
      }
    },
    // 支付宝登录
    getAuthorize(e){
      my.getOpenUserInfo({
        fail:()=>{},
        success:(res)=>{
          console.info(res.response)
        }
      })
    },
    //关闭弹窗
    closePopup() {
      this.setLoginPopupShow(false);
    },
  },
};
</script>
<style lang="scss" scoped>
.loginMask {
  position: fixed;
  top: 0upx;
  left: 0upx;
  right: 0upx;
  bottom: 0upx;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
.loginPopup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 600upx;
  background-color: #fff;
  border-radius: 20upx;
  overflow: hidden;
  z-index: 11;
  .btn{
    width:400upx;
    height: 80upx;
    line-height: 80upx;
    font-size: 36upx;
    margin-bottom: 40upx;
  }
  .loginBox {
    padding: 30upx 15upx 40upx 15upx;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    .logo-wrapper{
      display: flex;
      align-items: center;
      font-size: 34upx;
      color:#0BA15A;
      .logo {
        width: 140upx;
        height: 140upx;
        // border-radius: 20%;
      }
    }

    .platformName {
      font-size: 28upx;
      color: #999;
      margin-top: 10upx;
      text-align: center;
    }

    .description {
      margin-top: 15upx;
      font-size: 30upx;
      color: #333;
    }
  }
}
</style>
