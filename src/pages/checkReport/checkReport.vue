<template>
  <view class="wrap">
    <view class="wrap-user">
      <view class="item">
        <view class="info">
          <view class="title">
            <view class="name">{{ patientInfo.name }}</view>
          </view>
          <view class="code">就诊卡：{{ patientInfo.patient_code }}</view>
        </view>
        <view class="switch" @click="handleCheck">切换就诊人</view>
      </view>
    </view>
    <view class="wrap-list">
      <view
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="handleClickDetail(item.report_code)"
      >
        <view class="title">{{ item.report_name }}</view>
        <view class="date">{{ item.report_time }}</view>
        <view class="status" v-if="item.stauts == 1">
          <image
            class="img"
            mode="widthFix"
            src="@/static/image/check_report_icon.jpg"
          />
        </view>
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
      list: [],
    }
  },
  onLoad() {
    this.getList()
  },
  methods: {
    handleClickDetail(report_code) {
      this.$Router.push({
        name: 'reportDownload',
        query: { report_code: report_code },
      })
    },
    // 切换就诊人
    handleCheck() {
      this.$refs.popup.handleChoose()
    },
    getList() {
      this.$http
        .post(this.API.REPORT_LIST, {
          patient_code: this.patientInfo.patient_code,
        })
        .then((res) => {
          this.list = res.data
        })
    },
  },
  computed: {
    ...mapState(['patientInfo']),
  },
  components: {
    CheckPopup,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  padding: 20rpx;
  &-user {
    .item {
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
  &-list {
    margin-top: 20rpx;
    .item {
      position: relative;
      padding: 30rpx 200rpx 30rpx 30rpx;
      margin-bottom: 20rpx;
      background: #ffffff;
      border-radius: 10rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        color: #333333;
        font-size: 34rpx;
        @include textOverflow(1);
      }
      .date {
        color: #898989;
        font-size: 24rpx;
        margin-top: 20rpx;
      }
      .status {
        position: absolute;
        right: 20rpx;
        top: 0;
        width: 136rpx;
        .img {
          width: 100%;
          height: auto;
          display: block;
        }
      }
    }
  }
}
</style>
