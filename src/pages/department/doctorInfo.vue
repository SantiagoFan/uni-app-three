<template>
  <view class="wrap">
    <view class="wrap__user">
      <view class="avatar">
        <image
          class="img"
          mode="aspectFill"
          src="@/static/image/doctor_avatar.jpg"
        />
      </view>
      <view class="info">
        <view class="title">
          <view class="name">徐春义</view>
        </view>
        <view class="subt"> 产科门诊 </view>
        <view class="intr">副主任医师</view>
      </view>
    </view>
    <view class="wrap__con">
      <view class="wrap__con-title">擅长</view>
      <view class="wrap__con-intr"
        >儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育</view
      >
      <view class="wrap__con-title bordertop">详细介绍</view>
      <view class="wrap__con-intr"
        >儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育儿童生长发育</view
      >
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.wrap {
  &__user {
    display: flex;
    padding: 30rpx;
    background: url("@/static/image/doctor_detail_img.jpg") no-repeat center
      bottom;
    background-size: 100%;
    .avatar {
      width: 124rpx;
      height: 164rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .info {
      flex: 1;
      font-size: 26rpx;
      color: #ffffff;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10rpx;
        .name {
          font-size: 32rpx;
        }
      }
      .subt {
        display: flex;
        margin: 15rpx 0;
        &-zc {
          margin-right: 40rpx;
        }
      }
    }
  }
  &__con {
    padding: 30rpx;
    background: #fff;
    color: #979797;
    &-title {
      color: #0b0b0b;
      font-weight: bold;
      font-size: 30rpx;
      padding: 30rpx 0 10rpx 0;
    }
    &-intr {
      padding: 10rpx 0;
      font-size: 28rpx;
      line-height: 50rpx;
      border-bottom: 2rpx solid #e2e2e2;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
