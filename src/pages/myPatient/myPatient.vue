<template>
  <view class="patient">
    <view class="patient-m">
      <view class="patient-m__list">
        <view class="item">
          <view class="info">
            <view class="title">
              <view class="name">姓名</view>
              <view class="tag">默认</view>
            </view>
            <view class="code">院内诊疗号：1000000182574</view>
          </view>
          <view class="jt">
            <text class="iconfont icon-arrowb"></text>
          </view>
        </view>
      </view>
      <view class="patient-m__add">
        <view class="patient-m__add-icon">
          <text class="iconfont icon-hao"></text>
        </view>
        <view class="patient-m__add-info">
          <view class="tit">添加就诊人</view>
          <view class="sub">还可添加4人</view>
        </view>
        <view class="patient-m__add-jt">
          <text class="iconfont icon-arrowb"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.patient {
  &-m {
    &__list {
      background: #ffffff;
      .item {
        display: flex;
        align-items: center;
        height: 156rpx;
        padding: 0 20rpx 0 30rpx;
        background-size: 260rpx;
        border-bottom: 1rpx solid #f3f3f3;
        &:last-child {
          border-bottom: 0;
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
              color: #333333;
              font-size: 36rpx;
              margin-right: 15rpx;
            }
            .tag {
              line-height: 40rpx;
              color: #898989;
              font-size: 20rpx;
              padding: 0 10rpx;
              border: 1rpx solid #a6a9a8;
              border-radius: 8rpx;
            }
          }
          .code {
            color: #898989;
            font-size: 24rpx;
            margin-top: 20rpx;
          }
        }
        .jt {
          color: #cbcbcb;
          .iconfont {
            font-size: 50rpx;
          }
        }
      }
    }
    &__add {
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 20rpx 0 30rpx;
      margin-top: 15rpx;
      background: #ffffff;
      border-radius: 10rpx;
      &-icon {
        color: #0ec698;
        width: 80rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 50%;
        font-weight: bold;
        border: 1rpx solid #0ec698;
        .iconfont {
          font-size: 35rpx;
        }
      }
      &-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0 20rpx;
        .tit {
          color: #333333;
          font-size: 28rpx;
        }
        .sub {
          color: #898989;
          font-size: 24rpx;
          margin-top: 10rpx;
        }
      }
      &-jt {
        color: #cbcbcb;
        .iconfont {
          font-size: 50rpx;
        }
      }
    }
  }
}
</style>