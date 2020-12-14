<template>
  <view class="collect">
    <view class="collect-main">
      <view class="collect-list">
        <navigator url="/pages/doctorDetail/doctorDetail" class="collect-item" v-for="item in 3" :key="item">
          <view class="collect-item__avatar">
            <image class="img" mode="aspectFill" src="@/static/image/test_avatar.jpg" />
          </view>
          <view class="collect-item__info">
            <view class="name">云耀峰</view>
            <view class="title">职称：主任医师</view>
            <view class="post">职务：党总支书记</view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.collect {
  &-main {
    .collect-list {
      padding: 20rpx;
      .collect-item {
        display: flex;
        padding: 20rpx;
        margin-bottom: 20rpx;
        background: #ffffff;
        border-radius: 10rpx;
        &:last-child {
          margin-bottom: 0
        }
        &__avatar {
          width: 120rpx;
          height: 120rpx;
          border-radius: 6rpx;
          margin-right: 30rpx;
          overflow: hidden;
          .img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        &__info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          color: #a8a8a8;
          font-size: 24rpx;
          .name {
            color: #484848;
            font-size: 28rpx;
          }
        }
      }
    }
  }
}
</style>