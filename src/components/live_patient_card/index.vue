<template>
  <view class="container">
    <!-- 已经存在住院人 -->
    <view class="wrap-user" v-if="livePatientInfo">
      <view class="item">
        <view class="info">
          <view class="title">
            <view class="name">{{ livePatientInfo | getName }}</view>
          </view>
          <view class="code">住院号：{{ livePatientInfo.inpatient_code }}</view>
        </view>
        <view class="check" @click="handleChoose">切换住院人</view>
      </view>
    </view>
    <!-- 添加就诊人 -->
    <view class="no-residen" v-else >
      <view class="no-residen__text" @click="addResident">初次使用，请添加住院人</view>
    </view>
    <view class="no-residen">
      <view class="no-residen__text" @click="handleChoose">已添加切换住院人</view>
    </view>
    <!-- 弹出窗 -->
    <u-popup
      v-model="show"
      mode="bottom"
      :border-radius="20"
      @close="handleChooseClose"
    >
      <view class="check-wrap">
        <view class="check-wrap__title">切换住院人</view>
        <view class="check-wrap__con">
          <view class="list">
            <view
              :class="[
                'item',
                item.live_code == livePatientInfo.inpatient_code
                  ? 'active'
                  : '',
              ]"
              @click="choiceLivePatient(item)"
              v-for="(item, index) in livePatientList"
              :key="index"
            >
              <view class="info">
                <view class="name">{{ item.name }}</view>
                <view class="code">住院号：{{ item.live_code }}</view>
              </view>
              <view class="radio">
                <text class="iconfont icon-duihao"></text>
              </view>
            </view>
          </view>
        </view>
        <view class="check-wrap__btn">
          <view class="item" @click="addResident">添加住院人</view>
          <view class="item" @click="manageLivePatient">管理住院人</view>
        </view>
      </view>
    </u-popup>
    <!-- 强制检查就诊人 -->
    <u-modal
      v-model="showModal"
      title="提示"
      :show-cancel-button="true"
      @confirm="addResident"
      @cancel="goBack"
      content="未添加住院人,请添加后重试"
    ></u-modal>
  </view>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'LivePatientCard',
  computed: {
    ...mapState(['livePatientList', 'livePatientInfo']),
  },
  props: {
    // 强制检查 必须存在住院人
    needLivePatient: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      showModal: false,
    }
  },
  filters: {
    getName(item) {
      if (item && item.name) {
        // if (item.name.length > 4) {
        //   return item.name.substr(-2, 4)
        // } else {
        //   return item.name
        // }
        return item.name
      } else {
        return ''
      }
    },
  },
  mounted() {
    this.checkLivePatient()
  },
  methods: {
    addResident() {
      this.$Router.push({ name: 'myResidenAdd' })
    },
    checkLivePatient() {
      if (this.needLivePatient && this.livePatient == null) {
        this.showModal = true
      }
    },
    handleChoose() {
      this.show = true
      uni.hideTabBar()
      this.$store.dispatch('loadLivePatientList', false)
    },
    handleChooseClose() {
      uni.showTabBar()
    },
    manageLivePatient() {
      this.$Router.push({ name: 'myResidents' })
    },
    choiceLivePatient(item) {
      // if(item.live_code!=this.livePatient.inpatient_code){
      this.$http
        .post(this.API.CHANGE_DEFAULT_LIVE_PATIENT, {
          patient_code: item.patient_code,
        })
        .then((res) => {
          if (res.code == 20000) {
            this.$store.commit('setLivePatientInfo', res.data)
            this.show = false
          }
        })
      // }
    },
    showLivePatient() {
      this.$Router.push({
        name: 'myResidentDetail',
        params: { patient_code: this.livePatientInfo.inpatient_code },
      })
    },
    goBack() {
      this.$Router.back(1)
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .wrap-user {
    padding: 30rpx 0;
    .item {
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 40rpx;
      margin-bottom: 20rpx;
      color: #ffffff;
      border-radius: 10rpx;
      background: #0ec698 url('@/static/image/residents_item_bg.jpg') no-repeat
        right center;
      background-size: contain;

      &:last-child {
        margin-bottom: 0;
      }
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
        }
        .code {
          font-size: 28rpx;
          margin-top: 20rpx;
        }
      }
      .check {
        line-height: 60rpx;
        font-size: 30rpx;
        padding: 0 20rpx;
        border: 1rpx solid #ffffff;
        border-radius: 10rpx;
      }
    }
  }
  .no-residen {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 166rpx;
    border-radius: 10rpx;
    background: #ffffff;
    &__text {
      color: #0ec698;
      font-size: 32rpx;
      padding: 15rpx 30rpx;
      letter-spacing: 1rpx;
      border: 1rpx solid #0ec698;
      border-radius: 10rpx;
    }
  }
  // 弹出层
  .check-wrap {
    &__title {
      height: 84rpx;
      line-height: 84rpx;
      text-align: center;
      color: #333333;
      font-size: 32rpx;
      border-bottom: 1rpx solid #e3e3e3;
    }
    &__con {
      .list {
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20rpx 40rpx;
          .info {
            font-size: 32rpx;
            .name {
              color: #333333;
            }
            .code {
              font-size: 28rpx;
              color: #999999;
              margin-top: 10rpx;
            }
          }
          .radio {
            width: 54rpx;
            height: 54rpx;
            line-height: 54rpx;
            text-align: center;
            color: #ffffff;
            border-radius: 50%;
            border: 1rpx solid;
            border-color: #e3e3e3;
            .icon {
              display: none;
            }
          }
          &.active {
            .radio {
              border-color: #0ec698;
              background: #0ec698;
              .icon {
                display: block;
              }
            }
          }
        }
      }
    }
    &__btn {
      display: flex;
      justify-content: space-between;
      padding: 30rpx 70rpx;
      .item {
        width: 275rpx;
        height: 70rpx;
        line-height: 70rpx;
        color: #ffffff;
        text-align: center;
        font-size: 32rpx;
        border-radius: 8rpx;
        background: #0ec698;
      }
    }
  }
}
</style>
