<template>
  <view class="wrap u-skeleton " id="wrap">
    <view :class="['wrap-status', { 'wrap-status__bg': data.status == 3 }]">
      <view class="wrap-status__info">
        <view class="icon">
          <!-- icon icon-dasuozi：锁号 icon-duihao：预约挂号成功 icon-jianhao：icon-jianhao -->
          <view
            v-if="data.status == 1 || data.status == 4"
            class="iconfont icon-duihao"
          ></view>
          <view v-if="data.status == 3" class="iconfont icon-jianhao"></view>
          <view v-if="data.status == 2" class="iconfont icon-dasuozi"></view>
        </view>
        <view class="title" v-if="data.status == 2">锁号成功</view>
        <view class="title" v-if="data.status == 1">预约挂号成功</view>
        <view class="title" v-if="data.status == 3">预约挂号取消成功</view>
        <view class="title" v-if="data.status == 4">已就诊</view>
        <view v-if="data.status == 3 && info.pay_state == 4" class="tag"
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
      <view class="wrap-status__msg">
        <text v-if="data.status == 1"
          >预约挂号可提前一天在"挂号记录"中取消，挂号成功后不用取号，凭小程序推送的"挂号单"可直接就诊</text
        >
        <text v-if="data.status == 2"
          >请在锁号的时间内完成支付，否则将取消号源。</text
        >
        <text v-if="data.status == 3">预约挂号已取消，如需就诊请重新挂号</text>
      </view>
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
          >电子健康码</view
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
            >点击刷新健康码</view
          >
        </view>
        <view class="wrap-code__con-code2" :class="{ hide: codeIndex === 0 }">
          <canvas class="img" canvas-id="barcode"></canvas>
          <view class="num">{{ info.patient_code }}</view>
        </view>
      </view>
    </view> -->
    <view class="refund-line" v-if="data.status == 3 && info.pay_state == 4">
      <view class="refund-line__text">退款进度</view>
      <view class="refund-line__list">
        <view class="item active">
          <view class="item-dot"></view>
          <view class="item-text">发起退款</view>
        </view>
        <view
          :class="[
            'item',
            {
              active:
                (info.refund_state == 2 || info.refund_state == 3) &&
                info.pay_state == 4,
            },
          ]"
        >
          <view class="item-dot"></view>
          <view class="item-text">已退款（预计1到7个工作日）</view>
        </view>
        <view
          :class="[
            'item',
            { active: info.refund_state == 3 && info.pay_state == 4 },
          ]"
        >
          <view class="item-dot"></view>
          <view class="item-text">已到账</view>
        </view>
      </view>
    </view>
    <view class="wrap-info">
      <view class="wrap-info__box">
        <view class="bt">就诊信息</view>
        <view class="list">
          <view class="cell u-skeleton-rect">
            <view class="cell-label">就诊人</view>
            <view class="cell-con ">{{ data.patient_name }}</view>
          </view>
          <view class="cell u-skeleton-rect">
            <view class="cell-label">就诊码号</view>
            <view class="cell-con">{{ data.patient_code }}</view>
          </view>
          <view class="cell u-skeleton-rect">
            <view class="cell-label">科室位置</view>
            <view class="cell-con">{{ departmentInfo.position }}</view>
          </view>
          <view class="cell u-skeleton-rect">
            <view class="cell-label">就诊时段</view>
            <view class="cell-con" v-if="info.selectDate"
              >{{ info.selectDate | getWeek }} {{ info.time
              }}<br />（请提前30分钟在候诊区等候就诊）</view
            >
          </view>
          <view class="cell u-skeleton-rect">
            <view class="cell-label">医院名称</view>
            <view class="cell-con">{{ $config('name') }}</view>
          </view>
          <view class="cell u-skeleton-rect">
            <view class="cell-label">就诊科室</view>
            <view class="cell-con">{{ data.department_name }}</view>
          </view>
          <view class="cell u-skeleton-rect">
            <view class="cell-label">医生姓名</view>
            <view class="cell-con">{{ data.doctor_name }}</view>
          </view>
          <view class="cell u-skeleton-rect">
            <view class="cell-label">医生职称</view>
            <view class="cell-con">{{
              info.doctor_professional == null ? '' : info.doctor_professional
            }}</view>
          </view>
          <view class="cell u-skeleton-rect">
            <view class="cell-label">医院单号</view>
            <view class="cell-con">{{ data.reg_no }}</view>
          </view>
        </view>
      </view>
      <view
        class="wrap-info__box"
        v-if="info &&(data.status == 1 || data.status == 3 || data.status == 4)"
      >
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
            <view class="cell-con">{{ $config('name') }}</view>
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
          <template v-if="info.pay_state == 2 || info.pay_state == 4">
            <view class="cell">
              <view class="cell-label">支付状态</view>
              <view class="cell-con">已支付</view>
            </view>
            <view class="cell">
              <view class="cell-label">支付时间</view>
              <view class="cell-con">{{ info.pay_time }}</view>
            </view>
          </template>
          <template v-if="info.pay_state == 3 || info.pay_state == 4">
            <view class="cell">
              <view class="cell-label">取消时间</view>
              <view class="cell-con">{{ info.cancel_time }}</view>
            </view>
            <view class="cell">
              <view class="cell-label">取消原因</view>
              <view class="cell-con">{{ info.cancel_reason }}</view>
            </view>
          </template>
        </view>
      </view>
      <view
        class="wrap-info-btn"
        v-if="isCancel && data.status == 1"
        @click="showModal = true"
        >取消挂号</view
      >
      <view
        class="wrap-info-btn refund"
        v-if="info.refund_status == 2"
        @click="confirm()"
        >申请退款</view
      >
      <view
        class="wrap-info-btn active"
        v-if="data.status == 2 && timestamp > 0"
        @click="timestamp > 0 && hanldePay()"
        >继续支付</view
      >
    </view>
    <u-modal
      v-model="showModal"
      @confirm="confirm"
      title="提示"
      content="确认取消"
      :show-cancel-button="true"
    ></u-modal>
    <u-skeleton
      :loading="loading"
      :animation="true"
      bg-color="#fff"
    ></u-skeleton>
    <u-modal
      v-model="showCancelModal"
      @confirm="cancelConfirm"
      title="提示"
      content="取消成功"
    ></u-modal>
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
      departmentInfo: {},
      isCancel: false,
      showModal: false,
      loading: true,
      showCancelModal: false,
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
    // this.getHospitalName()
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
  filters: {
    getWeek(selectDate) {
      console.log(selectDate)
      if (selectDate) {
        return (
          selectDate +
          ' ' +
          weekList('星期')[moment(selectDate).isoWeekday() - 1]
        )
      }
      return ''
    },
  },
  methods: {
    // 点击缴费详情
    handleBt() {
      this.payDetailShow = !this.payDetailShow
    },
    //锁号分钟
    getLockMinute() {
      this.$http.post(this.API.REGISTER_SETTINGS, {}, false).then((res) => {
        this.lock_minutes = res.data.lock_minutes
        this.getOrderDetail()
      })
    },
    //本地挂号详情
    getOrderDetail() {
      this.$http
        .post(
          this.API.ORDER_DETAIL,
          {
            reg_no: this.$Route.query.reg_no,
          },
          false
        )
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
          if (this.info.pay_state == 2 && date.isValid()) {
            // if (moment().isBefore(date.subtract(1, 'hours'))) {
            if (moment().isBefore(date.endOf('day'))) {
              this.isCancel = true
            } else {
              this.isCancel = false
            }
          }
          // 科室信息
          this.getDepartmentDetail(this.info.department_id)
          //支付状态
          // let statusName = ''
          // switch (this.info.pay_state) {
          //   case 1:
          //     statusName = '未支付'
          //     break
          //   case 2:
          //     statusName = '已支付'
          //     break
          //   case 3:
          //     statusName = '已取消'
          //     break
          //   case 4:
          //     statusName = '已退款'
          //     break
          // }
          // this.info.pay_state = statusName

          // let nowDate = moment().format('YYYY-MM-DD')
        })
    },

    //his挂号详情
    getHisDetail() {
      this.$http
        .post(this.API.REGISTER_ORDER_DETAIL, {
          reg_no: this.$Route.query.reg_no,
        })
        .then((res) => {
          this.data = res.data //his详情
          this.loading = false
        })
    },
    //医院名称
    // getHospitalName() {
    //   this.$http.post(this.API.HOSPITAL_NAME, {}, false).then((res) => {
    //     this.hospital_name = res.data
    //   })
    // },
    //科室位置
    getDepartmentDetail(id) {
      this.$http
        .post(
          this.API.DEPARTMENT_INFO_DETAIL,
          { id },
          false
        )
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
    confirm() {
      if (this.data.status == 4) {
        uni.showToast({
          title: '该号源已就诊,无法取消',
          duration: 2000,
          icon: 'none',
        })
        return false
      }
      this.$http
        .post(this.API.CANCEL_REGISTER, { order_no: this.info.order_no })
        .then((res) => {
          if (res.code == 20000) {
            this.showCancelModal = true
          }
        })
    },
    cancelConfirm() {
      this.getOrderDetail()
      this.getHisDetail()
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
        font-size: 38rpx;
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
      font-size: 30rpx;
      margin-top: 30rpx;
      text {
        line-height: 50rpx;
      }
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
        font-size: 32rpx;
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
          font-size: 30rpx;
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
      margin-bottom: 10rpx;
      &.active {
        background: #3fcdb5;
        color: #fff;
      }
      &.refund {
        background: #989898;
        color: #fff;
      }
    }
  }
}
</style>
