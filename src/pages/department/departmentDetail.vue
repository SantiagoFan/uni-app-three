<template>
  <view class="department">
    <view class="title">{{info.name}}</view>
    <view class="content">
      <view class="info"><text>科室地址</text><text>{{info.address}}</text></view>
      <view class="info"><text>科室电话</text><text>{{info.phone}}</text></view>
      <view class="detail" v-html="info.content">
        
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      info: []
    };
  },
  onShow(){
    this.getDetail();
  },
  methods: {
    getDetail(){
      this.$http.post(this.API.DEPARTMENT_INFO_DETAIL,{id:this.$Route.query.id}).then(res=>{
        this.info = res.data;
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.department {
  .title {
    color: #000;
    font-size: 38rpx;
    font-weight: bold;
    text-align: center;
    line-height: 100rpx;
    border-bottom: 1upx solid #e1e6e7;
  }
  .content {
    padding: 30rpx 40rpx;
    .info {
      line-height: 80rpx;
      text:first-child {
        color: #9ca1a0;
        margin-right: 20rpx;
      }
    }
    .detail {
      margin-top: 20rpx;
    }
  }
}
</style>
