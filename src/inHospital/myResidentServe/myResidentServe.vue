<template>
  <view class="wrap">
    <LivePatientCard></LivePatientCard>
    <view class="wrap-serve">
      <view class="wrap-serve__bt">住院服务</view>
      <view class="wrap-serve__con">
        <view @click="addResident" class="wrap-serve__con-item">
          <view class="icon">
            <image
              class="img"
              mode="widthFix"
              src="@/static/image/serve_icon1.jpg"
            />
          </view>
          <view class="text">添加住院人</view>
        </view>
        <view
          @click="goDetail"
          class="wrap-serve__con-item"
          v-if="livePatientInfo"
        >
          <view class="icon">
            <image
              class="img"
              mode="widthFix"
              src="@/static/image/serve_icon2.jpg"
            />
          </view>
          <view class="text">住院日清单</view>
        </view>
        <view class="wrap-serve__con-item" @click="goPay()">
          <view class="icon">
            <image
              class="img"
              mode="widthFix"
              src="@/static/image/serve_icon3.jpg"
            />
          </view>
          <view class="text">住院缴费</view>
        </view>
        <view class="wrap-serve__con-item" @click="goRecord()">
          <view class="icon">
            <image
              class="img"
              mode="widthFix"
              src="@/static/image/serve_icon3.jpg"
            />
          </view>
          <view class="text">押金补缴记录</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { mapState } from 'vuex'
import LivePatientCard from "@/components/live_patient_card/index.vue"

export default {
  data() {
    return {}
  },
  components:{
    LivePatientCard
  },
  computed: {
    ...mapState(['patientInfo', 'livePatientInfo']),
  },
  onLoad() {},
  methods: {
    addResident() {
      this.$Router.push({ name: 'myResidenAdd' })
    },
    goDetail() {
      this.$Router.push({
        name: 'myResidentBill',
      })
    },
    goRecord() {
      this.$Router.push({ name: 'livePatientRecord' })
    },
    goPay(){
       this.$Router.push({ name: 'depositPay' })
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20rpx;
  &-serve {
    padding: 30rpx;
    margin-top: 20rpx;
    background: #ffffff;
    border-radius: 10rpx;
    &__bt {
      color: #333333;
      font-size: 28rpx;
      margin-bottom: 20rpx;
    }
    &__con {
      display: flex;
      margin-left: -40rpx;
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 40rpx;
        .icon {
          width: 60rpx;
          height: 60rpx;
          background: #f2f2f2;
          .img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .text {
          font-size: 26rpx;
          margin-top: 10rpx;
        }
      }
    }
  }
}
</style>
