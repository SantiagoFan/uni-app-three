<template>
  <view class="record-d">
    <view class="record-d-main">
      <view class="record-d-main__status">
        <view class="title">
          <view class="icon">
            <text class="iconfont icon-duihao"></text>
          </view>
          <view class="text">缴费成功</view>
        </view>
        <view class="massage">请凭手机缴费页面和处方单，及时到对应科室执行项目。<br>如需打印发票，请到收费窗口咨询。</view>
      </view>
      <view class="record-d-main__proof">
        <view class="bt">就诊凭条</view>
        <view class="con">
          <view class="code-pic">
            <!-- <image class="img" mode="widthFix" src="@/static/image/code.jpg" /> -->
          </view>
          <view class="code-num">10000000354635465</view>
        </view>
      </view>
      <view class="record-d-main__info">
        <view class="wrap">
          <view class="wrap__bt">就诊信息</view>
          <view class="wrap__list">
            <view class="item">
              <view class="label">就诊人</view>
              <view class="text">姓名</view>
            </view>
            <view class="item">
              <view class="label">就诊卡号</view>
              <view class="text">10000000002435464</view>
            </view>
            <view class="item">
              <view class="label">医院名称</view>
              <view class="text">呼和浩特市蒙医中医医院</view>
            </view>
          </view>
        </view>
        <view class="wrap">
          <view class="wrap__bt">导诊信息</view>
          <view class="wrap__list">
            <view class="item">
              <view class="label">超声医学科</view>
              <view class="text">门诊北区   一楼超声医学科A区</view>
            </view>
            <view class="item">
              <view class="label">皮肤科门诊</view>
              <view class="text">门诊北区   一楼皮肤科门诊</view>
            </view>
            <view class="item">
              <view class="label">心电图室</view>
              <view class="text">门诊中区三楼普外科门诊区</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.record-d {
  &-main {
    &__status {
      padding: 30rpx;
      color: #ffffff;
      background: #0ec698;
      .title {
        display: flex;
        align-items: center;
        .icon {
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          border-radius: 50%;
          color: #0ec698;
          margin-right: 20rpx;
          background: #fff;
        }
        .text {
          font-size: 48rpx;
        }
      }
      .massage {
        font-size: 26rpx;
        margin-top: 30rpx;
      }
    }
    &__proof {
      padding: 30rpx;
      background: #fff;
      .con {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20rpx;
        .code-pic {
          width: 610rpx;
          .img {
            width: 100%;
            height: auto;
            display: block;
          }
        }
      }
    }
    &__info {
      padding: 20rpx;
      .wrap {
        padding: 30rpx;
        margin-bottom: 20rpx;
        background: #ffffff;
        border-radius: 10rpx;
        &:last-child {
          margin-bottom: 0;
        }
        &__bt {
          color: #484848;
          font-size: 28rpx;
        }
        &__list {
          margin-top: 20rpx;
          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 50rpx;
            color: #3f3f3f;
            font-size: 26rpx;
            margin-bottom: 15rpx;
            &:last-child {
              margin-bottom: 0;
            }
            .label {
              color: #a8a8a8;
            }
          }
        }
      }
    }
  }
}
</style>