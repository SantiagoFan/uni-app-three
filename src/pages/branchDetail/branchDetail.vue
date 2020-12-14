<template>
  <view class="wrap">
    <view class="wrap_top">
      <view class="wrap_top__date">日期：2020-07-22</view><!-- 按日期预约显示 -->
      <view class="wrap_top__tab">
        <view class="wrap_top__tab-cell" @click="calendarShow = true">按日期预约</view>
        <view class="wrap_top__tab-cell active">按医生预约</view>
      </view>
    </view>
    <view class="wrap_con">
      <view class="wrap_con__list">
        <navigator url="/pages/doctorDetail/doctorDetail" class="cell" v-for="item in 3" :key="item">
          <view class="cell__avatar">
            <image class="img" mode="aspectFill" src="@/static/image/doctor_avatar.jpg" />
          </view>
          <view class="cell__info">
            <view class="title">
              <view class="name">云耀峰</view>
              <view class="tag">满诊</view> <!-- 按日期预约显示 -->
            </view>
            <view class="post">职称：主任医师</view>
            <view class="content">以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针</view>
          </view>
        </navigator>
      </view>
    </view>
    <!-- 日历 -->
    <u-calendar v-model="calendarShow" active-bg-color="#19be6b" btn-type="success" @change="change" mode="date"></u-calendar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      calendarShow: false
    }
  },
  methods: {
    change (e) {
      console.log('e==', e)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 30rpx;
    &__date {
      color: #666666;
      font-size: 26rpx;
    }
    &__tab {
      display: flex;
      align-items: center;
      color: #ffffff;
      background: #0ec698;
      padding: 2rpx;
      border-radius: 4rpx;
      &-cell {
        height: 54rpx;
        line-height: 54rpx;
        padding: 0 20rpx;
        font-size: 24rpx;
        border-radius: 4rpx;
        &.active {
          color: #5ecb81;
          background: #ffffff;
        }
      }
    }
  }
  &_con {
    flex: 1;
    background: #ffffff;
    &__list {
      .cell {
        display: flex;
        padding: 20rpx 30rpx;
        border-bottom: 1rpx solid #d8d8d8;
        &__avatar {
          width: 124rpx;
          height: 164rpx;
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
          justify-content: space-evenly;
          flex: 1;
          color: #a8a8a8;
          font-size: 24rpx;
          .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #484848;
            font-size: 28rpx;
            .tag {
              width: 84rpx;
              height: 40rpx;
              line-height: 40rpx;
              color: #ffffff;
              font-size: 24rpx;
              text-align: center;
              background: #ff8c46;
              border-radius: 8rpx;
            }
          }
          .content {
            @include textOverflow(1);
          }
        }
      }
    }
  }
}
</style>