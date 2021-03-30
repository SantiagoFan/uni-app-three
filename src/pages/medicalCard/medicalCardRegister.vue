<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__massage"
        >温馨提示：<br />本院实行实名制就诊，<br />请如实填写就诊人信息，系统将为您办理新建卡</view
      >
      <view class="wrap__switch">
        <u-subsection active-color="#0ec698" mode="subsection" :list="[{name:'本人'},{name:'它人'}]" :current="curType" @change="changeType"></u-subsection>
      </view>
      <form>
        <view class="wrap__con">
          <!-- 微信 -->
          <!-- #ifdef MP-WEIXIN -->
          <view class="wrap__con-art">
            <view class="wrap__con-art-item">
              <view class="label">姓名</view>
              <view class="input-box">
                <input
                  class="input"
                  type="text"
                  v-model="formData.name"
                  name="name"
                  placeholder="请输入姓名"
                  placeholder-class="placr_style"
                />
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">身份证</view>
              <view class="input-box">
                <input
                  class="input"
                  type="idcard"
                  name="idcard"
                  v-model="formData.idcard"
                  maxlength="18"
                  placeholder="请输入身份证号"
                  placeholder-class="placr_style"
                />
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">手机号码</view>
              <view class="input-box">
                <input
                  class="input"
                  type="number"
                  name="phone"
                  v-model="formData.phone"
                  maxlength="11"
                  placeholder="请输入手机号码"
                  placeholder-class="placr_style"
                />
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">住址</view>
              <view class="input-box">
                <input
                  class="input"
                  type="text"
                  name="address"
                  v-model="formData.address"
                  placeholder="请输入住址"
                  placeholder-class="placr_style"
                />
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">民族</view>
              <view class="input-box">
                <!-- <input
                  class="input"
                  type="text"
                  name="nation"
                  placeholder="请选择民族"
                  placeholder-class="placr_style"
                > -->
                <picker @change="bindPickerChange" range-key="value" :range="nationList">
                  <view class="uni-input">{{ nationList[nation_index].value }}</view>
                </picker>
              </view>
            </view>
          </view>
          <!-- #endif -->
          <!-- 支付宝 -->
          <!-- #ifdef MP-ALIPAY -->
          <view class="wrap__con-art">
            <view class="wrap__con-art-item">
              <view class="label">姓名</view>
              <view class="input-box">
                <input
                  class="input"
                  type="text"
                  v-model="formData.name"
                  name="name"
                  placeholder="请输入姓名"
                  placeholder-class="placr_style"
                  v-if="curType==1"
                />
                <view v-else>{{formData.name | hideIdRealName}}</view>
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">身份证</view>
              <view class="input-box">
                <input
                  class="input"
                  type="idcard"
                  name="idcard"
                  v-model="formData.idcard"
                  maxlength="18"
                  placeholder="请输入身份证号"
                  placeholder-class="placr_style"
                   v-if="curType==1"
                />
                <view v-else>{{formData.idcard | hideIdCard}}</view>
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">手机号码</view>
              <view class="input-box">
                <input
                  class="input"
                  type="number"
                  name="phone"
                  v-model="formData.phone"
                  maxlength="11"
                  placeholder="请输入手机号码"
                  placeholder-class="placr_style"
                  v-if="curType==1"
                />
                <view v-else>{{formData.phone | hideIdPhone}}</view>
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">住址</view>
              <view class="input-box">
                <input
                  class="input"
                  type="text"
                  name="address"
                  v-model="formData.address"
                  placeholder="请输入住址"
                  placeholder-class="placr_style"
                />
              </view>
            </view>
            <view class="wrap__con-art-item">
              <view class="label">民族</view>
              <view class="input-box">
                <!-- <input
                  class="input"
                  type="text"
                  name="nation"
                  placeholder="请选择民族"
                  placeholder-class="placr_style"
                > -->
                <picker @change="bindPickerChange" range-key="value" :range="nationList">
                  <view class="uni-input">{{ nationList[nation_index].value }}</view>
                </picker>
              </view>
            </view>
          </view>
          <!-- #endif -->
        </view>
        <button class="wrap__btn active" @click="formSubmit">立即新建</button>
      </form>
      
    </view>
  </view>
</template>
<script>
import { isMobile, isNull } from '@/utils/common.js'
import { isCardNo } from '@/utils/checkIdcard.js'
import nation from '@/common/nation.js'
export default {
  data() {
    return {
      flag: false,
      nationList: nation.nationList,
      nation_index: 0, //民族选择序号
      curType:0, // 0 添加本人 1添加其他人
      formData:{
        name:'',
        idcard:'',
        phone:''
      } //待提交的表单信息
    }
  },
  onShow() {
    this.changeType(0);
  },
  methods: {
    bindPickerChange(e) {
      this.nation_index = e.target.value
    },
    changeType(i){ // 切换类型
      this.curType = i
      //清除选择
      this.formData.name = ''
      this.formData.phone = ''
      this.formData.idcard = ''
      if(this.curType==0){ //本人调起授权
        // #ifdef MP-ALIPAY
        my.getAuthCode({
          scopes: 'auth_user', // 主动授权：auth_user，静默授权：auth_base。或者其它scope
          success: (res) => {
            if (res.authCode) {
              this.$http.post(this.API.GET_USERINFO, { code: res.authCode })
              .then(r=>{
                this.formData.name = r.data.nick_name
                this.formData.phone = r.data.mobile
                this.formData.idcard = r.data.cert_no
              })
              // 认证成功      // 调用自己的服务端接口，让服务端进行后端的授权认证，并且利用session，需要解决跨域问题
              // my.request({
              //   url: 'https://isv.com/auth', // 该url是您自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证        
              //   data: {
              //     authcode: res.authCode,
              //   },
              //   success: () => {
              //     // 授权成功并且服务器端登录成功        
              //   },
              //   fail: () => {
              //     // 根据自己的业务场景来进行错误处理
              //   },
              // });
            }
          },
        });
        // #endif
      }
    },
    formSubmit(e) {
      uni.removeStorageSync('patientInfo')
      var data = this.formData
      data['nation'] = this.nationList[this.nation_index].value
      data['nation_code'] = this.nationList[this.nation_index].code
      console.info(data)
      if (isNull(data['name'])) {
        uni.showToast({
          title: '请输入姓名',
          duration: 2000,
          icon: 'none',
        })
        return false
      }
      if (!isCardNo(data['idcard'])) {
        uni.showToast({
          title: '身份证号有误',
          icon: 'none',
        })
        return false
      }
      if (!isMobile(data['phone'])) {
        uni.showToast({
          title: '手机号码有误',
          icon: 'none',
        })
        return false
      }
      if (isNull(data['address'])) {
        uni.showToast({
          title: '请输入住址',
          duration: 2000,
          icon: 'none',
        })
        return false
      }

      if (this.flag) {
        return false
      }
      this.flag = true
   
      uni.showLoading({
        title: '正在提交',
      })
      this.$http
        .post(this.API.ADD_PATIENT, data, false)
        .then((res) => {
              uni.hideLoading()
              if (res.code === 20000) {
                this.$store.commit('setPatientInfo', res.data)
                this.$store.dispatch('loadPatientList', true)

                uni.showToast({
                  title: res.message,
                  duration: 2000,
                  icon: 'none',
                })
                setTimeout(() => {
                  this.$Router.back(1)
                }, 1000)
              }
            })
        .finally((res) => {
          this.flag = false
      }) 
    },
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
      font-size: 28rpx;
      letter-spacing: 2rpx;
    }
    &__switch {
      margin-top: 20rpx;
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
            width: 150rpx;
            color: #333333;
            font-size: 32rpx;
          }
          .input-box {
            flex: 1;
            font-size: 30rpx;
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
      height: 90rpx;
      line-height: 90rpx;
      color: #ffffff;
      font-size: 34rpx;
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
