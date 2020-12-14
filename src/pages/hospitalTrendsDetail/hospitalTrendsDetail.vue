<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__bt">
        <view class="wrap__bt-title">固定专家出诊表</view>
        <view class="wrap__bt-date">2020-07-18  09:00:00</view>
      </view>
      <view class="wrap__con">
        <view class="wrap__con-centent">富文本</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad(options) {
    console.log('options', options)
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  .wrap {
    padding: 0 30rpx 80rpx 30rpx;
    background: #ffffff;
    &__bt {
      padding: 30rpx 0;
      border-bottom: 1rpx solid #ebebeb;
      &-title {
        color: #484848;
        font-size: 28rpx;
      }
      &-date {
        color: #a8a8a8;
        font-size: 26rpx;
        margin-top: 20rpx;
      }
    }
    &__con {
      color: #484848;
      font-size: 26rpx;
      margin-top: 30rpx;
      &-centent {
        min-height: 500rpx;
      }
    }
  }
}
</style>