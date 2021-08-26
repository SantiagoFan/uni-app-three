<template>
  <view class="wrap">
    <view class="wrap-info">
      <view class="wrap-info__user">
        <view class="wrap-info__user-name">{{ model.name }}</view>
        <view class="wrap-info__user-code"
          >住院号：{{ model.inpatient_code }}</view
        >
      </view>
      <view class="wrap-info__sec">
        <view class="art">
          <view class="art-bt">住院人信息</view>
          <view class="art-list">
            <view class="cell">
              <view class="label">住院科室</view>
              <view class="text">{{ model.department_name }}</view>
            </view>
          </view>
        </view>
        <view class="art">
          <view class="art-bt">住院人信息</view>
          <view class="art-list">
            <view class="cell">
              <view class="label">押金总金额</view>
              <view class="text">{{ model.deposit_total }}</view>
            </view>
            <view class="cell">
              <view class="label">住院总消费</view>
              <view class="text">{{ model.inpatient_total }}</view>
            </view>
            <view class="cell">
              <view class="label">剩余押金</view>
              <view class="text">{{ model.remain_total }}</view>
            </view>
          </view>
        </view>
      </view>
      <view @click="goDetail" class="wrap-info__bill">
        <view class="wrap-info__bill-text">住院费用日清单</view>
        <view class="wrap-info__bill-arrow">
          <text class="iconfont icon-arrowb"></text>
        </view>
      </view>
    </view>
    <view class="wrap-btn" @click="deleteLivePatient">删除住院人</view>
    <u-modal
      v-model="showModal"
      @confirm="confirm"
      title="提示"
      content="确认删除"
      :show-cancel-button="true"
    ></u-modal>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showModal: false,
      patient_code:'',
      model: {
        inpatient_code:''
      },
    }
  },
  computed: {
    ...mapState(['livePatientInfo']),
  },
  onLoad() {
    this.patient_code = this.$Route.query.patient_code
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http
        .post(this.API.LIVE_PATIENT_DETAIL, {
          patient_code: this.patient_code,
        })
        .then((res) => {
          this.model = res.data
        })
    },
    goDetail() {
      this.$Router.push({
        name: 'myResidentBill',
        params: { patient_code: this.model.patient_code },
      })
    },
    deleteLivePatient() {
      this.showModal = true
    },
    confirm(){
      this.$http
        .post(this.API.LIVE_PATIENT_DELETE, {
          patient_code: this.patient_code,
        })
        .then((res) => {
          uni.showToast({
            title: res.message,
            duration: 2000,
            icon: 'none',
          })
          if (res.code == 20000) {
            setTimeout(() => {
              this.$Router.replace({name:'myResidents'})
            }, 1000)
          }
        })
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 30rpx 20rpx;
  &-info {
    padding: 0 30rpx;
    background: #ffffff;
    border-radius: 10rpx;
    box-shadow: 0 0 15rpx rgba($color: #2a2b2b, $alpha: 0.15);
    &__user {
      padding: 30rpx 0;
      border-bottom: 2rpx dashed #eaeaea;
      &-name {
        color: #333333;
        font-size: 36rpx;
      }
      &-code {
        color: #999999;
        font-size: 28rpx;
        margin-top: 20rpx;
      }
    }
    &__sec {
      .art {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #f4f4f4;
        &-bt {
          color: #0ec698;
          font-size: 30rpx;
        }
        &-list {
          margin-top: 32rpx;
          .cell {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 28rpx;
            margin-bottom: 30rpx;
            &:last-child {
              margin-bottom: 0;
            }
            .label {
              color: #999999;
            }
            .text {
              color: #333333;
            }
          }
        }
      }
    }
    &__bill {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100rpx;
      &-text {
        color: #333333;
        font-size: 28rpx;
      }
      &-arrow {
        color: #666666;
        .iconfont {
          font-size: 35rpx;
        }
      }
    }
  }
  &-btn {
    width: 660rpx;
    height: 86rpx;
    line-height: 86rpx;
    text-align: center;
    color: #333333;
    font-size: 32rpx;
    margin: 60rpx auto 0 auto;
    border-radius: 8rpx;
    border: 1rpx solid #bfbfbf;
  }
}
</style>
