<template>
  <view class="main-content">
    <view class="u-search-box">
      <view class="u-search-inner">
        <u-icon name="search" color="#909399" :size="28"></u-icon>
        <input
          class="u-search-text"
          type="text"
          confirm-type="search"
          @confirm="search"
          v-model="keyword"
          placeholder="请输入查验码搜索"
        />
      </view>
    </view>
    <view class="health-content">
      <template v-if="false">
        <view class="no-data">查询无结果</view>
        <image class="img" mode="widthFix" src='/static/image/no-health.png'></image>
      </template>
      <template v-else>
        <image class="bg-img" src="/static/image/health-bg.png?v=0.1" mode="widthFix"></image>
        <view class="title">健康检查合格证明</view>
        <view class="content">
         <template>
            <view class="item">
              <view>姓名：孙璐琪</view>
              <view class="item-right">性别：女</view>
            </view>
            <view class="item">
              <view>年龄：22</view>
              <view class="item-right">类别：畜牧</view>
            </view>
            <view class="item">发证日期：2021-09-02 12:00:00</view>
         </template>
        </view>
        <view class="qrcode">
          <image class="img" src='/static/image/check_report_icon.jpg'></image>
          <view class="text">00135468</view>
        </view>
        <view class="health-bottom">呼和浩特市蒙医中医医院体检中心</view>
      </template>
    </view>
  </view>
</template>
<script>
import dhImage from '@/components/dh-image/dh-image.vue'
export default {
  components: { dhImage },
  data() {
    return {
      keyword: [],
    }
  }
}
</script>
<style lang="scss" scoped>
.main-content{
  background: #ffffff;
  height: 100vh;
  padding: 30rpx;
  .u-search-box {
    padding-bottom: 30rpx;
    position: relative;
    // background: #ffffff;
    // box-shadow: 0 3rpx 10rpx #f2f2f2;
    z-index: 1;
    .u-search-inner {
      display: flex;
      align-items: center;
      height: 70rpx;
      background-color: #f5f5f5;
      padding: 0 20rpx;
      border-radius: 6rpx;
      .u-search-text {
        font-size: 30rpx;
        color: #666666;
        margin-left: 10rpx;
        width: 100%;
      }
    }
  }
  .no-data{
    // margin: 0 auto;
    margin: 100rpx;
    text-align: center;
  }
  .img {
    width: 50%;
    display: block;
    margin: 0 auto;
  }
  .health-content{
    position: relative;
    // height: 100vh;
    .bg-img{
      display: block;
      width: 100%;
    }
    .title{
      width: 100%;
      position: absolute;
      top: 20rpx;
      font-size: 40rpx;
      color: #ffffff;
      text-align: center;
    }
    .content{
      top: 170rpx;
      left: 60rpx;
      position: absolute;
      font-size: 30rpx;
      .item{
        width: 500rpx;
        display: flex;
        justify-content: space-between;
        color: #ffffff;
        line-height: 50rpx;
        &-right{
          width: 150rpx;
        }
      }
    }
    .health-bottom{
      width: 100%;
      position: absolute;
      bottom: 26rpx;
      font-size: 26rpx;
      color: #ffffff;
      text-align: center;
    }
    .qrcode{
      position: absolute;
      bottom: 100rpx;
      width: 100%;
      text-align: center;
      .img{
        height: 300rpx;
        width: 300rpx;
      }
      .text{
        font-size: 50rpx;
        color: #ffffff;
      }
    }
  }
}
</style>