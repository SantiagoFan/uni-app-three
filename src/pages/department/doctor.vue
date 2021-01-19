<template>
  <view class="doctor">
    <view class="title"
      >{{ model.departmentName }}共有<text>{{ model.count }}</text
      >名医生</view
    >
    <view class="list">
      <view
        class="item"
        @click="toDetail(item.id)"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="head">
          <image mode="aspectFill" :src="item.headimg"></image>
        </view>
        <view class="content">
          <view class="content_name">{{ item.name }}</view>
          <view class="content_level">{{ item.professional }}</view>
          <view class="content_des">{{ item.speciality }}</view>
        </view>
      </view>
    </view>
    <view class="nodata" v-if="list.length <= 0">
      <image class="img" mode="widthFix" src="@/static/image/nodata.png" />
      <text class="notext">暂无更多</text>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      model: { departmentName: "", count: 0 },
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .post(this.API.DOCTOR_LIST, {
          departmentid: this.$Route.query.departmentid,
        })
        .then((res) => {
          this.list = res.data;
          this.model = res.model;
        });
    },
    toDetail(id) {
      this.$Router.push({ name: "doctorInfo", query: {id:id} });
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
  .nodata {
    min-height: 800rpx;
    text-align: center;
    .img {
      display: block;
      width: 194rpx;
      height: 171rpx;
      margin: 100rpx auto 0 auto;
    }
  }
}
</style>
