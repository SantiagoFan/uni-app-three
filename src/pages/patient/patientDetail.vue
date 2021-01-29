<template>
  <view class="wrap">
    <view class="wrap-info">
      <view class="wrap-info__logo">
        <view class="logo">
          <image class="img" mode="widthFix" src="@/static/image/logo.png" />
        </view>
        <view class="text">呼和浩特市蒙医中医医院</view>
      </view>
      <view class="wrap-info__con">
        <view class="avatar">
          <view class="text">
            <text>照</text>
            <text>片</text>
          </view>
        </view>
        <view class="info">
          <view class="item">姓名：{{ model.name }}</view>
          <view class="item">性别：{{ model.gender }}</view>
          <view class="item">居民健康卡号码：</view>
          <view class="item">{{ model.idcard | hideIdCard }}</view>
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
      show-cancel-button="true"
    ></u-modal>
  </view>
</template>

<script>
import MyCode from '@/components/common/MyCode'
export default {
  data() {
    return {
      codeIndex: 0,
      model: { name: '', gender: '', ehealth_code: '', patient_code: '' },
      showModal: false,
    }
  },
  components: { MyCode },
  filters: {
    hideIdCard(val) {
      if (val) {
        return val.replace(/^(.{4})(?:\d+)(.{4})$/, '$1******$2')
      }
      return ''
    },
  },
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
    updateHealth(val){
      this.model.ehealth_code = val
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 25rpx 30rpx;
  &-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 360rpx;
    padding-top: 30rpx;
    background: #dbe79c url('@/static/image/patient_d_bg.jpg') top center;
    background-size: 100%;
    border-radius: 10rpx;
    &__logo {
      display: flex;
      align-items: center;
      justify-content: center;
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
      margin-top: 20rpx;
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
        font-size: 30rpx;
        .item {
          margin-bottom: 10rpx;
          &:last-child {
            margin-bottom: 0;
          }
        }
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
