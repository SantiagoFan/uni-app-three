<template>
	<view class="index-container">
		<view class="index-main">
      <view class="top_pic">
        <image class="img" mode="widthFix" src="@/static/image/index_img01.jpg" />
      </view>
      <view class="index-wrap">
        <view class="index-wrap__user">
          <view class="index-wrap__user-info">
            <view v-if="noBindCard">
              <view class="title">
                <view class="name">{{name}}</view>
                <view class="tag">电子就诊卡</view>
                <navigator url="/pages/patientAdd/patientAdd" class="check">切换</navigator>
              </view>
              <view class="code">院内诊疗号：1000000182574</view>
            </view>
            <navigator
              url="/pages/medicalCardLogin/medicalCardLogin"
              hover-class="none"
              class="add_btn"
              v-else
            >
              <view class="add_btn__icon">
                <text class="iconfont icon-add-fill"></text>
              </view>
              <view class="add_btn__text">添加就诊卡</view>
            </navigator>
          </view>
          <view class="index-wrap__user-pic">
            <image class="img" mode="widthFix" src="@/static/image/index_rw.png" />
          </view>
        </view>
        <view class="index-wrap__art1">
          <navigator url="/pages/registerRecord/registerRecord" hover-class="none" class="index-wrap__art1-item">挂号记录</navigator>
          <navigator url="/pages/payRecord/payRecord" hover-class="none" class="index-wrap__art1-item">缴费记录</navigator>
          <view class="index-wrap__art1-item" @click="handleVisitCode">就诊码</view>
        </view>
        <u-gap height="20" bg-color="#f6f6f6"></u-gap>
        <view class="index-wrap__art2">
          <navigator url="/pages/branchList/branchList" hover-class="none" class="index-wrap__art2-item">
            <view class="img-box">
              <image class="img" mode="widthFix" src="@/static/image/index-type1.jpg" />
            </view>
            <view class="title">在线挂号</view>
            <view class="subt">实时查看医生情况</view>
          </navigator>
          <navigator url="/pages/awaitPay/awaitPay" hover-class="none" class="index-wrap__art2-item">
            <view class="img-box">
              <image class="img" mode="widthFix" src="@/static/image/index-type2.jpg" />
            </view>
            <view class="title">门诊缴费</view>
            <view class="subt">快速缴费不排队</view>
          </navigator>
          <navigator url="/pages/myResidentServe/myResidentServe" hover-class="none" class="index-wrap__art2-item">
            <view class="img-box">
              <image class="img" mode="widthFix" src="@/static/image/index-type3.jpg" />
            </view>
            <view class="title">住院服务</view>
            <view class="subt">省心省力安心养病</view>
          </navigator>
        </view>
        <u-gap height="20" bg-color="#f6f6f6"></u-gap>
        <view class="index-wrap__art3">
          <view class="index-wrap__art3-tab">
            <view
              :class="['item', {active: typeIndex === index}]"
              v-for="(item, index) in typeList"
              :key="index"
              @click="handleTypeItem(index)"
          >{{item.text}}</view>
          </view>
          <view class="index-wrap__art3-con">
            <view class="list" v-if="typeIndex === 0">
              <navigator
                class="item"
                v-for="(item, index) in list1"
                :key="index"
                :url="item.url"
                :open-type="item.openType"
                hover-class="none"
              >
                <view class="icon">
                  <image class="img" mode="widthFix" :src="item.image" />
                </view>
                <view class="text">{{item.title}}</view>
              </navigator>
            </view>
            <view class="list" v-if="typeIndex === 1">
              <navigator
                :url="item.url"
                hover-class="none"
                class="item"
                v-for="(item, index) in list2"
                :key="index"
              >
                <view class="icon">
                  <image class="img" mode="widthFix" :src="item.image" />
                </view>
                <view class="text">{{item.title}}</view>
              </navigator>
            </view>
          </view>
        </view>
        <u-gap height="20" bg-color="#f6f6f6"></u-gap>
      </view>
    </view>
    <u-popup
      v-model="visitCodeShow"
      mode="center"
      :closeable="true"
      :close-icon-size="40"
      :border-radius="10"
    >
			<view class="visit-wrap">
        <view class="visit-wrap__name">姓名</view>
        <view class="visit-wrap__code">
          <image class="img" mode="aspectFill" src="@/static/image/code1.jpg" />
        </view>
      </view>
		</u-popup>
	</view>
</template>

<script>
import indexList from '@/common/index.data.js'
export default {
  data() {
    return {
      typeIndex: 0,
      name: '',
      typeList: [{
        text: '门诊'
      },{
        text: '住院'
      }],
      noBindCard: true, // 是否绑定就诊卡 true:是 falseL 否
      list1: indexList.list1,
      list2: indexList.list2,
      visitCodeShow: false // 就诊码
    }
  },
  watch: {
    visitCodeShow(status) {
      status ? uni.hideTabBar() : uni.showTabBar()
    }
  },
  onShow() {
    const token = uni.getStorageSync('token')
    this.name = token
    this.noBindCard = token ? true : false
  },
  methods: {
    handleTypeItem(index) {
      this.typeIndex = index
    },
    // 就诊码
    handleVisitCode() {
      this.visitCodeShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.index-container {
  .index-main {
    .top_pic {
      .img {
        width: 100%;
        display: block;
      }
    }
    .index-wrap {
      position: relative;
      background: #ffffff;
      margin-top: -80rpx;
      padding-top: 80rpx;
      border-radius: 35rpx 35rpx 0 0;
      &__user {
        display: flex;
        align-items: center;
        position: absolute;
        top: -80rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 680rpx;
        height: 160rpx;
        padding: 0 25rpx;
        border-radius: 20rpx;
        box-shadow: 0 10rpx 12rpx rgba($color: #61b47c, $alpha: .2);
        background: #ffffff url('@/static/image/box_bg.png') no-repeat 18rpx 18rpx;
        background-size: 250rpx;
        &-info {
          color: #0ec698;
          font-size: 24rpx;
          .add_btn {
            display: inline-flex;
            align-items: center;
            height: 82rpx;
            padding: 0 30rpx;
            color: #0ec698;
            border: 1rpx solid #0ec698;
            border-radius: 20rpx;
            &__icon {
              margin-right: 20rpx;
              .iconfont {
                font-size: 45rpx;
              }
            }
            &__text {
              font-size: 32rpx;
            }
          }
          .title {
            display: flex;
            align-items: center;
            margin-bottom: 20rpx;
            .name {
              max-width: 110rpx;
              font-size: 36rpx;
              font-weight: bold;
              word-wrap:break-word;
              @include textOverflow(1);
            }
            .tag {
              height: 32rpx;
              line-height: 32rpx;
              font-size: 20rpx;
              margin: 0 25rpx;
              padding: 0 10rpx;
              border: 1rpx solid #0ec698;
              border-radius: 10rpx;
            }
            .check {
              width: 92rpx;
              height: 40rpx;
              line-height: 40rpx;
              text-align: center;
              color: #ffffff;
              background: #0fd1a1;
              border-radius: 20rpx;
            }
          }
        }
        &-pic {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 280rpx;
          .img {
            width: 100%;
            height: auto;
            display: block;
          }
        }
      }
      &__art1 {
        display: flex;
        align-items: center;
        height: 124rpx;
        &-item {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #040404;
          font-size: 28rpx;
          &::before {
            content: '';
            width: 12rpx;
            height: 12rpx;
            border-radius: 50%;
            margin-right: 15rpx;
            background: #0ec698;
            display: block;
          }
        }
      }
      &__art2 {
        display: flex;
        padding: 50rpx 0;
        &-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          .img-box {
            width: 120rpx;
            .img {
              width: 100%;
              height: auto;
              display: block;
            }
          }
          .title {
            color: #161616;
            font-size: 28rpx;
            margin: 10rpx 0;
          }
          .subt {
            color: #bababa;
            font-size: 24rpx;
          }
        }
      }
      &__art3 {
        padding: 25rpx 0 40rpx 0;
        &-tab {
          display: flex;
          align-items: center;
          color: #333333;
          font-size: 26rpx;
          padding: 0 35rpx;
          .item {
            position: relative;
            margin-right: 40rpx;
            &:last-child {
              margin-right: 0;
            }
            &.active {
              transform: scale(1.4);
              &::after {
                content: '';
                position: absolute;
                left: 50%;
                bottom: -15rpx;
                transform: translateX(-50%);
                width: 80%;
                height: 5rpx;
                background: #0ec698;
                border-radius: 2rpx;
              }
            }
          }
        }
        &-con {
          margin-top: 70rpx;
          .list {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-row-gap: 50rpx;
            .item {
              display: flex;
              flex-direction: column;
              align-items: center;
              .icon {
                width: 96rpx;
                height: 96rpx;
                background: #f2f2f2;
                .img {
                  width: 100%;
                  height: auto;
                  display: block;
                }
              }
              .text {
                color: #333333;
                font-size: 26rpx;
                margin-top: 15rpx;
              }
            }
          }
        }
      }
    }
  }
  // 就诊码
  .visit-wrap {
    width: 560rpx;
    height: 560rpx;
    padding: 40rpx;
    &__name {
      color: #333333;
      font-size: 36rpx;
    }
    &__code {
      width: 310rpx;
      height: 310rpx;
      margin: 70rpx auto 0 auto;
      .img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>