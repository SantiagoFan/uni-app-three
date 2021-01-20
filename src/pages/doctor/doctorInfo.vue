<template>
  <view class="wrap">
    <view class="wrap__user">
      <view class="avatar">
        <dh-image
          class="img"
          mode="aspectFill"
          :src="model.headimg"
          errorSrc="doctor.jpg"
        ></dh-image>
      </view>
      <view class="info">
        <view class="title">
          <view class="name">{{ model.name }}</view>
        </view>
        <view class="subt"> {{ model.department_name }} </view>
        <view class="intr">{{ model.professional }}</view>
      </view>
    </view>
    <view class="wrap__con">
      <view class="wrap__con-title">擅长</view>
      <view class="wrap__con-intr" v-html="model.speciality"></view>
      <view class="wrap__con-title bordertop">详细介绍</view>
      <view class="wrap__con-intr" v-html="model.content"></view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      model: { name: "", professional: "", headimg: "", department_name: "" },
    };
  },
  onShow() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http
        .post(this.API.DOCTOR_INFO, { id: this.$Route.query.id })
        .then((res) => {
          this.model = res.data;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.wrap {
  &__user {
    display: flex;
    padding: 30rpx;
    background: url("@/static/image/doctor_detail_img.jpg") no-repeat center
      bottom;
    background-size: 100%;
    .avatar {
      width: 124rpx;
      height: 164rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .info {
      flex: 1;
      font-size: 26rpx;
      color: #ffffff;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10rpx;
        .name {
          font-size: 32rpx;
        }
      }
      .subt {
        display: flex;
        margin: 15rpx 0;
        &-zc {
          margin-right: 40rpx;
        }
      }
    }
  }
  &__con {
    padding: 30rpx;
    background: #fff;
    color: #979797;
    &-title {
      color: #0b0b0b;
      font-weight: bold;
      font-size: 30rpx;
      padding: 30rpx 0 10rpx 0;
    }
    &-intr {
      padding: 10rpx 0;
      font-size: 28rpx;
      line-height: 50rpx;
      border-bottom: 2rpx solid #e2e2e2;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
