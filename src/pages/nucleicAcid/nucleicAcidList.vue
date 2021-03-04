<template>
  <view class="wrap">
    <PatientCard
      :show-message="false"
      :need-patient="true"
      @change="getDetail"
    ></PatientCard>
    <!-- 创建新检测项目 -->
    <view class="wrap__action">
      <view class="btn" @click="createOrder">申请新检测</view>
    </view>
    <view class="wrap__con">
      <view class="art" v-for="i in [1,2,3]" :key="i" @click="getDetail(i)">
        <view class="title">核酸检测结果</view>
        <view class="num">阳性</view>
        <view class="gap">
          <image class="img" mode="widthFix" src="@/static/image/gap_img.jpg" />
        </view>
        <view class="info">
          <view class="cell">
            <view class="label">检测项目</view>
            <view class="text">新型冠状病毒核酸检测（鼻拭子）</view>
          </view>
          <view class="cell">
            <view class="label">检测时间</view>
            <view class="text">2021-05-04 12:12:12</view>
          </view>
           <view class="cell">
            <view class="label">检测单号</view>
            <view class="text">255666221656522156</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list:[]
    }
  },
  computed: {
    ...mapState(['patientInfo']),
  },
  onLoad() {
    this.loadList()
  },
  methods: {
    loadList(){
      this.$http
        .post(this.API.INSPECTION_QUERY_ORDER, {
          patient_code: this.patientInfo.patient_code,
        })
        .then((res) => {
          this.list = res.data
        })
    },
    getDetail(id) {
      this.$Router.push({
        name: 'nucleicAcidDetail',
        params: { id },
      })
    },
    createOrder(){
      this.$Router.push({
        name: 'nucleicAcid',
        params: {},
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  &__user {
    padding: 20rpx;
    &-box {
      position: relative;
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 30rpx;
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
  }
  &__action{
    background: #ffffff;
    padding: 20rpx;
    .btn{
      text-align: center;
      height: 88rpx;
      line-height: 88rpx;
      color: #0ec698;
      border:1px solid #0ec698;
    }
  }
  &__con {
    padding: 20rpx;
    .art {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      margin-bottom: 10rpx;
      .title {
        color: #333333;
        font-size: 36rpx;
        padding: 30rpx 0;
      }
      .num {
        color: #0ec698;
        font-size: 60rpx;
        font-weight: bold;
      }
      .massage {
        color: #898989;
        font-size: 24rpx;
        letter-spacing: 5rpx;
        margin: 30rpx 0 50rpx 0;
        .count {
          color: #0ec698;
          font-size: 30rpx;
        }
      }
      .gap {
        width: 100%;
        .img {
          width: 100%;
          height: auto;
          display: block;
        }
      }
      .info {
        width: 100%;
        padding: 40rpx 50rpx 60rpx 50rpx;
        .cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 28rpx;
          margin-bottom: 30rpx;
          &:last-child {
            margin-bottom: 0;
          }
          .label {
            color: #8f8f8f;
          }
          .text {
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
