<template>
  <view class="wrap" id="wrap">
    <view :class="['wrap-status', { 'wrap-status__bg': type == 3 }]">
      <view class="wrap-status__info">
        <view class="icon">
          <!-- icon icon-dasuozi：锁号 icon-duihao：预约挂号成功 icon-jianhao：icon-jianhao -->
          <view v-if="type == 1" class="iconfont icon-duihao"></view>
          <view v-if="type == 3" class="iconfont icon-jianhao"></view>
          <view v-if="type == 2" class="iconfont icon-dasuozi"></view>
        </view>
        <view class="title">预约挂号成功</view>
        <view v-if="type == 3" class="tag">有退款</view>
        <!-- 锁号成功显示 -->
        <view class="time" v-if="type == 2">
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
      <view class="wrap-status__msg"
        >请在锁号的时间内完成支付，负责将取消号源。</view
      >
    </view>
    <u-gap height="20" bg-color="#f3f3f3"></u-gap>
    <view class="wrap-code">
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
        <view class="wrap-code__con-code1" v-if="codeIndex === 0">
          <image class="img" mode="aspectFill" src="@/static/image/code1.jpg" />
        </view>
        <view class="wrap-code__con-code2" v-else>
          <image class="img" mode="widthFix" src="@/static/image/code.jpg" />
          <view class="num">100005149844</view>
        </view>
      </view>
    </view>
    <view class="refund-line" v-if="type == 3">
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
            <view class="cell-con">姓名</view>
          </view>
          <view class="cell">
            <view class="cell-label">就诊卡号</view>
            <view class="cell-con">10000000002435464</view>
          </view>
          <view class="cell">
            <view class="cell-label">科室位置</view>
            <view class="cell-con">二楼中厅</view>
          </view>
          <view class="cell">
            <view class="cell-label">就诊时段</view>
            <view class="cell-con"
              >2020-07-27 星期一 下午 15:00:00<br />（请提前30分钟在候诊区等候就诊）</view
            >
          </view>
          <view class="cell">
            <view class="cell-label">医院名称</view>
            <view class="cell-con">呼和浩特市蒙医中医医院</view>
          </view>
          <view class="cell">
            <view class="cell-label">就诊科室</view>
            <view class="cell-con">脾胃科室</view>
          </view>
          <view class="cell">
            <view class="cell-label">医生姓名</view>
            <view class="cell-con">温启宗</view>
          </view>
          <view class="cell">
            <view class="cell-label">医生职称</view>
            <view class="cell-con">主任医师</view>
          </view>
        </view>
      </view>
      <view class="wrap-info__box" v-if="type == 1 || type == 3">
        <view :class="['bt', { 'bt-show': payDetailShow }]" @click="handleBt">
          <view class="bt-text">缴费详情</view>
          <view class="bt-arrow">
            <text class="iconfont icon-right"></text>
          </view>
        </view>
        <view class="list" v-show="payDetailShow">
          <view class="cell">
            <view class="cell-label">交易金额</view>
            <view class="cell-con price">¥244.44</view>
          </view>
          <view class="cell">
            <view class="cell-label">医院名称</view>
            <view class="cell-con">呼和浩特市蒙医中医医院</view>
          </view>
          <view class="cell">
            <view class="cell-label">医院单号</view>
            <view class="cell-con">B4582644,B5464954,B2544645,B4242142</view>
          </view>
          <view class="cell">
            <view class="cell-label">平台单号</view>
            <view class="cell-con">544465465465161211</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付流水号</view>
            <view class="cell-con">444242042011565465441215456441</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付状态</view>
            <view class="cell-con">已支付</view>
          </view>
          <view class="cell">
            <view class="cell-label">支付时间</view>
            <view class="cell-con">2020-07-04 14:44:14</view>
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
      type: 0,
      timestamp: 86400, // 锁号时间
      model: {},
      reg_no: '',
    }
  },
  onLoad() {
    // 1：锁号 2：成功 3：取消
    this.type = this.$Route.query.type
    this.getDetail()
  },
  watch: {
    type() {
      if (this.type == 3) {
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
  }
}
</style>
