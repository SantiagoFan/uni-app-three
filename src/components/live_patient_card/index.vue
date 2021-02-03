<template>
  <view class="container">
    <view class="wrap">
      <!-- 已经存在住院人 -->
      <view class="wrap-user" v-if="livePatientInfo">
        <view class="item">
          <view class="info">
            <view class="title">
              <view class="name">{{ getName(livePatientInfo) }}</view>
            </view>
            <view class="code">住院号：{{ livePatientInfo.patient_code }}</view>
          </view>
          <view class="check" @click="handleChoose">切换住院人</view>
        </view>
      </view>
       <!-- 添加就诊人 -->
      <view v-else class="patient-m__add" @click="addLivePatient">
        <view class="patient-m__add-icon">
          <text class="iconfont icon-jiahao"></text>
        </view>
        <view class="patient-m__add-info">
          <view class="tit">添加住院人</view>
          <view class="sub">还可添加{{ count }}人</view>
        </view>
        <view class="patient-m__add-arrow">
          <text class="iconfont icon-arrowb"></text>
        </view>
      </view>
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
              :class="['item', item.id == livePatientInfo.id ? 'active' : '']"
              @click="choicePatient(item.id)"
              v-for="(item, index) in livePatientList"
              :key="index"
            >
              <view class="info">
                <view class="name">{{ item.name }}</view>
                <view class="code">就诊卡：{{ item.patient_code }}</view>
              </view>
              <view class="radio">
                <text class="iconfont icon-duihao"></text>
              </view>
            </view>
          </view>
        </view>
        <view class="check-wrap__btn">
          <view class="item" @click="addLivePatient">添加住院人</view>
          <view class="item" @click="manageLivePatient">管理住院人</view>
        </view>
      </view>
    </u-popup>
    <!-- 强制检查就诊人 -->
    <u-modal
      v-model="showModal"
      title="提示"
      :show-cancel-button="true"
      @confirm="addLivePatient"
      @cancel="goBack"
      content="未添加住院人人,请添加后重试"
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
    }
  },
  data() {
    return {
      show: false,
      showModal: false,
    }
  },
  mounted() {
    this.checkLivePatient()
  },
  methods: {
    checkLivePatient() {
      if (this.needLivePatient && this.livePatient == null) {
        this.showModal = true
      }
    },
    getName(item) {
      if (item && item.name) {
        if (item.name.length > 4) {
          return item.name.substr(-2, 4)
        } else {
          return item.name
        }
      } else {
        return ''
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
    addLivePatient() {
      this.$Router.push({ name: 'medicalCardLogin' })
    },
    manageLivePatient() {
      this.$Router.push({ name: 'patientAdd' })
    },
    choiceLivePatient(id) {
      this.$http
        .post(this.API.CHANGE_DEFAULT_PATIENT, { id: id })
        .then((res) => {
          if (res.code == 20000) {
            this.$store.commit('setLivePatientInfo', res.data)
            this.show = false
          }
        })
    },
    showLivePatient() {
      this.$Router.push({
        name: 'myResidentDetail',
        params: { patient_code: this.livePatientInfo.patient_code },
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
  .wrap {
    flex: 1;
    padding: 0rpx 20rpx;
    overflow-y: auto;
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
      .add_btn {
        display: inline-flex;
        align-items: center;
        height: 82rpx;
        padding: 0 30rpx;
        color: #0ec698;
        border: 1rpx solid #0ec698;
        border-radius: 20rpx;
        &__icon {
          margin-right: 20rpx;
          .iconfont {
            font-size: 45rpx;
          }
        }
        &__text {
          font-size: 32rpx;
        }
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
            font-size: 28rpx;
            .name {
              color: #333333;
            }
            .code {
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
        height: 64rpx;
        line-height: 64rpx;
        color: #ffffff;
        text-align: center;
        font-size: 28rpx;
        border-radius: 8rpx;
        background: #0ec698;
      }
    }
  }
}
</style>
