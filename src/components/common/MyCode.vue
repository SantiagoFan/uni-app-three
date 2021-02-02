<template>
  <view class="wrap-code">
    <view class="wrap-code__tab">
      <view :class="['item', { active: codeIndex === 0 }]" @click="codeIndex = 0">电子健康卡</view>
      <view :class="['item', { active: codeIndex === 1 }]" @click="codeIndex = 1">就诊凭条</view>
    </view>
    <view class="wrap-code__con">
      <view class="wrap-code__con-code1" v-if="codeIndex === 0">
        <tki-qrcode v-if="ehealth_code" ref="qrcode" onval :val="ehealth_code" :size="400" icon="/static/image/logo.png" :loadMake="true" :show-loading="false" />
        <view class="nohealth" @click="refresh" v-if="!ehealth_code">点击刷新健康卡号</view>
      </view>
      <view class="wrap-code__con-code2" v-if="codeIndex === 1">
        <tki-barcode ref="barcode" :onval="true" :show="true" :val="patient_code" :loadMake="true" :opations="barOpations" />
        <view class="num">{{ patient_code }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import tkiBarcode from '@/components/tki-code/tki-barcode/tki-barcode'
import tkiQrcode from '@/components/tki-code/tki-qrcode/tki-qrcode'
export default {
  props: {
    patient_code: {
      type: String,
    },
    ehealth_code: {
      type: String,
    },
  },
  watch:{
    ehealth_code(val){
      console.log('ehealth',val)
    }
  },
  created() {
  },
  components: { tkiBarcode, tkiQrcode },
  data() {
    return {
      codeIndex: 0,
      barOpations: {
        height: 120,
        displayValue: false,
      },
    }
  },
  methods: {
    refresh(){
      this.$http.post(this.API.UPDATE_HEALTH_CODE,{patient_code:this.patient_code}).then(res=>{
        if(res.code===20000){
          if(res.data){
            console.log(11)
            this.$emit("refresh",res.data)
          }else{
            uni.showToast({
              title: "生成失败，请联系管理员",
              icon: "none",
            });
          }
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  &-code {
    padding: 30rpx 30rpx 50rpx 30rpx;
    background: #ffffff;
    border-radius: 10rpx;
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
      .hide {
        display: none;
      }
      padding-top: 50rpx;
      &-code1 {
        text-align: center;
        // height: 500rpx;
        // .img {
        //   width: 400rpx;
        //   height: 400rpx;
        //   margin: 0 auto;
        //   // display: block;
        // }
        .nohealth {
          min-height: 200rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      &-code2 {
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        // height: 200rpx;
        // /deep/ canvas{
        //   width: 100%;
        // }
        // .img {
        //   height: 200rpx;
        //   width: 100%;
        //   // height: auto;
        //   // display: block;
        // }
        .num {
          text-align: center;
          color: #333333;
          font-size: 28rpx;
          margin-top: 15rpx;
          letter-spacing: 1rpx;
        }
      }
    }
  }
}
</style>
