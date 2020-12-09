<template>
  <view class="record">
    <view class="record-m">
      <view class="record-m__list">
        <view class="item" @click="handleItem">
          <view class="icon">
            <text class="iconfont icon-duihao"></text>
          </view>
          <view class="info">
            <view class="title">
              <view class="status">缴费成功</view>
              <view class="price">¥10000.00</view>
            </view>
            <view class="subt">
              <view class="name">贾铭</view>
              <view class="date">2020-07-18  10:30:00</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleItem() {
      this.$u.route({
				url: '/pages/clinicPayDetail/clinicPayDetail',
				params: {
					id: 1234
				}
			})
    }
  },
}
</script>

<style lang="scss" scoped>
.record {
  &-m {
    padding: 20rpx;
    &__list {
      .item {
        display: flex;
        align-items: center;
        padding: 25rpx;
        background: #ffffff;
        border-radius: 10rpx;
        .icon {
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          margin-right: 30rpx;
          text-align: center;
          color: #ffffff;
          background: #0ec698;
          border-radius: 50%;
        }
        .info {
          flex: 1;
          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28rpx;
            .status {
              color: #484848;
            }
            .price {
              color: #ff7800;
            }
          }
           .subt {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #a8a8a8;
            font-size: 26rpx;
            margin-top: 20rpx;
          }
        }
      }
    }
  }
}
</style>