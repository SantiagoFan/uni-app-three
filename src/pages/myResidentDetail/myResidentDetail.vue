<template>
  <div class="wrap">
    <view class="wrap-info">
      <view class="wrap-info__user">
        <view class="wrap-info__user-name">{{model.patient_name}}</view>
        <view class="wrap-info__user-code">住院号：{{model.live_code}}</view>
      </view>
      <view class="wrap-info__sec">
        <view class="art">
          <view class="art-bt">住院人信息</view>
          <view class="art-list">
            <view class="cell">
              <view class="label">住院科室</view>
              <view class="text">{{model.department_name}}</view>
            </view>
          </view>
        </view>
        <view class="art">
          <view class="art-bt">住院人信息</view>
          <view class="art-list">
            <view class="cell">
              <view class="label">押金总金额</view>
              <view class="text">{{model.total_amount}}</view>
            </view>
            <view class="cell">
              <view class="label">住院总消费</view>
              <view class="text">{{model.consume_amount}}</view>
            </view>
            <view class="cell">
              <view class="label">剩余押金</view>
              <view class="text">{{model.balance}}</view>
            </view>
          </view>
        </view>
      </view>
      <view @click="goDetail" class="wrap-info__bill">
        <view class="wrap-info__bill-text">住院费用日清单</view>
        <view class="wrap-info__bill-arrow">
          <text class="iconfont icon-arrowb"></text>
        </view>
      </view>
    </view>
    <view class="wrap-btn">删除住院人</view>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        model: ""
      }
    },
    onLoad(){
      this.getDetail();
    },
    methods:{
      getDetail(){
        this.$http.post(this.API.LIVE_PATIENT_DETAIL,{id:this.$Route.query.id}).then(res=>{
          this.model = res.data;
        })
      },
      goDetail(){
        this.$Router.push({path:'/pages/myResidentBill/myResidentBill',query:{patient_code:this.model.patient_code}});
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap {
  padding: 30rpx 20rpx;
  &-info {
    padding: 0 30rpx;
    background: #ffffff;
    border-radius: 10rpx;
    box-shadow: 0 0 15rpx rgba($color: #2a2b2b, $alpha: .15);
    &__user {
      padding: 30rpx 0;
      border-bottom: 2rpx dashed #eaeaea;
      &-name {
        color: #333333;
        font-size: 32rpx;
      }
      &-code {
        color: #999999;
        font-size: 24rpx;
        margin-top: 20rpx;
      }
    }
    &__sec {
      .art {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #f4f4f4;
        &-bt {
          color: #0ec698;
          font-size: 30rpx;
        }
        &-list {
          margin-top: 30rpx;
          .cell {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 24rpx;
            margin-bottom: 30rpx;
            &:last-child {
              margin-bottom: 0;
            }
            .label {
              color: #999999;
            }
            .text {
              color: #333333;
            }
          }
        }
      }
    }
    &__bill {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100rpx;
      &-text {
        color: #333333;
        font-size: 28rpx;
      }
      &-arrow {
        color: #666666;
        .iconfont {
          font-size: 35rpx;
        }
      }
    }
  }
  &-btn {
    width: 660rpx;
    height: 86rpx;
    line-height: 86rpx;
    text-align: center;
    color: #333333;
    font-size: 32rpx;
    margin: 60rpx auto 0 auto;
    border-radius: 8rpx;
    border: 1rpx solid #bfbfbf;
  }
}
</style>