<template>
  <view class="survey">
    <view class="survey-m">
      <view class="survey-m__list">
        <view @click="detail(item.id)" class="item" v-for="(item,index) in list" :key="index">
          <view class="title">{{item.name}}</view>
          <view class="date">{{item.create_time}}</view>
          <view class="status">
            <image class="img" mode="widthFix" src="@/static/image/tian_status1.png" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return{
      list:[]
    }
  },
  onShow(){
    this.getList();
  },
  methods:{
    getList(){
      this.$http.post(this.API.QUESTION_LIST).then(res=>{
        this.list = res.data;
      })
    },
    getDetail(id){
      this.$Router.push({name:'survey',params:{id:id}});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.survey {
  &-m {
    &__list {
      padding: 20rpx;
      .item {
        position: relative;
        padding: 30rpx 200rpx 30rpx 30rpx;
        margin-bottom: 20rpx;
        background: #ffffff;
        border-radius: 10rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .title {
          color: #333333;
          font-size: 34rpx;
          @include textOverflow(1);
        }
        .date {
          color: #898989;
          font-size: 24rpx;
          margin-top: 20rpx;
        }
        .status {
          position: absolute;
          right: 20rpx;
          top: 0;
          width: 136rpx;
          .img {
            width: 100%;
            height: auto;
            display: block;
          }
        }
      }
    }
  }
}
</style>