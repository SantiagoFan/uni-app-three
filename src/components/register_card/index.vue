<template>
  <view class="container">
    <view class="showReg">
      <view
        class="pop-item"
        v-if="registerList.length > 0"
        @click="show = true"
      >
        <view class="pop-item-info">
          <view>门诊号:{{ registerList[selectIndex].reg_no }}</view>
          <view class="pop-item-info-sub">
            {{ registerList[selectIndex].doctor_name }}/{{
              registerList[selectIndex].department_name
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
            <view>门诊号:{{ item.reg_no }}</view>
            <view class="pop-item-info-sub" >
              {{ item.doctor_name }}/{{ item.department_name }}
            </view>
            <view class="pop-item-info-sub">
              {{ item.reg_date }}
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
  data() {
    return {
      registerList:[],
      selectIndex:0,
      show: false
    }
  },
  watch:{
    "patientInfo":{
      handler(){
        this.getSuccessRegister()
      },
      deep:true,
      immediate:true
    }
  },
  methods: {
    /**
     * 查询挂号信息
     */
    getSuccessRegister() {
      this.$http
        .post(this.API.REGISTER_SUCCESS, {
          patient_code: this.patientInfo.patient_code,
        })
        .then((res) => {
          this.registerList = res.data
          if(this.registerList.length>0){
            this.selectIndex = 0;
            this.$emit('change',this.registerList[0].reg_no)
          }
        })
    },
    changeIndex(index){
      this.selectIndex = index
      this.show = false
      this.$emit('change',this.registerList[index].reg_no)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
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
