<template>
  <view class="patient">
    <view class="patient-m">
      <view class="patient-m__list">
        <view class="item" v-for="(item,index) in list" :key="index" @click="handleClickDetail">
          <view class="info">
            <view class="title">
              <view class="name">{{item.name}}</view>
              <view class="tag">默认</view>
            </view>
            <view class="code">住院号：{{item.live_code}}</view>
          </view>
          <view class="arrow">
            <text class="iconfont icon-arrowb"></text>
          </view>
        </view>
      </view>
      <view class="patient-m__add">
        <view class="patient-m__add-icon">
          <text class="iconfont icon-jiahao"></text>
        </view>
        <view class="patient-m__add-info">
          <view class="tit">添加住院人</view>
          <view class="sub">还可添加{{count}}人</view>
        </view>
        <view class="patient-m__add-arrow">
          <text class="iconfont icon-arrowb"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      count: 0
    }
  },
  onShow(){
    this.getList();
  },
  methods: {
     getList(){
      this.$http.post(this.API.LIVE_PAATIENT_LIST).then(res=>{
        this.list = res.data;
        this.count = res.count;
      })
    },
    addLivePatient(patient_code){
      var that = this;
       uni.showModal({
          title: '提示',
          content: "确定将该就诊人员添加为住院人吗？",
          success: function (res) {
              that.$http.post(that.API.LIVE_PATIENT_ADD,{patient_code:patient_code}).then(res=>{
                uni.showToast({
                  title: res.message,
                  duration: 2000,
                  icon:'none',
                });
                if(res.code==20000){
                  that.$Router.back(1);
                }
              })
          }
      });
    },
    addLivePatient(){
      this.$Router.push({path:"/pages/patientAdd/patientAdd",query:{is_live:true}});
    },
    handleClickDetail() {
      uni.navigateTo({
        url: '/pages/myResidentDetail/myResidentDetail'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.patient {
  &-m {
    padding: 30rpx 20rpx;
    &__list {
      .item {
        display: flex;
        align-items: center;
        height: 156rpx;
        padding: 0 30rpx;
        margin-bottom: 20rpx;
        color: #ffffff;
        border-radius: 10rpx;
        background: #0ec698 url('@/static/image/residents_item_bg.jpg') no-repeat right center;
        background-size: contain;
        &:last-child {
          margin-bottom: 0;
        }
        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          .title {
            display: flex;
            align-items: center;
            border-radius: 10rpx;
            .name {
              font-size: 36rpx;
              margin-right: 15rpx;
            }
            .tag {
              height: 32rpx;
              line-height: 32rpx;
              font-size: 20rpx;
              padding: 0 10rpx;
              color: rgba($color: #ffffff, $alpha: .65);
              border: 1rpx solid rgba($color: #ffffff, $alpha: .65);
              border-radius: 8rpx;
            }
          }
          .code {
            font-size: 24rpx;
            margin-top: 20rpx;
          }
        }
        .arrow {
          margin-right: -10rpx;
          .iconfont {
            font-size: 40rpx;
          }
        }
      }
    }
    &__add {
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 20rpx 0 30rpx;
      margin-top: 20rpx;
      background: #ffffff;
      border-radius: 10rpx;
      &-icon {
        color: #0ec698;
        .iconfont {
          font-size: 60rpx;
        }
      }
      &-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0 20rpx;
        .tit {
          color: #333333;
          font-size: 28rpx;
        }
        .sub {
          color: #898989;
          font-size: 24rpx;
          margin-top: 10rpx;
        }
      }
      &-arrow {
        color: #999999;
        .iconfont {
          font-size: 40rpx;
        }
      }
    }
  }
}
</style>