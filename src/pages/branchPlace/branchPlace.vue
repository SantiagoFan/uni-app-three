<template>
  <view class="wrap">
    <view class="wrap-top">
      <image class="img" mode="widthFix" src="@/static/image/branch_place_img.jpg" />
      <view class="tab">
        <view class="tab-item">2F</view>
        <view class="tab-item active">1F</view>
        <view class="tab-item">3F</view>
      </view>
    </view>
    <view class="wrap-con">
      <view class="wrap-con__art">
        <view class="wrap-con__art-bt">一楼西侧</view>
        <view class="wrap-con__art-list">
          <view class="item">放射</view>
          <view class="item">煎药室</view>
          <view class="item">抢救室</view>
          <view class="item">门诊（多点执业)</view>
          <view class="item">收款/挂号</view>
          <view class="item">门诊(多点执业）</view>
          <view class="item">放射</view>
        </view>
      </view>
      <view class="wrap-con__art">
        <view class="wrap-con__art-bt">一楼东侧</view>
        <view class="wrap-con__art-list">
          <view class="item">门卫</view>
          <view class="item">B超市心电图</view>
          <view class="item">检验科</view>
          <view class="item">中药房</view>
          <view class="item">大厅</view>
          <view class="item">西药房</view>
          <view class="item">接种室</view>
          <view class="item">资料室</view>
          <view class="item">儿保室</view>
          <view class="item">候种室</view>
          <view class="item">登记室</view>
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
.wrap {
  min-height: 100vh;
  background: #ffffff;
  &-top {
    position: relative;
    .img {
      width: 100%;
      height: auto;
      display: block;
    }
    .tab {
      display: flex;
      position: absolute;
      align-items: center;
      bottom: 50rpx;
      left: 50%;
      transform: translateX(-50%);
      &-item {
        position: relative;
        color: #ffffff;
        font-weight: bold;
        font-size: 32rpx;
        margin-right: 75rpx;
        &:last-child {
          margin-right: 0;
        }
        &.active {
          &::after {
            content: '\e602';
            position: absolute;
            bottom: -30rpx;
            left: 50%;
            transform: translateX(-50%);
            font-size: 24rpx;
            font-family: "iconfont";
          }
        }
      }
    }
  }
  &-con {
    padding: 30rpx;
    &__art {
      color: #333333;
      padding: 30rpx 0;
      border-bottom: 1rpx solid #f6f6f6;
      &:last-child {
        border: none;
      }
      &-bt {
        font-size: 30rpx;
        margin-bottom: 30rpx;
        font-weight: bold;
      }
      &-list {
        display: flex;
        flex-wrap: wrap;
        margin: -20rpx 0 0 -60rpx;
        .item {
          font-size: 26rpx;
          padding: 10rpx;
          margin: 20rpx 0 0 60rpx;
        }
      }
    }
  }
}
</style>