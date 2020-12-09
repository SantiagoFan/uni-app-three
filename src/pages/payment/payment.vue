<template>
  <view class="wrap">
    <view class="wrap-time">
      <view class="wrap-time__text">剩余支付时间</view>
      <u-count-down
        :timestamp="timestamp"
        :show-hours="false"
        bg-color="transparent"
        color="#ffffff"
        separator-color="#ffffff"
        :separator-size="26"
        :font-size="26"
      />
    </view>
    <view class="wrap-amount">
      <view class="wrap-amount__text">支付金额(元)</view>
      <view class="wrap-amount__price">15.00</view>
    </view>
    <view class="wrap-info">
      <view class="wrap-info__cell">
        <view class="label">费用类型</view>
        <view class="text">预约挂号</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">就诊科室</view>
        <view class="text">针灸科</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">医生名称</view>
        <view class="text">科木其勒</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">就诊日期</view>
        <view class="text">2020-07-29  星期四</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">就诊时段</view>
        <view class="text">上午 09:00:00~10:00:00</view>
      </view><view class="wrap-info__cell">
        <view class="label">就诊人</view>
        <view class="text">李想</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">就诊卡号</view>
        <view class="text">100000053582</view>
      </view>
    </view>
    <view class="wrap-btn">
      <view class="wrap-btn__con" @click="hanldePay">微信支付</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      timestamp: 600
    }
  },
  methods: {
    hanldePay() {
      console.log('点击支付')
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  &-time {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 68rpx;
    color: #ffffff;
    font-size: 26rpx;
    background: #ff8c46;
    &__text {
      margin-right: 15rpx;
    }
  }
  &-amount {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30rpx 0;
    background: #ffffff;
    &__text {
      color: #666666;
      font-size: 26rpx;
    }
    &__price {
      color: #ff8c46;
      font-size: 65rpx;
      margin-top: 30rpx;
      font-weight: bold;
    }
  }
  &-info {
    padding: 30rpx;
    margin-top: 20rpx;
    background: #ffffff;
    &__cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999999;
      font-size: 26rpx;
      margin-bottom: 30rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &-btn {
    padding: 30rpx 45rpx;
    &__con {
      height: 72rpx;
      line-height: 72rpx;
      color: #ffffff;
      font-size: 26rpx;
      text-align: center;
      background: #0ec698;
      border-radius: 8rpx;
    }
  }
}
</style>