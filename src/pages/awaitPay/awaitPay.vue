<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__massage"
        >温馨提示：<br />暂时不支持医保卡看病，持有医保卡的用户请到前台直接办理手续。</view
      >
      <view class="wrap__user">
        <view class="info">
          <view class="title">
            <view class="name">姓名</view>
          </view>
          <view class="code">院内诊疗号：1000000182574</view>
        </view>
        <view class="switch" @click="handleCheck">切换就诊人</view>
      </view>
      <view class="wrap__list">
        <view
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleChoose(index)"
        >
          <view class="item-sta">
            <view :class="['item-sta__icon', { active: item.checked }]">
              <text class="iconfont icon-duihao2"></text>
            </view>
            <view class="item-sta__con">
              <view class="item-sta__con-title">检查项目名称</view>
              <view class="item-sta__con-list">
                <view class="cell">
                  <view class="name">检查项目</view>
                  <view class="price">¥0.00</view>
                </view>
                <view class="cell">
                  <view class="name">检查项目</view>
                  <view class="price">¥0.00</view>
                </view>
              </view>
            </view>
          </view>
          <view class="item-total">共计：¥0.00</view>
        </view>
      </view>
    </view>
    <view class="fot-box">
      <view class="fot-box__total">
        <text class="text">总额：</text>
        <text class="price">￥0.00</text>
        <text>{{ val }}</text>
      </view>
      <navigator url="/pages/payment/payment" class="fot-box__btn active">
        <text class="text">去缴费</text>
      </navigator>
    </view>
    <!-- 弹出层 -->
    <check-popup ref="popup" />
  </view>
</template>

<script>
import CheckPopup from '@/components/common/CheckPopup'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      show: false, //  切换弹出层
      list: [
        {
          title: '项目名称1',
          checked: false,
        },
        {
          title: '项目名称2',
          checked: false,
        },
      ],
    }
  },
  onLoad() {
    if (this.patientInfo) {
      this.getExamination()
    }
  },
  computed: {
    ...mapState(['patientInfo']),
  },
  methods: {
    handleChoose(index) {
      this.list[index].checked = !this.list[index].checked
    },
    handleCheck() {
      this.$refs.popup.handleChoose()
    },
    getExamination() {
      this.$http
        .post(this.API.EXAMINATION, {
          patient_code: this.patientInfo.patient_code,
        })
        .then((res) => {})
    },
  },
  components: {
    CheckPopup,
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .wrap {
    flex: 1;
    padding: 20rpx;
    overflow-y: auto;
    &__massage {
      color: #0ec698;
      font-size: 26rpx;
      padding: 0 10rpx;
      letter-spacing: 1rpx;
    }
    &__user {
      position: relative;
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 30rpx;
      margin: 30rpx 0 20rpx 0;
      background: #ffffff url('@/static/image/box_bg.png') no-repeat 70rpx -50rpx;
      background-size: 260rpx;
      border-radius: 10rpx;
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        .title {
          display: flex;
          align-items: center;
          border-radius: 10rpx;
          .name {
            color: #333333;
            font-size: 36rpx;
            margin-right: 15rpx;
          }
          .tag {
            height: 32rpx;
            line-height: 32rpx;
            color: #898989;
            font-size: 20rpx;
            padding: 0 10rpx;
            border: 1rpx solid #a6a9a8;
            border-radius: 8rpx;
          }
        }
        .code {
          color: #898989;
          font-size: 24rpx;
          margin-top: 20rpx;
        }
      }
      .switch {
        position: absolute;
        top: 25rpx;
        right: 20rpx;
        line-height: 42rpx;
        padding: 0 15rpx;
        color: #51d6b5;
        font-size: 20rpx;
        border: 1rpx solid #51d6b5;
        border-radius: 20rpx;
      }
    }
    &__list {
      .item {
        color: #a8a8a8;
        font-size: 26rpx;
        padding: 30rpx;
        margin-bottom: 20rpx;
        background: #ffffff;
        border-radius: 10rpx;
        &:last-child {
          margin-bottom: 0;
        }
        &-sta {
          display: flex;
          padding-bottom: 30rpx;
          &__icon {
            width: 32rpx;
            height: 32rpx;
            line-height: 32rpx;
            text-align: center;
            margin-right: 20rpx;
            border: 1rpx solid;
            border-color: #bebebe;
            border-radius: 50%;
            .iconfont {
              font-size: 25rpx;
              display: none;
            }
            &.active {
              color: #ffffff;
              border-color: #0ec698;
              background: #0ec698;
              .iconfont {
                display: block;
              }
            }
          }
          &__con {
            flex: 1;
            &-title {
              color: #333333;
              font-size: 28rpx;
              margin: 0 0 20rpx 0;
            }
            &-list {
              .cell {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20rpx;
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
        &-total {
          padding-top: 20rpx;
          text-align: right;
          border-top: 1rpx solid #eaeaea;
        }
      }
    }
  }
  .fot-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 104rpx;
    padding-left: 20rpx;
    background: #ffffff;
    &__total {
      display: flex;
      align-items: center;
      color: #a9a9a9;
      font-size: 28rpx;
      .price {
        color: #fa710a;
      }
    }
    &__btn {
      display: flex;
      width: 220rpx;
      height: 100%;
      background: #cfcfcf;
      .text {
        color: #ffffff;
        margin: auto;
        font-size: 28rpx;
      }
      &.active {
        background: #0ec698;
      }
    }
  }
}
</style>
