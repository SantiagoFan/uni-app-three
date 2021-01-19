<template>
  <view class="department">
    <view class="department_list">
      <view
        @click="toDetail(item.id)"
        v-for="(item, index) in list"
        :key="index"
        class="department_list_item"
      >
        <text>{{ item.name }}</text>
        <text class="iconfont icon-arrowb"></text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      isDoctor: 0,
    };
  },
  onShow() {
    this.isDoctor = this.$Route.query.isDoctor;
    this.getList();
  },
  methods: {
    getList() {
      this.$http.post(this.API.DEPARTMENT_INFO).then((res) => {
        this.list = res.data;
      });
    },
    toDetail(id) {
      if (this.isDoctor) {
        this.$Router.push({ name: "doctor", params: { departmentid: id } });
      } else {
        this.$Router.push({ name: "departmentDetail", params: { id: id } });
      }
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
