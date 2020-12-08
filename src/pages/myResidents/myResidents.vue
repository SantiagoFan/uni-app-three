<template>
  <view class="patient">
    <view class="patient-m">
      <view class="patient-m__list">
        <view class="item" v-for="item in 1" :key="item">
          <view class="info">
            <view class="title">
              <view class="name">贾铭</view>
              <view class="tag">默认</view>
            </view>
            <view class="code">住院号：0000514984444</view>
          </view>
          <view class="arrow">
            <text class="iconfont icon-arrowb"></text>
          </view>
        </view>
      </view>
      <view class="patient-m__add">
        <view class="patient-m__add-icon">
          <text class="iconfont icon-jiahao"></text>
        </view>
        <view class="patient-m__add-info">
          <view class="tit">添加就诊人</view>
          <view class="sub">还可添加4人</view>
        </view>
        <view class="patient-m__add-arrow">
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
    padding: 30rpx 20rpx;
    &__list {
      .item {
        display: flex;
        align-items: center;
        height: 156rpx;
        padding: 0 30rpx;
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
        .arrow {
          margin-right: -10rpx;
          .iconfont {
            font-size: 40rpx;
          }
        }
      }
    }
    &__add {
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 20rpx 0 30rpx;
      margin-top: 20rpx;
      background: #ffffff;
      border-radius: 10rpx;
      &-icon {
        color: #0ec698;
        .iconfont {
          font-size: 60rpx;
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
      &-arrow {
        color: #999999;
        .iconfont {
          font-size: 40rpx;
        }
      }
    }
  }
}
</style>