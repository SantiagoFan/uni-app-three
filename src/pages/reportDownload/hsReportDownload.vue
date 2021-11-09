<template>
  <view class="report">
    <view class="report-wrap">
      <view class="report-wrap__info">
        <view class="item">
          <view class="label">就诊人：</view>
          <view class="text">{{ model.patient_name }}</view>
        </view>
        <view class="item">
          <view class="label">开方医生：</view>
          <view class="text">{{ model.doctor_name }}</view>
        </view>
        <view class="item">
          <view class="label">性别：</view>
          <view class="text">{{ model.gender }}</view>
        </view>
        <view class="item">
          <view class="label">年龄：</view>
          <view class="text">{{ model.age }}</view>
        </view>
        <view class="item">
          <view class="label">开方科室：</view>
          <view class="text">{{ model.department_name }}</view>
        </view>
        <view class="item">
          <view class="label">报告时间：</view>
          <view class="text">{{ model.report_time }}</view>
        </view>
      </view>
      <!-- <view class="report-wrap__btn" @click="dowmloadReport">
        <view class="report-wrap__btn-box">下载报告</view>
      </view> -->
    </view>
    <view class="wrap__con">
      <view class="art" v-if="model">
        <view class="title">核酸检测结果</view>
        <view class="num on" v-if="model.isPositive===true">已检出（阳性）</view>
        <view class="num" v-if="model.isPositive==false">未检出（阴性）</view>
        <view class="num" v-else></view>
        <view class="massage"
          >{{model.report_name}}<text class="count"></text></view
        >
        <view class="gap">
          <image class="img" mode="widthFix" src="@/static/image/gap_img.jpg" />
        </view>
        <view class="info">
          <view class="cell" v-for="(obj, index) in model.items"
            :key="index">
            <view class="label">{{obj.name}}</view>
            <view class="text">{{obj.result}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="report-wrap__btn" @click="dowmloadReport">
        <view class="report-wrap__btn-box">下载报告</view>
      </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      model: {isPositive:null},
    }
  },
  onLoad() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http
        .post(this.API.JY_REPORT_DETAIL, {
          report_code: this.$Route.query.report_code,
        })
        .then((res) => {
          res.data["isPositive"] = false;//是否阳性
          for(let e of res.data.items){
            if(e.result<=40 && e.result>0){ res.data["isPositive"]=true;break; }
          }
          this.model = res.data
        })
    },
    async dowmloadReport() {
      // 下载报告
      const res = await this.$http.post(this.API.GET_JY_PDF, {
          report_code: this.model.report_code,
          report_type: 1,
          apply_number: this.$Route.query.apply_number,
      });
      if (res.code != 20000) {
        uni.showToast({ title: '获取PDF错误', duration: 2000, icon:'error' });
        return false
      }
      // 下载文件
      uni.showLoading({ title: '下载中...'});
      const [download_error,download_res] = await uni.downloadFile({ url: res.data })
      uni.hideLoading();
      if(download_error){
        uni.showToast({ title: '下载PDF错误', duration: 2000, icon:'error' });
        console.info(download_error)
        return false
      } 
      // 保存文件
      uni.showLoading({ title: '保存中...'});
      const [save_error,save_res] = await uni.saveFile({ tempFilePath: download_res.tempFilePath})
      uni.hideLoading();
      if(save_error){
        uni.showToast({ title: '保存PDF错误', duration: 2000, icon:'error' });
        console.info(save_error)
        return false
      }
      uni.showModal({
        title: '下载成功',
        confirmText:'打开查看',
        content: `文件已下载到【${save_res.savedFilePath}】,是否要打开查看？`,
        success: function (res) {
          uni.getSavedFileList({
            success: function (res) {
              console.log(res.fileList);
            }
          });
          if (res.confirm) {
            uni.openDocument({ filePath: save_res.savedFilePath })
          }
        }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.report {
  &-wrap {
    padding: 30rpx;
    background: #ffffff;
    border-radius: 10rpx;
    &__info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20rpx;
      padding: 40rpx 0;
      border-width: 1rpx 0;
      .item {
        display: flex;
        font-size: 28rpx;
        &:nth-child(5),
        &:nth-child(6) {
          grid-column: span 2;
        }
        .label {
          color: #a2a2a2;
        }
        .text {
          flex: 1;
          color: #1e1e1e;
          @include textOverflow(1);
        }
      }
    }
    &__btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 25rpx 35rpx;
      &-box {
        height: 80rpx;
        line-height: 80rpx;
        color: #ffffff;
        font-size: 30rpx;
        text-align: center;
        background: #0ec698;
        border-radius: 10rpx;
      }
    }
  }
}
.wrap {
  &__user {
    padding: 20rpx;
    &-box {
      position: relative;
      display: flex;
      align-items: center;
      height: 156rpx;
      padding: 0 30rpx;
      background: #ffffff url('@/static/image/box_bg.png') no-repeat 70rpx -50rpx;
      background-size: 260rpx;
      border-radius: 10rpx;
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        .title {
          display: flex;
          align-items: center;
          border-radius: 10rpx;
          .name {
            color: #333333;
            font-size: 36rpx;
            margin-right: 15rpx;
          }
        }
        .code {
          color: #898989;
          font-size: 24rpx;
          margin-top: 20rpx;
        }
      }
      .switch {
        position: absolute;
        top: 25rpx;
        right: 20rpx;
        line-height: 42rpx;
        padding: 0 15rpx;
        color: #51d6b5;
        font-size: 20rpx;
        border: 1rpx solid #51d6b5;
        border-radius: 20rpx;
      }
    }
  }
  &__tab {
    display: flex;
    align-items: center;
    background: #ffffff;
    &-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      color: #333333;
      font-size: 28rpx;
      &::after {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 2rpx;
        height: 42rpx;
        background: #f6f6f6;
        content: '';
      }
      .text {
        position: relative;
        height: 100%;
        height: 88rpx;
        line-height: 88rpx;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      &.active {
        color: #0ec698;
        .text {
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4rpx;
            background: #0ec698;
          }
        }
      }
    }
  }
  &__con {
    padding: 20rpx;
    .art {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      .title {
        color: #333333;
        font-size: 36rpx;
        padding: 30rpx 0;
      }
      .num {
        color: #0ec698;
        font-size: 60rpx;
        font-weight: bold;
        &.on{ color: #fe2d46; }
      }
      .massage {
        color: #898989;
        font-size: 24rpx;
        letter-spacing: 5rpx;
        margin: 30rpx 0 50rpx 0;
        .count {
          color: #0ec698;
          font-size: 30rpx;
        }
      }
      .gap {
        width: 100%;
        .img {
          width: 100%;
          height: auto;
          display: block;
        }
      }
      .info {
        width: 100%;
        padding: 40rpx 50rpx 60rpx 50rpx;
        .cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 28rpx;
          margin-bottom: 30rpx;
          &:last-child {
            margin-bottom: 0;
          }
          .label {
            color: #8f8f8f;
          }
          .text {
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
