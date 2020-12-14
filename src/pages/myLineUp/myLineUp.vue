<template>
  <view class="wrap">
    <view class="wrap__user">
      <view class="wrap__user-box">
        <view class="info">
          <view class="title">
            <view class="name">姓名</view>
          </view>
          <view class="code">院内诊疗号：1000000182574</view>
        </view>
        <view class="switch" @click="handleCheck">切换就诊人</view>
      </view>
    </view>
    <view class="wrap__tab">
      <view :class="['wrap__tab-item', { active: tabIndex === 0 }]" @click="handleTabItem(0)">
        <view class="text">候诊排队</view>
      </view>
      <view :class="['wrap__tab-item', { active: tabIndex === 1 }]" @click="handleTabItem(1)">
        <view class="text">检查排队</view>
      </view>
    </view>
    <view class="wrap__con">
      <view class="art">
        <view class="title">排队号</view>
        <view class="num">15</view>
        <view class="massage">您前面还有<text class="count">9</text>人，请耐心等待！</view>
        <view class="gap">
          <image class="img" mode="widthFix" src="@/static/image/gap_img.jpg" />
        </view>
        <view class="info">
          <view class="cell">
            <view class="label">就诊科室</view>
            <view class="text">皮肤科门诊</view>
          </view>
          <view class="cell">
            <view class="label">医生姓名</view>
            <view class="text">姓名</view>
          </view>
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
  data() {
    return {
      tabIndex: 0
    }
  },
  methods: {
    handleTabItem(index) {
      this.tabIndex = index
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
.wrap {
  &__user {
    padding: 20rpx;
    &-box {
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
  &__tab {
    display: flex;
    align-items: center;
    background: #ffffff;
    &-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      color: #333333;
      font-size: 28rpx;
      &::after {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 2rpx;
        height: 42rpx;
        background: #f6f6f6;
        content: '';
      }
      .text {
        position: relative;
        height: 100%;
        height: 88rpx;
        line-height: 88rpx;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      &.active {
        color: #0ec698;
        .text {
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4rpx;
            background: #0ec698;
          }
        }
      }
    }
  }
  &__con {
    padding: 20rpx;
    .art {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      .title {
        color: #333333;
        font-size: 36rpx;
        padding: 30rpx 0;
      }
      .num {
        color: #0ec698;
        font-size: 120rpx;
        font-weight: bold;
      }
      .massage {
        color: #898989;
        font-size: 24rpx;
        letter-spacing: 5rpx;
        margin: 30rpx 0 50rpx 0;
        .count {
          color: #0ec698;
          font-size: 30rpx;
        }
      }
      .gap {
        width: 100%;
        .img {
          width: 100%;
          height: auto;
          display: block;
        }
      }
      .info {
        width: 100%;
        padding: 40rpx 50rpx 60rpx 50rpx;
        .cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 28rpx;
          margin-bottom: 30rpx;
          &:last-child {
            margin-bottom: 0;
          }
          .label {
            color: #8f8f8f;
          }
          .text {
            color: #333333;
          }
        }
      }
    }
  }
}
</style>