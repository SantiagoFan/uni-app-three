<template>
  <view class="wrap">
    <view class="wrap-head">
      <view class="wrap-head__art1">
        <view class="title">流行病学调查登记表</view>
        <view class="date">有效期：2020-07-18  至  2020-08-17</view>
      </view>
      <view class="wrap-head__art2">
        <view class="title">流行病学调查登记表</view>
        <view class="subt">发布单位：内蒙古呼和浩特市蒙医中医医院</view>
      </view>
    </view>
    <view class="wrap-con">
      <view class="wrap-con__item">
        <view class="label">来医院的目的</view>
        <!-- 选择 -->
        <view class="radio-list" v-if="status == 0">
          <u-radio-group v-model="value" :wrap="true" :size="35" :icon-size="24">
            <u-radio
              class="radio"
              v-for="(item, index) in list" :key="index" 
              :name="item.name"
              active-color="#0ec698"
            >
              {{item.name}}
            </u-radio>
          </u-radio-group>
        </view>
        <!-- 填空 -->
        <view class="textarea" v-if="status == 1">
          <u-input type="textarea" :height="60" placeholder="请在此输入（最多20字）" />
        </view>
      </view>
      <view class="wrap-con__item">
        <view class="label">来医院的目的</view>
        <!-- 选择 -->
        <view class="radio-list" v-if="false">
          <u-radio-group v-model="value" :wrap="true" :size="35" :icon-size="24">
            <u-radio
              class="radio"
              v-for="(item, index) in list" :key="index" 
              :name="item.name"
              active-color="#0ec698"
            >
              {{item.name}}
            </u-radio>
          </u-radio-group>
        </view>
        <!-- 填空 -->
        <view class="textarea">
          <u-input type="textarea" :height="60" placeholder="请在此输入（最多20字）" />
        </view>
      </view>
    </view>
    <view class="wrap-btn">提交</view>
  </view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: '就诊',
					disabled: false
				},
				{
					name: '陪护',
					disabled: false
				},
				{
					name: '公务',
					disabled: false
				}
			],
      value: 'orange',
      status: 0  // 0:单选 1： 填空
		};
	}
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20rpx;
  &-head {
    padding: 0 30rpx;
    background: #ffffff;
    border-radius: 10rpx;
    &__art1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: 1rpx solid #dfdfdf;
      .title {
        color: #333333;
        font-size: 34rpx;
        font-weight: bold;
      }
      .date {
        color: #898989;
        font-size: 24rpx;
        margin-top: 20rpx;
      }
    }
    &__art2 {
      display: flex;
      flex-direction: column;
      padding: 30rpx 0;
      .title {
        color: #484848;
        font-size: 28rpx;
      }
      .subt {
        color: #a8a8a8;
        font-size: 24rpx;
        margin-top: 20rpx;
      }
    }
  }
  &-con {
    margin-top: 20rpx;
    &__item {
      padding: 30rpx;
      margin-bottom: 20rpx;
      background: #ffffff;
      border-radius: 10rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .label {
        position: relative;
        color: #484848;
        font-size: 28rpx;
        &::before {
          display: inline-block;
          margin-right: 4rpx;
          color: #ff4d4f;
          font-size: 14px;
          font-family: SimSun,sans-serif;
          line-height: 1;
          content: "*";
        }
      }
      .radio-list {
        margin-top: 20rpx;
        &::v-deep .u-radio {
          line-height: 2.2;
        }
        &::v-deep .u-radio__label {
          margin-left: 20rpx;
        }
      }
      .textarea {
        margin-top: 30rpx;
        font-size: 26rpx;
      }
    }
  }
  &-btn {
    height: 80rpx;
    line-height: 80rpx;
    color: #ffffff;
    font-size: 30rpx;
    text-align: center;
    margin-top: 30rpx;
    background: #0ec698;
    border-radius: 10rpx;
  }
}
</style>