<template>
  <view class="wrap">
    <view class="wrap-search">
      <view class="input-box">
        <input class="input" placeholder="请输入" />
      </view>
      <view class="btn">取消</view>
    </view>
    <u-gap height="10" bg-color="#f3f3f3"></u-gap>
    <view class="wrap-con">
      <view class="wrap-con__list">
        <view class="item" v-for="item in 3" :key="item">
          <view class="avatar">
            <image class="img" mode="aspectFill" src="@/static/image/doctor_avatar.jpg" />
          </view>
          <view class="info">
            <view class="title">
              <view class="name">特木其勒</view>
            </view>
            <view class="subt">
              <view class="subt-zc">职称：主任医师</view>
              <view class="subt-zw">职务：科室主任</view>
            </view>
            <view class="intr">擅长：以蒙医针灸五疗治疗疾病见长，并把针灸超长的应用到内、外、妇、儿科。</view>
          </view>
        </view>
      </view>
      <view class="wrap-con__more">
        <view class="text">查看更多</view>
        <view class="icon">
          <text class="iconfont icon-hao"></text>
        </view>
      </view>
    </view>
    <u-gap height="20" bg-color="#f3f3f3"></u-gap>
    <view class="wrap-branch">
      <view class="wrap-branch__bt">科室</view>
      <view class="wrap-branch__list">
        <view class="item">
          <view class="icon">
            <text class="iconfont icon-keshi"></text>
          </view>
          <view class="text">五疗科</view>
        </view>
         <view class="item">
          <view class="icon">
            <text class="iconfont icon-keshi"></text>
          </view>
          <view class="text">针灸推拿科</view>
        </view>
         <view class="item">
          <view class="icon">
            <text class="iconfont icon-keshi"></text>
          </view>
          <view class="text">针灸推拿科</view>
        </view>
         <view class="item">
          <view class="icon">
            <text class="iconfont icon-keshi"></text>
          </view>
          <view class="text">肺病科</view>
        </view>
         <view class="item">
          <view class="icon">
            <text class="iconfont icon-keshi"></text>
          </view>
          <view class="text">肝胆科</view>
        </view>
         <view class="item">
          <view class="icon">
            <text class="iconfont icon-keshi"></text>
          </view>
          <view class="text">心病科</view>
        </view>
      </view>
      <view class="wrap-branch__more">
        <view class="text">查看更多</view>
        <view class="icon">
          <text class="iconfont icon-hao"></text>
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
@import '@/assets/scss/mixin.scss';
.wrap {
  min-height: 100rpx;
  background: #ffffff;
  &-search {
    display: flex;
    align-items: center;
    padding: 20rpx;
    .input-box {
      display: flex;
      position: relative;
      align-items: center;
      background: #f1f1f1;
      height: 76rpx;
      padding: 0 30rpx 0 78rpx;
      flex: 1;
      &::before {
        content: '\e660';
        position: absolute;
        left: 30rpx;
        top: 50%;
        color: #afafaf;
        transform: translateY(-50%);
        font-family: 'iconfont';
      }
      .input {
        width: 100%;
        height: 50rpx;
        font-size: 28rpx;
      }
    }
    .btn {
      color: #0ec698;
      font-size: 28rpx;
      padding: 20rpx;
      margin-left: 20rpx;
    }
  }
  &-con {
    &__list {
      .item {
        display: flex;
        padding: 30rpx;
        background-size: 100%;
        border-bottom: 1rpx solid #d8d8d8;
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
          color: #989898;
          .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10rpx;
            .name {
              color: #333333;
              font-size: 32rpx;
            }
          }
          .subt {
            display: flex;
            margin: 15rpx 0;
            &-zc {
              margin-right: 40rpx;
            }
          }
          .intr {
            @include textOverflow(1);
          }
        }
      }
    }
    &__more {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88rpx;
      padding: 0 30rpx;
      color: #666666;
      font-size: 28rpx;
      .icon {
        color: #666666;
        .iconfont {
          font-size: 25rpx;
        }
      }
    }
  }
  &-branch {
    &__bt {
      height: 75rpx;
      line-height: 75rpx;
      padding: 0 30rpx;
      color: #333333;
      font-size: 28rpx;
    }
    &__list {
      border: 0 solid #d8d8d8;
      border-width: 1px 0;
      padding: 20rpx 40rpx;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 25rpx;
        color: #666666;
        font-size: 28rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .icon {
          color: #0ec698;
          margin-right: 20rpx;
          .iconfont {
            font-size: 40rpx;
          }
        }
      }
    }
    &__more {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88rpx;
      padding: 0 30rpx;
      color: #666666;
      font-size: 28rpx;
      .icon {
        color: #666666;
        .iconfont {
          font-size: 25rpx;
        }
      }
    }
  }
}
</style>