<template>
  <view class="record">
    <view class="record-m">
      <view class="record-m__list">
        <view
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleItem(item)"
        >
          <view class="icon">
            <text class="iconfont icon-duihao"></text>
          </view>
          <view class="info">
            <view class="title">
              <view class="status"
                >缴费{{ item.pay_status == 1 ? '成功' : '失败' }}</view
              >
              <view class="price">¥{{ item.pay_fee }}</view>
            </view>
            <view class="subt">
              <view class="name">{{ item.patient_name }}</view>
              <view class="date">{{ item.jfrq }}</view>
            </view>
          </view>
        </view>
      </view>
      <empty v-if="list.length == 0"></empty>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import empty from '../../components/empty/empty.vue'
export default {
  components: { empty },
  data() {
    return {
      list: [],
    }
  },
  computed: {
    ...mapState(['livePatientInfo']),
  },
  onLoad() {
    if (this.livePatientInfo) {
      this.getList()
    }
  },
  onPullDownRefresh() {
    if (this.livePatientInfo) {
      this.getList()
    }
  },
  methods: {
    getList() {
      this.$http
        .post(this.API.LIVE_PAY_RECORD, {
          live_code: this.livePatientInfo.inpatient_code,
        })
        .then((res) => {
          this.list = res.data
        })
        .finally((res) => {
          uni.stopPullDownRefresh()
        })
    },
    handleItem(item) {
      this.$Router.push({
        name: 'paymentDetail',
        params: { livePatientRecordInfo: item },
      })
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
            font-size: 34rpx;
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
            font-size: 32rpx;
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
