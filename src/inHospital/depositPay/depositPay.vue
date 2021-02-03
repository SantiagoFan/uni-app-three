<template>
  <view class="wrap">
    <LivePatientCard></LivePatientCard>
    <u-gap height="15" bg-color="#f6f6f6"></u-gap>
    <view class="wrap-con">
      <view class="wrap-con__title">
        <view class="text">选择充值金额</view>
        <view class="amount">
          <view class="amount-text">余额：</view>
          <view class="amount-price">¥{{ livePatientInfo.remain_total }}</view>
        </view>
      </view>
      <view class="wrap-con__price">
        <view
          :class="['item', { active: item.amount == money }]"
          v-for="(item, index) in list"
          :key="index"
          @click="changeAmount(item, index)"
        >
          <view class="ren">¥</view>
          <view class="price">{{ parseFloat(item.amount) }}</view>
        </view>
        <view class="item last-item">
          <input
            class="input"
            type="number"
            @input="changeMoney"
            placeholder="请输入其他金额，金额至少2000元"
          />
        </view>
      </view>
      <view class="wrap-con__btn" @click="goPay">充值</view>
    </view>
  </view>
</template>

<script>
import { isNull } from '@/utils/common.js'
import { mapState } from 'vuex'
import LivePatientCard from "@/components/live_patient_card/index.vue"

export default {
  data() {
    return {
      list: [],
      money: 0,
      flag: false,
    }
  },
  components:{
    LivePatientCard
  },
  onLoad() {
    this.getList()
  },
  computed: {
    ...mapState(['livePatientInfo']),
  },
  methods: {
    getList() {
      this.$http.post(this.API.LIVE_DEPOSIT_RULE).then((res) => {
        this.list = res.data
        this.money = this.list[0]['amount']
      })
    },

    changeAmount(item) {
      this.money = item.amount
    },
    goPay() {
      if (!this.livePatientInfo) {
        uni.showToast({
          title: '请添加住院人',
          icon: 'none',
        })
        return false
      }
      if (isNull(this.money)) {
        uni.showToast({
          title: '请输入充值金额',
          icon: 'none',
        })
        return false
      }
      if (this.money < 2000) {
        uni.showToast({
          title: '充值金额不得少于2000',
          icon: 'none',
        })
        return false
      }
      if (parseFloat(this.money) % 1000 != 0) {
        uni.showToast({
          title: '充值金额必须为一千的倍数',
          icon: 'none',
        })
        return false
      }
      let that = this
      if (this.flag) {
        return false
      }
      that.flag = true
      that.$http
        .post(that.API.LIVE_DEPOSIT_ORDER, {
          amount: that.money,
          live_code: that.livePatientInfo.inpatient_code,
          patient_code: that.livePatientInfo.patient_code,
        })
        .then((res) => {
          const config = JSON.parse(res.data)
          uni.requestPayment({
            provider: 'wxpay',
            timeStamp: config.timeStamp,
            nonceStr: config.nonceStr,
            package: config.package,
            signType: 'MD5',
            paySign: config.paySign,
            success: function(response) {
              uni.showToast({
                title: '支付成功',
                duration: 2000,
                icon: 'none',
              })
              that.$Router.replace({
                name: 'livePatientRecord',
              })
            },
            fail: function(err) {
              that.flag = false
              uni.showToast({
                title: '支付失败',
                duration: 2000,
                icon: 'none',
              })
            },
          })
        })
        .finally((res) => {
          that.flag = false
        })
    },
    changeMoney(event) {
      this.money = event.target.value
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding-top: 20rpx;
  min-height: 100vh;
  background: #ffffff;
  &-user {
    padding: 30rpx 20rpx;
    .item {
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 40rpx;
      margin-bottom: 20rpx;
      color: #ffffff;
      border-radius: 10rpx;
      background: #0ec698 url('@/static/image/residents_item_bg.jpg') no-repeat
        right center;
      background-size: contain;

      &:last-child {
        margin-bottom: 0;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        .title {
          display: flex;
          align-items: center;
          border-radius: 10rpx;
          .name {
            font-size: 36rpx;
            margin-right: 15rpx;
          }
          .tag {
            height: 32rpx;
            line-height: 32rpx;
            font-size: 20rpx;
            padding: 0 10rpx;
            color: rgba($color: #ffffff, $alpha: 0.65);
            border: 1rpx solid rgba($color: #ffffff, $alpha: 0.65);
            border-radius: 8rpx;
          }
        }
        .code {
          font-size: 24rpx;
          margin-top: 20rpx;
        }
      }
      .check {
        line-height: 50rpx;
        font-size: 26rpx;
        padding: 0 20rpx;
        border: 1rpx solid #ffffff;
        border-radius: 10rpx;
      }
    }
  }
  &-con {
    padding: 30rpx 40rpx;
    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 30rpx;
      color: #666666;
      .amount {
        display: flex;
        align-items: center;
        &-text {
          font-size: 24rpx;
        }
        &-price {
          color: #0ec698;
        }
      }
    }
    &__price {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 35rpx 45rpx;
      margin: 50rpx 0;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70rpx;
        color: #333333;
        font-size: 32rpx;
        border: 1rpx solid;
        border-color: #dcdcdc;
        &.last-item {
          grid-column-start: span 3;
        }
        // &:nth-child(5) {
        //   grid-column-start: span 2;
        // }
        .ren {
          margin-right: 8rpx;
        }
        .input {
          flex: 1;
          height: 100%;
          padding: 0 30rpx;
          font-size: 24rpx;
        }
        &.active {
          color: #ffffff;
          background: #0ec698;
          border-color: #0ec698;
        }
      }
    }
    &__btn {
      line-height: 85rpx;
      font-size: 32rpx;
      text-align: center;
      color: #ffffff;
      background: #0ec698;
      border-radius: 10rpx;
    }
  }
}
</style>
