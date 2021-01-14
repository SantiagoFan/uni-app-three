<template>
  <view class="wrap">
    <view class="wrap_top">
      <view class="wrap_top__date">日期：2020-07-22</view><!-- 按日期预约显示 -->
      <view class="wrap_top__tab">
        <view :class="['wrap_top__tab-cell', {active: tabIndex === 0}]" @click="handleTabItem(0)">按日期预约</view>
        <view :class="['wrap_top__tab-cell', {active: tabIndex === 1}]" @click="handleTabItem(1)">按医生预约</view>
      </view>
    </view>
    <view class="wrap_con">
      <view class="wrap_con__date" v-if="tabIndex===0">
        <view :class="['list', {active: isOpen}]">
          <view class="item" v-for="(item, index) in date" :key="index">
            <view class="week">{{item.week}}</view>
            <view :class="['con', {active: item.active}]">
              <view class="count" :style="{color: item.status == '有'?'#0ec698': ''}">{{item.count}}</view>
              <view class="status">{{item.status}}</view>
            </view>
          </view>
        </view>
        <view class="arrow" @click="isOpen = !isOpen">
          <view :class="['icon', {active: isOpen}]">
            <text class="iconfont icon-shang"></text>
          </view>
        </view> 
      </view>
      <view class="wrap_con__list">
        <navigator url="/pages/doctorDetail/doctorDetail" class="cell">
          <view class="cell__avatar">
            <image class="img" mode="aspectFill" src="@/static/image/doctor_avatar.jpg" />
          </view>
          <view class="cell__info">
            <view class="title">
              <view class="name">云耀峰</view>
              <view class="right">
                <view class="tag">满诊</view> <!-- 按日期预约显示 -->
              </view>
            </view>
            <view class="post">职称：主任医师</view>
            <view class="content">以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针</view>
          </view>
        </navigator>
        <navigator url="/pages/doctorDetail/doctorDetail" class="cell">
          <view class="cell__avatar">
            <image class="img" mode="aspectFill" src="@/static/image/doctor_avatar.jpg" />
          </view>
          <view class="cell__info">
            <view class="title">
              <view class="name">云耀峰</view>
              <view class="right">
                <view class="tag">满诊</view> <!-- 按日期预约显示 -->
              </view>
            </view>
            <view class="post">职称：主任医师</view>
            <view class="content">以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针</view>
          </view>
        </navigator>
        <navigator url="/pages/doctorDetail/doctorDetail" class="cell">
          <view class="cell__avatar">
            <image class="img" mode="aspectFill" src="@/static/image/doctor_avatar.jpg" />
          </view>
          <view class="cell__info">
            <view class="title">
              <view class="name">云耀峰</view>
              <view class="right">
                <view class="sur" v-if="tabIndex === 1">余号:20</view>
                <view class="tag">¥ 10</view> <!-- 按日期预约显示 -->
              </view>
            </view>
            <view class="post">职称：主任医师</view>
            <view class="content">以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针以蒙医针灸五疗治疗疾病见长，并把针</view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      calendarShow: false,
      tabIndex: 0,
      isOpen: false, // 是否展开日期
      date: [{
        week: '周四',
        count: 21,
        status: '无',
        active: true
      },{
        week: '周五',
        count: 21,
        status: '无',
        active: false
      },{
        week: '周六',
        count: 21,
        status: '无',
        active: false
      },{
        week: '周日',
        count: 21,
        status: '有',
        active: false
      },{
        week: '周一',
        count: 10,
        status: '有',
        active: false
      },{
        week: '周二',
        count: 22,
        status: '有',
        active: false
      },{
        week: '周三',
        count: 25,
        status: '无',
        active: false
      }]
    }
  },
  methods: {
    change (e) {
      console.log('e==', e)
    },
    handleTabItem(index) {
      this.tabIndex = index
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
    &__date {
      display: flex;
      margin-bottom: 20rpx;
      .list {
        display: flex;
        width: 660rpx;
        overflow-x: auto;
        white-space: nowrap;
        &::-webkit-scrollbar {
          display: none;
        }
        .item {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          // width: 110rpx;
          flex-basis: 110rpx;
          flex-shrink: 0;
          height: 126rpx;
          font-size: 22rpx;
          white-space: nowrap;
          .week {
            color: #666666;
          }
          .con {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 65rpx;
            height: 65rpx;
            margin-top: 10rpx;
            border-radius: 50%;
            .count {
              color: #666666;
              font-size: 24rpx;
            }
            .status {
              color: #bcbcbc;
            }
            &.active {
              background: #0ec698;
              .count {
                color: #ffffff;
              }
              .status {
                color: #ffffff;
              }
            }
          }
        }
        &.active {
          flex-wrap: wrap;
        }
      }
      .arrow {
        display: flex;
        flex: 1;
        height: 126rpx;
        border-left: 1rpx solid #e9e9e9;
        .icon {
          position: relative;
          width: 36rpx;
          height: 36rpx;
          margin: auto;
          color: #ffffff;
          text-align: center;
          background: #0ec698;
          border-radius: 50%;
          transition: all .5s;
          .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 20rpx;
          }
          &.active {
            transform: rotate(180deg)
          }
        }
      }
    }
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
            .right {
              display: flex;
              align-items: center;
              .sur {
                color: #333333;
                font-size: 24rpx;
                margin-right: 25rpx;
              }
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