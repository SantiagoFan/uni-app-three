<template>
  <view class="main-content">
    <u-subsection 
      active-color="#0ec698"
      mode="subsection"
      :list="[{name:'查本人'},{name:'验他人'}]"
      :current="curType" @change="changeType">
    </u-subsection>
    <view class="u-search-box">
      <view class="u-search-inner">
        <u-icon name="search" color="#909399" :size="28"></u-icon>
        <input
          v-if="curType==0"
          class="u-search-text"
          type="text"
          confirm-type="search"
          @confirm="loadData"
          v-model="queryParams.idcard"
          placeholder="请输入身份证"
        />
        <input
          v-else
          class="u-search-text"
          type="text"
          confirm-type="search"
          @confirm="loadData"
          v-model="queryParams.inspection_no"
          placeholder="健康证编号"
        />
        <u-icon v-if="curType==1" name="scan" color="#909399" :size="50" @click="scan"></u-icon>
      </view>
      <button class="btn active" @click="loadData">查询</button>
    </view>
    <view class="health-content">
      <template v-if="!healthcard">
        <view class="no-data">查询无结果</view>
        <image class="img" mode="widthFix" src='/static/image/no-health.png'></image>
      </template>
      <template v-else>
        <image class="bg-img" src="/static/image/health-bg.png" mode="widthFix"></image>
        <view class="title">健康检查合格证明</view>
        <view class="content">
         <template>
            <view class="item">
              <view>姓名：{{healthcard.CBRXM}}</view>
              <view class="item-right">性别：{{healthcard.CBRXB}}</view>
            </view>
            <view class="item">
              <view>年龄：{{healthcard.CNL}}</view>
              <view class="item-right">类别：{{healthcard.CCYGZMC}}</view>
            </view>
            <view class="item">发证日期：{{healthcard.CJLRQ}}</view>
         </template>
        </view>
        <view class="qrcode">
          <tki-qrcode cid="mycode" 
          ref="qrcode" style="margin-top:10rpx" 
          onval :val="healthcard.CTJBH" 
          :size="300"
          icon="/static/image/logo.png" :iconSize='30'
          :loadMake="true" :show-loading="true" />
          <!-- <image class="img" src='/static/image/check_report_icon.jpg'></image> -->
          <view class="text">{{healthcard.CTJBH}}</view>
        </view>
        <view class="health-bottom">呼和浩特市蒙医中医医院体检中心</view>
      </template>
    </view>
  </view>
</template>
<script>
import tkiQrcode from '@/components/tki-code/tki-qrcode/tki-qrcode'
import dhImage from '@/components/dh-image/dh-image.vue'
export default {
  components: { dhImage,tkiQrcode },
  data() {
    return {
      queryParams: {
        idcard:'',
        inspection_no:''
      },
      curType:0,
      healthcard:null
    }
  },
  methods:{
    scan(){
      var that = this
      uni.scanCode({
        onlyFromCamera: true,
        success(res) {
          that.queryParams.inspection_no = res.result
          that.loadData()
        }
      })
    },
    changeType(i){
      this.curType = i
    },
    loadData(){
      this.healthcard = null
      if(this.curType==0){ //查本人
        this.queryParams.inspection_no = ''
      } else { //验他人
        this.queryParams.idcard = ''
      }
      this.$http.post(this.API.QUERY_HEALTH_CARD,this.queryParams).then((res) => {
        if(res.data&&res.data.length>0){
          this.healthcard = res.data[0]
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main-content{
  background: #ffffff;
  height: 100vh;
  padding: 30rpx;
  .u-search-box {
    padding: 30rpx 0;
    position: relative;
    // background: #ffffff;
    // box-shadow: 0 3rpx 10rpx #f2f2f2;
    z-index: 1;
    .u-search-inner {
      display: flex;
      align-items: center;
      height: 70rpx;
      background-color: #f5f5f5;
      padding: 0 20rpx;
      border-radius: 6rpx;
      .u-search-text {
        font-size: 30rpx;
        color: #666666;
        margin-left: 10rpx;
        width: 100%;
      }
    }
    .btn {
        height: 90rpx;
        line-height: 90rpx;
        color: #ffffff;
        font-size: 34rpx;
        margin-top: 25rpx;
        letter-spacing: 2rpx;
        text-align: center;
        background: #dfdfdf;
        border-radius: 10rpx;
        &.active {
          background: #0ec698;
        }
    }
  }
  .no-data{
    // margin: 0 auto;
    margin: 100rpx;
    text-align: center;
  }
  .img {
    width: 50%;
    display: block;
    margin: 0 auto;
  }
  .health-content{
    position: relative;
    // height: 100vh;
    .bg-img{
      display: block;
      width: 100%;
    }
    .title{
      width: 100%;
      position: absolute;
      top: 20rpx;
      font-size: 40rpx;
      color: #ffffff;
      text-align: center;
    }
    .content{
      top: 170rpx;
      left: 60rpx;
      position: absolute;
      font-size: 30rpx;
      .item{
        width: 500rpx;
        display: flex;
        justify-content: space-between;
        color: #ffffff;
        line-height: 50rpx;
        &-right{
          width: 150rpx;
        }
      }
    }
    .health-bottom{
      width: 100%;
      position: absolute;
      bottom: 26rpx;
      font-size: 26rpx;
      color: #ffffff;
      text-align: center;
    }
    .qrcode{
      position: absolute;
      bottom: 100rpx;
      width: 100%;
      text-align: center;
      .img{
        height: 300rpx;
        width: 300rpx;
      }
      .text{
        font-size: 50rpx;
        color: #ffffff;
      }
    }
  }
}
</style>