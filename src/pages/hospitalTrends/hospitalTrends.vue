<template>
  <view class="container">
    <view class="wrap">
      <view class="wrap__tab">
        <view
          class="wrap__tab-item"
          v-for="(item, index) in cateList"
          :key="index"
          @click="handleTabItem(index)"
        >
          <view :class="['text', { active: index == tabIndex }]">{{
            item.name
          }}</view>
        </view>
      </view>
      <view class="wrap__con">
        <view class="wrap__con-list">
          <u-empty
            v-if="list.length === 0"
            text="暂无数据"
            :margin-top="50"
          ></u-empty>
          <template v-else>
            <view
              class="cell"
              v-for="(item, index) in list"
              :key="index"
              @click="handleClickDetail(item.id)"
            >
              <view class="img-box">
                <dh-image
                  class="img"
                  mode="aspectFill"
                  :src="item.image"
                ></dh-image>
              </view>
              <view class="info">
                <view class="title">{{ item.name }}</view>
                <view class="date">{{ item.create_time }}</view>
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import dhImage from "@/components/dh-image/dh-image.vue";

export default {
  data() {
    return {
      tabIndex: 0,
      cateList: [],
      list: [],
    };
  },
  components: { dhImage },

  onShow() {
    this.getCateList();
  },
  methods: {
    getCateList() {
      this.$http
        .post(this.API.NEWS_CATE)
        .then((res) => {
          this.cateList = res.data;
        })
        .then(() => {
          if (this.cateList.length > 0) {
            this.getNewsList();
          }
        });
    },
    getNewsList() {
      this.$http
        .post(this.API.NEWS_LIST, {
          cateid: this.cateList[this.tabIndex]["id"],
        })
        .then((res) => {
          this.list = res.data;
        });
    },
    handleTabItem(index) {
      this.tabIndex = index;
      this.getNewsList();
    },
    // 跳转详情
    handleClickDetail(id) {
      uni.navigateTo({
        url: `/pages/hospitalTrendsDetail/hospitalTrendsDetail?id=${id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.container {
  .wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    &__tab {
      display: flex;
      align-items: center;
      background: #fff;
      &-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        &::after {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 2rpx;
          height: 40rpx;
          background: #f6f6f6;
          content: "";
        }
        .text {
          position: relative;
          height: 88rpx;
          line-height: 88rpx;
          color: #333333;
          font-size: 28rpx;
          &.active {
            color: #0ec698;
            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 80%;
              height: 4rpx;
              background: #0ec698;
            }
          }
        }
        &:last-child {
          &::after {
            display: none;
          }
        }
      }
    }
    &__con {
      flex: 1;
      overflow-y: auto;
      &-list {
        padding: 20rpx;
        .cell {
          display: flex;
          align-items: center;
          padding: 25rpx;
          margin-bottom: 25rpx;
          background: #ffffff;
          border-radius: 10rpx;
          &:last-child {
            margin-bottom: 0;
          }
          .img-box {
            width: 178rpx;
            height: 120rpx;
            margin-right: 25rpx;
            border-radius: 6rpx;
            overflow: hidden;
            .img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .info {
            flex: 1;
            .title {
              color: #484848;
              font-size: 28rpx;
              @include textOverflow(1);
            }
            .date {
              color: #a8a8a8;
              font-size: 26rpx;
              margin-top: 20rpx;
            }
          }
        }
      }
    }
  }
}
</style>
