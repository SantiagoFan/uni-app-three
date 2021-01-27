<template>
  <view class="wrap">
    <view class="wrap-user">
      <view class="item">
        <view class="info">
          <view class="title">
            <view class="name">贾铭</view>
          </view>
          <view class="code">住院号：0000514984444</view>
        </view>
        <view class="check">切换住院人</view>
      </view>
    </view>
    <u-gap height="15" bg-color="#f6f6f6"></u-gap>
    <view class="wrap-con">
      <view class="wrap-con__title">
        <view class="text">选择充值金额</view>
        <view class="amount">
          <view class="amount-text">余额：</view>
          <view class="amount-price">¥2440.24</view>
        </view>
      </view>
      <view class="wrap-con__price">
        <view class="item active">
          <view class="ren">¥</view>
          <view class="price">100</view>
        </view>
        <view class="item">
          <view class="ren">¥</view>
          <view class="price">200</view>
        </view>
        <view class="item">
          <view class="ren">¥</view>
          <view class="price">500</view>
        </view>
        <view class="item">
          <view class="ren">¥</view>
          <view class="price">200</view>
        </view>
        <view class="item">
          <input class="input" type="number" placeholder="请输入整百金额" />
        </view>
      </view>
      <view class="wrap-con__btn">充值</view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 100vh;
  background: #ffffff;
  &-user {
    padding: 30rpx 20rpx;
    .item {
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 40rpx;
      margin-bottom: 20rpx;
      color: #ffffff;
      border-radius: 10rpx;
      background: #0ec698 url('@/static/image/residents_item_bg.jpg') no-repeat right center;
      background-size: contain;
      &:last-child {
        margin-bottom: 0;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        .title {
          display: flex;
          align-items: center;
          border-radius: 10rpx;
          .name {
            font-size: 36rpx;
            margin-right: 15rpx;
          }
          .tag {
            height: 32rpx;
            line-height: 32rpx;
            font-size: 20rpx;
            padding: 0 10rpx;
            color: rgba($color: #ffffff, $alpha: .65);
            border: 1rpx solid rgba($color: #ffffff, $alpha: .65);
            border-radius: 8rpx;
          }
        }
        .code {
          font-size: 24rpx;
          margin-top: 20rpx;
        }
      }
      .check {
        line-height: 50rpx;
        font-size: 26rpx;
        padding: 0 20rpx;
        border: 1rpx solid #ffffff;
        border-radius: 10rpx;
      }
    }
  }
  &-con {
    padding: 30rpx 40rpx;
    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 30rpx;
      color: #666666;
      .amount {
        display: flex;
        align-items: center;
        &-text {
          font-size: 24rpx;
        }
        &-price {
          color: #0ec698;
        }
      }
    }
    &__price {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 35rpx 45rpx;
      margin: 50rpx 0;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70rpx;
        color: #333333;
        font-size: 32rpx;
        border: 1rpx solid;
        border-color: #dcdcdc;
        &:nth-child(5) {
          grid-column-start: span 2;
        }
        .ren {
          margin-right: 8rpx;
        }
        .input {
          flex: 1;
          height: 100%;
          padding: 0 30rpx;
          font-size: 24rpx;
        }
        &.active {
          color: #ffffff;
          background: #0ec698;
          border-color: #0ec698;
        }
       
      }
    }
    &__btn {
      line-height: 85rpx;
      font-size: 32rpx;
      text-align: center;
      color: #ffffff;
      background: #0ec698;
      border-radius: 10rpx;
    }
  }
}

</style>