<template>
  <view class="patient">
    <view class="patient-m">
      <view class="patient-m__massage">通过就诊人添加</view>
      <view class="patient-m__list">
        <view class="item" v-for="item in 2" :key="item">
          <view class="info">
            <view class="title">
              <view class="name">姓名</view>
            </view>
            <view class="code">院内诊疗号：1000000182574</view>
          </view>
          <view class="icon">
            <text class="iconfont icon-duihao2"></text>
          </view>
        </view>
      </view>
      <view class="patient-m__add" @click="handleClickAdd">
        <view class="patient-m__add-info">
          <view class="tit">添加就诊人</view>
          <view class="sub">还可添加4人</view>
        </view>
        <view class="patient-m__add-jt">
          <text class="iconfont icon-arrowb"></text>
        </view>
      </view>
      <view class="patient-m__btn">确认添加</view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleClickAdd() {
      uni.navigateTo({
        url: '/pages/medicalCardLogin/medicalCardLogin'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.patient {
  &-m {
    padding: 0 20rpx;
    &__massage {
      color: #afafaf;
      font-size: 26rpx;
      padding: 30rpx 0;
    }
    &__list {
      .item {
        display: flex;
        align-items: center;
        height: 156rpx;
        padding: 0 20rpx 0 30rpx;
        margin-bottom: 20rpx;
        background: #ffffff url('@/static/image/box_bg.png') no-repeat 70rpx -50rpx;
        background-size: 260rpx;
        &:last-child {
          margin-bottom: 0;
        }
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
            .tag {
              line-height: 32rpx;
              color: #898989;
              font-size: 20rpx;
              padding: 0 10rpx;
              border: 1rpx solid #a6a9a8;
              border-radius: 8rpx;
            }
          }
          .code {
            color: #898989;
            font-size: 24rpx;
            margin-top: 20rpx;
          }
        }
        .icon {
          width: 32rpx;
          height: 32rpx;
          line-height: 32rpx;
          text-align: center;
          margin-right: 20rpx;
          border: 1rpx solid;
          border-color: #bebebe;
          border-radius: 50%;
          .iconfont {
            font-size: 25rpx;
            display: none;
          }
          &.active {
            color: #ffffff;
            border-color: #0ec698;
            background: #0ec698;
            .iconfont {
              display: block;
            }
          }
        }
      }
    }
    &__add {
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 20rpx 0 30rpx;
      margin-top: 20rpx;
      background: #ffffff;
      border-radius: 10rpx;
      &-icon {
        color: #0ec698;
        .iconfont {
          font-size: 60rpx;
        }
      }
      &-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-right: 20rpx;
        .tit {
          color: #333333;
          font-size: 28rpx;
        }
        .sub {
          color: #898989;
          font-size: 24rpx;
          margin-top: 10rpx;
        }
      }
      &-jt {
        color: #cbcbcb;
        .iconfont {
          font-size: 35rpx;
        }
      }
    }
    &__btn {
      height: 80rpx;
      line-height: 80rpx;
      color: #ffffff;
      font-size: 30rpx;
      text-align: center;
      background: #0ec698;
      margin-top: 30rpx;
      border-radius: 10rpx;
    }
  }
}
</style>