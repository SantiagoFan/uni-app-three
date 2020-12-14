<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__tab">
        <view
          class="wrap__tab-item"
          v-for="(item, index) in tabList"
          :key="index"
          @click="handleTabItem(index)"
        >
          <view :class="['text', {active: index == tabIndex}]">{{item.title}}</view>
        </view>
      </view>
      <view class="wrap__con">
        <view class="wrap__con-list">
          <u-empty
            v-if="feachData.length === 0"
            text="暂无数据"
            :margin-top="50"
          ></u-empty>
          <template v-else>
            <view class="cell" v-for="item in feachData" :key="item" @click="handleClickDetail(1)">
              <view class="img-box">
                <image class="img" mode="aspectFill" :src="item.img" />
              </view>  
              <view class="info">
                <view class="title">{{item.title}}</view>
                <view class="date">{{item.date}}</view>
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import data from '@/common/index.data'
  export default {
    data() {
      return {
        tabIndex: 0,
        tabList: [{
          title: '专家出诊表'
        },{
          title: '医院动态'
        }],
        feachData: data.hospitalList1
      }
    },
    methods: {
      handleTabItem(index) {
        this.tabIndex = index
        this.getData()
      },
      // 获取数据
      getData() {
        this.feachData = this.tabIndex === 0 ? data.hospitalList1 : data.hospitalList2
      },
      // 跳转详情
      handleClickDetail(id) {
        uni.navigateTo({
          url: `/pages/hospitalTrendsDetail/hospitalTrendsDetail?id=${id}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.container {
  .wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    &__tab {
      display: flex;
      align-items: center;
      background: #fff;
      &-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        &::after {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 2rpx;
          height: 40rpx;
          background: #f6f6f6;
          content: '';
        }
        .text {
          position: relative;
          height: 88rpx;
          line-height: 88rpx;
          color: #333333;
          font-size: 28rpx;
          &.active {
            color: #0ec698;
            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 80%;
              height: 4rpx;
              background: #0ec698;
            }
          }
        }
        &:last-child {
          &::after {
            display: none;
          }
        }
      }
    }
    &__con {
      flex: 1;
      overflow-y: auto;
      &-list {
        padding: 20rpx;
        .cell {
          display: flex;
          align-items: center;
          padding: 25rpx;
          margin-bottom: 25rpx;
          background: #ffffff;
          border-radius: 10rpx;
          &:last-child {
            margin-bottom: 0;
          }
          .img-box {
            width: 178rpx;
            height: 120rpx;
            margin-right: 25rpx;
            border-radius: 6rpx;
            overflow: hidden;
            .img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .info {
            flex: 1;
            .title {
              color: #484848;
              font-size: 28rpx;
              @include textOverflow(1);
            }
            .date {
              color: #a8a8a8;
              font-size: 26rpx;
              margin-top: 20rpx;
            }
          }
        }
      }
    }
  }
}

</style>