<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__title">请选择就诊人类型</view>
      <view class="wrap__list">
        <view @click="goAdd" class="item">
          <view class="text">初次使用，请实名注册</view>
          <view class="jt">
            <text class="iconfont icon-arrowb"></text>
          </view>
        </view>
        <view @click="goBind" class="item">
          <view class="text">已有就诊卡，请绑定您的就诊信息</view>
          <view class="jt">
            <text class="iconfont icon-arrowb"></text>
          </view>
        </view>
      </view>
    </view>
    <auth></auth>
  </view>
</template>

<script>
export default {
  methods: {
    goAdd() {
      this.$Router.replace({ name: 'medicalCardRegister' })
    },
    goBind() {
      this.$Router.push({ name: 'medicalCardBind' })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .wrap {
    padding: 50rpx;
    &__title {
      color: #333333;
      font-size: 36rpx;
      font-weight: bold;
    }
    &__list {
      color: #333333;
      font-size: 36rpx;
      margin-top: 35rpx;
      padding: 0 30rpx;
      background: #ffffff;
      .item {
        display: flex;
        align-items: center;
        height: 118rpx;
        border-bottom: 1rpx solid #f0f0f0;
        border-radius: 10rpx;
        &:last-child {
          border-bottom: none;
        }
        .text {
          flex: 1;
          color: #0ec698;
          font-size: 32rpx;
        }
        .jt {
          color: #e0e0e0;
          margin-right: -10rpx;
          .iconfont {
            font-size: 35rpx;
          }
        }
      }
    }
  }
}
</style>
