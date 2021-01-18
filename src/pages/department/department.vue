<template>
  <view class="department">
    <view class="department_list">
      <view @click="toDetail()" class="department_list_item">
        <text>病理科</text>
        <text class="iconfont icon-arrowb"></text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toDetail() {
      this.$Router.push({ name: "departmentDetail" });
    },
  },
};
</script>
<style lang="scss" scoped>
.department {
  &_list {
    &_item {
      font-size: 30rpx;
      margin-left: 40rpx;
      line-height: 100rpx;
      display: flex;
      justify-content: space-between;
      border-bottom: 1upx solid #e0e0e0;
    }
  }
  .iconfont {
    color: #c7c7c7;
    margin-right: 30rpx;
  }
}
</style>
