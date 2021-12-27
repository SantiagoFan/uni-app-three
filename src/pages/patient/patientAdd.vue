<template>
  <view class="patient">
    <view class="patient-m">
      <view class="patient-m__list">
        <view
          @click="getDetail(item.idcard)"
          class="item"
          v-for="(item, index) in list"
          :key="index"
        >
          <view class="info">
            <view class="title">
              <view class="name">{{ item.name | hideIdRealName }}</view>
              <view class="tag" v-if="item.is_default">默认</view>
            </view>
            <view class="code">院内诊疗号：{{ item.patient_code }}</view>
          </view>
          <view class="arrow">
            <text class="iconfont icon-arrowb"></text>
          </view>
        </view>
      </view>
      <view class="patient-m__add" @click="handleClickAdd">
        <view class="patient-m__add-icon">
          <text class="iconfont icon-jiahao"></text>
        </view>
        <view class="patient-m__add-info">
          <view class="tit">添加就诊人</view>
          <view class="sub">还可添加{{ count }}人</view>  
        </view>
        <view class="patient-m__add-jt">
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
      count: 0,
    }
  },
  onLoad(query){
    // #ifdef MP-ALIPAY
    this.$reportCmPV_YL({ title: '在线建档', query })
    // #endif
  },
  onShow() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http.post(this.API.PATIENT_LIST).then((res) => {
        this.list = res.data
        this.count = res.count
      })
    },
    handleClickAdd() {
      if (this.count < 1) {
        uni.showToast({
          title: '您添加的人数已经达到限制',
          duration: 2000,
          icon: 'none',
        })
        return false
      } else {
        // this.$Router.push({ name: 'medicalCardLogin' }) // 改成只有一种添加方式了
        this.$Router.push({ name: 'medicalCardRegister' })
      }
    },
    getDetail(idcard) {
      this.$Router.push({
        name: 'patientDetail',
        params: { idcard: idcard },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.patient {
  &-m {
    padding: 20rpx;
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
              font-size: 26rpx;
              padding: 0 10rpx;
              border: 1rpx solid #a6a9a8;
              border-radius: 8rpx;
            }
          }
          .code {
            color: #898989;
            font-size: 30rpx;
            margin-top: 20rpx;
          }
        }
        .arrow {
          color: #cbcbcb;
          .iconfont {
            font-size: 35rpx;
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
          font-size: 32rpx;
        }
        .sub {
          color: #898989;
          font-size: 28rpx;
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
  }
}
</style>
