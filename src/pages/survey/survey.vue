<template>
  <view class="survey">
    <view class="survey-m">
      <view class="survey-m__list">
        <view class="item">
          <view class="title">流行病学调查登记表</view>
          <view class="date">2020-07-18  10:30:34</view>
          <view class="status">
            <image class="img" mode="widthFix" src="@/static/image/tian_status1.png" />
          </view>
        </view>
        <view class="item">
          <view class="title">流行病学调查登记表</view>
          <view class="date">2020-07-18  10:30:34</view>
          <view class="status">
            <image class="img" mode="widthFix" src="@/static/image/tian_status2.png" />
          </view>
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
@import '@/assets/scss/mixin.scss';
.survey {
  &-m {
    &__list {
      padding: 20rpx;
      .item {
        position: relative;
        padding: 30rpx 200rpx 30rpx 30rpx;
        margin-bottom: 20rpx;
        background: #ffffff;
        border-radius: 10rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .title {
          color: #333333;
          font-size: 34rpx;
          font-weight: bold;
          @include textOverflow(1);
        }
        .date {
          color: #898989;
          font-size: 24rpx;
          margin-top: 20rpx;
        }
        .status {
          position: absolute;
          right: 20rpx;
          top: 0;
          width: 136rpx;
          .img {
            width: 100%;
            height: auto;
            display: block;
          }
        }
      }
    }
  }
}
</style>