<template>
  <view class="wrap">
    <view class="wrap-massage">
      <view class="icon">
        <image class="img" mode="widthFix" src="@/static/image/icon.jpg" />
      </view>
      <view class="text"
        >暂时不支持医保卡看病，持有医保卡的用户请到前台直接办理手续。</view
      >
    </view>
    <view class="wrap-con">
      <view class="wrap-con__cell">
        <PatientCard
          style="margin:0;"
          :need-patient="true"
          :show-message="false"
        ></PatientCard>
      </view>
    </view>
    <view class="wrap-fot">
      <view class="wrap-fot__total">总额：¥160.00</view>
      <view class="wrap-fot__btn">去缴费</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false, //  切换弹出层
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 0 20rpx;
  background: #ffffff;
  &-massage {
    display: flex;
    padding: 20rpx 0;
    .icon {
      width: 52rpx;
      margin-right: 20rpx;
      .img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    .text {
      flex: 1;
      color: #666666;
      font-size: 26rpx;
    }
  }
  &-con {
    &__cell {
      // padding: 20rpx;
      border-top: 1rpx solid #dbdbdb;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          color: #333333;
          font-size: 32rpx;
        }
        .check {
          color: #0ec698;
          font-size: 26rpx;
          line-height: 48rpx;
          padding: 0 15rpx;
          border: 1rpx solid #5ecb81;
          border-radius: 24rpx;
        }
      }
      .code {
        color: #666666;
        font-size: 26rpx;
        margin-top: 15rpx;
      }
    }
  }
  &-fot {
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 32rpx;
    background: #ffffff;
    &__total {
      flex: 1;
      color: #666666;
      padding: 0 30rpx;
    }
    &__btn {
      width: 250rpx;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      color: #ffffff;
      background: #0ec698;
    }
  }
  // 弹出层
  .check-wrap {
    &__title {
      height: 84rpx;
      line-height: 84rpx;
      text-align: center;
      color: #333333;
      font-size: 32rpx;
      border-bottom: 1rpx solid #e3e3e3;
    }
    &__con {
      .list {
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20rpx 40rpx;
          .info {
            font-size: 28rpx;
            .name {
              color: #333333;
            }
            .code {
              color: #999999;
              margin-top: 10rpx;
            }
          }
          .radio {
            width: 54rpx;
            height: 54rpx;
            line-height: 54rpx;
            text-align: center;
            color: #ffffff;
            border-radius: 50%;
            border: 1rpx solid;
            border-color: #e3e3e3;
            .icon {
              display: none;
            }
          }
          &.active {
            .radio {
              border-color: #0ec698;
              background: #0ec698;
              .icon {
                display: block;
              }
            }
          }
        }
      }
    }
    &__btn {
      display: flex;
      justify-content: space-between;
      padding: 30rpx 70rpx;
      .item {
        width: 275rpx;
        height: 64rpx;
        line-height: 64rpx;
        color: #ffffff;
        text-align: center;
        font-size: 28rpx;
        border-radius: 8rpx;
        background: #0ec698;
      }
    }
  }
}
</style>
