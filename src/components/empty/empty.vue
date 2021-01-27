<template>
  <view class="nodata">
    <view
      ><image class="img" mode="widthFix" src="@/static/image/nodata.png"
    /></view>
    <view class="notext">{{ title }}</view>
  </view>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "暂未查询到相关信息",
    },
  },
};
</script>
<style lang="scss" scoped>
.nodata {
  min-height: 700rpx;
  text-align: center;
  .img {
    display: block;
    width: 194rpx;
    height: 171rpx;
    margin: 100rpx auto 0 auto;
  }
  .notext {
    color: #999e9c;
    margin-top: 40rpx;
  }
}
</style>
