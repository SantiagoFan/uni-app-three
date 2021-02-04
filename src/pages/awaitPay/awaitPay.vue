<template>
  <view class="container">
    <PatientCard :need-patient="true"></PatientCard>
    <view class="showReg">
      <view
        class="pop-item"
        v-if="registerList.length > 0"
        @click="show = true"
      >
        <view class="pop-item-info">
          <view>门诊号:{{ registerList[index].register_no }}</view>
          <view class="pop-item-info-sub">
            {{ registerList[index].doctor_name }}/{{
              registerList[index].department_name
            }}
          </view>
          <!-- <view class="pop-item-info-sub">
              {{registerList[index].selectDate}} {{registerList[index].time}}
            </view> -->
        </view>
        <view class="pop-item-jt">
          <text class="iconfont icon-arrowb"></text>
        </view>
      </view>
    </view>
    <u-popup v-model="show" mode="bottom" height="600rpx">
      <view class="pop-wrap">
        <view
          class="pop-item"
          v-for="(item, index) in registerList"
          :key="index"
          @click="changeIndex(index)"
        >
          <view class="pop-item-info">
            <view>门诊号:{{ registerList[index].register_no }}</view>
            <view class="pop-item-info-sub">
              {{ item.doctor_name }}/{{ item.department_name }}
            </view>
            <!-- <view class="pop-item-info-sub">
              {{item.selectDate}} {{item.time}}
            </view> -->
          </view>
          <view class="pop-item-jt">
            <text class="iconfont icon-arrowb"></text>
          </view>
        </view>
      </view>
    </u-popup>
    <view class="wrap">
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
              <view class="item-sta__con-title">
                {{ item.category | getCategory }}
              </view>
              <view class="item-sta__con-list">
                <view
                  class="cell"
                  v-for="(obj, index1) in item.recipe"
                  :key="index1"
                >
                  <view class="name">{{ obj.yp_name }}</view>
                  <view class="price"
                    >¥{{ obj.yp_dj_price * obj.yp_number }}</view
                  >
                </view>
              </view>
            </view>
          </view>
          <view class="item-total">共计：¥{{ item.amount }}</view>
        </view>
      </view>
    </view>
    <view class="fot-box">
      <view class="fot-box__total">
        <text class="text">总额：</text>
        <text class="price">￥{{ amount }}</text>
        <text>{{ val }}</text>
      </view>
      <view class="fot-box__btn active" @click="createOrder">
        <text class="text">去缴费</text>
      </view>
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
      list: [],
      amount: 0.0,
      flag: false,
      registerList: [],
      index: 0,
    }
  },
  onLoad() {
    if (this.patientInfo) {
      // this.getExamination()
      this.getSuccessRegister()
    }
  },
  watch: {
    patientInfo(val) {
      this.getSuccessRegister()
    },
  },
  filters: {
    getCategory(category) {
      switch (category) {
        case '1':
          return '处方项目'
        case '2':
          return '检验项目'
        case '3':
          return '检查项目'
        case '4':
          return '处置费(医疗项目)'
      }
    },
  },
  computed: {
    ...mapState(['patientInfo']),
    reg_no() {
      if (this.registerList.length > 0) {
        return this.registerList[this.index].register_no
      }
      return ''
    },
  },
  components: {
    CheckPopup,
  },
  methods: {
    getSuccessRegister() {
      this.$http
        .post(this.API.REGISTER_SUCCESS, {
          patient_code: this.patientInfo.patient_code,
        })
        .then((res) => {
          this.registerList = res.data
          this.getExamination()
        })
    },
    changeIndex(index) {
      this.index = index
      this.show = false
      this.getExamination()
    },
    handleChoose(index) {
      console.log('初始', this.amount)
      this.list[index].checked = !this.list[index].checked
      if (this.list[index].checked) {
        this.amount += parseFloat(this.list[index]['amount'])
      } else {
        this.amount =
          parseFloat(this.amount) - parseFloat(this.list[index]['amount'])
      }
      console.log(this.list[index]['amount'])
    },
    handleCheck() {
      this.$refs.popup.handleChoose()
    },
    getExamination() {
      if (this.reg_no) {
        this.$http
          .post(this.API.EXAMINATION, { reg_no: this.reg_no })
          .then((res) => {
            if (res.code === 20000) {
              if (res.data.length > 0) {
                res.data.forEach((e) => {
                  e.checked = false
                })
              }
              this.list = res.data
            }
          })
          .catch(() => {
            this.list = []
          })
      }
    },
    createOrder() {
      let ids = []
      this.list.forEach((e) => {
        if (e.checked) {
          ids.push(e.innner_trade_no)
        }
      })
      if (ids.length <= 0) {
        uni.showToast({
          title: '请先选择缴费项目',
          icon: 'none',
        })
        return false
      }
      if (!this.reg_no) {
        uni.showToast({
          title: '请先选择诊疗记录',
          icon: 'none',
        })
        return false
      }
      if (this.flag) {
        return false
      }
      this.flag = true
      this.$http
        .post(this.API.EXAMINATION_ORDER, {
          reg_no: this.reg_no,
          ids: ids,
          amount: this.amount,
        })
        .then((res) => {
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
                name: 'payRecord',
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
        })
        .finally((res) => {
          this.flag = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20rpx;
  .showReg {
    // padding: 0 20rpx;
    // height: 200rpx;
    // background: #fff;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
  .pop-wrap {
    background: #f6f6f6;
    padding: 30rpx;
  }
  .pop-item {
    padding: 10rpx 20rpx;
    background: #fff;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    &-info {
      flex: 1;
      & > view {
        font-size: 30rpx;
        line-height: 54rpx;
        // display: flex;
        // justify-content: space-between;
      }
      &-sub {
        font-size: 28rpx;
        color: #898989;
      }
    }
    &-jt {
      color: #cbcbcb;
      .iconfont {
        font-size: 50rpx;
      }
    }
  }

  .wrap {
    flex: 1;
    padding: 20rpx 0 160rpx;
    // overflow-y: auto;
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
    position: fixed;
    bottom: 0;
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
