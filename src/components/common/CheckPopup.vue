<template>
  <!-- 弹出层 -->
  <u-popup v-model="show" mode="bottom" :border-radius="20">
    <view class="check-wrap">
      <view class="check-wrap__title">切换就诊人</view>
      <view class="check-wrap__con">
        <view class="list">
          <view class="item active">
            <view class="info">
              <view class="name">李想</view>
              <view class="code">就诊码：100000254151</view>
            </view>
            <view class="radio">
              <text class="iconfont icon-duihao"></text>
            </view>
          </view>
        </view>
      </view>
      <view class="check-wrap__btn">
        <navigator url="/pages/patientAdd/patientAdd" class="item"
          >添加就诊人</navigator
        >
        <navigator url="/pages/patientManage/patientManage" class="item"
          >管理就诊人</navigator
        >
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false, //  切换弹出层
    }
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  },
  methods: {
    handleChoose() {
      this.show = true
    },
  },
}
</script>

<style lang="scss" scoped>
// 弹出层
.check-wrap {
  &__title {
    height: 84rpx;
    line-height: 84rpx;
    text-align: center;
    color: #333333;
    font-size: 32rpx;
    border-bottom: 1rpx solid #e3e3e3;
  }
  &__con {
    .list {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 40rpx;
        .info {
          font-size: 28rpx;
          .name {
            color: #333333;
          }
          .code {
            color: #999999;
            margin-top: 10rpx;
          }
        }
        .radio {
          width: 54rpx;
          height: 54rpx;
          line-height: 54rpx;
          text-align: center;
          color: #ffffff;
          border-radius: 50%;
          border: 1rpx solid;
          border-color: #e3e3e3;
          .icon {
            display: none;
          }
        }
        &.active {
          .radio {
            border-color: #0ec698;
            background: #0ec698;
            .icon {
              display: block;
            }
          }
        }
      }
    }
  }
  &__btn {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 70rpx;
    .item {
      width: 275rpx;
      height: 64rpx;
      line-height: 64rpx;
      color: #ffffff;
      text-align: center;
      font-size: 28rpx;
      border-radius: 8rpx;
      background: #0ec698;
    }
  }
}
</style>
