<template>
  <view class="wrap">
    <view class="wrap-time">
      <view class="wrap-time__text">剩余支付时间</view>
      <u-count-down
        :timestamp="timestamp"
        :show-hours="false"
        bg-color="transparent"
        color="#ffffff"
        separator-color="#ffffff"
        :separator-size="26"
        :font-size="26"
      />
    </view>
    <view class="wrap-amount">
      <view class="wrap-amount__text">支付金额(元)</view>
      <view class="wrap-amount__price">{{ model.price }}</view>
    </view>
    <view class="wrap-info">
      <view class="wrap-info__cell">
        <view class="label">费用类型</view>
        <view class="text">预约挂号</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">就诊科室</view>
        <view class="text">{{ model.department_name }}</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">医生名称</view>
        <view class="text">{{ model.doctor_name }}</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">就诊日期</view>
        <view class="text">{{ model.selectDate | dateStr }}</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">就诊时段</view>
        <view class="text">{{ model.time | getTimeStatus }}</view> </view
      ><view class="wrap-info__cell">
        <view class="label">就诊人</view>
        <view class="text">{{ model.patient_name }}</view>
      </view>
      <view class="wrap-info__cell">
        <view class="label">就诊卡号</view>
        <view class="text">{{ model.patient_code }}</view>
      </view>
    </view>
    <view class="wrap-btn">
      <view class="wrap-btn__con" @click="hanldePay">微信支付</view>
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import { weekList } from '@/utils/week.js'
export default {
  data() {
    return {
      timestamp: 600,
      model: {},
    }
  },
  onLoad() {
    this.getDetail()
  },
  filters: {
    dateStr(date) {
      return date + ' ' + weekList('星期')[moment(date).isoWeekday() - 1]
    },
    getTimeStatus(time) {
      console.log(time)
      if (time) {
        var hour = time.split('~')[1].split(':')[0]
        console.log(hour)
        return (hour > 12 ? '下午' : '上午') + ' ' + time
      }
    },
  },
  methods: {
    hanldePay() {
      console.log('点击支付')
    },
    getDetail() {
      this.$http
        .post(this.API.REGISTER_ORDER_DETAIL, {
          reg_no: this.$Route.query.reg_no,
        })
        .then((res) => {
          this.model = res.data
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  &-time {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 68rpx;
    color: #ffffff;
    font-size: 26rpx;
    background: #ff8c46;
    &__text {
      margin-right: 15rpx;
    }
  }
  &-amount {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30rpx 0;
    background: #ffffff;
    &__text {
      color: #666666;
      font-size: 26rpx;
    }
    &__price {
      color: #ff8c46;
      font-size: 65rpx;
      margin-top: 30rpx;
      font-weight: bold;
    }
  }
  &-info {
    padding: 30rpx;
    margin-top: 20rpx;
    background: #ffffff;
    &__cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999999;
      font-size: 26rpx;
      margin-bottom: 30rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &-btn {
    padding: 30rpx 45rpx;
    &__con {
      height: 72rpx;
      line-height: 72rpx;
      color: #ffffff;
      font-size: 26rpx;
      text-align: center;
      background: #0ec698;
      border-radius: 8rpx;
    }
  }
}
</style>
