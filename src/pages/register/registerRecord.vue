<template>
  <view class="register-r">
    <view class="register-r-main">
      <view class="register-r-main__list">
        <view
          class="item"
          @click="hanldeClickDetail(item.reg_no)"
          v-for="(item, index) in list"
          :key="index"
        >
          <view class="icon active" v-if="item.status == 2">
            <text class="iconfont icon-dasuozi"></text>
          </view>
          <view
            class="icon active"
            v-else-if="item.status == 1 || item.status == 4"
          >
            <text class="iconfont icon-duihao"></text>
          </view>
          <view class="icon" v-else>
            <text class="iconfont icon-jianhao"></text>
          </view>
          <view class="info">
            <view class="info_title">
              <view class="info_title__status" v-if="item.status == 2"
                >锁号成功</view
              >
              <view class="info_title__status" v-if="item.status == 1"
                >预约挂号成功</view
              >
              <view class="info_title__status" v-if="item.status == 4"
                >已就诊</view
              >
              <view class="info_title__status" v-if="item.status == 3"
                >取消挂号成功</view
              >
              <view class="info_title__time-text">就诊时间</view>
            </view>
            <view class="info_subt1">
              <view class="name">{{ item.patient_name }}</view>
              <view class="date">{{ item.reg_date.substr(0, 10) }}</view>
            </view>
            <view class="info_subt2">
              <view class="doctor-name"
                >{{ item.department_name }}/{{ item.doctor_name }}</view
              >
              <view class="time">{{ item.reg_time | getRegTime }}</view>
            </view>
          </view>
        </view>
        <empty v-if="list.length == 0"> </empty>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import empty from '../../components/empty/empty.vue'
export default {
  components: { empty },
  data() {
    return {
      list: [],
    }
  },
  onLoad() {
    this.getList()
  },
  onPullDownRefresh() {
    this.getList()
  },
  computed: {
    ...mapState(['patientInfo']),
  },
  filters: {
    getRegTime(time) {
      return time.length > 0 ? time.split('--')[0] : ''
    },
  },
  methods: {
    hanldeClickDetail(reg_no) {
      // 1：锁号 2：成功 3：取消
      this.$Router.push({
        name: 'registerRecordDetail',
        params: { reg_no: reg_no },
      })
    },
    getList() {
      this.$http
        .post(this.API.REGISTER_RECORD_LIST, {
          patient_code: this.patientInfo.patient_code,
        })
        .then((res) => {
          this.list = res.data
        })
        .finally((res) => {
          uni.stopPullDownRefresh()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.register-r {
  &-main {
    &__list {
      padding: 20rpx;
      .item {
        display: flex;
        align-items: center;
        padding: 30rpx;
        background: #ffffff;
        border-radius: 10rpx;
        margin-bottom: 20rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .icon {
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          border-radius: 50%;
          color: #ffffff;
          background: #e3e3e3;
          &.active {
            background: #0ec698;
          }
        }
        .info {
          flex: 1;
          margin-left: 30rpx;
          color: #a8a8a8;
          font-size: 30rpx;
          &_title,
          &_subt1,
          &_subt2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          &_title {
            color: #484848;
            font-size: 34rpx;
          }
          &_subt1 {
            margin: 20rpx 0 10rpx 0;
          }
        }
      }
    }
  }
}
</style>
