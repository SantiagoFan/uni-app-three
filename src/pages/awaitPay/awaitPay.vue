<template>
  <view class="container">
    <PatientCard
      :need-patient="true"
      @change="getSuccessRegister"
    ></PatientCard>
    <RegisterCard @change="getExamination"></RegisterCard>
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
        <text class="price">￥{{ totalAmount }}</text>
      </view>
      <view class="fot-box__btn active" @click="createOrder">
        <text class="text">去缴费</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import RegisterCard from "@/components/register_card/index.vue"

export default {
  components:{
    RegisterCard
  },
  data() {
    return {
      list: [],
      flag: false,
      reg_no:''
    }
  },
  onLoad() {
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
    totalAmount() {
      return this.list.reduce((p, res) => {
        return (
          parseFloat(p) + parseFloat(res.checked ? res.amount : 0)
        ).toFixed(2)
      }, 0)
    },
  },
  methods: {
    handleChoose(index) {
      this.list[index].checked = !this.list[index].checked
    },
    handleCheck() {
      this.$refs.popup.handleChoose()
    },
    getExamination(reg_no) {
      this.reg_no = reg_no
      this.list = []
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
    async createOrder() {
      var that = this
      let ids = []
      that.list.forEach((e) => {
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
      if (!that.reg_no) {
        uni.showToast({
          title: '请先选择诊疗记录',
          icon: 'none',
        })
        return false
      }
      let res = await uni.getProvider({service:'payment'})
      let provider = res[1].provider[0];
      if (that.flag) {
        return false
      }
      that.flag = true
      that.$http
        .post(that.API.EXAMINATION_ORDER, {
          reg_no: that.reg_no,
          ids: ids,
          amount: that.totalAmount,
        })
        .then((res) => {
          const config = JSON.parse(res.data)
          uni.requestPayment({
            provider: provider,
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
                params: {
                  patient_code: that.patientInfo['patient_code'],
                },
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
          that.flag = false
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
