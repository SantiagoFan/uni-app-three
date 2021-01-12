<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__massage">温馨提示：<br>本院实行实名制就诊，<br>请如实填写就诊人信息，系统将为您办理新建卡</view>
      <form @submit="formSubmit">
        <view class="wrap__con">
          <view class="wrap__con-art">
            <view class="wrap__con-art-item">
              <view class="label">姓名</view>
              <view class="input-box">
                <input
                  class="input"
                  type="text"
                  name="name"
                  placeholder="请输入姓名"
                  placeholder-class="placr_style"
                >
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">身份证</view>
              <view class="input-box">
                <input
                  class="input"
                  type="text"
                  name="idcard"
                  placeholder="请输身份证号"
                  placeholder-class="placr_style"
                >
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">手机号码</view>
              <view class="input-box">
                <input
                  class="input"
                  type="text"
                  name="phone"
                  placeholder="手机号码"
                  placeholder-class="placr_style"
                >
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">住址</view>
              <view class="input-box">
                <input
                  class="input"
                  type="text"
                  name="address"
                  placeholder="请输入住址"
                  placeholder-class="placr_style"
                >
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">民族</view>
              <view class="input-box">
                <input
                  class="input"
                  type="text"
                  name="nation"
                  placeholder="请选择民族"
                  placeholder-class="placr_style"
                >
              </view>
            </view>
          </view>
        </view>
        <button form-type="submit" class="wrap__btn active">立即新建</button>
      </form>
    </view>
  </view>
</template>
<script>
import { isCardNo,isMobile } from "@/utils/common.js";
export default {
  data(){
    return{
      flag: false
    }
  },
  methods: {
    formSubmit(e){
      if(this.flag){
        return false;
      }
      this.flag = true;
      uni.removeStorageSync('patientInfo');
      var data = e.detail.value;
      if(data['name'].trim()==''){
        uni.showToast({
          title: '请输入姓名',
          duration: 2000,
          icon:'none',
        });
        return false;
      }
      if(!isCardNo(data['idcard'])){
				uni.showToast({
					title: "身份证号不正确",
					icon: "none"
				});
				return false;
			}
      if(!isMobile(data['phone'])){
				uni.showToast({
					title: "手机号码不正确",
					icon: "none"
				});
				return false;
      }
      if(data['address'].trim()==''){
        uni.showToast({
          title: '请输入住址',
          duration: 2000,
          icon:'none',
        });
        return false;
      }
      if(data['nation'].trim()==''){
        uni.showToast({
          title: '请输入民族',
          duration: 2000,
          icon:'none',
        });
        return false;
      }
      this.$http.post(this.API.ADD_PATIENT,data).then(res=>{
        switch(res.code){
          case 50001:
            uni.setStorageSync('patientInfo', res.data)
            uni.showModal({
              title: '提示',
              content: res.message,
              confirmText: '去绑定',
              success: function (res) {
                  if (res.confirm) {
                    this.$Router.replace('/pages/medicalCardBind/medicalCardBind');
                  } else if (res.cancel) {
                    this.flag = false;
                    console.log('用户点击取消');
                  }
              }
          });
          
          break;
          case 50000:
            uni.showToast({
              title: res.message,
              duration: 2000,
              icon:'none',
            });
            this.flag = false;
          break;
          case 20000:
             uni.showToast({
              title: res.message,
              duration: 2000,
              icon:'none',
            });
            setTimeout(()=>{
              this.$Router.replaceAll('/pages/index/index');
            },1000)
        }
      })
    }
    // formSubmit(e) {
    //   const { value } = e.detail
    //   uni.setStorageSync('token', value.name)
    //   uni.showToast({
    //     title: '新建成功，正在跳转...',
    //     icon: 'none',
    //     duration: 2000,
    //     success() {
    //       setTimeout(() => {
    //         uni.reLaunch({
    //           url: '/pages/index/index'
    //         })
    //       }, 2000)
    //     }
    //   })
    // },

  },
}
</script>

<style lang="scss" scoped>
.container {
  .wrap {
    padding: 30rpx;
    &__massage {
      color: #0ec698;
      font-size: 26rpx;
      letter-spacing: 2rpx;
    }
    &__con {
      margin-top: 30rpx;
      &-art {
        padding: 0 30rpx;
        margin-bottom: 20rpx;
        background: #fff;
        border-radius: 10rpx;
        &:last-child {
          margin-bottom: 0;
        }
        &-item {
          display: flex;
          align-items: center;
          height: 110rpx;
          border-bottom: 1rpx solid #f3f3f3;
          &:last-child {
            border-bottom: none;
          }
          .label {
            width: 140rpx;
            color: #333333;
            font-size: 28rpx;
          }
          .input-box {
            flex: 1;
            .input {
              padding: 10rpx 0;
              &::v-deep .placr_style {
                color: #c2c2c2;
              }
            }
          }
        }
      }
    }
    &__btn {
      height: 80rpx;
      line-height: 80rpx;
      color: #ffffff;
      font-size: 30rpx;
      margin-top: 25rpx;
      letter-spacing: 2rpx;
      text-align: center;
      background: #dfdfdf;
      border-radius: 10rpx;
      &.active {
        background: #0ec698;
      }
    }
  }
}

</style>