<template>
  <view class="collect">
    <view class="collect-main">
      <view class="collect-list">
        <view
          class="collect-item"
          v-for="(item, index) in collectList"
          :key="index"
          @click="handleClickDetail(item)"
        >
          <view class="collect-item__avatar">
            <!-- <image class="img" mode="aspectFill" :src="item.Doctor_head" /> -->
            <dh-image
              class="img"
              mode="aspectFill"
              :src="item.headimg"
              :inHis='true'
              errorSrc="doctor.jpg"
            ></dh-image>
          </view>
          <view class="collect-item__info">
            <view class="name">{{ item.doctor_name }}</view>
            <view class="title">{{ item.department_name }}</view>
            <view class="post">{{ item.professional }}</view>
          </view>
        </view>
        <empty v-if="collectList.length === 0"></empty>
      </view>
    </view>
  </view>
</template>

<script>


export default {
  data() {
    return {
      collectList: [],
    }
  },
  onShow() {
    this.getCollectList()
  },
  methods: {
    getCollectList() {
      this.$http.post(this.API.COLLECT_DOCTOR).then((res) => {
        this.collectList = res.data
      })
    },
    handleClickDetail(item) {
      this.$Router.push({
        name: 'doctorDetail',
        params: {
          doctor_id: item.doctor_id,
          department_id: item.department_id,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.collect {
  &-main {
    .collect-list {
      padding: 20rpx;
      .collect-item {
        display: flex;
        padding: 20rpx;
        margin-bottom: 20rpx;
        background: #ffffff;
        border-radius: 10rpx;
        &:last-child {
          margin-bottom: 0;
        }
        &__avatar {
          width: 120rpx;
          height: 160rpx;
          border-radius: 6rpx;
          margin-right: 30rpx;
          overflow: hidden;
          .img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        &__info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          color: #a8a8a8;
          font-size: 32rpx;
          .name {
            color: #484848;
            font-size: 34rpx;
          }
        }
      }
    }
  }
}
</style>
