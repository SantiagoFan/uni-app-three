<template>
  <view class="index-container">
    <view class="index-main">
      <view class="top_pic">
        <dh-image
          class="img"
          mode="widthFix"
          :src="banner"
          :allowEmpty="true"
          errorSrc="index_img01.jpg?v=0.1"
        ></dh-image>
      </view>
      <view class="index-wrap">
        <PatientCard theme="card" :show-message="false"></PatientCard>
        <template v-if="patientInfo">
          <view class="index-wrap__art1">
            <router-link
              :to="{ name: 'registerRecord' }"
              class="index-wrap__art1-item"
            >
              <view>挂号记录</view>
            </router-link>
            <router-link
              :to="{ name: 'payRecord' }"
              class="index-wrap__art1-item"
            >
              <view>缴费记录</view>
            </router-link>
            <view class="index-wrap__art1-item" @click="handleVisitCode"
              >就诊码</view
            >
          </view>
          <u-gap height="20" bg-color="#f6f6f6"></u-gap>
        </template>
        <view class="index-wrap__art2">
          <router-link :to="{ name: 'branchList' }">
            <view class="index-wrap__art2-item">
              <view class="img-box">
                <image
                  class="img"
                  mode="widthFix"
                  src="@/static/image/index-type1.jpg"
                />
              </view>
              <view class="title">在线挂号</view>
              <view class="subt">实时查看医生情况</view>
            </view>
          </router-link>
          <router-link :to="{ name: 'awaitPay' }">
            <view class="index-wrap__art2-item">
              <view class="img-box">
                <image
                  class="img"
                  mode="widthFix"
                  src="@/static/image/index-type2.jpg"
                />
              </view>
              <view class="title">门诊缴费</view>
              <view class="subt">快速缴费不排队</view>
            </view>
          </router-link>
          <router-link :to="{ name: 'myResidentServe' }">
            <view class="index-wrap__art2-item">
              <view class="img-box">
                <image
                  class="img"
                  mode="widthFix"
                  src="@/static/image/index-type3.jpg"
                />
              </view>
              <view class="title">住院服务</view>
              <view class="subt">省心省力安心养病</view>
            </view>
          </router-link>
        </view>
        <u-gap height="20" bg-color="#f6f6f6"></u-gap>
        <view class="index-wrap__art3">
          <view class="index-wrap__art3-tab">
            <view
              :class="['item', { active: typeIndex === index }]"
              v-for="(item, index) in typeList"
              :key="index"
              @click="handleTypeItem(index)"
              >{{ item.text }}</view
            >
          </view>
          <view class="index-wrap__art3-con">
            <view class="list" v-if="typeIndex === 0">
              <router-link
                v-for="(item, index) in list1"
                :key="index"
                :to="{ name: item.name }"
                :navType="item.openType"
                hover-class="none"
              >
                <view class="item">
                  <view class="icon">
                    <image class="img" mode="widthFix" :src="item.image" />
                  </view>
                  <view class="text">{{ item.title }}</view>
                </view>
              </router-link>
            </view>
            <view class="list" v-if="typeIndex === 1">
              <view @click="goLiveDaily()">
                <view class="item">
                  <view class="icon">
                    <image
                      class="img"
                      mode="widthFix"
                      src="@/static/image/indx-sta11.jpg"
                    />
                  </view>
                  <view class="text">住院日清单</view>
                </view>
              </view>
              <router-link :to="{ name: 'depositPay' }">
                <view class="item">
                  <view class="icon">
                    <image
                      class="img"
                      mode="widthFix"
                      src="@/static/image/indx-sta12.jpg"
                    />
                  </view>
                  <view class="text">住院缴费</view>
                </view>
              </router-link>
              <router-link :to="{ name: 'myResidents' }">
                <view class="item">
                  <view class="icon">
                    <image
                      class="img"
                      mode="widthFix"
                      src="@/static/image/indx-sta13.jpg"
                    />
                  </view>
                  <view class="text">住院人信息</view>
                </view>
              </router-link>
            </view>
          </view>
        </view>
        <u-gap height="20" bg-color="#f6f6f6"></u-gap>
      </view>
    </view>
    <u-popup
      v-model="visitCodeShow"
      mode="center"
      :closeable="true"
      :close-icon-size="40"
      :border-radius="30"
    >
      <view class="visit-wrap">
        <view class="visit-wrap__name">{{ patientInfo.name }}</view>
        <view class="visit-wrap__code">
          <tki-qrcode
            ref="qrcode"
            onval
            :val="ehealth_code"
            :size="390"
            icon="/static/image/logo.png"
            :loadMake="true"
            :show-loading="true"
          />
          <!-- <view class="nohealth" @click="refresh" v-if="!patientInfo.ehealth_code">点击刷新健康卡号</view> -->
          <!-- <image class="img" mode="aspectFill" src="@/static/image/code1.jpg" /> -->
        </view>
      </view>
    </u-popup>
    <auth></auth>
    <u-modal
      v-model="showConfirm"
      content="当前用户未生成健康卡号"
      :show-confirm-button="true"
      :show-cancel-button="true"
      confirm-text="重新获取"
      cancel-text="关闭"
      @confirm="refresh()"
    ></u-modal>
  </view>
</template>

<script>
import indexList from '@/common/index.data.js'
import dhImage from '@/components/dh-image/dh-image.vue'
import { mapState } from 'vuex'
import tkiQrcode from '@/components/tki-code/tki-qrcode/tki-qrcode'

export default {
  data() {
    return {
      typeIndex: 0,
      name: '',
      banner: '',
      typeList: [
        {
          text: '门诊',
        },
        {
          text: '住院',
        },
      ],
      list1: indexList.list1,
      list2: indexList.list2,
      visitCodeShow: false, // 就诊码
      showConfirm: false,
      ehealth_code: '',
      patientList: [],
    }
  },
  components: { dhImage, tkiQrcode },
  computed: {
    ...mapState(['userInfo', 'patientInfo', 'livePatientInfo']),
  },
  watch: {
    visitCodeShow(status) {
      status ? uni.hideTabBar() : uni.showTabBar()
    },
  },
  onLoad() {
    this.getBanner()
  },
  onShow() {
    console.log('onShow')
  },
  methods: {
    getName(str) {
      if (str.length > 4) {
        return str.substr(-2, 4)
      } else {
        return str
      }
    },
    getBanner() {
      this.$http.post(this.API.BANNER, { type: 1 }, false).then((res) => {
        this.banner = res.data
      })
    },
    //就诊人
    handleTypeItem(index) {
      this.typeIndex = index
    },
    // 就诊码
    handleVisitCode() {
      console.log(this.patientInfo.ehealth_code)
      if (this.patientInfo.ehealth_code) {
        this.visitCodeShow = true
        this.$nextTick(() => {
          this.ehealth_code = this.patientInfo.ehealth_code
        })
      } else {
        this.showConfirm = true
        console.log('暂无健康卡')
      }
    },
    refresh() {
      this.$http
        .post(this.API.UPDATE_HEALTH_CODE, {
          patient_code: this.patientInfo.patient_code,
        })
        .then((res) => {
          if (res.code === 20000) {
            if (res.data) {
              let obj = JSON.parse(JSON.stringify(this.patientInfo))
              obj.ehealth_code = res.data
              this.$store.commit('setPatientInfo', obj)
              this.handleVisitCode()
            } else {
              uni.showToast({
                title: '生成失败，请联系管理员',
                icon: 'none',
              })
            }
          }
        })
    },
    goLiveDaily() {
      if (this.livePatientInfo) {
        this.$Router.push({ name: 'myResidentBill' })
      } else {
        this.$Router.push({ name: 'myResidents' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.index-container {
  .index-main {
    .top_pic {
      min-height: 340rpx;
      .img {
        width: 100%;
        display: block;
      }
    }
    .index-wrap {
      position: relative;
      background: #ffffff;
      margin-top: -80rpx;
      padding-top: 80rpx;
      border-radius: 35rpx 35rpx 0 0;
      &__art1 {
        display: flex;
        align-items: center;
        height: 124rpx;
        &-item {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #040404;
          font-size: 30rpx;
          &::before {
            content: '';
            width: 12rpx;
            height: 12rpx;
            border-radius: 50%;
            margin-right: 15rpx;
            background: #0ec698;
            display: block;
          }
        }
      }
      &__art2 {
        display: flex;
        justify-content: space-around;
        padding: 50rpx 0;
        &-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          .img-box {
            width: 120rpx;
            .img {
              width: 100%;
              height: auto;
              display: block;
            }
          }
          .title {
            color: #161616;
            font-size: 28rpx;
            margin: 10rpx 0;
          }
          .subt {
            color: #bababa;
            font-size: 24rpx;
          }
        }
      }
      &__art3 {
        padding: 25rpx 0 40rpx 0;
        &-tab {
          display: flex;
          align-items: center;
          color: #333333;
          font-size: 26rpx;
          padding: 0 35rpx;
          .item {
            position: relative;
            margin-right: 40rpx;
            &:last-child {
              margin-right: 0;
            }
            &.active {
              transform: scale(1.4);
              &::after {
                content: '';
                position: absolute;
                left: 50%;
                bottom: -15rpx;
                transform: translateX(-50%);
                width: 80%;
                height: 5rpx;
                background: #0ec698;
                border-radius: 2rpx;
              }
            }
          }
        }
        &-con {
          margin-top: 70rpx;
          .list {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-row-gap: 50rpx;
            .item {
              display: flex;
              flex-direction: column;
              align-items: center;
              .icon {
                width: 96rpx;
                height: 96rpx;
                background: #f2f2f2;
                .img {
                  width: 100%;
                  height: auto;
                  display: block;
                }
              }
              .text {
                color: #333333;
                font-size: 26rpx;
                margin-top: 15rpx;
              }
            }
          }
        }
      }
    }
  }
  // 就诊码
  .visit-wrap {
    padding-bottom: 60rpx;
    &__name {
      color: #333333;
      font-size: 36rpx;
      padding: 30rpx 40rpx 40rpx 40rpx;
    }
    &__code {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 672rpx;
      height: 535rpx;
      background: url('~@/static/image/code_bg.png') no-repeat;
      background-size: 100% 100%;
      .img {
        width: 325rpx;
        height: 325rpx;
        display: block;
      }
    }
  }
}
</style>
