<template>
  <view class="wrap">
    <view class="wrap-info">
      <view class="wrap-info__logo">
        <image class="img" mode="widthFix" src="@/static/image/logo.png" />
      </view>
      <view class="wrap-info__con">
        <view class="avatar">
          <view class="text">
            <text>照</text>
            <text>片</text>
          </view>
        </view>
        <view class="info">
          <view class="item">姓名：李想</view>
          <view class="item">性别：男</view>
          <view class="item">居民健康卡号码：</view>
          <view class="item">1502*************0161</view>
        </view>
      </view>
    </view>
    <u-gap height="20" bg-color="transparent"></u-gap>
    <view class="wrap-code">
      <view class="wrap-code__tab">
        <view :class="['item', {active: codeIndex === 0}]" @click="codeIndex = 0">电子健康卡</view>
        <view :class="['item', {active: codeIndex === 1}]" @click="codeIndex = 1">就诊凭条</view>
      </view>
      <view class="wrap-code__con">
        <view class="wrap-code__con-code1" v-if="codeIndex === 0">
          <image class="img" mode="aspectFill" src="@/static/image/code1.jpg" />
        </view>
        <view class="wrap-code__con-code2" v-else>
          <image class="img" mode="widthFix" src="@/static/image/code.jpg" />
          <view class="num">100005149844</view>
        </view>
      </view>
    </view>
    <u-gap height="20" bg-color="transparent"></u-gap>
    <view class="wrap-btn">删除就诊人</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      codeIndex: 0
    }
  }
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
      width: 405rpx;
      .img {
        width: 100%;
        height: auto;
        display: block;
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
        font-size: 26rpx;
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
      padding-top: 50rpx;
      &-code1 {
        .img {
          width: 310rpx;
          height: 310rpx;
          margin: 0 auto;
          display: block;
        }
      }
      &-code2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        .img {
          width: 100%;
          height: auto;
          display: block;
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
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    color: #333333;
    font-size: 26rpx;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 10rpx;
  }
}

</style>