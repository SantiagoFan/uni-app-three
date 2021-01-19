<template>
  <view class="my-container">
    <view class="my-main">
      <view class="my-wrap">
        <view class="my-wrap__info">
          <view class="art1">
            <view class="art1_avatar">
              <image class="img" mode="aspectFill" :src="userInfo.headimgurl" />
            </view>
            <view class="art1_info">
              <view class="art1_info__name">{{ userInfo.nickname }}</view>
              <view
                @click="goDetail"
                hover-class="none"
                class="art1_info__count"
                v-if="patientInfo"
              >
                <view class="text">
                  就诊卡 <text class="num">{{ count }}</text> 张</view
                >
                <view class="jt">
                  <text class="iconfont icon-arrowb"></text>
                </view>
              </view>
            </view>
          </view>
          <view
            @click="goPatientDetail(patientInfo.id)"
            hover-class="none"
            class="art2"
            v-if="patientInfo"
          >
            <view class="art2_title">
              <view class="art2_title__name">{{
                getName(patientInfo.name)
              }}</view>
              <view class="art2_title__tag">
                <view class="art2_title__tag-item">默认卡</view>
                <view class="art2_title__tag-item">电子就诊卡</view>
              </view>
            </view>
            <view class="art2_subt"
              >院内诊疗号：{{ patientInfo.patient_code }}</view
            >
          </view>
          <view class="art2" v-else @click="addPatient">
            <view class="art2_none">
              <text class="iconfont icon-hao"></text> 添加就诊卡
            </view>
          </view>
        </view>
        <view class="my-wrap__list">
          <navigator url="/pages/registerRecord/registerRecord" class="item">
            <view class="item__icon">
              <image
                class="img"
                mode="widthFix"
                src="@/static/image/my_icon1.png"
              />
            </view>
            <view class="item__text">挂号记录</view>
            <view class="item__jt">
              <text class="iconfont icon-arrowb"></text>
            </view>
          </navigator>
          <navigator url="/pages/payRecord/payRecord?type=0" class="item">
            <view class="item__icon">
              <image
                class="img"
                mode="widthFix"
                src="@/static/image/my_icon2.png"
              />
            </view>
            <view class="item__text">门诊缴费记录</view>
            <view class="item__jt">
              <text class="iconfont icon-arrowb"></text>
            </view>
          </navigator>
          <navigator url="/pages/payRecord/payRecord?type=1" class="item">
            <view class="item__icon">
              <image
                class="img"
                mode="widthFix"
                src="@/static/image/my_icon3.png"
              />
            </view>
            <view class="item__text">诊间支付缴费记录</view>
            <view class="item__jt">
              <text class="iconfont icon-arrowb"></text>
            </view>
          </navigator>
          <navigator url="/pages/payRecord/payRecord?type=2" class="item">
            <view class="item__icon">
              <image
                class="img"
                mode="widthFix"
                src="@/static/image/my_icon4.png"
              />
            </view>
            <view class="item__text">住院缴费记录</view>
            <view class="item__jt">
              <text class="iconfont icon-arrowb"></text>
            </view>
          </navigator>
          <navigator url="/pages/myCollect/myCollect" class="item">
            <view class="item__icon">
              <image
                class="img"
                mode="widthFix"
                src="@/static/image/my_icon5.png"
              />
            </view>
            <view class="item__text">我的收藏</view>
            <view class="item__jt">
              <text class="iconfont icon-arrowb"></text>
            </view>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      count: 0,
    };
  },
  onShow() {
    this.getIndex();
  },
  computed: {
    ...mapState(["userInfo", "patientInfo"]),
  },
  methods: {
    getName(str) {
      if (str.length > 2) {
        return str.substr(-2, 2);
      } else {
        return str;
      }
    },
    getIndex() {
      this.$http.post(this.API.MEMBER_INDEX).then((res) => {
        this.count = res.data;
      });
    },
    goDetail() {
      this.$Router.push("/pages/patientAdd/patientAdd");
    },
    goPatientDetail(id) {
      this.$Router.push({
        path: "/pages/patientDetail/patientDetail",
        query: { id: id },
      });
    },
    addPatient() {
      this.$Router.push("/pages/medicalCardLogin/medicalCardLogin");
    },
  },
};
</script>

<style lang="scss" scoped>
.my-container {
  min-height: 100vh;
  background: #fff;
  border-top: 1rpx solid #f6f6f6;
  .my-main {
    .my-wrap {
      &__info {
        position: relative;
        padding: 35rpx 35rpx 40rpx 35rpx;
        &::after {
          content: "";
          position: absolute;
          width: 680rpx;
          border-top: 1rpx solid #f6f6f6;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .art1 {
          display: flex;
          &_avatar {
            width: 120rpx;
            height: 120rpx;
            border-radius: 20rpx;
            overflow: hidden;
            .img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          &_info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20rpx;
            &__name {
              color: #333333;
              font-size: 36rpx;
              font-weight: bold;
            }
            &__count {
              display: flex;
              align-items: center;
              color: #898989;
              font-size: 26rpx;
              margin-top: 15rpx;
              .num {
                color: #0ec698;
                margin: 0 10rpx;
              }
              .jt {
                color: #cdcdcd;
              }
            }
          }
        }
        .art2 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 160rpx;
          color: #fff;
          font-size: 24rpx;
          padding: 0 25rpx;
          margin-top: 40rpx;
          background: url("@/static/image/my_info_bg.jpg") no-repeat;
          background-size: 100% 100%;
          border-radius: 20rpx;
          &_title {
            display: flex;
            align-items: center;
            &__name {
              font-size: 36rpx;
              font-weight: bold;
              margin-right: 20rpx;
            }
            &__tag {
              display: flex;
              align-items: center;
              &-item {
                line-height: 34rpx;
                border: 1rpx solid #fff;
                font-size: 20rpx;
                margin-right: 20rpx;
                padding: 0 12rpx;
                border-radius: 8rpx;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
          &_subt {
            margin-top: 15rpx;
          }
          &_none {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36rpx;
            letter-spacing: 4rpx;
            .iconfont {
              font-size: 28rpx;
              margin-right: 10rpx;
              font-weight: bold;
            }
          }
        }
      }
      &__list {
        margin-top: 30rpx;
        .item {
          display: flex;
          align-items: center;
          height: 80rpx;
          padding: 0 35rpx;
          margin-bottom: 20rpx;
          &:last-child {
            margin-bottom: 0;
          }
          &__icon {
            width: 60rpx;
            margin-right: 35rpx;
            .img {
              width: 100%;
              height: auto;
              display: block;
            }
          }
          &__text {
            flex: 1;
            color: #040404;
            font-size: 30rpx;
          }
          &__jt {
            color: #797979;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
