<template>
  <view class="wrap">
    <view class="wrap-user">
      <view class="no-residen" v-if="!info" @click="addResident">
        <view class="no-residen__text">初次使用，请添加住院人</view>
      </view>
      <view class="wrap-user__list" v-else>
        <view class="cell">
          <view class="info">
            <view class="title">
              <view class="name">{{ info.name }}</view>
              <view class="tag">默认</view>
            </view>
            <view class="code">住院号：{{ info.live_code }}</view>
          </view>
          <view class="arrow">
            <text class="iconfont icon-arrowb"></text>
          </view>
        </view>
      </view>
    </view>
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
        <view @click="goDetail" class="wrap-serve__con-item" v-if="info">
          <view class="icon">
            <image
              class="img"
              mode="widthFix"
              src="@/static/image/serve_icon2.jpg"
            />
          </view>
          <view class="text">住院日清单</view>
        </view>
        <navigator
          url="/pages/payRecord/payRecord?type=2"
          class="wrap-serve__con-item"
        >
          <view class="icon">
            <image
              class="img"
              mode="widthFix"
              src="@/static/image/serve_icon3.jpg"
            />
          </view>
          <view class="text">押金补缴记录</view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      info: '',
    }
  },
  computed: {
    ...mapState(['patientInfo']),
  },
  onShow() {
    this.getDefaultPatient()
  },
  methods: {
    getDefaultPatient() {
      this.$http
        .post(this.API.DEFAULT_LIVE_PATIENT, {
          patient_code: this.patientInfo.patient_code,
        })
        .then((res) => {
          this.info = res.data
        })
    },
    addResident() {
      this.$Router.push({ name: 'myResidenAdd' })
    },
    goDetail() {
      this.$Router.push({
        name: 'myResidentBill',
        params: { patient_code: this.info.patient_code },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20rpx;
  &-user {
    .no-residen {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 156rpx;
      border-radius: 10rpx;
      background: #ffffff;
      &__text {
        color: #0ec698;
        font-size: 28rpx;
        padding: 15rpx 30rpx;
        letter-spacing: 1rpx;
        border: 1rpx solid #0ec698;
        border-radius: 10rpx;
      }
    }
    &__list {
      .cell {
        display: flex;
        align-items: center;
        height: 156rpx;
        padding: 0 30rpx;
        color: #ffffff;
        border-radius: 10rpx;
        background: #0ec698 url('@/static/image/residents_item_bg.jpg')
          no-repeat right center;
        background-size: contain;
        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          .title {
            display: flex;
            align-items: center;
            border-radius: 10rpx;
            .name {
              font-size: 36rpx;
              margin-right: 15rpx;
            }
            .tag {
              height: 32rpx;
              line-height: 32rpx;
              font-size: 20rpx;
              padding: 0 10rpx;
              color: rgba($color: #ffffff, $alpha: 0.65);
              border: 1rpx solid rgba($color: #ffffff, $alpha: 0.65);
              border-radius: 8rpx;
            }
          }
          .code {
            font-size: 24rpx;
            margin-top: 20rpx;
          }
        }
        .arrow {
          .iconfont {
            font-size: 40rpx;
            margin-right: -10rpx;
          }
        }
      }
    }
  }
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
