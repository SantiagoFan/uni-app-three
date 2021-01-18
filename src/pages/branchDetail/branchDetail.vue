<template>
  <view class="wrap">
    <view class="wrap_top">
      <view class="wrap_top__date" v-if="tabIndex===0">日期：{{selectDate}}</view><!-- 按日期预约显示 -->
      <view class="wrap_top__date" v-else></view><!-- 按日期预约显示 -->
      <view class="wrap_top__tab">
        <view :class="['wrap_top__tab-cell', {active: tabIndex === 1}]" @click="handleTabItem(0)">按日期预约</view>
        <view :class="['wrap_top__tab-cell', {active: tabIndex === 0}]" @click="handleTabItem(1)">按医生预约</view>
      </view>
    </view>
    <view class="wrap_con">
      <view :class="['wrap_con__date',{active:isOpen}]" v-if="tabIndex===0">
        <view class="week-box" v-if="isOpen">
          <view class="week-box__item" v-for="(item,index) in week" :key="index">{{item}}</view>
        </view>
        <view :class="['list', {active: isOpen}]">
          <view  class="item" v-for="(item, index) in schemeList" :key="index" @click="changeScheme(item)">
            <view v-if="!isOpen" class="week">{{item.week}}</view>
            <view v-if='item' :class="['con', {active: item.date==selectDate}]">
              <view class="count" :style="{color: item.is_exist == 1?'#0ec698': ''}">{{item.day}}</view>
              <view class="status">{{item.is_exist==1?'有':'无'}}</view>
            </view>
          </view>
        </view>
        <view class="arrow" @click="openDate()">
          <view :class="['icon', {active: isOpen}]">
            <text class="iconfont icon-shang"></text>
          </view>
        </view> 
      </view>
      <view class="wrap_con__list">
        <view @click="goDetail(item.id)" class="cell" v-for="(item,index) in doctorList" :key="index">
          <view class="cell__avatar">
            <image class="img" mode="aspectFill" :src="item.headimg" />
          </view>
          <view class="cell__info">
            <view class="title">
              <view class="name">{{item.name}}</view>
              <view class="right">
                <view class="sur" v-if="item.is_exist == 1">余号:{{item.least_source}}</view>
                 <view class="tag" v-if="item.is_exist==1">￥{{item.price}}</view>
                <view class="tag" v-if="item.is_exist==0">满诊</view>
              </view>
            </view>
            <view class="post">职称：{{item.professional}}</view>
            <view class="content">{{item.speciality}}</view>
          </view>
        </view>
        <view class="nodata" v-if="doctorList.length<=0">
          暂无医生
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment"
export default {
  data() {
    return {
      calendarShow: false,
      tabIndex: 0,
      isOpen: false, // 是否展开日期
      doctorList: [],
      schemeList: [],
      selectDate:"",
      week:["周一","周二","周三","周四","周五","周六","周日"],
      open_scheme_list:[],
      postLock:false
    }
  },
  onLoad(){
    this.getSchemeList();
  },
  methods: {
    change (e) {
      console.log('e==', e)
    },
    handleTabItem(index) {
      this.tabIndex = index
      this.selectDate = this.tabIndex==0?this.selectDate:''
      this.getDoctorList()
    },
    getDoctorList(){
      var data = {
        departmentid:this.$Route.query.departmentid,
        date:this.selectDate
      };

      if(this.postLock){
        return;
      }
      this.postLock=true;
      uni.showLoading({
          title: '加载中'
      });
      this.$http.post(this.API.DOCTOR_LIST,data).then(res=>{
        this.doctorList = res.data;
        this.postLock=false
        uni.hideLoading()
      })
    },
    goDetail(id){
      this.$Router.push({path:'/pages/doctorDetail/doctorDetail',query:{id:id,date:this.selectDate}});
    },
    getSchemeList(){
      this.$http.post(this.API.SCHEME_LIST,{departmentid:this.$Route.query.departmentid}).then(res=>{
        this.origin_scheme=res.data;
        this.schemeList = res.data;
        if(res.data.length>0){
          this.selectDate=res.data[0].date;
        }
      }).then(res=>{
        this.getDoctorList();
      })
    },
    changeScheme(item){
      if(!this.postLock&&item&&item.date!=this.selectDate){
        this.selectDate = item.date;
        this.getDoctorList();
      }
    },
    changeList(arr){
      var newArray = arr.filter(value => Object.keys(value).length!== 0);
      return newArray;
    },
    openDate(){
      this.isOpen=!this.isOpen
      this.schemeList=[];
      let data=JSON.parse(JSON.stringify(this.origin_scheme))
      if(this.isOpen){
        for (let i = 0; i < data.length; i++) {
          if(i==0){
            let first=moment(data[i])
            for(let j=0;j<first.isoWeekday()-1;j++){
              this.schemeList.push(null);
            }
          }
          this.schemeList.push(data[i]);
          if(i==data.length-1){
            let end=moment(data[i])
            for(let j=0;j<7-end.isoWeekday();j++){
              this.schemeList.push(null);
            }
          }
        }
      }else{
        this.schemeList=data
      }
    }
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
      font-size: 26rpx;
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
        font-size: 24rpx;
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
      padding: 20rpx 0;
      border-top: 2rpx solid #e4e4e4;
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
          font-size: 22rpx;
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
            width: 65rpx;
            height: 65rpx;
            border-radius: 50%;
            .count {
              color: #666666;
              font-size: 24rpx;
            }
            .status {
              color: #bcbcbc;
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
        background: rgba($color: #ffffff, $alpha: .7);
        .icon {
          position: relative;
          width: 36rpx;
          height: 36rpx;
          margin: auto;
          color: #ffffff;
          text-align: center;
          background: #0ec698;
          border-radius: 50%;
          transition: all .5s;
          .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 20rpx;
          }
          &.active {
            transform: rotate(180deg)
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
          font-size: 24rpx;
          .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #484848;
            font-size: 28rpx;
            .right {
              display: flex;
              align-items: center;
              .sur {
                color: #333333;
                font-size: 24rpx;
                margin-right: 25rpx;
              }
              .tag {
                width: 84rpx;
                height: 40rpx;
                line-height: 40rpx;
                color: #ffffff;
                font-size: 24rpx;
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
    .nodata{
      text-align: center;
      padding: 20rpx;
      color: #999999;
    }
  }
}
</style>