<template>
  <view class="wrap-code">
    <view class="wrap-code__tab">
      <view
        :class="['item', { active: codeIndex === 0 }]"
        @click="codeIndex = 0"
        >电子健康卡</view
      >
      <view
        :class="['item', { active: codeIndex === 1 }]"
        @click="codeIndex = 1"
        >就诊凭条</view
      >
    </view>
    <view class="wrap-code__con">
      <view class="wrap-code__con-code1" :class="{ hide: codeIndex === 1 }">
        <canvas class="img" canvas-id="qrcode"></canvas>
      </view>
      <view class="wrap-code__con-code2" :class="{ hide: codeIndex === 0 }">
        <canvas class="img" canvas-id="barcode"></canvas>
        <view class="num">{{ patient_code }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import wxbarcode from 'wxbarcode'
export default {
  props: {
    patient_code: {
      type: String,
    },
    health_code: {
      type: String,
    },
  },
  watch: {
    patient_code(val) {
      if (val) {
        console.log('patient_code', val)
        wxbarcode.barcode('barcode', val, 610, 140)
      }
    },
    health_code(val) {
      if (val) {
        console.log('health_code', val)
        wxbarcode.qrcode('qrcode', val, 400, 400)
      }
    },
  },
  data() {
    return {
      codeIndex: 0,
    }
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  &-code {
    padding: 30rpx 30rpx 50rpx 30rpx;
    background: #ffffff;
    border-radius: 10rpx;
    &__tab {
      display: flex;
      justify-content: space-evenly;
      color: #333333;
      font-size: 30rpx;
      .item {
        &.active {
          color: #0ec698;
          &:after {
            content: '';
            display: block;
            width: 70%;
            height: 2rpx;
            margin: 15rpx auto 0 auto;
            background: #0ec698;
          }
        }
      }
    }
    &__con {
      .hide {
        display: none;
      }
      padding-top: 50rpx;
      &-code1 {
        .img {
          width: 400rpx;
          height: 400rpx;
          margin: 0 auto;
          // display: block;
        }
      }
      &-code2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        .img {
          height: 140rpx;
          width: 100%;
          // height: auto;
          // display: block;
        }
        .num {
          color: #333333;
          font-size: 24rpx;
          margin-top: 15rpx;
          letter-spacing: 1rpx;
        }
      }
    }
  }
}
</style>
