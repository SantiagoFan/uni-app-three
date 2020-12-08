<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__massage">温馨提示：<br>本院实行实名制就诊，请如实填写就诊人信息，<br>如因信息错误产生的一切后果自行负责。</view>
      <view class="wrap__con">
        <view class="wrap__con-art">
          <view class="wrap__con-art-item">
            <view class="label">姓名</view>
            <view class="input-box">
              <input
                class="input"
                type="text"
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
                placeholder="请输身份证号"
                placeholder-class="placr_style"
              >
            </view>
          </view>
        </view>
        <view class="wrap__con-art">
          <view class="wrap__con-art-item">
            <view class="label">院内卡号</view>
            <view class="input-box">
              <input
                class="input"
                type="text"
                placeholder="请输入就诊卡号或13位院内卡号"
                placeholder-class="placr_style"
              >
            </view>
          </view>
          <view class="wrap__con-art-item">
            <view class="label">手机号</view>
            <view class="input-box">
              <input
                class="input"
                type="text"
                placeholder="请输入手机号"
                placeholder-class="placr_style"
              >
            </view>
          </view>
        </view>
      </view>
      <view class="wrap__btn">立即绑定</view>
    </view>
  </view>
</template>

<script>
export default {

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