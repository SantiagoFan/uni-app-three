<template>
  <view class="wrap">
    <view class="wrap-info">
      <view class="wrap-info__con">
        <view class="info">
          <!-- <image src='@/static/image/card_logo.png'></image> -->
          <view class="item">{{ model.name|hideIdRealName }}</view>
          <!-- <view class="item">性别：{{ model.gender }}</view> -->
          <!-- <view class="item">居民健康卡号码：</view> -->
          <view class="item">{{ model.idcard | hideIdCard }}</view>
        </view>
        <view class="qrcode" v-if='model.ehealth_code' >
           <tki-qrcode cid="mycode" ref="qrcode" style="margin-top:10rpx" onval :val="model.ehealth_code" :size="200"  icon="/static/image/logo.png" :iconSize='20'  :loadMake="true" :show-loading="true" />
        </view>
      </view>
    </view>
    <u-gap height="20" bg-color="transparent"></u-gap>
    <my-code
      :patient_code="model.patient_code"
      :ehealth_code="model.ehealth_code"
      @refresh="updateHealth"
    ></my-code>
    <u-gap height="20" bg-color="transparent"></u-gap>
    <view class="wrap-btn" @click="delPatient">删除就诊人</view>
    <u-modal
      v-model="showModal"
      @confirm="confirm"
      title="提示"
      content="确认删除"
      :show-cancel-button="true"
    ></u-modal>
  </view>
</template>

<script>
import MyCode from '@/components/common/MyCode'
import tkiQrcode from '@/components/tki-code/tki-qrcode/tki-qrcode'

export default {
  data() {
    return {
      codeIndex: 0,
      model: { name: '', gender: '', ehealth_code: '', patient_code: '' },
      showModal: false,
    }
  },
  components: { MyCode,tkiQrcode },
  onLoad() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http
        .post(this.API.PATINET_DETAIL, { idcard: this.$Route.query.idcard })
        .then((res) => {
          if (res.code == 20000) {
            this.model = res.data
          }
        })
    },
    confirm() {
      this.$http
        .post(this.API.PATIENT_DELETE, { idcard: this.$Route.query.idcard })
        .then((res) => {
          if (res.code == 20000) {
            this.$store.commit('setPatientInfo', res.data)
            uni.showToast({
              title: res.message,
              duration: 2000,
              icon: 'none',
            })
            setTimeout(() => {
              this.$Router.replace({ name: 'patientAdd' })
            }, 1000)
          }
        })
    },
    delPatient() {
      this.showModal = true
    },
    updateHealth(val) {
      this.model.ehealth_code = val
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 25rpx 30rpx;
  &-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 390rpx;
    // padding-top: 30rpx;
    padding: 0 30rpx 0 30rpx;
    background: #dbe79c url('https://wx.mzyy.org.cn/static/wx/patient_d_bg.jpg?v=0.3') top center;
    background-repeat: no-repeat;
    background-size: 100%;
    border-radius: 10rpx;
   
    &__logo {
      display: flex;
      // align-items: center;
      // justify-content: center;
      .logo {
        width: 50rpx;
        margin-right: 20rpx;
        .img {
          width: 100%;
          height: auto;
          display: block;
        }
      }
      .text {
        font-size: 30rpx;
        color: #333333;
      }
    }
    &__con {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 30rpx;
      // margin-top: 20rpx;
      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 128rpx;
        height: 178rpx;
        margin-right: 40rpx;
        border: 1rpx dashed #5ecb81;
        border-radius: 10rpx;
        .img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .text {
          display: flex;
          flex-direction: column;
          color: #101010;
          font-size: 26rpx;
        }
      }
      .info {
        color: #333333;
        font-size: 34rpx;
        image{
          width: 304rpx;
          height: 98rpx;
        }
        .item {
          margin-bottom: 20rpx;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .qrcode{
        width:210rpx;
        height: 210rpx;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  &-code {
    padding: 30rpx 30rpx 50rpx 30rpx;
    background: #ffffff;
    border-radius: 10rpx;
    &__tab {
      display: flex;
      justify-content: space-evenly;
      color: #333333;
      font-size: 30rpx;
      .item {
        &.active {
          color: #0ec698;
          &:after {
            content: '';
            display: block;
            width: 70%;
            height: 2rpx;
            margin: 15rpx auto 0 auto;
            background: #0ec698;
          }
        }
      }
    }
    &__con {
      .hide {
        display: none;
      }
      padding-top: 50rpx;
      &-code1 {
        .img {
          width: 400rpx;
          height: 400rpx;
          margin: 0 auto;
          // display: block;
        }
        &_refresh {
          height: 200rpx;
          line-height: 200rpx;
          color: red;
          text-align: center;
        }
      }
      &-code2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        .img {
          height: 140rpx;
          width: 100%;
          // height: auto;
          // display: block;
        }
        .num {
          color: #333333;
          font-size: 24rpx;
          margin-top: 15rpx;
          letter-spacing: 1rpx;
        }
      }
    }
  }
  &-btn {
    width: 590rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #333333;
    font-size: 32rpx;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 10rpx;
  }
}
</style>
