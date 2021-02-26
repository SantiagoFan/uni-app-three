<template>
  <view class="wrap">
    <PatientCard
      :show-message="false"
      :need-patient="true"
      @change="getList"
    ></PatientCard>
    <view class="wrap-list">
      <view
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="item.report_code && item.status == 1 && handleClickDetail(item)"
      >
        <view class="title">{{ item.report_name }}</view>
        <view class="date">{{ item.report_time }}</view>
        <view class="status">
          <image
            v-if="item.status == 1"
            class="img"
            mode="widthFix"
            src="@/static/image/check_report_icon.jpg"
          />
          <image
            v-else
            class="img"
            mode="widthFix"
            src="@/static/image/check_report_icon2.jpg"
          />
        </view>
      </view>
      <empty v-if="list.length == 0"></empty>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import Empty from '../../components/empty/empty.vue'
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
    handleClickDetail(item) {
      if (item.BGLX == 1) {
        //检验报告
        this.$Router.push({
          name: 'reportDownload',
          params: { report_code: item.report_code },
        })
      } else {
        //检查报告
        this.$Router.push({
          name: 'jcReportDownload',
          params: { report_code: item.report_code },
        })
      }
    },
    // 切换就诊人
    handleCheck() {
      this.$refs.popup.handleChoose()
    },
    getList() {
      this.list = [];
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

  Empty,
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  padding: 20rpx;
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
