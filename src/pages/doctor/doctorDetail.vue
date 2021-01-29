<template>
  <view class="wrap">
    <view class="wrap__user">
      <view class="avatar">
        <dh-image
          class="img"
          mode="aspectFill"
          :src="model.headimg"
          errorSrc="doctor.jpg"
        ></dh-image>
      </view>
      <view class="info">
        <view class="title">
          <view class="name">{{ model.doctor_name }}</view>
          <view class="share">
            <view class="share_icon" @click="addCollect">
              <image
                class="img"
                v-if="!is_collect"
                mode="widthFix"
                src="@/static/image/doctor_d_icon1.png"
              />
              <image
                class="img"
                v-if="is_collect"
                mode="widthFix"
                src="@/static/image/doctor_d_icon1-h.png"
              />
            </view>
            <view class="share_icon share_btn">
              <button class="btn" open-type="share"></button>
            </view>
          </view>
        </view>
        <view class="subt">
          <view class="subt-zc">门诊：{{ model.department_name }}</view>
          <!-- <view class="subt-zw">职务：{{ model.position }}</view> -->
        </view>
        <view class="intr">职称：{{ model.professional }}</view>
      </view>
    </view>
    <view class="wrap__con">
      <u-sticky>
        <view class="wrap__con-tab">
          <view
            :class="['item', { active: tabIndex == 0 }]"
            @click="handleSwitchItem(0)"
            >挂号</view
          >
          <view
            :class="['item', { active: tabIndex == 1 }]"
            @click="handleSwitchItem(1)"
            >介绍</view
          >
        </view>
      </u-sticky>
      <view class="register" v-show="tabIndex == 0">
        <view class="register-list">
          <view class="register-list__cell">
            <view class="title" @click="isShow = !isShow">
              <view class="date">{{ dateStr }}</view>
              <view class="text">{{ isShow ? '收起日期' : '更多日期' }}</view>
              <view :class="['arrow', { active: isShow }]">
                <text class="iconfont icon-arrowb"></text>
              </view>
            </view>
            <view
              class="wrap_con__date active"
              v-if="isShow && schemeList.length > 0"
            >
              <view class="week-box">
                <view
                  class="week-box__item"
                  v-for="(item, index) in week"
                  :key="index"
                  >{{ item }}</view
                >
              </view>
              <view class="list active">
                <view
                  class="item"
                  v-for="(item, index) in schemeList"
                  :key="index"
                  @click="changeScheme(item)"
                >
                  <view
                    v-if="item"
                    :class="['con', { active: item.time == selectDate }]"
                  >
                    <view
                      class="count"
                      :style="{ color: item.num > 0 ? '#0ec698' : '' }"
                      >{{ item.time | getDay }}</view
                    >
                    <view class="status">{{ item | getSourceStatus }}</view>
                  </view>
                </view>
              </view>
            </view>
            <view class="list">
              <view
                :class="['item', item.source.length > 0 ? '' : 'item-active']"
                v-for="(item, index) in list"
                :key="index"
                @click="goRegister(index)"
              >
                <view class="date">{{ getTime(item.time) }}</view>
                <view class="rest_source">余号：{{ item.source.length }}</view>
                <view class="price" v-if="item.source.length > 0">{{
                  item.price > 0 ? '¥' + (item.price | toFixed) : '免费'
                }}</view>
                <view class="price" v-if="item.source.length > 0">{{
                  item.price == 0 ? '' : ''
                }}</view>
                <view class="price" v-else>已无号</view>
                <view class="arrow" v-if="item.source.length > 0">
                  <text class="iconfont icon-arrowb"></text>
                </view>
              </view>
              <empty v-if="list.length === 0"></empty>
            </view>
          </view>
        </view>
      </view>
      <template v-if="tabIndex == 1">
        <view
          class="wrap__con-intr"
          v-if="model.content"
          v-html="model.content"
        >
        </view>
        <empty v-else title='暂无介绍'></empty>
      </template>
    </view>
    <!-- 下单 -->
    <u-popup v-model="orderPopupStatus" mode="bottom" :closeable="true">
      <view class="order-wrap">
        <view class="order-wrap__info">
          <view class="order-wrap__info-user">
            <view class="avatar">
              <dh-image
                class="img"
                mode="aspectFill"
                :src="model.headimg"
                errorSrc="doctor.jpg"
              ></dh-image>
            </view>
            <view class="info">
              <view class="info-cell">
                <view class="info-cell__label">医师：</view>
                <view class="info-cell__text">{{ model.doctor_name }}</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__label">科室：</view>
                <view class="info-cell__text">{{ model.department_name }}</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__label ">费用：</view>
                <view class="info-cell__text price">{{ price | toFixed }}</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__label">时段：</view>
                <view class="info-cell__text"
                  >{{ dateStr }} {{ timeStatus == 1 ? '上午' : '下午' }}
                  <br />
                  {{ time }}</view
                >
              </view>
            </view>
          </view>
          <view class="order-wrap__info-con">
            <view class="bt">请选择就诊人</view>
            <view class="info" v-if="patient_name"
              >({{ patient_name }} 卡号:{{ patient_code }})</view
            >
            <view class="list">
              <template v-if="patient_code">
                <view
                  :class="[
                    'item',
                    { active: patient_code == item.patient_code },
                  ]"
                  v-for="(item, index) in patientList"
                  :key="index"
                  @click="changePatient(index)"
                  >{{ getName(item.name) }}</view
                >
              </template>
              <view class="item-add" @click="addPatient">
                <text class="iconfont icon-hao"></text>
              </view>
            </view>
          </view>
        </view>
        <view
          :class="['order-wrap__btn', { active: patient_code }]"
          @click="patient_code && createOrder()"
          >确认挂号</view
        >
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import dhImage from '@/components/dh-image/dh-image.vue'
import { weekList, fillWeek } from '@/utils/week.js'
import { basepath } from '@/config/index.js'

export default {
  data() {
    return {
      doctor_id: '',
      department_id: '',
      tabIndex: 0,
      orderPopupStatus: false,
      model: {
        headimg: '',
        doctor_name: '',
        department_name: '',
        professional: '',
      },
      list: [],
      time: '',
      timeStatus: '',
      patientList: [],
      isShow: false,
      schemeList: [],
      week: weekList(),
      selectDate: '',
      postLock: false,
      hasSource: 0,
      price: 0,
      patient_code: 0,
      count: 0, //可添加的就诊人数
      schemeIndex: 0,
      scheme: [],
      patient_name: '',
      is_collect: false,
    }
  },
  components: { dhImage },

  computed: {
    ...mapState(['patientInfo']),
    dateStr() {
      return (
        this.selectDate +
        ' ' +
        weekList('星期')[moment(this.selectDate).isoWeekday() - 1]
      )
    },
  },
  onShow() {
    this.getPatientList()
  },
  onLoad() {
    if (this.patientInfo) {
      this.patient_code = this.patientInfo.patient_code
      this.patient_name = this.patientInfo.name
    }
    console.log(this.$Route.query)
    this.doctor_id = this.$Route.query.doctor_id
    this.department_id = this.$Route.query.department_id
    if (this.$Route.query.date) {
      this.selectDate = this.$Route.query.date
    } else {
      this.selectDate = moment().format('YYYY-MM-DD')
      this.isShow = true
    }
    this.getDetail()
    this.getSchemeList()
    this.isCollect()
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
    toFixed(price) {
      return parseFloat(price).toFixed(2)
    },
  },
  methods: {
    // 修改tab 索引
    handleSwitchItem(index) {
      this.tabIndex = index
    },
    getSchemeList() {
      this.$http
        .post(this.API.SCHEME_LIST, {
          date: this.selectDate,
          departmentid: this.department_id,
          doctor_id: this.doctor_id,
        })
        .then((res) => {
          this.schemeList = fillWeek(res.data)
          if (this.selectDate == '') {
            this.selectDate = res.data.date
          }
          this.getList()
        })
    },
    getDetail() {
      this.$http
        .post(this.API.DOCTOR_INFO, { id: this.doctor_id }, false)
        .then((res) => {
          this.model = res.data
        })
    },
    getList() {
      if (this.postLock) {
        return
      }
      this.postLock = true

      uni.showLoading({
        title: '获取医生排班中...',
      })

      this.$http
        .post(
          this.API.SCHEME_DETAIL,
          {
            department_id: this.department_id,
            date: this.selectDate,
            doctor_id: this.doctor_id,
          },
          false
        )
        .then((res) => {
          uni.hideLoading()
          this.postLock = false
          this.list = res.data
          this.scheme = res.scheme
        })
    },
    isCollect() {
      this.$http
        .post(this.API.IS_COLLECT, {
          doctor_id: this.doctor_id,
        })
        .then((res) => {
          this.is_collect = res.data
        })
    },
    addCollect() {
      if (this.model.doctor_id) {
        this.$http
          .post(this.API.ADD_COLLECT, {
            doctor_id: this.model.doctor_id,
            doctor_name: this.model.doctor_name,
            headimg: this.model.headimg,
            professional: this.model.professional,
            department_id: this.model.department_id,
            department_name: this.model.department_name,
          })
          .then((res) => {
            if (res.code == 20000) {
              this.is_collect = !this.is_collect
              uni.showToast({
                title: res.message,
                duration: 2000,
                icon: 'none',
              })
            }
          })
      }
    },
    goRegister(index) {
      var time = this.list[index]['time']
      this.time = this.getTime(time)
      var hour = time.split('--')[1].split(':')[0]
      this.timeStatus = hour > 12 ? 2 : 1
      this.price = this.list[index]['price']
      this.orderPopupStatus = true
      this.schemeIndex = index
    },
    getPatientList() {
      this.$http.post(this.API.PATIENT_LIST, {}, false).then((res) => {
        this.patientList = res.data
        this.count = res.count
      })
    },
    addPatient() {
      this.$Router.push({ name: 'medicalCardLogin' })
    },
    createOrder() {
      let scheme_id_index = this.scheme.findIndex((val) => {
        return val['qfsx'] == this.timeStatus
      })
      let schemeInfo = this.list[this.schemeIndex]['source']
      let serisl_number_index = schemeInfo.findIndex((item) => {
        return item.scheme_status == 0
      })
      var params = {
        price: this.price,
        department_name: this.model.department_name,
        doctor_name: this.model.doctor_name,
        selectDate: this.selectDate,
        time: this.time,
        patient_name: this.patient_name,
        scheme_id: this.scheme[scheme_id_index]['scheme_id'],
        serisl_number: schemeInfo[serisl_number_index]['serisl_number'],
        patient_code: this.patient_code,
        doctor_id: this.model.doctor_id,
        department_id: this.model.department_id,
        doctor_professional: this.model.professional,
      }
      this.$http.post(this.API.CREATE_REGISTER, params).then((res) => {
        if (res.code == 20000) {
          this.$Router.push({
            name: 'payment',
            params: { reg_no: res.data },
          })
        }
      })
    },
    getName(str) {
      if (str.length > 2) {
        return str.substr(-2, 2)
      } else {
        return str
      }
    },
    changeScheme(item) {
      if (!this.postLock && item && item.time != this.selectDate) {
        this.selectDate = item.time
        this.getList()
      }
    },
    // getHasSource(obj) {
    //   var list = Array.from(obj.source)
    //   var isSet = list.findIndex((item) => item.scheme_status === 0)
    //   return isSet == -1 ? true : false
    // },
    getTime(time) {
      return time.replace('--', '~')
    },
    changePatient(index) {
      this.patient_code = this.patientList[index]['patient_code']
      this.patient_name = this.patientList[index]['name']
      this.choicePatient(this.patientList[index]['id'])
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
    onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内分享按钮
        console.log(res.target)
      }
      return {
        title: this.model.doctor_name,
        path:
          '/pages/doctor/doctorDetail?doctor_id=' +
          this.model.doctor_id +
          '&department_id=' +
          this.model.department_id,
        // imageUrl:this.model.headimg||(basepath + '/static/wx/doctor.jpg')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  &__user {
    display: flex;
    padding: 30rpx;
    background: url('@/static/image/doctor_detail_img.jpg') no-repeat center
      bottom;
    background-size: 100%;
    .avatar {
      width: 124rpx;
      height: 164rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .info {
      flex: 1;
      font-size: 26rpx;
      color: #ffffff;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10rpx;
        .name {
          font-size: 32rpx;
        }
        .share {
          display: flex;
          align-items: center;
          &_icon {
            width: 62rpx;
            height: 62rpx;
            margin-right: 20rpx;
            &:last-child {
              margin-right: 0;
            }
            .img {
              width: 100%;
              height: 100%;
              display: block;
            }
            &.share_btn {
              background: url('~@/static/image/doctor_d_icon2.png') no-repeat;
              background-size: cover;
              .btn {
                height: 100%;
                background-color: transparent;
                margin: 0;
                padding: 0;
                color: transparent;
                &::after {
                  border: none;
                }
              }
            }
          }
        }
      }
      .subt {
        display: flex;
        margin: 15rpx 0;
        &-zc {
          margin-right: 40rpx;
        }
      }
    }
  }
  &__con {
    &-tab {
      display: flex;
      justify-content: space-evenly;
      background: #ffffff;
      margin-bottom: 15rpx;
      .item {
        position: relative;
        height: 80rpx;
        line-height: 80rpx;
        color: #333333;
        font-size: 30rpx;
        padding: 0 10rpx;

        &.active {
          color: #0ec698;
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4rpx;
            background: #0ec698;
          }
        }
      }
    }
    .register {
      &-list {
        &__cell {
          background: #ffffff;
          .title {
            display: flex;
            align-items: center;
            height: 86rpx;
            border-bottom: 1rpx solid #ededed;
            color: #999999;
            font-size: 30rpx;
            padding: 0 30rpx;
            .date {
              flex: 1;
            }
            .arrow {
              transition: all 0.5s;
              &.active {
                transform: rotate(-90deg);
              }
            }
          }
          .wrap_con__date {
            // display: flex;
            position: relative;
            margin-bottom: 20rpx;
            background: #ffffff;
            padding: 20rpx 0;
            border-top: 2rpx solid #e4e4e4;
            border-bottom: 2rpx solid #e4e4e4;
            .week-box {
              display: flex;
              text-align: center;
              margin-bottom: 10rpx;
              padding-bottom: 20rpx;
              border-bottom: 2rpx solid #e4e4e4;
              &__item {
                flex: 1;
              }
            }
            .list {
              // display: flex;
              // width: 660rpx;
              // overflow-x: auto;
              // white-space: nowrap;
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
                font-size: 32rpx;
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
              background: rgba($color: #ffffff, $alpha: 0.7);
              border-left: 1rpx solid #e9e9e9;
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
          & > .list {
            .item {
              display: flex;
              align-items: center;
              height: 90rpx;
              margin-bottom: 10rpx;
              padding: 0 30rpx;
              border-bottom: 2rpx solid #e9e9e9;
              &:last-child {
                margin-bottom: 0;
              }
              .date {
                flex: 1;
                color: #333333;
                font-size: 34rpx;
              }
              .rest_source {
                margin-right: 20rpx;
                font-size: 28rpx;
              }
              .price {
                color: #ff8c46;
                margin-right: 5rpx;
                font-size: 32rpx;
              }
              .arrow {
                color: #cdcdcd;
                .iconfont {
                  font-size: 35rpx;
                }
              }
              &-active {
                .date {
                  color: #999999;
                }
                .price {
                  color: #999999;
                }
              }
            }
            .nodata {
              min-height: 800rpx;
              text-align: center;
              .img {
                display: block;
                width: 194rpx;
                height: 171rpx;
                margin: 100rpx auto 0 auto;
              }
            }
          }
        }
      }
    }
    &-intr {
      color: #333333;
      font-size: 28rpx;
      padding: 30rpx;
      background: #fff;
      line-height: 50rpx;
    }
  }
  // 下单
  .order-wrap {
    &__info {
      padding: 40rpx 45rpx;
      &-user {
        display: flex;
        .avatar {
          width: 124rpx;
          height: 164rpx;
          margin-right: 40rpx;
          border-radius: 6rpx;
          overflow: hidden;
          .img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .info {
          flex: 1;
          &-cell {
            display: flex;
            font-size: 30rpx;
            margin-bottom: 20rpx;

            &:last-child {
              margin-bottom: 0;
            }
            &__label {
              color: #333333;
              font-size: 30rpx;
              margin-right: 15rpx;
            }
            &__text {
              color: #999999;
              &.price {
                color: #ff8c46;
              }
            }
          }
        }
      }
      &-con {
        padding-top: 30rpx;
        margin-top: 30rpx;
        border-top: 1rpx solid #c8c8c8;
        .bt {
          color: #333333;
          font-size: 30rpx;
        }
        .info {
          color: #979797;
          line-height: 60rpx;
        }
        .list {
          display: grid;
          grid-template-columns: repeat(6, 76rpx);
          justify-content: center;
          grid-gap: 20rpx 40rpx;
          margin-top: 30rpx;
          .item {
            width: 90rpx;
            height: 90rpx;
            line-height: 90rpx;
            border-radius: 50%;
            font-size: 30rpx;
            text-align: center;
            overflow: hidden;
            color: #78d395;
            border: 1rpx solid #78d395;
            // @include textOverflow(1);
            &.active {
              color: #ffffff;
              background: #0ec698;
            }
            &-add {
              width: 90rpx;
              height: 90rpx;
              line-height: 90rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1rpx solid #78d395;
              background: none;
              border-radius: 50%;
              color: #78d395;
            }
          }
        }
      }
    }
    &__btn {
      width: 100%;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      color: #ffffff;
      font-size: 32rpx;
      background: #cccccc;
      &.active {
        background: #0ec698;
      }
    }
  }
}
</style>
