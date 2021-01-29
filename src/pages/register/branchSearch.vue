<template>
  <view class="wrap">
    <view class="wrap-search">
      <view class="input-box">
        <input
          class="input"
          type="text"
          confirm-type="search"
          @input="search"
          @confirm="search"
          v-model="keyword"
          placeholder="搜索科室、医生"
        />
      </view>
      <view class="btn" @click="clearKeyword">取消</view>
    </view>
    <template v-if="doctorList.length > 0">
      <u-gap height="10" bg-color="#f3f3f3"></u-gap>
      <view class="wrap-con">
        <view class="wrap-con__bt">医生</view>
        <view class="wrap-con__list">
          <view
            class="item"
            v-for="(item, index) in doctorList"
            :key="index"
            @click="goDetail(item)"
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
                <view class="name">{{ item.doctor_name }}</view>
              </view>
              <view class="subt">
                <view class="subt-zc">{{ item.department_name }}</view>
              </view>
              <view class="intr">{{ item.professional }}</view>
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
    </template>
    <template v-if="departmentList.length > 0">
      <u-gap height="20" bg-color="#f3f3f3"></u-gap>
      <view class="wrap-branch">
        <view class="wrap-branch__bt">科室</view>
        <template>
          <view class="wrap-branch__list">
            <view
              class="item"
              v-for="(item, index) in departmentList"
              :key="index"
              @click="goScheme(item.department_id)"
            >
              <view class="icon">
                <text class="iconfont icon-keshi"></text>
              </view>
              <view class="text">{{ item.department_name }}</view>
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
        </template>
      </view>
    </template>
    <empty v-if="doctorList.length == 0 && departmentList.length == 0"></empty>
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
      postLock: false,
    }
  },
  components: { dhImage },
  onLoad() {
    this.keyword = this.$Route.query.keyword
    this.getList()
  },
  methods: {
    getList() {
      if (this.postLock) {
        return
      }
      this.postLock = true
      this.$http
        .post(this.API.SEARCH, { keyword: this.keyword })
        .then((res) => {
          this.postLock = false
          let doctor_list = res.data.doctor
          if (doctor_list.length > 3) {
            this.doctorMore = true
            doctor_list.splice(3, doctor_list.length - 1)
          }
          this.doctorList = doctor_list

          let department_list = res.data.department
          if (department_list.length > 5) {
            this.departmentMore = true
            department_list.splice(5, department_list.length - 1)
          }
          this.departmentList = department_list
        })
    },
    search() {
      if (this.keyword != '') {
        this.getList()
      } else {
        this.doctorList = []
        this.departmentList = []
      }
    },
    clearKeyword() {
      this.$Router.back(1)
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
    goDetail(item) {
      this.$Router.push({
        name: 'doctorDetail',
        params: { doctor_id: item.id, department_id: item.department_id },
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
      font-size: 32rpx;
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
      font-size: 30rpx;
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
      font-size: 32rpx;
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
        font-size: 32rpx;
        line-height: 80rpx;
        border-bottom: 2rpx solid #e3e2e2;
        &:last-child {
          margin-bottom: 0;
          border: none;
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
      font-size: 30rpx;
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
