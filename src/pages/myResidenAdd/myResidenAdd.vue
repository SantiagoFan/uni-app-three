<template>
  <view class="patient">
    <view class="patient-m">
      <view class="patient-m__massage">通过就诊人添加</view>
      <view class="patient-m__list" v-if="list.length>0">
        <view class="item" v-for="(item,index) in list" :key="index" >
          <view class="info">
            <view class="title">
              <view class="name">{{item.name}}</view>
            </view>
            <view class="code">院内诊疗号：{{item.patient_code}}</view>
          </view>
          <view :class="['icon',item.isChoice?'active':'']" @click="choicePatient(index)">
            <text class="iconfont icon-duihao2"></text>
          </view>
        </view>
      </view>
      <view class="nodata" v-else>
        暂无可添加的就诊人
      </view>
      <view class="patient-m__add" @click="handleClickAdd">
        <view class="patient-m__add-info">
          <view class="tit">添加就诊人</view>
          <view class="sub">还可添加{{count}}人</view>
        </view>
        <view class="patient-m__add-jt">
          <text class="iconfont icon-arrowb"></text>
        </view>
      </view>
      <view class="patient-m__btn" @click="addLivePatient">确认添加</view>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return{
      list: [],
      count: 0
    }
  },
  onShow(){
    this.getList();
  },
  methods: {
    getList(){
      this.$http.post(this.API.PATIENT_LIST,{status:1}).then(res=>{
        this.list = res.data;
        this.count = res.count;
      })
    },
    choicePatient(index){
       this.list.forEach((e) => {
        if (e.isChoice == true || e.isChoice == 1) {
          e.isChoice = false;
        }
      });
      this.list[index]['isChoice'] = !this.list[index]['isChoice'];
    },
    addLivePatient(){
      var that = this;
      var patient_code = "";
      that.list.forEach((e) => {
        if (e.isChoice == true || e.isChoice == 1) {
          patient_code = e.patient_code;
        }
      });
      if (patient_code=="") {
        uni.showToast({
          title: "请先选择住院人",
          duration: 2000,
          icon:'none',
        });
        return false;
      }
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
                  that.$store.dispatch("getDefaultPatient").then(()=>{
                     that.$Router.back(1)
                  })
                }
              })
          }
      });
    },
    handleClickAdd() {
      if(this.count<1){
          uni.showToast({
            title: "您添加的人数已经达到限制",
            duration: 2000,
            icon:'none',
          });
          return false;
      }else{
        this.$Router.push('/pages/medicalCardLogin/medicalCardLogin')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.patient {
  &-m {
    padding: 0 20rpx;
    &__massage {
      color: #afafaf;
      font-size: 26rpx;
      padding: 30rpx 0;
    }
    &__list {
      .item {
        display: flex;
        align-items: center;
        height: 156rpx;
        padding: 0 20rpx 0 30rpx;
        margin-bottom: 20rpx;
        background: #ffffff url('@/static/image/box_bg.png') no-repeat 70rpx -50rpx;
        background-size: 260rpx;
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
              color: #333333;
              font-size: 36rpx;
              margin-right: 15rpx;
            }
            .tag {
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
        .icon {
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
      }
    }
    .nodata{
      padding: 20rpx;
      text-align: center;
      // color: #999999;
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
        margin-right: 20rpx;
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
      &-jt {
        color: #cbcbcb;
        .iconfont {
          font-size: 35rpx;
        }
      }
    }
    &__btn {
      height: 80rpx;
      line-height: 80rpx;
      color: #ffffff;
      font-size: 30rpx;
      text-align: center;
      background: #0ec698;
      margin-top: 30rpx;
      border-radius: 10rpx;
    }
  }
}
</style>