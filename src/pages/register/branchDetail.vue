<template>
  <view class="wrap">
    <view class="wrap_top">
      <view class="wrap_top__date" v-if="tabIndex === 0"
        >日期:{{ selectDate }}</view
      ><!-- 按日期预约显示 -->
      <view class="wrap_top__date" v-else></view
      ><!-- 按日期预约显示 -->
      <view class="wrap_top__tab">
        <view
          :class="['wrap_top__tab-cell', { active: tabIndex === 1 }]"
          @click="handleTabItem(0)"
          >按日期预约</view
        >
        <view
          :class="['wrap_top__tab-cell', { active: tabIndex === 0 }]"
          @click="handleTabItem(1)"
          >按医生预约</view
        >
      </view>
    </view>
    <view class="wrap_con">
      <view
        :class="['wrap_con__date', { active: isOpen }]"
        v-if="tabIndex === 0"
      >
        <view class="week-box" v-if="isOpen">
          <view
            class="week-box__item"
            v-for="(item, index) in week"
            :key="index"
            >{{ item }}</view
          >
        </view>
        <view :class="['list', { active: isOpen }]">
          <view
            class="item"
            v-for="(item, index) in schemeList"
            :key="index"
            @click="changeScheme(item)"
          >
            <view v-if="!isOpen" class="week">{{ item.time | getWeek }}</view>
            <view
              v-if="item"
              :class="['con', { active: item.time == selectDate }]"
            >
              <view
                class="count"
                :style="{
                  color: item.num > 0 ? '#0ec698' : '',
                }"
                >{{ item.time | getDay }}</view
              >
              <view class="status">{{ item | getSourceStatus }}</view>
            </view>
          </view>
        </view>
        <view v-if="schemeList.length > 0" class="arrow" @click="openDate()">
          <view :class="['icon', { active: isOpen }]">
            <text class="iconfont icon-shang"></text>
          </view>
        </view>
      </view>
      <view class="wrap_con__list" v-if="tabIndex === 0">
        <view
          @click="goDetail(item, selectDate)"
          class="cell"
          v-for="(item, index) in doctorList"
          :key="index"
        >
          <view class="cell__avatar">
            <dh-image
              class="img"
              mode="aspectFill"
              :src="item.headimg"
              errorSrc="doctor.jpg"
            ></dh-image>
          </view>
          <view class="cell__info">
            <view class="title">
              <view class="name">{{ item.doctor_name }}</view>
              <view class="right">
                <view class="sur" v-if="item.remain_count > 0"
                  >余号:{{ item.remain_count }}</view
                >
                <view class="tag" v-if="item.remain_count > 0"
                  >￥{{ item.price }}</view
                >
                <view class="tag" v-if="item.remain_count == 0">满诊</view>
              </view>
            </view>
            <view class="post">{{ item.doctor_professional }}</view>
            <view class="content">{{ item.department_name }}</view>
          </view>
        </view>
        <empty v-if="doctorList.length === 0"></empty>
      </view>
      <view class="wrap_con__list" v-else>
        <view
          @click="goDetail(item)"
          class="cell"
          v-for="(item, index) in all_doctor"
          :key="index"
        >
          <view class="cell__avatar">
            <dh-image
              class="img"
              mode="aspectFill"
              :src="item.headimg"
              errorSrc="doctor.jpg"
            ></dh-image>
          </view>
          <view class="cell__info">
            <view class="title">
              <view class="name">{{ item.doctor_name }}</view>
            </view>
            <view class="post">{{ item.professional }}</view>
            <view class="content">{{ item.department_name }}</view>
          </view>
        </view>
        <empty v-if="all_doctor.length === 0"></empty>
      </view>
    </view>
  </view>
</template>

<script>
import moment from 'moment'
import dhImage from '@/components/dh-image/dh-image.vue'
import { weekList, fillWeek } from '@/utils/week.js'
export default {
  data() {
    return {
      calendarShow: false,
      tabIndex: 0,
      isOpen: false, // 是否展开日期
      doctorList: [],
      schemeList: [],
      selectDate: '',
      week: weekList(),
      open_scheme_list: [],
      postLock: false,
      department_id: '',
      all_doctor: [],
    }
  },
  components: { dhImage },
  onLoad() {
    this.department_id = this.$Route.query.departmentid
    uni.setNavigationBarTitle({
      title: this.$Route.query.departmentName,
    })
    this.getSchemeList()
    this.getDocListByDepart()
  },
  filters: {
    getDay(val) {
      return moment(val).format('DD')
    },
    getWeek(val) {
      return weekList()[moment(val).isoWeekday() - 1]
    },
    getSourceStatus(item) {
      var sourceStatus = ''
      if (item.total_num == 0) {
        sourceStatus = '无'
      } else if (0 < item.num <= item.total_num) {
        sourceStatus = '有'
      } else {
        sourceStatus = '满'
      }
      return sourceStatus
    },
  },
  methods: {
    handleTabItem(index) {
      this.tabIndex = index
    },
    getDocListByDepart() {
      if (this.all_doctor.length == 0) {
        this.$http
          .post(this.API.DOCTOR_INFO_LIST, { departmentid: this.department_id },false)
          .then((res) => {
            this.all_doctor = res.data
          })
      }
    },
    getDoctorList() {
      var data = {
        departmentid: this.department_id,
        date: this.selectDate,
      }

      if (this.postLock) {
        return
      }
      this.postLock = true

      this.$http.post(this.API.DOCTOR_LIST, data).then((res) => {
        this.doctorList = res.data
        this.postLock = false
      })
    },
    goDetail(item, date) {
      this.$Router.push({
        name: 'doctorDetail',
        params: {
          date: date,
          doctor_id: item.doctor_id,
          department_id: item.department_id,
        },
      })
    },
    getSchemeList() {
      this.$http
        .post(this.API.SCHEME_LIST, {
          departmentid: this.department_id,
        })
        .then((res) => {
          this.origin_scheme = JSON.parse(JSON.stringify(res.data))
          this.schemeList = res.data
          if (res.data.length > 0) {
            this.selectDate = res.data[0].time
          }
          this.getDoctorList()
        })
    },
    changeScheme(item) {
      if (!this.postLock && item && item.time != this.selectDate) {
        this.selectDate = item.time
        this.getDoctorList()
      }
    },
    changeList(arr) {
      var newArray = arr.filter((value) => Object.keys(value).length !== 0)
      return newArray
    },
    openDate() {
      this.isOpen = !this.isOpen
      this.schemeList = []
      let data = JSON.parse(JSON.stringify(this.origin_scheme))
      if (this.isOpen) {
        this.schemeList = fillWeek(data)
      } else {
        this.schemeList = data
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 30rpx;
    &__date {
      color: #666666;
      font-size: 30rpx;
    }
    &__tab {
      display: flex;
      align-items: center;
      color: #ffffff;
      background: #0ec698;
      padding: 2rpx;
      border-radius: 4rpx;
      &-cell {
        height: 54rpx;
        line-height: 54rpx;
        padding: 0 20rpx;
        font-size: 30rpx;
        border-radius: 4rpx;
        &.active {
          color: #5ecb81;
          background: #ffffff;
        }
      }
    }
  }
  &_con {
    flex: 1;
    background: #ffffff;
    &__date {
      // display: flex;
      position: relative;
      margin-bottom: 20rpx;
      background: #ffffff;
      padding-top: 10rpx;
      border-top: 2rpx solid #e4e4e4;
      .week-box {
        display: flex;
        text-align: center;
        margin-bottom: 10rpx;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid #e4e4e4;
        
        &__item {
          flex: 1;
          color: #666;
          font-size: 30rpx;
        }
      }
      .list {
        display: flex;
        width: 660rpx;
        overflow-x: auto;
        white-space: nowrap;
        &::-webkit-scrollbar {
          display: none;
        }
        .item {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          // width: 110rpx;
          flex-basis: 110rpx;
          flex-shrink: 0;
          // height: 126rpx;
          font-size: 28rpx;
          white-space: nowrap;
          .week {
            color: #666666;
            margin-bottom: 10rpx;
          }
          .con {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            .count {
              color: #666666;
              font-size: 32rpx;
            }
            .status {
              color: #bcbcbc;
              font-size: 26rpx;
            }
            &.active {
              background: #0ec698;
              .count {
                color: #ffffff;
              }
              .count {
                color: #ffffff !important;
              }
              .status {
                color: #ffffff;
              }
            }
          }
        }
      }
      .arrow {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        width: 90rpx;
        height: 100%;
        border-left: 1rpx solid #e9e9e9;
        background: rgba($color: #ffffff, $alpha: 0.7);
        .icon {
          position: relative;
          width: 36rpx;
          height: 36rpx;
          margin: auto;
          color: #ffffff;
          text-align: center;
          background: #0ec698;
          border-radius: 50%;
          transition: all 0.5s;
          .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20rpx;
          }
          &.active {
            transform: rotate(180deg);
          }
        }
      }
      &.active {
        .arrow {
          height: 94rpx;
          top: -94rpx;
          border-left: none;
        }
        .list {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          width: 100%;
          margin-top: -10rpx;
          .item {
            margin-top: 10rpx;
          }
        }
      }
    }
    &__list {
      .cell {
        display: flex;
        padding: 20rpx 30rpx;
        border-bottom: 1rpx solid #d8d8d8;
        &__avatar {
          width: 124rpx;
          height: 164rpx;
          border-radius: 6rpx;
          margin-right: 30rpx;
          overflow: hidden;
          .img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        &__info {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          flex: 1;
          color: #a8a8a8;
          font-size: 30rpx;
          .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #484848;
            font-size: 34rpx;
            .right {
              display: flex;
              align-items: center;
              .sur {
                color: #333333;
                font-size: 28rpx;
                margin-right: 25rpx;
              }
              .tag {
                width: 84rpx;
                height: 40rpx;
                line-height: 40rpx;
                color: #ffffff;
                font-size: 28rpx;
                text-align: center;
                background: #ff8c46;
                border-radius: 8rpx;
              }
            }
          }
          .content {
            @include textOverflow(1);
          }
        }
      }
    }
    .nodata {
      text-align: center;
      padding: 20rpx;
      color: #999999;
    }
  }
}
</style>
