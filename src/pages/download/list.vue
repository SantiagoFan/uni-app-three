<template>
  <view class="wrap">
    <view>提示：下载文件只能在微信环境中打开</view>
    <view class="wrap-list">
      <view
        class="item"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="title">{{ item.filePath| substr }}</view>
        <view class="date">
          <text> {{ item.createTime | formateTime }}</text>
          <text> {{ item.size| formateFileSize }} </text>
        </view>
        <view class="action">
          <view class="btn del" @click="delDoc(item)">删除</view>
          <view class="btn open" @click="openDoc(item)">打开</view>
        </view>
      </view>
      <empty v-if="list.length == 0"></empty>
    </view>
  </view>
</template>

<script>
import Empty from '../../components/empty/empty.vue'
import moment from 'moment'
import Test from '../test/test.vue'

export default {
  data() {
    return {
      list: []
    }
  },
  components:{
    Empty
  },
  onLoad(){
    this.getList()
  },
  filters:{
    substr(val){
      if (val) {
        return val.replace(/^(?:.+)(.{22})$/, '**$1')
      }
      return ''
    },
    formateTime(val){
      if (val) {
        return moment(parseInt(val+'000')).format("YYYY-MM-DD HH:mm:ss");
      }
      return ''
    },
    formateFileSize(val){
      if (val) {
        return (val/1024).toFixed(2)+" kb";
      }
      return ''
    }
  },
  methods: {
    getList() {
      uni.getSavedFileList({
        success: (res) => {
          this.list = res.fileList;
          console.info(this.list)
        }
      })
    },
    openDoc(item){
      uni.openDocument({ filePath: item.filePath })
    },
    
    delDoc(item){
      uni.showModal({
        title: '删除提醒',
        confirmText:'删除',
        content: `确定要删除当前文件吗`,
        success: (res) => {
          if (res.confirm) {
            uni.removeSavedFile({ filePath: item.filePath,
              complete: (res) => {
                uni.showToast({ title: '删除成功', duration: 2000, icon:'success' });
                this.getList()
              }
            });
          }
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  padding: 20rpx;
  &-list {
    margin-top: 20rpx;
    .item {
      position: relative;
      padding: 30rpx;
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
        display: flex;
        justify-content: space-between;
      }
      .action{
        text-align: right;
        padding-top: 20rpx;
        .btn{
          background-color: #ddd;
          color: #fff;
          display: inline-block;
          padding: 10rpx 40rpx;
          border-radius: 8rpx;
          margin-left: 30rpx;
          &.del{
            background: #e54d42;
          }
          &.open{
            background: #0ec698;
          }
        }
      }
    }
  }
}
</style>
