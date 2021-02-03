<template>
  <view class="wrap" id="wrap">
    <view class="wrap-status">
      <view class="wrap-status__info">
        <view class="icon">
          <!-- icon icon-dasuozi：锁号 icon-duihao：预约挂号成功 icon-jianhao：icon-jianhao -->
          <view class="iconfont icon-jianhao"></view>
        </view>
        <view class="text">缴费成功</view>
      </view>
      <view class="wrap-status__msg"
        >请凭手机缴费页面和处方单，及时到对应科室执行项目。如需打印发票，请到收费窗口咨询。</view
      >
    </view>
    <u-gap height="20" bg-color="#f3f3f3"></u-gap>
    <view class="wrap-code">
      <my-code
        :patient_code="patientInfo.patient_code"
        :ehealth_code="patientInfo.ehealth_code"
        @refresh="updateHealth"
      ></my-code>
    </view>
    <view class="wrap-info">
      <view class="wrap-info__box">
        <view class="bt">就诊信息</view>
        <view class="list">
          <view class="cell">
            <view class="cell-label">就诊人</view>
            <view class="cell-con">{{ detail.patient_name }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">就诊卡号</view>
            <view class="cell-con">{{ detail.patient_code }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">医院名称</view>
            <view class="cell-con">{{ $config('name') }}</view>
          </view>
        </view>
      </view>
      <view class="wrap-info__box">
        <view class="bt">导诊信息</view>
        <view class="list">
          <view class="cell">
            <view class="cell-label">{{ detail.guide.department }}</view>
            <view class="cell-con"
              >二楼中厅脾胃科室<br />(周一、三、五全天）</view
            >
          </view>
          <!-- <view class="cell">
            <view class="cell-label">妇科</view>
            <view class="cell-con">二楼北侧步梯旁妇科</view>
          </view>
          <view class="cell">
            <view class="cell-label">B超市心电图</view>
            <view class="cell-con">一楼北侧</view>
          </view> -->
        </view>
      </view>
      <view class="wrap-info__box">
        <view :class="['bt', { 'bt-show': payDetailShow }]" @click="handleBt">
          <view class="bt-text">处方单</view>
          <view class="bt-arrow">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
        <view class="recipel">
          <view class="table-th">
            <view class="item">项目名称</view>
            <view class="item">单价(元)</view>
            <view class="item">数量</view>
            <view class="item">金额(元)</view>
          </view>
          <view class="table-con">
            <view class="table-con__td">
              <view class="item">十二通道常规心电图检查</view>
              <view class="item">20.00</view>
              <view class="item">1</view>
              <view class="item">20.00</view>
            </view>
            <view class="table-con__td">
              <view class="item">产前常规检查</view>
              <view class="item">15.00</view>
              <view class="item">1</view>
              <view class="item">15.00</view>
            </view>
            <view class="table-con__td">
              <view class="item">彩色多普勒超声多功能检查床单加收</view>
              <view class="item">5.00</view>
              <view class="item">1</view>
              <view class="item">5.00</view>
            </view>
            <view class="table-con__td">
              <view class="item">胎儿系统性彩色多普勒超声筛查(一级)</view>
              <view class="item">180.00</view>
              <view class="item">1</view>
              <view class="item">180.00</view>
            </view>
          </view>
        </view>
      </view>
      <view class="wrap-info__box">
        <view :class="['bt', { 'bt-show': payDetailShow }]" @click="handleBt">
          <view class="bt-text">缴费详情</view>
          <view class="bt-arrow">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
        <view class="list" v-show="payDetailShow">
          <view class="cell">
            <view class="cell-label">交易金额</view>
            <view class="cell-con price">¥{{ detail.pay_fee }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">医院名称</view>
            <view class="cell-con">{{ $config('name') }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">医院单号</view>
            <view class="cell-con">{{ detail.innner_trade_no }}</view>
          </view>
          <view class="cell">
            <view class="cell-label">平台单号</view>
            <view class="cell-con">没写</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付流水号</view>
            <view class="cell-con">没写</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付状态</view>
            <view class="cell-con">没写</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付时间</view>
            <view class="cell-con">{{ detail.pay_time }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MyCode from '@/components/common/MyCode'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      codeIndex: 0,
      payDetailShow: true,
      detail: {},
    }
  },
  components: { MyCode },
  computed: {
    ...mapState(['patientInfo']),
  },
  onLoad() {
    this.detail = this.$Route.query.payDetail
  },
  methods: {
    // 点击缴费详情
    handleBt() {
      // this.payDetailShow = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
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
  &-code {
    padding: 30rpx;
    background: #ffffff;
    &__tab {
      display: flex;
      justify-content: space-evenly;
      color: #333333;
      font-size: 30rpx;
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
      // 处方单
      .recipel {
        font-size: 24rpx;
        margin-top: 30rpx;
        .table-th {
          display: grid;
          grid-template-columns: 230rpx repeat(3, 1fr);
          height: 84rpx;
          line-height: 84rpx;
          color: #a2a2a2;
          text-align: center;
          border-top: 1rpx solid #0ec698;
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
              // @include textOverflow(1);
              &:first-child {
                text-align: left;
              }
            }
          }
        }
      }
      // 缴费详情
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
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
