<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__bt">
        <view class="wrap__bt-title">{{ model.name }}</view>
        <view class="wrap__bt-date">{{ model.create_time }}</view>
      </view>
      <view class="wrap__con">
        <view class="wrap__con-centent" v-html="model.content"></view>
        <empty v-if="!model.content"></empty>
      </view>
    </view>
  </view>
</template>

<script>
import empty from '../../components/empty/empty.vue'
export default {
  components: { empty },
  data() {
    return {
      model: {},
    }
  },
  onLoad() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http
        .post(this.API.NEWS_DETAIL, { detailid: this.$Route.query.detailid })
        .then((res) => {
          this.model = res.data
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  .wrap {
    padding: 0 30rpx 80rpx 30rpx;
    background: #ffffff;
    &__bt {
      padding: 30rpx 0;
      border-bottom: 1rpx solid #ebebeb;
      &-title {
        color: #484848;
        font-size: 28rpx;
      }
      &-date {
        color: #a8a8a8;
        font-size: 26rpx;
        margin-top: 20rpx;
      }
    }
    &__con {
      color: #484848;
      font-size: 26rpx;
      margin-top: 30rpx;
      &-centent {
        min-height: 500rpx;
      }
    }
  }
}
</style>
