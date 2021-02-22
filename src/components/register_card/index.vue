<template>
  <view class="container">
    <view class="showReg">
      <view
        class="pop-item"
        v-if="registerList.length > 0"
        @click="show = true"
      >
        <view class="pop-item-info">
          <view>门诊号:{{ registerList[index].register_no }}</view>
          <view class="pop-item-info-sub">
            {{ registerList[index].doctor_name }}/{{
              registerList[index].department_name
            }}
          </view>
          <!-- <view class="pop-item-info-sub">
              {{registerList[index].selectDate}} {{registerList[index].time}}
            </view> -->
        </view>
        <view class="pop-item-jt">
          <text class="iconfont icon-arrowb"></text>
        </view>
      </view>
    </view>
    <u-popup v-model="show" mode="bottom" height="600rpx">
      <view class="pop-wrap">
        <view
          class="pop-item"
          v-for="(item, index) in registerList"
          :key="index"
          @click="changeIndex(index)"
        >
          <view class="pop-item-info">
            <view>门诊号:{{ registerList[index].register_no }}</view>
            <view class="pop-item-info-sub">
              {{ item.doctor_name }}/{{ item.department_name }}
            </view>
            <view class="pop-item-info-sub">
              {{ item.selectDate }} {{ item.time }}
            </view>
          </view>
          <view class="pop-item-jt">
            <text class="iconfont icon-arrowb"></text>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'RegisterCard',
  computed: {
    ...mapState(['patientInfo']),
  },
  props: {
    theme: {
      type: String,
      default: 'normal',
    },
  },
  data() {
    return {
      registerList:[],
      show: false
    }
  },
  mounted() {
    console.info(this.patientInfo)
  },
  methods: {
    changeIndex(){
      
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20rpx;
  .showReg {
    // padding: 0 20rpx;
    // height: 200rpx;
    // background: #fff;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
  .pop-wrap {
    background: #f6f6f6;
    padding: 30rpx;
  }
  .pop-item {
    padding: 10rpx 20rpx;
    background: #fff;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    &-info {
      flex: 1;
      & > view {
        font-size: 30rpx;
        line-height: 54rpx;
        // display: flex;
        // justify-content: space-between;
      }
      &-sub {
        font-size: 28rpx;
        color: #898989;
      }
    }
    &-jt {
      color: #cbcbcb;
      .iconfont {
        font-size: 50rpx;
      }
    }
  }
}
</style>
