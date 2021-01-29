<template>
  <view class="wrap" id="wrap">
    <view :class="['wrap-status', { 'wrap-status__bg': data.status == 3 }]">
      <view class="wrap-status__info">
        <view class="icon">
          <!-- icon icon-dasuozi：锁号 icon-duihao：预约挂号成功 icon-jianhao：icon-jianhao -->
          <view v-if="data.status == 1" class="iconfont icon-duihao"></view>
          <view v-if="data.status == 3" class="iconfont icon-jianhao"></view>
          <view v-if="data.status == 2" class="iconfont icon-dasuozi"></view>
        </view>
        <view class="title" v-if="data.status == 2">锁号成功</view>
        <view class="title" v-else-if="data.status == 1">预约挂号成功</view>
        <view class="title" v-else>预约挂号取消成功</view>
        <view v-if="data.status == 3 && info.status == 4" class="tag"
          >有退款</view
        >
        <!-- 锁号成功显示 -->
        <view class="time" v-if="data.status == 2 && timestamp > 0">
          <u-count-down
            :timestamp="timestamp"
            :show-days="false"
            :show-hours="false"
            bg-color="transparent"
            color="#ffffff"
            separator-color="#ffffff"
            :font-size="40"
          />
        </view>
      </view>
      <view class="wrap-status__msg" v-if="data.status == 2"
        >请在锁号的时间内完成支付，负责将取消号源。</view
      >
    </view>
    <u-gap height="20" bg-color="#f3f3f3"></u-gap>
    <view class="my-code">
      <my-code
        :patient_code="patientInfo.patient_code"
        :ehealth_code="patientInfo.ehealth_code"
        @refresh="updateHealth"
      ></my-code>
    </view>
    <!-- <view class="wrap-code">
      <view class="wrap-code__tab">
        <view
          :class="['item', { active: codeIndex === 0 }]"
          @click="codeIndex = 0"
          >电子健康卡</view
        >
        <view
          :class="['item', { active: codeIndex === 1 }]"
          @click="codeIndex = 1"
          >院内诊疗号</view
        >
      </view>
      <view class="wrap-code__con">
        <view class="wrap-code__con-code1" :class="{ hide: codeIndex === 1 }">
          <canvas
            v-if="model.health_code && finished"
            class="img"
            canvas-id="qrcode"
          ></canvas>
          <view class="wrap-code__con-code1_refresh" @click="refresh()"
            >点击刷新健康卡</view
          >
        </view>
        <view class="wrap-code__con-code2" :class="{ hide: codeIndex === 0 }">
          <canvas class="img" canvas-id="barcode"></canvas>
          <view class="num">{{ info.patient_code }}</view>
        </view>
      </view>
    </view> -->
    <view class="refund-line" v-if="data.status == 3 && info.status == 4">
      <view class="refund-line__text">退款进度</view>
      <view class="refund-line__list">
        <view class="item active">
          <view class="item-dot"></view>
          <view class="item-text">发起退款</view>
        </view>
        <view class="item active">
          <view class="item-dot"></view>
          <view class="item-text">已退款（预计1到7个工作日）</view>
        </view>
        <view class="item">
          <view class="item-dot"></view>
          <view class="item-text">已到账</view>
        </view>
      </view>
    </view>
    <view class="wrap-info">
      <view class="wrap-info__box">
        <view class="bt">就诊信息</view>
        <view class="list">
          <view class="cell">
            <view class="cell-label">就诊人</view>
            <view class="cell-con">{{ data.patient_name }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">就诊卡号</view>
            <view class="cell-con">{{ data.patient_code }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">科室位置</view>
            <view class="cell-con">{{ departmentInfo.position }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">就诊时段</view>
            <view class="cell-con"
              >{{ getWeek(info.selectDate) }} {{ info.time
              }}<br />（请提前30分钟在候诊区等候就诊）</view
            >
          </view>
          <view class="cell">
            <view class="cell-label">医院名称</view>
            <view class="cell-con">{{ hospital_name }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">就诊科室</view>
            <view class="cell-con">{{ data.department_name }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">医生姓名</view>
            <view class="cell-con">{{ data.doctor_name }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">医生职称</view>
            <view class="cell-con">{{
              info.doctor_professional == null ? '' : info.doctor_professional
            }}</view>
          </view>
        </view>
      </view>
      <view class="wrap-info__box" v-if="data.status == 1 || data.status == 3">
        <view :class="['bt', { 'bt-show': payDetailShow }]" @click="handleBt">
          <view class="bt-text">缴费详情</view>
          <view class="bt-arrow">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
        <view class="list" v-show="payDetailShow">
          <view class="cell">
            <view class="cell-label">交易金额</view>
            <view class="cell-con price">{{
              info.price == 0.0 ? '免费' : '¥' + info.price
            }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">医院名称</view>
            <view class="cell-con">{{ hospital_name }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">医院单号</view>
            <view class="cell-con">{{ data.reg_no }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">平台单号</view>
            <view class="cell-con">{{ info.order_no }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付流水号</view>
            <view class="cell-con">{{ info.transaction_no }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付状态</view>
            <view class="cell-con">{{ info.status }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付时间</view>
            <view class="cell-con">{{ info.pay_time }}</view>
          </view>
        </view>
      </view>
      <view class="wrap-info-btn" v-if="isCancel">取消挂号</view>
      <view
        class="wrap-info-btn active"
        v-if="data.status == 2 && timestamp > 0"
        @click="timestamp > 0 && hanldePay()"
        >继续支付</view
      >
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import { weekList } from '@/utils/week.js'
import { mapState } from 'vuex'
import MyCode from '@/components/common/MyCode'

export default {
  data() {
    return {
      codeIndex: 0,
      payDetailShow: true,
      timestamp: 0, // 锁号时间
      data: {},
      reg_no: '',
      info: {},
      lock_minutes: 0,
      hospital_name: '',
      departmentInfo: {},
      isCancel: false,
    }
  },
  components: { MyCode },
  computed: {
    ...mapState(['patientInfo']),
  },
  onLoad() {
    console.log(this.patientInfo)
    //(1成功2锁号3取消)
    this.getHisDetail()
    this.getLockMinute()
    this.getHospitalName()
    this.getDepartmentDetail()
  },
  watch: {
    data() {
      if (this.data.status == 3) {
        uni.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#979797',
        })
      }
    },
  },
  methods: {
    // 点击缴费详情
    handleBt() {
      this.payDetailShow = !this.payDetailShow
    },
    //锁号分钟
    getLockMinute() {
      this.$http.post(this.API.LOCK_MINUTES).then((res) => {
        this.lock_minutes = res.data
        this.getOrderDetail()
      })
    },
    //本地挂号详情
    getOrderDetail() {
      this.$http
        .post(this.API.ORDER_DETAIL, {
          reg_no: this.$Route.query.reg_no,
        })
        .then((res) => {
          this.info = res.data
          let create_time = moment(this.info.create_time)
          let minutes = moment().diff(moment(create_time), 'seconds') //当前时间距离创建时间多长时间
          let lock_minutes = this.lock_minutes * 60
          if (minutes < lock_minutes) {
            this.timestamp = lock_minutes - minutes
          }
          //处理就诊时段
          let startTime = this.info.time.split('~')
          this.info.time =
            startTime[0].split(':')[0] >= 12
              ? '下午 ' + startTime[0]
              : '上午 ' + startTime[0]
          //就诊日期
          let selectDate = this.info.selectDate

          let date = moment(selectDate + 'T' + startTime[0])
          if (this.info.status == 2 && date.isValid()) {
            if (moment().isBefore(date.subtract(1, 'hours'))) {
              this.isCancel = true
            } else {
              this.isCancel = false
            }
          }
          //支付状态
          let statusName = ''
          switch (this.info.status) {
            case 1:
              statusName = '未支付'
              break
            case 2:
              statusName = '已支付'
              break
            case 3:
              statusName = '已退款'
              break
          }
          this.info.status = statusName
          // let nowDate = moment().format('YYYY-MM-DD')
        })
    },
    getWeek(selectDate) {
      return (
        selectDate + ' ' + weekList('星期')[moment(selectDate).isoWeekday() - 1]
      )
    },
    //his挂号详情
    getHisDetail() {
      this.$http
        .post(this.API.REGISTER_ORDER_DETAIL, {
          reg_no: this.$Route.query.reg_no,
        })
        .then((res) => {
          this.data = res.data //his详情
        })
    },
    //医院名称
    getHospitalName() {
      this.$http.post(this.API.HOSPITAL_NAME).then((res) => {
        this.hospital_name = res.data
      })
    },
    //科室位置
    getDepartmentDetail() {
      this.$http
        .post(this.API.DEPARTMENT_INFO_DETAIL, { id: this.$Route.query.id })
        .then((res) => {
          if (res.code == 20000) {
            this.departmentInfo = res.data
          }
        })
    },
    updateHealth(val) {
      let obj = JSON.parse(JSON.stringify(this.patientInfo))
      obj.ehealth_code = val
      this.$store.commit('setPatientInfo', obj)
    },
    hanldePay() {
      this.$Router.push({
        name: 'payment',
        params: { reg_no: this.info.register_no },
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
      .title {
        font-size: 34rpx;
      }
      .tag {
        line-height: 40rpx;
        font-size: 26rpx;
        padding: 0 10rpx;
        margin-left: 20rpx;
        border: 1rpx solid #ffffff;
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
    &__bg {
      background: #979797;
      .icon {
        color: #979797;
      }
    }
  }
  .my-code {
    padding: 0 20rpx;
  }
  &-code {
    padding: 30rpx;
    background: #ffffff;
    &__tab {
      display: flex;
      justify-content: space-evenly;
      color: #333333;
      font-size: 26rpx;
      .item {
        &.active {
          color: #0ec698;
          &:after {
            content: '';
            display: block;
            width: 70%;
            height: 2rpx;
            margin: 15rpx auto 0 auto;
            background: #0ec698;
          }
        }
      }
    }
    &__con {
      .hide {
        display: none;
      }
      padding-top: 50rpx;
      &-code1 {
        .img {
          width: 310rpx;
          height: 310rpx;
          margin: 0 auto;
          display: block;
        }
      }
      &-code2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        .num {
          color: #333333;
          font-size: 24rpx;
          margin-top: 15rpx;
          letter-spacing: 1rpx;
        }
      }
    }
  }
  .refund-line {
    color: #333333;
    font-size: 28rpx;
    padding: 30rpx 70rpx;
    background: #ffffff;
    &__list {
      margin-top: 30rpx;
      .item {
        position: relative;
        padding: 0 0 50rpx 75rpx;
        &:last-child {
          padding-bottom: 0;
          &:before {
            display: none;
          }
        }
        &::before {
          content: '';
          position: absolute;
          top: 15rpx;
          left: 0;
          width: 1rpx;
          height: 100%;
          background: #e4e4e4;
        }
        &-dot {
          position: absolute;
          left: -10rpx;
          top: 15rpx;
          width: 20rpx;
          height: 20rpx;
          background: #e4e4e4;
          border-radius: 50%;
        }
        &-text {
          color: #333333;
          font-size: 28rpx;
          line-height: 50rpx;
        }
        &.active {
          &::before {
            background: #0ec698;
          }
          .item-dot {
            background: #0ec698;
          }
        }
      }
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
          &:last-child {
            margin-bottom: 0;
          }
          &-label {
            color: #999999;
          }
          &-con {
            color: #3f3f3f;
            &.price {
              color: #333333;
            }
          }
        }
      }
    }
    &-btn {
      width: 90%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      color: #333333;
      font-size: 32rpx;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 10rpx;
      &.active {
        background: #3fcdb5;
        color: #fff;
      }
    }
  }
}
</style>
