<template>
  <view class="register-r">
    <view class="register-r-main">
      <view class="register-r-main__list">
        <view class="item">
          <view class="icon active">
            <text class="iconfont icon-duihao"></text>
          </view>
          <view class="info">
            <view class="info_title">
              <view class="info_title__status">预约挂号成功</view>
              <view class="info_title__time-text">就诊时间</view>
            </view>
            <view class="info_subt1">
              <view class="name">姓名</view>
              <view class="date">2020-07-18</view>
            </view>
            <view class="info_subt2">
              <view class="doctor-name">皮肤科门诊/医生姓名</view>
              <view class="time">09:00:00 10:00:00</view>
            </view>
          </view>
        </view>
        <view class="item">
          <view class="icon">
            <text class="iconfont icon-jianhao"></text>
          </view>
          <view class="info">
            <view class="info_title">
              <view class="info_title__status">取消挂号成功</view>
              <view class="info_title__time-text">就诊时间</view>
            </view>
            <view class="info_subt1">
              <view class="name">姓名</view>
              <view class="date">2020-07-18</view>
            </view>
            <view class="info_subt2">
              <view class="doctor-name">皮肤科门诊/医生姓名</view>
              <view class="time">09:00:00 10:00:00</view>
            </view>
          </view>
        </view>
        <view class="item">
          <view class="icon">
            <text class="iconfont icon-dasuozi"></text>
          </view>
          <view class="info">
            <view class="info_title">
              <view class="info_title__status">锁号成功</view>
              <view class="info_title__time-text">就诊时间</view>
            </view>
            <view class="info_subt1">
              <view class="name">姓名</view>
              <view class="date">2020-07-18</view>
            </view>
            <view class="info_subt2">
              <view class="doctor-name">皮肤科门诊/医生姓名</view>
              <view class="time">09:00:00 10:00:00</view>
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
.register-r {
  &-main {
    &__list {
      padding: 20rpx;
      .item {
        display: flex;
        align-items: center;
        padding: 30rpx;
        background: #ffffff;
        border-radius: 10rpx;
        margin-bottom: 20rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .icon {
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          border-radius: 50%;
          color: #ffffff;
          background: #e3e3e3;
          &.active {
            background: #0ec698;
          }
        }
        .info {
          flex: 1;
          margin-left: 30rpx;
          color: #a8a8a8;
          font-size: 26rpx;
          &_title,
          &_subt1,
          &_subt2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          &_title {
            color: #484848;
            font-size: 28rpx;
          }
          &_subt1 {
            margin: 20rpx 0 10rpx 0;
          }
        }
      }
    }
  }
}
</style>