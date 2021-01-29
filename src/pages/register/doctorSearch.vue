<template>
  <view class="wrap">
    <view class="wrap-con" v-if="doctorList.length > 0">
      <view class="wrap-con__bt">医生</view>
      <view class="wrap-con__list">
        <view
          class="item"
          v-for="(item, index) in doctorList"
          :key="index"
          @click="goDetail(item)"
        >
          <view class="avatar">
            <dh-image
              class="img"
              mode="aspectFill"
              :src="item.headimg"
              errorSrc="doctor.jpg"
            ></dh-image>
          </view>
          <view class="info">
            <view class="title">
              <view class="name">{{ item.doctor_name }}</view>
            </view>
            <view class="subt">
              <view class="subt-zc">{{ item.department_name }}</view>
            </view>
            <view class="intr">{{ item.professional }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import dhImage from '@/components/dh-image/dh-image.vue'

export default {
  data() {
    return {
      doctorList: [],
      doctorMore: false,
    }
  },
  components: { dhImage },
  onLoad() {
    this.getDoctorList()
  },
  methods: {
    getDoctorList() {
      this.$http
        .post(this.API.DOCTOR_SEARCH, { keyword: this.$Route.query.keyword })
        .then((res) => {
          this.doctorList = res.data
        })
    },
    goDetail(item) {
      this.$Router.push({
        name: 'doctorDetail',
        params: { doctor_id: item.id, department_id: item.department_id },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  min-height: 100rpx;
  background: #ffffff;
  &-con {
    &__bt {
      height: 75rpx;
      line-height: 75rpx;
      padding: 0 30rpx;
      color: #333333;
      font-size: 28rpx;
    }
    &__list {
      border: 0 solid #d8d8d8;
      border-width: 1px 0;
      .item {
        display: flex;
        padding: 30rpx;
        background-size: 100%;
        border-bottom: 1rpx solid #d8d8d8;
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
          color: #989898;
          .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10rpx;
            .name {
              color: #333333;
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
          .intr {
            @include textOverflow(1);
          }
        }
      }
    }
  }
}
</style>
