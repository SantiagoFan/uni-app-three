<template>
  <view class="register-r">
    <view class="register-r-main">
      <view class="register-r-main__list">
        <template v-for="(item, index) in list">
          <!-- 听课凭证 -->
          <view
            class="item course"
            v-if="isCourseCard(item)"
            @click="hanldeClickDetail(item)"
            :key="index"
            :class="[getCourseStyle(item)]"
          >
            <view class="icon active2" v-if="item.status == 2">
              <text class="iconfont icon-dasuozi"></text>
            </view>
            <view
              class="icon active2"
              v-else-if="item.status == 1 || item.status == 4"
            >
              <text class="iconfont icon-card"></text>
            </view>
            <view class="icon" v-else>
              <text class="iconfont icon-jianhao"></text>
            </view>
            <view class="info">
              <view class="info_title">
                <view class="info_title__status" v-if="item.status == 2"
                  > </view
                >
                <view class="info_title__status" v-if="item.status == 1"
                  > </view
                >
                <view class="info_title__status" v-if="item.status == 4"
                  > </view
                >
                <view class="info_title__status" v-if="item.status == 3"
                  > </view
                >
                <view class="info_title__time-text">听课时间</view>
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
          <!-- 挂号记录 -->
          <view
            class="item"
            v-else
            @click="hanldeClickDetail(item)"
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
        </template>
        <empty v-if="list.length == 0"> </empty>
      </view>
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import empty from '../../components/empty/empty.vue'
export default {
  components: { empty },
  data() {
    return {
      list: [],
    }
  },
  onLoad(query){
    // #ifdef MP-ALIPAY
    this.$reportCmPV_YL({ title: '挂号记录查询', query })
    // #endif
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
    // 是否为听课证
    isCourseCard(item){
      return item.doctor_name.indexOf('听课凭证')>-1
    },
    getCourseStyle(item){
      // 挂号已过期
      let res = moment().isAfter(moment(item.reg_date),'day')
      if(res){ return 'hidden' }

      // 区分上午下午晚上 颜色
      if(item.doctor_name.indexOf('早上')!=-1){
        return 'morning';
      } else if(item.doctor_name.indexOf('下午')!=-1){
        return 'afternoon';
      } else {
         return 'evening';
      }
    },
    hanldeClickDetail(item) {
      if(this.isCourseCard(item)){
        this.$Router.push({
          name: 'courseCardRecordDetail',
          params: { reg_no: item.reg_no },
        })
      } else {
        // 1：锁号 2：成功 3：取消
        this.$Router.push({
          name: 'registerRecordDetail',
          params: { reg_no: item.reg_no },
        })
      } 
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
        overflow: hidden;
        &:last-child {
          margin-bottom: 0;
        }
        &.course{
          position: relative;
          &::before {
            position: absolute;
            font-family: "iconfont" !important;
            top: 0rem;
            left: 0rem;
            z-index: 1;
            padding-right: 0.6rem;
            font-weight: bold;
            line-height: 0px;
            color: #fff;
            height: 0px;
            content: "听课证";
          }
          &.morning::before{ border: 1rem solid #7fb80e;border-right-color: transparent; }
          &.afternoon::before{ border: 1rem solid #f58220;border-right-color: transparent; }
          &.evening::before{ border: 1rem solid #444693;border-right-color: transparent; }
          &.hidden{ display: none;}
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
          &.active2 {
            background: #ffb72c;
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
