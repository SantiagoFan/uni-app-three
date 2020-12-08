<template>
  <view class="wrap">
    <view class="wrap-title">眼科</view>
    <view class="wrap-con">
      <view class="wrap-con__bt">
        <view class="icon">
          <text class="iconfont icon-keshi"></text>
        </view>
        <view class="text">科室简介</view>
      </view>
      <view class="wrap-con__sec">
        <view class="art">
          <view class="art-bt">科室特色</view>
          <view class="art-content">呼和浩特市蒙中医院眼科注重发挥中西医结合优势，擅长运用中西医结合的方法治疗结膜炎、角膜炎、干眼、视疲劳、眼底出血性病变、视神经病变、年龄相关性黄斑变性等，在内服中药的同时，加用中医特色局部治疗，内外兼治，对常见和高发的眼底病如糖尿病视网膜病变、年龄相关性黄斑变性、缺血性视神经病变、玻璃体积血等在临床中取得了较佳的疗效，同时针药并用治疗角膜炎、色素膜炎、斜视、弱视、干眼、视疲劳等亦有优势</view>
        </view>
        <view class="art">
          <view class="art-bt">诊疗范围</view>
          <view class="art-content">用中西医结合方法治疗眼表疾病、色素膜炎、白内障、青光眼、高血压视网膜病变、糖尿病视网膜病变、年龄相关性黄斑变性、缺血性视神经病变、玻璃体积血、屈光不正等各种眼疾。</view>
        </view>
        <view class="art">
          <view class="art-bt">科室设备</view>
          <view class="art-content">裂隙灯、检眼镜、进口非接触式眼压计、电脑验光仪、电脑视野仪、眼科A/B超、免散瞳眼底照相机等现代化诊疗仪器，眼科手术显微镜、超声乳化手术系统等先进的手术设备。</view>
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
.wrap {
  color: #333333;
  &-title {
    padding: 30rpx;
    font-size: 32rpx;
    text-align: center;
  }
  &-con {
    padding: 0 30rpx 50rpx 30rpx;
    &__bt {
      display: flex;
      align-items: center;
      color: #0ec698;
      font-size: 28rpx;
      .icon {
        margin-right: 10rpx;
        .iconfont {
          font-size: 30rpx;
        }
      }
      .text {
        font-weight: bold;
      }
    }
    &__sec {
      margin-top: 20rpx;
      .art {
        margin-bottom: 20rpx;
        &:last-child {
          margin-bottom: 0;
        }
        &-bt {
          display: flex;
          align-items: center;
          font-size: 26rpx;
          font-weight: bold;
          &::before {
            content: '';
            width: 4rpx;
            height: 20rpx;
            background: #0ec698;
            margin-right: 10rpx;
            border-radius: 2rpx;
          }
        }
        &-content {
          font-size: 24rpx;
          line-height: 50rpx;
          text-indent: 2em;
          margin-top: 10rpx;
        }
      }
    }
  }
}
</style>