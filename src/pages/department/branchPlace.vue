<template>
  <view class="wrap">
    <view class="wrap-top">
      <image class="img" mode="widthFix" src="@/static/image/branch_place_img.jpg" />
      <view class="tab">
        <view :class="['tab-item',floorIndex==index?'active':'']" v-for="(item,index) in list" :key="index" @click="changeFloor(index)">{{item.name}}</view>
      </view>
    </view>
    <view class="wrap-con">
      <view v-for="(item,index) in list" :key="index">
        <view class="wrap-con__art" v-if="floorIndex==index">
          <view class="wrap-con__art-bt">{{item.name}}</view>
          <view class="wrap-con__art-list">
            <view class="item" v-for="(obj,index1) in item.department" @click="toDepartment(obj.department_id)" :key="index1">{{obj.department_name}}</view>
          </view>
      </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return {
      floorIndex: 0,
      list: []
    }
  },
  onShow(){
    this.getDepartment();
  },
  methods:{
    getDepartment(){
      this.$http.post(this.API.DEPARTMENT_AREA).then(res=>{ 
        this.list = res.data;
      })
    },
    changeFloor(index){
      this.floorIndex = index;
    },
    toDepartment(id){
       this.$Router.push({ name: 'departmentDetail',params: { id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  min-height: 100vh;
  background: #ffffff;
  &-top {
    position: relative;
    .img {
      width: 100%;
      height: auto;
      display: block;
    }
    .tab {
      display: flex;
      position: absolute;
      align-items: center;
      bottom: 50rpx;
      left: 50%;
      transform: translateX(-50%);
      &-item {
        position: relative;
        color: #ffffff;
        font-weight: bold;
        font-size: 32rpx;
        margin-right: 75rpx;
        &:last-child {
          margin-right: 0;
        }
        &.active {
          &::after {
            content: '\e602';
            position: absolute;
            bottom: -30rpx;
            left: 50%;
            transform: translateX(-50%);
            font-size: 24rpx;
            font-family: "iconfont";
          }
        }
      }
    }
  }
  &-con {
    padding: 30rpx;
    &__art {
      color: #333333;
      padding: 30rpx 0;
      border-bottom: 1rpx solid #f6f6f6;
      &:last-child {
        border: none;
      }
      &-bt {
        font-size: 34rpx;
        margin-bottom: 30rpx;
        font-weight: bold;
      }
      &-list {
        display: flex;
        flex-wrap: wrap;
        margin: -20rpx 0 0 -60rpx;
        .item {
          font-size: 28rpx;
          padding: 10rpx;
          margin: 20rpx 0 0 60rpx;
        }
      }
    }
  }
}
</style>