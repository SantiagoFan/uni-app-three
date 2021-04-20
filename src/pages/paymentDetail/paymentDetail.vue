<template>
  <view class="wrap" id="wrap">
    <view class="wrap-status">
      <view class="wrap-status__info">
        <view class="icon">
          <view class="iconfont icon-duihao"></view>
        </view>
        <view class="text">住院押金</view>
      </view>
      <view class="wrap-status__msg"
        >您的押金缴纳成功，如需要打印发票和押金条，请到住院收费窗口凭此缴费记录打印。</view
      >
    </view>
    <view class="wrap-info">
      <view class="wrap-info__box">
        <view :class="['bt', { 'bt-show': payDetailShow }]" @click="handleBt">
          <view class="bt-text">缴费详情</view>
          <view class="bt-arrow">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
        <view class="list" v-show="payDetailShow">
          <view class="cell">
            <view class="cell-label">补缴金额</view>
            <view class="cell-con price">¥{{ info.pay_fee }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">医院名称</view>
            <view class="cell-con">{{ $config('name') }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">住院人</view>
            <view class="cell-con">{{ info.patient_name }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">住院号</view>
            <view class="cell-con">{{ info.zyh }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">就诊卡号</view>
            <view class="cell-con">{{ data.patient_code }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">医院单号</view>
            <view class="cell-con">{{ info.innner_trade_no }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">平台单号</view>
            <view class="cell-con">{{ detail.order_no }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付流水号</view>
            <view class="cell-con">{{ detail.transaction_no }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付时间</view>
            <view class="cell-con">{{ info.jfrq }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      codeIndex: 0,
      payDetailShow: true,
      info: {},
      detail: {},
    }
  },
  onLoad() {
    this.info = this.$Route.query.livePatientRecordInfo
    if (this.info) {
      this.getDetail()
    }
  },
  methods: {
    // 点击缴费详情
    handleBt() {
      this.payDetailShow = !this.payDetailShow
    },
    getDetail() {
      this.$http.post(this.API.LIVE_DEPOSIT_ORDER_DETAIL, {
        inner_trade_no: this.info.innner_trade_no,
      }).then(res => {
          this.detail = res.data
          console.info(this.detail)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  &-status {
    padding: 30rpx;
    color: #ffffff;
    background: #0ec698;
    &__info {
      display: flex;
      align-items: center;
      .icon {
        width: 55rpx;
        height: 55rpx;
        line-height: 55rpx;
        color: #0ec698;
        margin-right: 20rpx;
        text-align: center;
        background: #ffffff;
        border-radius: 50%;
      }
      .text {
        font-size: 34rpx;
      }
      .time {
        margin-left: auto;
        font-size: 40rpx;
      }
    }
    &__msg {
      font-size: 26rpx;
      margin-top: 30rpx;
    }
  }
  &-info {
    padding: 20rpx 20rpx 40rpx 20rpx;
    &__box {
      padding: 30rpx;
      background: #ffffff;
      border-radius: 10rpx;
      margin-bottom: 20rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .bt {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #484848;
        font-size: 28rpx;
        &-show {
          .bt-arrow {
            transform: rotate(180deg);
          }
        }
        &-arrow {
          color: #5ecb81;
          transition: all 0.5s;
        }
      }
      .list {
        margin-top: 30rpx;
        .cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 26rpx;
          margin-bottom: 20rpx;
          padding: 15rpx 0;
          color: #3f3f3f;
          &:last-child {
            margin-bottom: 0;
          }
          &-con {
            color: #3f3f3f;
            &.price {
              color: #333333;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
