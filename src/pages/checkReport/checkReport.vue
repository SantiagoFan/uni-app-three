<template>
  <view class="wrap">
    <view class="wrap-user">
      <view class="item">
        <view class="info">
          <view class="title">
            <view class="name">贾铭</view>
          </view>
          <view class="code">就诊卡：0000514984444</view>
        </view>
        <view class="switch" @click="handleCheck">切换就诊人</view>
      </view>
    </view>
    <view class="wrap-list">
      <view class="item" v-for="item in 2" :key="item" @click="handleClickDetail">
        <view class="title">血常规</view>
        <view class="date">2020-07-04  14:44:14</view>
        <view class="status">
          <image class="img" mode="widthFix" src="@/static/image/check_report_icon.jpg" />
        </view>
      </view>
    </view>
    <!-- 弹出层 -->
    <check-popup ref="popup" />
  </view>
</template>

<script>
import CheckPopup from '@/components/common/CheckPopup'
export default {
  methods: {
    handleClickDetail() {
      uni.navigateTo({
        url: '/pages/reportDownload/reportDownload'
      })
    },
    // 切换就诊人
    handleCheck() {
      this.$refs.popup.handleChoose()
    }
  },
  components: {
    CheckPopup
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  padding: 20rpx;
  &-user {
    .item {
      position: relative;
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 30rpx;
      background: #ffffff url('@/static/image/box_bg.png') no-repeat 70rpx -50rpx;
      background-size: 260rpx;
      border-radius: 10rpx;
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
        }
        .code {
          color: #898989;
          font-size: 24rpx;
          margin-top: 20rpx;
        }
      }
      .switch {
        position: absolute;
        top: 25rpx;
        right: 20rpx;
        line-height: 42rpx;
        padding: 0 15rpx;
        color: #51d6b5;
        font-size: 20rpx;
        border: 1rpx solid #51d6b5;
        border-radius: 20rpx;
      }
    }
  }
  &-list {
    margin-top: 20rpx;
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

</style>