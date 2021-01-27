<template>
  <view class="hospital">
    <view class="hospital-m">
      <view class="hospital-m__pic">
        <dh-image class="img" mode="widthFix" :src="banner" errorSrc="hos_pic.jpg"></dh-image>
      </view>
      <view class="hospital-m__wrap">
        <view class="hospital-m__wrap-info">
          <view class="logo">
            <dh-image class="img" mode="widthFix" :src="info.image" errorSrc="hos_logo.jpg"></dh-image>
            <view class="tag">{{ info.grade }}</view>
          </view>
          <view class="menu">
            <view class="menu-item">
              <view class="menu-item__icon">
                <text class="iconfont icon-dianhua"></text>
              </view>
              <view class="menu-item__text">{{ info.phone }}</view>
            </view>
            <view class="menu-item">
              <view class="menu-item__icon">
                <text class="iconfont icon-weizhi"></text>
              </view>
              <view class="menu-item__text">{{ info.address }}</view>
            </view>
          </view>
        </view>
        <u-gap height="20" bg-color="#f3f3f3"></u-gap>
        <view class="hospital-m__wrap-sta">
          <view class="bt">功能清单</view>
          <view class="menu">
            <router-link :to="{ name: 'department', params: { isDoctor: 0 } }" hover-class="none" class="menu-item">
              <view class="icon">
                <image class="img" mode="widthFix" src="@/static/image/hos_icon1.jpg" />
              </view>
              <view class="text">科室介绍</view>
            </router-link>
            <router-link :to="{ name: 'department', params: { isDoctor: 1 } }" hover-class="none" class="menu-item">
              <view class="icon">
                <image class="img" mode="widthFix" src="@/static/image/hos_icon2.jpg" />
              </view>
              <view class="text">医生介绍</view>
            </router-link>
            <navigator url="/pages/branchPlace/branchPlace" hover-class="none" class="menu-item">
              <view class="icon">
                <image class="img" mode="widthFix" src="@/static/image/hos_icon3.jpg" />
              </view>
              <view class="text">科室分布</view>
            </navigator>
          </view>
        </view>
        <u-gap height="20" bg-color="#f3f3f3"></u-gap>
        <view class="hospital-m__wrap-intr">
          <view class="bt">本院介绍</view>
          <view class="centent" v-html="info.content"> </view>
        </view>
        <u-gap height="20" bg-color="#f3f3f3"></u-gap>
      </view>
    </view>
  </view>
</template>

<script>
import dhImage from '@/components/dh-image/dh-image.vue'
export default {
  data() {
    return {
      info: {},
      banner: '',
    }
  },
  components: { dhImage },

  onShow() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$http.post(this.API.HOSPITAL_INFO).then((res) => {
        this.info = res.data.info
        this.banner = res.data.banner
      })
    },
    error(img) {
      this.$set()
      console.log(img)
      this.banner = require('@/static/image/' + img) //默认图片
    },
  },
}
</script>

<style lang="scss" scoped>
.hospital {
  &-m {
    &__pic {
      .img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    &__wrap {
      margin-top: -30rpx;
      .bt {
        display: flex;
        align-items: center;
        color: #040404;
        font-size: 28rpx;
        padding-left: 20rpx;
        &::before {
          display: block;
          width: 12rpx;
          height: 12rpx;
          border-radius: 50%;
          margin-right: 15rpx;
          background: #0ec698;
          content: '';
        }
      }
      &-info {
        padding: 30rpx;
        background: #ffffff;
        border-radius: 34rpx 34rpx 0 0;
        .logo {
          position: relative;
          width: 385rpx;
          margin-left: 20rpx;
          .img {
            width: 100%;
            height: auto;
            display: block;
          }
          .tag {
            position: absolute;
            color: #0ec698;
            font-size: 22rpx;
            left: 84rpx;
            bottom: -15rpx;
            line-height: 34rpx;
            padding: 0 10rpx;
            border: 1rpx solid #0ec698;
            border-radius: 6rpx;
          }
        }
        .menu {
          margin-top: 50rpx;
          &-item {
            display: flex;
            align-items: center;
            color: #333333;
            font-size: 26rpx;
            margin-bottom: 25rpx;
            padding-left: 30rpx;
            &:last-child {
              margin-bottom: 0;
            }
            &__icon {
              width: 40rpx;
              height: 40rpx;
              line-height: 40rpx;
              text-align: center;
              margin-right: 10rpx;
              color: #0ec698;
              .iconfont {
                font-size: 35rpx;
              }
            }
          }
        }
      }
      &-sta {
        padding: 30rpx;
        background: #ffffff;
        .menu {
          display: flex;
          justify-content: space-around;
          text-align: center;
          margin-top: 10rpx;
          &-item {
            .icon {
              width: 144rpx;
              .img {
                width: 100%;
                height: auto;
                display: block;
              }
            }
            .text {
              color: #161616;
              font-size: 28rpx;
              margin-top: 10rpx;
            }
          }
        }
      }
      &-intr {
        padding: 30rpx 30rpx 50rpx 30rpx;
        background: #ffffff;
        .centent {
          color: #333333;
          font-size: 24rpx;
          margin-top: 30rpx;
          p {
            text-indent: 2em;
            line-height: 45rpx;
          }
        }
      }
    }
  }
}
</style>
