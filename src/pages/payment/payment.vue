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
        :font-size="28"
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
      <view
        :class="['wrap-btn__con', { active: timestamp == 0 }]"
        @click="timestamp > 0 && hanldePay()"
        >微信支付</view
      >
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import { weekList } from '@/utils/week.js'
export default {
  data() {
    return {
      timestamp: 0,
      model: {},
      flag: false,
      lock_minutes: 0,
    }
  },
  onLoad() {
    this.getLockMinute()
  },
  filters: {
    dateStr(date) {
      if(date){
        return date + ' ' + weekList('星期')[moment(date).isoWeekday() - 1]
      }
      return "";
    },
    getTimeStatus(time) {
      if (time) {
        var hour = time.split('~')[1].split(':')[0]
        return (hour > 12 ? '下午' : '上午') + ' ' + time
      }
    },
  },
  methods: {
    hanldePay() {
      let that = this
      if (that.flag) {
        return false
      }
      that.flag = true
      this.$http
        .post(this.API.REGISTER_PAY, {
          order_no: this.model.order_no,
        })
        .then((res) => {
          if (res.code == 20000) {
            if (res.need_pay) {
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
                    name: 'registerRecordDetail',
                    params: { reg_no: res.reg_no },
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
            } else {
              that.$Router.replace({
                name: 'registerRecordDetail',
                params: { reg_no: res.reg_no },
              })
            }
          }
        })
        .finally((res) => {
          that.flag = false
        })
    },
    //锁号分钟
    getLockMinute() {
      this.$http.post(this.API.LOCK_MINUTES).then((res) => {
        this.lock_minutes = res.data
        this.getDetail()
      })
    },
    getDetail() {
      this.$http
        .post(this.API.ORDER_DETAIL, {
          reg_no: this.$Route.query.reg_no,
        })
        .then((res) => {
          this.model = res.data
          let create_time = moment(this.model.create_time)
          let minutes = moment().diff(moment(create_time), 'minute') //当前时间距离创建时间多长时间
          console.log(minutes)
          if (minutes < this.lock_minutes) {
            this.timestamp = (this.lock_minutes - minutes) * 60
          }
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
      font-size: 30rpx;
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
      font-size: 30rpx;
      margin-bottom: 30rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &-btn {
    padding: 30rpx 45rpx;
    &__con {
      height: 90rpx;
      line-height: 90rpx;
      color: #ffffff;
      font-size: 34rpx;
      text-align: center;
      background: #0ec698;
      border-radius: 8rpx;
      &.active {
        background: #cccccc;
      }
    }
  }
}
</style>
