<template>
  <view class="wrap">
    <view class="wrap-main">
      <view class="wrap-massage">五疗科共有<text class="count">3</text>名医生</view>
      <view class="wrap-list">
        <view class="wrap-item" v-for="item in 3" :key="item" @click="handleClickDetail">
          <view class="wrap-item__avatar">
            <image class="img" mode="aspectFill" src="@/static/image/doctor_avatar.jpg" />
          </view>
          <view class="wrap-item__info">
            <view class="name">云耀峰</view>
            <view class="title">职称：主任医师</view>
            <view class="post">职务：党总支书记</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleClickDetail() {
      uni.navigateTo({
        url: '/pages/doctorDetail/doctorDetail?tabIndex=1'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  &-main {
    .wrap-massage {
        color: #434343;
        font-size: 30rpx;
        padding: 40rpx 0;
        text-align: center;
        .count {
          color: #0ec698;
          font-size: 36rpx;
        }
    }
    .wrap-list {
      padding: 0 20rpx 30rpx 20rpx;
      .wrap-item {
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