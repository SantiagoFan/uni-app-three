<template>
  <view class="wrap">
    <view class="wrap-con">
      <view
        class="wrap-con__item"
        v-for="(item, index) in list"
        :key="item"
        @click="handleClickItem(index)"
      >
        <view :class="['icon', { active: item.checked }]"></view>
        <view class="info">
          <view class="title">
            <view class="name">{{ item.title }}</view>
            <view class="tag">默认</view>
          </view>
          <view class="code">院内诊疗号：1000000182574</view>
        </view>
      </view>
    </view>
    <view class="wrap-fot">
      <view class="item" @click="handleCheck">修改</view>
      <view class="item">设为默认</view>
      <view class="item">删除</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: '张三',
          checked: false,
        },
        {
          title: '李四',
          checked: false,
        },
        {
          title: '王五',
          checked: false,
        },
      ],
    }
  },
  methods: {
    // 选择item
    handleClickItem(index) {
      this.list.map((item, ind) => {
        item.checked = index == ind ? true : false
      })
    },
    // 点击修改
    handleCheck() {
      this.$Router.push({ name: 'medicalCardRegister' })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  &-con {
    padding: 20rpx 0 118rpx 0;
    &__item {
      display: flex;
      align-items: center;
      margin-bottom: 25rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .icon {
        width: 34rpx;
        height: 34rpx;
        padding: 5rpx;
        margin: 0 25rpx;
        border: 1rpx solid #0ec698;
        border-radius: 50%;
        &.active {
          &::after {
            display: block;
            width: 100%;
            height: 100%;
            background: #0ec698;
            border-radius: 50%;
            content: '';
          }
        }
      }
      .info {
        flex: 1;
        height: 156rpx;
        display: flex;
        padding: 0 30rpx;
        flex-direction: column;
        justify-content: center;
        background: #ffffff url('@/static/image/box_bg.png') no-repeat 70rpx -50rpx;
        background-size: 260rpx;
        border-radius: 10rpx 0 0 10rpx;
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
            font-size: 20rpx;
            padding: 0 10rpx;
            border: 1rpx solid #a6a9a8;
            border-radius: 8rpx;
          }
        }
        .code {
          color: #898989;
          font-size: 24rpx;
          margin-top: 20rpx;
        }
      }
    }
  }
  &-fot {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #0ec698;
    .item {
      position: relative;
      flex: 1;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      color: #ffffff;
      font-size: 30rpx;
      &::after {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 54rpx;
        background: rgba($color: #ffffff, $alpha: 0.32);
        content: '';
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
