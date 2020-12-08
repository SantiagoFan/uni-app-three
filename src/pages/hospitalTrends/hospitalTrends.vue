<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__tab">
        <view class="wrap__tab-item">
          <view class="text active">专家出诊表</view>
        </view>
        <view class="wrap__tab-x"></view>
        <view class="wrap__tab-item">
          <view class="text">医院动态</view>
        </view>
      </view>
      <view class="wrap__con">
        <view class="wrap__con-list">
          <view class="cell" v-for="item in 15" :key="item">
            <view class="img-box">
              <image class="img" mode="aspectFill" src="@/static/image/hos_pic.jpg" />
            </view>  
            <view class="info">
              <view class="title">固定专家出诊表</view>
              <view class="date">2020-07-18  09:00:00</view>
            </view>
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
.container {
  .wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    &__tab {
      display: flex;
      align-items: center;
      background: #fff;
      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        .text {
          position: relative;
          height: 88rpx;
          line-height: 88rpx;
          color: #333333;
          font-size: 28rpx;
          &.active {
            color: #0ec698;
            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 80%;
              height: 4rpx;
              background: #0ec698;
            }
          }
        }
      }
      &-x {
        width: 2rpx;
        height: 40rpx;
        background: #f6f6f6;
      }
    }
    &__con {
      flex: 1;
      overflow-y: auto;
      &-list {
        padding: 20rpx;
        .cell {
          display: flex;
          align-items: center;
          padding: 25rpx;
          margin-bottom: 25rpx;
          background: #ffffff;
          border-radius: 10rpx;
          &:last-child {
            margin-bottom: 0;
          }
          .img-box {
            width: 178rpx;
            height: 120rpx;
            margin-right: 25rpx;
            border-radius: 6rpx;
            overflow: hidden;
            .img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .info {
            flex: 1;
            .title {
              color: #484848;
              font-size: 28rpx;
              @include textOverflow(1);
            }
            .date {
              color: #a8a8a8;
              font-size: 26rpx;
              margin-top: 20rpx;
            }
          }
        }
      }
    }
  }
}

</style>