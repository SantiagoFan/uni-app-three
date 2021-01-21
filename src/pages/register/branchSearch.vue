<template>
  <view class="wrap">
    <view class="wrap-search">
      <view class="input-box">
        <input
          class="input"
          type="text"
          confirm-type="search"
          @confirm="search"
          v-model="keyword"
          placeholder="请输入"
        />
      </view>
      <view class="btn" @click="clearKeyword">取消</view>
    </view>
    <u-gap height="10" bg-color="#f3f3f3"></u-gap>
    <view class="wrap-con" v-if="doctorList.length > 0">
      <view class="wrap-con__bt">医生</view>
      <view class="wrap-con__list">
        <view
          class="item"
          v-for="(item, index) in doctorList"
          :key="index"
          @click="goDetail(item.id)"
        >
          <view class="avatar">
            <dh-image
              class="img"
              mode="aspectFill"
              :src="item.headimg"
              errorSrc="doctor.jpg"
            ></dh-image>
          </view>
          <view class="info">
            <view class="title">
              <view class="name">{{ item.name }}</view>
            </view>
            <view class="subt">
              <view class="subt-zc">{{ item.department_name }}</view>
            </view>
            <view class="intr">{{ item.position }}</view>
          </view>
        </view>
      </view>
      <view class="wrap-con__more" @click="getMoreDoctor" v-if="doctorMore">
        <view class="text">查看更多</view>
        <view class="icon">
          <text class="iconfont icon-hao"></text>
        </view>
      </view>
    </view>
    <u-gap height="20" bg-color="#f3f3f3"></u-gap>
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
      <view
        class="wrap-branch__more"
        @click="getMoreDepartment"
        v-if="departmentMore"
      >
        <view class="text">查看更多</view>
        <view class="icon">
          <text class="iconfont icon-hao"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import dhImage from '@/components/dh-image/dh-image.vue'

export default {
  data() {
    return {
      doctorList: [],
      doctorMore: false,
      departmentList: [],
      departmentMore: false,
      keyword: '',
    }
  },
  components: { dhImage },
  onLoad() {
    this.keyword = this.$Route.query.keyword
    this.getList()
  },
  methods: {
    getList() {
      this.getDoctorList()
      this.getDepartmentList()
    },
    getDoctorList() {
      this.$http
        .post(this.API.DOCTOR_SEARCH, { keyword: this.keyword })
        .then((res) => {
          if (res.data.length > 3) {
            this.doctorMore = true
          }
          this.doctorList = res.data.splice(3, res.data.length - 1)
        })
    },
    getDepartmentList() {
      this.$http
        .post(this.API.DEPARTMENT_SEARCH, { keyword: this.keyword })
        .then((res) => {
          if (res.data.length > 5) {
            this.departmentMore = true
          }
          this.departmentList = res.data.splice(5, res.data.length - 1)
        })
    },
    search() {
      this.getList()
    },
    clearKeyword() {
      this.keyword = ''
      this.getList()
    },
    getMoreDoctor() {
      this.$Router.push({
        name: 'doctorSearch',
        params: { keyword: this.keyword },
      })
    },
    getMoreDepartment() {
      this.$Router.push({
        name: 'departmentSearch',
        params: { keyword: this.keyword },
      })
    },
    goDetail(id) {
      this.$Router.push({ name: 'doctorDetail', params: { id: id } })
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
  &-search {
    display: flex;
    align-items: center;
    padding: 20rpx;
    .input-box {
      display: flex;
      position: relative;
      align-items: center;
      background: #f1f1f1;
      height: 76rpx;
      padding: 0 30rpx 0 78rpx;
      flex: 1;
      &::before {
        content: '\e660';
        position: absolute;
        left: 30rpx;
        top: 50%;
        color: #afafaf;
        transform: translateY(-50%);
        font-family: 'iconfont';
      }
      .input {
        width: 100%;
        height: 50rpx;
        font-size: 28rpx;
      }
    }
    .btn {
      color: #0ec698;
      font-size: 28rpx;
      padding: 20rpx;
      margin-left: 20rpx;
    }
  }
  &-con {
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
      .item {
        display: flex;
        padding: 30rpx;
        background-size: 100%;
        border-bottom: 1rpx solid #d8d8d8;
        .avatar {
          width: 124rpx;
          height: 164rpx;
          margin-right: 20rpx;
          border-radius: 10rpx;
          overflow: hidden;
          .img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .info {
          flex: 1;
          font-size: 26rpx;
          color: #989898;
          .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10rpx;
            .name {
              color: #333333;
              font-size: 32rpx;
            }
          }
          .subt {
            display: flex;
            margin: 15rpx 0;
            &-zc {
              margin-right: 40rpx;
            }
          }
          .intr {
            @include textOverflow(1);
          }
        }
      }
    }
    &__more {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88rpx;
      padding: 0 30rpx;
      color: #666666;
      font-size: 28rpx;
      .icon {
        color: #666666;
        .iconfont {
          font-size: 25rpx;
        }
      }
    }
    .nomore {
      justify-content: center;
    }
  }
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
    &__more {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88rpx;
      padding: 0 30rpx;
      color: #666666;
      font-size: 28rpx;
      .icon {
        color: #666666;
        .iconfont {
          font-size: 25rpx;
        }
      }
    }
    .nomore {
      justify-content: center;
    }
  }
}
</style>
