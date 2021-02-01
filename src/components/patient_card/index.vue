<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__massage" v-if="showMessage">
        温馨提示：<br />暂时不支持医保卡看病，持有医保卡的用户请到前台直接办理手续。
      </view>
      <!-- 正常样式 -->
      <view v-if="theme == 'normal'" class="wrap__user">
        <!-- 已经存在就诊人 -->
        <view class="info" v-if="patientInfo">
          <view class="title">
            <view class="name">{{ getName(patientInfo) }}</view>
          </view>
          <view class="code">院内诊疗号：{{ patientInfo.patient_code }}</view>
        </view>
        <view class="switch" v-if="patientInfo" @click="handleChoose"
          >切换就诊人</view
        >
        <!-- 添加就诊人 -->
        <view class="add_btn" v-if="!patientInfo" @click="addPatient">
          <view class="add_btn__icon">
            <text class="iconfont icon-add-fill"></text>
          </view>
          <view class="add_btn__text">添加就诊卡</view>
        </view>
      </view>
      <!-- 图形样式 -->
      <view v-else class="index-wrap__user">
        <view class="index-wrap__user-info">
          <view v-if="patientInfo">
            <view class="title">
              <view class="name" @click="showPatient()">{{
                getName(patientInfo)
              }}</view>
              <view class="tag" @click="showPatient()">电子就诊卡</view>
              <view @click.stop="handleChoose" class="check">切换</view>
            </view>
            <view class="code" @click="showPatient()"
              >诊疗号：{{ patientInfo.patient_code }}</view
            >
          </view>
          <view @click.stop="addPatient" class="add_btn" v-else>
            <view class="add_btn__icon">
              <text class="iconfont icon-add-fill"></text>
            </view>
            <view class="add_btn__text">添加就诊卡</view>
          </view>
        </view>
        <view class="index-wrap__user-pic">
          <image
            class="img"
            mode="widthFix"
            src="@/static/image/index_rw.png"
          />
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
        <view class="check-wrap__title">切换就诊人</view>
        <view class="check-wrap__con">
          <view class="list">
            <view
              :class="['item', item.id == patientInfo.id ? 'active' : '']"
              @click="choicePatient(item.id)"
              v-for="(item, index) in patientList"
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
          <view class="item" @click="addPatient">添加就诊人</view>
          <view class="item" @click="managePatient">管理就诊人</view>
        </view>
      </view>
    </u-popup>
    <!-- 强制检查就诊人 -->
    <u-modal
      v-model="showModal"
      title="提示"
      :show-cancel-button="true"
      @confirm="addPatient"
      @cancel="goBack"
      content="未添加就诊人,请添加后重试"
    ></u-modal>
  </view>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'PatientCard',
  computed: {
    ...mapState(['patientList', 'patientInfo']),
  },
  props: {
    // 强制检查 必须存在就诊卡
    needPatient: {
      type: Boolean,
      default: false,
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: 'normal',
    },
  },
  data() {
    return {
      show: false,
      showModal: false,
    }
  },
  mounted() {
    this.checkPatient()
  },
  methods: {
    checkPatient() {
      if (this.needPatient && this.patientInfo == null) {
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
      this.$store.dispatch('loadPatientList', false)
    },
    handleChooseClose() {
      uni.showTabBar()
    },
    addPatient() {
      this.$Router.push({ name: 'medicalCardLogin' })
    },
    managePatient() {
      this.$Router.push({ name: 'patientAdd' })
    },
    choicePatient(id) {
      this.$http
        .post(this.API.CHANGE_DEFAULT_PATIENT, { id: id })
        .then((res) => {
          if (res.code == 20000) {
            this.$store.commit('setPatientInfo', res.data)
            this.show = false
          }
        })
    },
    showPatient() {
      console.info('showPatient')
      this.$Router.push({
        name: 'patientDetail',
        params: { idcard: this.patientInfo.idcard },
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
    &__massage {
      color: #0ec698;
      font-size: 26rpx;
      padding: 20rpx;
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
    .index-wrap__user {
      display: flex;
      align-items: center;
      position: absolute;
      top: -80rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 680rpx;
      height: 160rpx;
      padding: 0 25rpx;
      border-radius: 20rpx;
      box-shadow: 0 10rpx 12rpx rgba($color: #61b47c, $alpha: 0.2);
      background: #ffffff url('@/static/image/box_bg.png') no-repeat 18rpx 18rpx;
      background-size: 250rpx;
      &-info {
        color: #0ec698;
        font-size: 24rpx;
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
        .title {
          display: flex;
          align-items: center;
          margin-bottom: 20rpx;
          .name {
            max-width: 128rpx;
            font-size: 33rpx;
            font-weight: bold;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          .tag {
            height: 32rpx;
            line-height: 32rpx;
            font-size: 20rpx;
            margin: 0 25rpx;
            padding: 0 10rpx;
            border: 1rpx solid #0ec698;
            border-radius: 10rpx;
          }
          .check {
            width: 92rpx;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            color: #ffffff;
            background: #0fd1a1;
            border-radius: 20rpx;
          }
        }
      }
      &-pic {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 280rpx;
        .img {
          width: 100%;
          height: auto;
          display: block;
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
