<template>
  <view class="doctor" >
    <view class="title"
      >{{ departmentName }}共有<text>{{ list.length }}</text
      >名医生</view
    >
    <view class="list" v-if="list.length>0">
      <view
        class="item"
        @click="toDetail(item.doctor_id)"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="head">
          <dh-image
            mode="aspectFill"
            :src="item.doctor_head"
            :inHis='true'
            errorSrc="doctor.jpg"
          ></dh-image>
        </view>
        <view class="content">
          <view class="content_name">{{ item.doctor_name }}</view>
          <view class="content_level">{{ item.department_name }}</view>
          <view class="content_des">{{ item.professional }}</view>
        </view>
      </view>
    </view>
   <empty v-else></empty>
  </view>
</template>
<script>
import dhImage from "@/components/dh-image/dh-image.vue";
export default {
  components: { dhImage },
  data() {
    return {
      list: [],
      departmentName: "",
      departmentid: ""
    };
  },
  onLoad() {
    this.departmentName = this.$Route.query.departmentname
    this.departmentid = this.$Route.query.departmentid
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .post(this.API.DOCTOR_INFO_LIST, {
          departmentid: this.departmentid,
        })
        .then((res) => {
          this.list = res.data;
        });
    },
    toDetail(id) {
      this.$Router.push({ name: "doctorInfo", params: { id: id } });
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
