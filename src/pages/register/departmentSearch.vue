<template>
  <view class="wrap">
    <view class="wrap-branch" v-if="departmentList.length > 0">
      <view class="wrap-branch__bt">科室</view>
      <view class="wrap-branch__list">
        <view
          class="item"
          v-for="(item, index) in departmentList"
          :key="index"
          @click="goScheme(item.id)"
        >
          <view class="icon">
            <text class="iconfont icon-keshi"></text>
          </view>
          <view class="text">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      departmentList: [],
      departmentMore: false,
    }
  },
  onLoad() {
    this.getDepartmentList()
  },
  methods: {
    getDepartmentList() {
      this.$http
        .post(this.API.DEPARTMENT_SEARCH, { keyword: this.keyword })
        .then((res) => {
          this.departmentList = res.data
        })
    },
    goScheme(departmentid) {
      this.$Router.push({
        name: 'branchDetail',
        params: { departmentid: departmentid },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  min-height: 100rpx;
  background: #ffffff;
  &-branch {
    &__bt {
      height: 75rpx;
      line-height: 75rpx;
      padding: 0 30rpx;
      color: #333333;
      font-size: 28rpx;
    }
    &__list {
      border: 0 solid #d8d8d8;
      border-width: 1px 0;
      padding: 20rpx 40rpx;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 25rpx;
        color: #666666;
        font-size: 28rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .icon {
          color: #0ec698;
          margin-right: 20rpx;
          .iconfont {
            font-size: 40rpx;
          }
        }
      }
    }
  }
}
</style>
