<template>
  <view class="doctor">
    <view class="title">产科门诊共有<text>3</text>名医生</view>
    <view class="list">
      <view class="item" @click="toDetail()" v-for="item in 3" :key="item">
        <view class="head">
          <image mode="aspectFill" src="@/static/image/doctor_avatar.jpg"></image>
        </view>
        <view class="content">
          <view class="content_name">徐春义</view>
          <view class="content_level">副主任医师</view>
          <view class="content_des"
            >从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科从事产科</view
          >
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  onShow(){
   
  },
  methods: {
    toDetail() {
      this.$Router.push({ name: "doctorInfo",query:{} });
    },
  },
};
</script>
<style lang="scss" scoped>
.doctor {
  .title {
    line-height: 100rpx;
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    border-bottom: 2upx solid #dfe4e3;
    background: #f5faf8;
    text {
      color: #f3402f;
    }
  }
  .list {
    background: #ffffff;
    padding: 0 50rpx;
    .item {
      padding: 30rpx 0;
      border-bottom: 2upx solid #e3e3e3;
      display: flex;

      .head {
        margin-right: 20rpx;
        width: 130rpx;
        height: 160rpx;
        border-radius: 14rpx;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 6rpx 0;
        &_name {
          color: #131314;
          font-weight: 500;
          font-size: 32rpx;
        }
        &_level {
          font-size: 28rpx;
          color: #989898;
        }
        &_des {
          width: 500rpx;
          font-size: 26rpx;
          color: #b3b3b3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>