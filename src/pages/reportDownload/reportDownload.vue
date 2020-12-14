<template>
  <view class="report">
    <view class="report-wrap">
      <view class="report-wrap__title">血常规</view>
      <view class="report-wrap__info">
        <view class="item">
          <view class="label">就诊人：</view>
          <view class="text">姓名</view>
        </view>
        <view class="item">
          <view class="label">开方医生：</view>
          <view class="text">姓名</view>
        </view>
        <view class="item">
          <view class="label">性别：</view>
          <view class="text">男/女</view>
        </view>
        <view class="item">
          <view class="label">年龄：</view>
          <view class="text">0岁</view>
        </view>
        <view class="item">
          <view class="label">开方科室：</view>
          <view class="text">心脑科</view>
        </view>
        <view class="item">
          <view class="label">报告时间：</view>
          <view class="text">2020-07-18  10:30:34</view>
        </view>
      </view>
      <view class="report-wrap__table">
        <view class="table-th">
          <view class="item">检查项目</view>
          <view class="item">结果</view>
          <view class="item">单位</view>
          <view class="item">参考值</view>
        </view>
        <view class="table-con">
          <view class="table-con__td">
            <view class="item">*包细胞</view>
            <view class="item">7.53</view>
            <view class="item">x10^9/L</view>
            <view class="item">3.5-9.5</view>
          </view>
          <view class="table-con__td">
            <view class="item">*血红蛋白</view>
            <view class="item">4.11</view>
            <view class="item">x10^12/L</view>
            <view class="item">3.8-5.1</view>
          </view>
          <view class="table-con__td">
            <view class="item">*血红蛋白</view>
            <view class="item">127.00</view>
            <view class="item">G/L</view>
            <view class="item">115-150</view>
          </view>
          <view class="table-con__td">
            <view class="item">红细胞压积</view>
            <view class="item">39.10</view>
            <view class="item">%</view>
            <view class="item">35-45</view>
          </view>
          <view class="table-con__td">
            <view class="item">红细胞压积</view>
            <view class="item">95.10</view>
            <view class="item">FL</view>
            <view class="item">82-100</view>
          </view>
        </view>
      </view>
      <!-- <view class="report-wrap__btn">
        <view class="report-wrap__btn-box">下载报告</view>
      </view> -->
    </view>
  </view>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.report {
  padding: 20rpx;
  &-wrap {
    padding: 0 30rpx 160rpx 30rpx;
    background: #ffffff;
    border-radius: 10rpx;
    &__title {
      height: 100rpx;
      line-height: 100rpx;
      color: #333333;
      font-size: 34rpx;
      text-align: center;
    }
    &__info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20rpx;
      padding: 40rpx 0;
      border: 0 dashed #d7d7d7;
      border-width: 1rpx 0;
      .item {
        display: flex;
        font-size: 28rpx;
        &:nth-child(5),
        &:nth-child(6) {
          grid-column: span 2;
        }
        .label {
          color: #a2a2a2;
        }
        .text {
          flex: 1;
          color: #1e1e1e;
          @include textOverflow(1);
        }
      }
    }
    &__table {
      .table-th {
        display: grid;
        grid-template-columns: 230rpx repeat(3, 1fr);
        height: 84rpx;
        line-height: 84rpx;
        color: #a2a2a2;
        text-align: center;
        font-size: 30rpx;
        border-bottom: 1rpx solid #e4e4e4;
        .item {
          padding: 0 10rpx;
          @include textOverflow(1);
          &:first-child {
            text-align: left;
          }
        }
      }
      .table-con {
        display: grid;
        grid-row-gap: 20rpx;
        margin-top: 30rpx;
        &__td {
          display: grid;
          grid-template-columns: 230rpx repeat(3, 1fr);
          color: #1e1e1e;
          text-align: center;
          font-size: 28rpx;
          .item {
            padding: 0 10rpx;
            @include textOverflow(1);
            &:first-child {
              text-align: left;
            }
          }
        }
      }
    }
    &__btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 25rpx 35rpx;
      &-box {
        height: 80rpx;
        line-height: 80rpx;
        color: #ffffff;
        font-size: 30rpx;
        text-align: center;
        background: #0ec698;
        border-radius: 10rpx;
      }
    }
  }
}
</style>