<template>
  <view class="wrap">
    <picker mode="date" :value="date" @change="bindDateChange">
      <view class="wrap-date">
        <view class="wrap-date__text">{{ date }}</view>
        <view class="wrap-date__arrow">
          <text class="iconfont icon-right"></text>
        </view>
      </view>
    </picker>
    <view v-if="today_expend > 0">
      <view class="wrap-amount">
        <view class="wrap-amount__text">本日花费金额（元）</view>
        <view class="wrap-amount__total">{{ today_expend }}</view>
      </view>
      <view class="wrap-con">
        <view class="wrap-con__bg">
          <image
            class="img"
            mode="widthFix"
            src="@/static/image/bill_border.jpg"
          />
        </view>
        <view class="recipel">
          <view class="table-th">
            <view class="item">项目名称</view>
            <view class="item">单价(元)</view>
            <view class="item">数量</view>
            <view class="item">金额(元)</view>
          </view>
          <view class="table-con">
            <view
              class="table-con__td"
              v-for="(item, index) in list"
              :key="index"
            >
              <view class="item">{{ item.item_name }}</view>
              <view class="item">{{ item.price }}</view>
              <view class="item">{{ item.quantity }}</view>
              <view class="item">{{ item.amount }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="nodata" v-else>
      今日暂无消费
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list: [],
      today_expend: '',
      date: moment().format('YYYY-MM-DD'),
    }
  },
  computed: {
    ...mapState(['patientInfo', 'livePatientInfo']),
  },
  onLoad() {
    this.getDetail()
  },
  onPullDownRefresh() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http
        .post(this.API.LIVE_DAILY_ORDER, {
          live_code: this.livePatientInfo.inpatient_code,
          date: this.date,
        })
        .then((res) => {
          this.list = res.data.items
          this.today_expend = res.data.today_expend
        })
        .finally((res) => {
          uni.stopPullDownRefresh()
        })
    },
    // 日期选择
    bindDateChange(e) {
      this.date = e.detail.value
      this.getDetail()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  min-height: 100vh;
  padding-top: 20rpx;
  background: #ffffff;
  &-date {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    font-size: 30rpx;
    padding: 15rpx 0;
    border-bottom: 2rpx solid #f6f6f6;
    &__arrow {
      color: #cdcdcd;
      margin-left: 10rpx;
      .iconfont {
        font-size: 25rpx;
      }
    }
  }
  &-amount {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15rpx 0;
    &__text {
      color: #666666;
      font-size: 26rpx;
    }
    &__total {
      color: #eba136;
      font-size: 30rpx;
      margin-top: 15rpx;
    }
  }
  &-con {
    margin-top: 35rpx;
    padding-bottom: 50rpx;
    &__bg {
      width: 730rpx;
      margin: 0 auto;
      .img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    .recipel {
      font-size: 24rpx;
      margin: 0 20rpx;
      padding: 0 20rpx;
      background: #ffffff;
      margin-top: -15rpx;
      border-radius: 10rpx;
      box-shadow: 0 10rpx 15rpx rgba($color: #2a2b2b, $alpha: 0.14);
      .table-th {
        display: grid;
        grid-template-columns: 230rpx repeat(3, 1fr);
        height: 84rpx;
        line-height: 84rpx;
        color: #a2a2a2;
        text-align: center;
        border-bottom: 1rpx dashed #eaeaea;
        .item {
          padding: 0 10rpx;
          @include textOverflow(1);
          &:first-child {
            text-align: left;
          }
        }
      }
      .table-con {
        display: grid;
        color: #1e1e1e;
        &__td {
          display: grid;
          align-items: center;
          grid-template-columns: 230rpx repeat(3, 1fr);
          text-align: center;
          padding: 20rpx 0;
          border-bottom: 1rpx solid #f6f6f6;
          .item {
            padding: 0 10rpx;
            line-height: 40rpx;
            @include textOverflow(2);
            &:first-child {
              text-align: left;
            }
          }
        }
      }
    }
  }
}
.nodata {
  padding: 100rpx;
  text-align: center;
  color: #999999;
}
</style>
