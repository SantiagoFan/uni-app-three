<template>
  <view class="record">
    <view class="record-m">
      <view class="record-m__list">
        <view class="item" v-for="item in 2" :key="item" @click="handleItem">
          <view class="icon">
            <text class="iconfont icon-duihao"></text>
          </view>
          <view class="info">
            <view class="title">
              <view class="status">缴费成功</view>
              <view class="price">¥10000.00</view>
            </view>
            <view class="subt">
              <view class="name">贾铭</view>
              <view class="date">2020-07-18 10:30:00</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      type: '',
    }
  },
  watch: {
    type() {
      let title
      switch (this.type) {
        case 0:
          title = '门诊缴费记录'
          break
        case 1:
          title = '诊间支付缴费记录'
          break
        case 2:
          title = '住院缴费记录'
        default:
          break
      }
      uni.setNavigationBarTitle({
        title: title,
      })
    },
  },
  computed: {
    ...mapState(['patientInfo']),
  },
  onLoad() {
    // 从我的跳转过来 type: 0、门诊缴费记录 1、诊间支付缴费记录 2、住院缴费记录
    this.type = this.$Route.query.type
    this.getList()
  },
  methods: {
    handleItem() {
      const { type } = this
      let url
      switch (type) {
        case 0:
          url = '/pages/clinicPayDetail/clinicPayDetail'
          break
        case 1:
          url = '/pages/payRecordDetail/payRecordDetail'
          break
        case 2:
          url = '/pages/paymentDetail/paymentDetail'
          break
        default:
          url = '/pages/clinicPayDetail/clinicPayDetail'
          break
      }
      this.$Router.push({ name: url })
    },
    getList() {
      this.$http
        .post(this.API.EXAMINATION_RECORD, {
          patient_code: this.patientInfo.patient_code,
        })
        .then((res) => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.record {
  &-m {
    padding: 20rpx;
    &__list {
      .item {
        display: flex;
        align-items: center;
        padding: 25rpx;
        margin-bottom: 20rpx;
        background: #ffffff;
        border-radius: 10rpx;
        .icon {
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          margin-right: 30rpx;
          text-align: center;
          color: #ffffff;
          background: #0ec698;
          border-radius: 50%;
        }
        .info {
          flex: 1;
          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28rpx;
            .status {
              color: #484848;
            }
            .price {
              color: #ff7800;
            }
          }
          .subt {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #a8a8a8;
            font-size: 26rpx;
            margin-top: 20rpx;
          }
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
