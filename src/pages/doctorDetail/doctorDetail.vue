<template>
  <view class="wrap">
    <view class="wrap__user">
      <view class="avatar">
        <image class="img" mode="aspectFill" :src="model.headimg" />
      </view>
      <view class="info">
        <view class="title">
          <view class="name">{{model.name}}</view>
          <view class="share">
            <view class="share_icon" @click="addCollect">
              <image class="img" v-if="!model.is_collect" mode="widthFix" src="@/static/image/doctor_d_icon1.png" />
               <image class="img" v-if="model.is_collect" mode="widthFix" src="@/static/image/doctor_d_icon1-h.png" />
            </view>
            <view class="share_icon">
              <image class="img" mode="widthFix" src="@/static/image/doctor_d_icon2.png" />
              <!-- <image class="img" mode="widthFix" src="@/static/image/doctor_d_icon2-h.png" /> -->
            </view>
          </view>
        </view>
        <view class="subt">
          <view class="subt-zc">职称：{{model.professional}}</view>
          <view class="subt-zw">职务：{{model.position}}</view>
        </view>
        <view class="intr">擅长：{{model.speciality}}</view>
      </view>
    </view>
    <view class="wrap__con">
      <u-sticky>
        <view class="wrap__con-tab">
          <view :class="['item', {active: tabIndex == 0}]" @click="handleSwitchItem(0)">挂号</view>
          <view :class="['item', {active: tabIndex == 1}]" @click="handleSwitchItem(1)">介绍</view>
        </view>
      </u-sticky>
      <view class="register" v-show="tabIndex == 0">
        <view class="register-list">
          <view class="register-list__cell">
            <view class="title">
              <view class="date">2020-07-24   星期五</view>
              <view class="text">更多日期</view>
              <view class="arrow">
                <text class="iconfont icon-arrowb"></text>
              </view>
            </view>
            <view class="list">
              <view class="item item-active">
                <view class="date">08:00:00~09:00:00</view>
                <view class="price">已无号</view>
              </view>
              <view class="item" v-for="item in 4" :key="item" @click="orderPopupStatus = true">
                <view class="date">08:00:00~09:00:00</view>
                <view class="price">¥15.00</view>
                <view class="arrow">
                  <text class="iconfont icon-arrowb"></text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="wrap__con-intr"  v-show="tabIndex == 1" v-html="model.content">
        <!-- 科室：国家重点专科蒙医针灸五疗科<br>
        专业职称：主任医师(享受国务院特殊津贴、国家二级教授、硕导)<br>
        科主任介绍：<br>
        &emsp;&emsp;享受国务院特殊津贴、国家二级教授（一级为院士科学家）、硕士生导师、国内外著名针灸专家、迄今为止呼市卫生系统首个唯一的国家重点专科主任、自治区名蒙医、全国百名杰出中医、蒙古国总统令特别功勋奖、全国十大医德楷模、全国五一劳动奖章获得者、内蒙古高级职称评审专家、内蒙古自然科学基金评审专家、内蒙古医疗事故鉴定专家、内蒙古预防接种异常反应鉴定专家、内蒙古医学会及蒙医学会理事、北京奥运会火炬手、呼市政协常委、是建国以来呼和浩特市卫生系统唯一国家重点专科蒙医针灸五疗科负责人，国家一类资质中央新闻网站【环球人物】刊载报道的著名针灸专家，他与医院的发展举足轻重，他创造的社会效益、经济效益为医院之首，呼市卫生系统之首。以蒙医针灸五疗治疗疾病见长，并把针灸超长的应用到内、外、妇、儿科。
        治疗范围：<br>
        1、脑出血、脑梗死疾病引起的肢体偏瘫。<br>
        2、颈、腰椎间盘突出症、骨质增生、风湿、类风湿性关节炎、坐骨神经痛、肩周炎。<br>
        3、高血压、冠心病、支气管哮喘、慢性胃炎、萎缩性胃炎、脂肪肝胆囊炎、肾结石。<br>
        4、药物致耳聋、神经性耳鸣、过敏性鼻炎、慢性咽炎、神经性头痛、闭合性骨折骨伤。<br>
        5、前列腺增生、卵巢囊肿、附件炎、小儿腹泻。<br>
        出诊时间：星期一到星期四全天，星期五凌晨5:00到12：00 -->
        
      </view>
    </view>
    <!-- 下单 -->
    <u-popup v-model="orderPopupStatus" mode="bottom" :closeable="true">
			<view class="order-wrap">
        <view class="order-wrap__info">
          <view class="order-wrap__info-user">
            <view class="avatar">
              <image class="img" mode="aspectFill" src="@/static/image/doctor_avatar.jpg" />
            </view>
            <view class="info">
              <view class="info-cell">
                <view class="info-cell__label">医师：</view>
                <view class="info-cell__text">特木其勒</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__label">科室：</view>
                <view class="info-cell__text">针灸科</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__label">费用：</view>
                <view class="info-cell__text">5.00</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__label">时段：</view>
                <view class="info-cell__text">2020-07-24 星期五   上午 <br> 09:00:00~10:00:00</view>
              </view>
            </view>
          </view>
          <view class="order-wrap__info-con">
            <view class="bt">请点击下方加号添加就诊人</view>
            <view class="list">
              <view class="item" v-for="item in 1" :key="item">李想</view>
              <view class="item-add">
                <text class="iconfont icon-hao"></text>
              </view>
            </view>
          </view>
        </view>
        <view class="order-wrap__btn">确认挂号</view>
      </view>
		</u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0,
      orderPopupStatus: false,
      model: ''
    }
  },
  onLoad() {
    this.getDetail();
  },
  methods: {
    // 修改tab 索引
    handleSwitchItem(index) {
      this.tabIndex = index
    },
    getDetail(){
      this.$http.post(this.API.DOCTOR_DETAIL,{id:this.$Route.query.id}).then(res=>{
        this.model = res.data;
      })
    },
    addCollect(){
      this.$http.post(this.API.ADD_COLLECT,{id:this.model.id}).then(res=>{
        if(res.code==20000){
          this.model.is_collect = !this.model.is_collect;
          uni.showToast({
              title: res.message,
              duration: 2000,
              icon:'none',
          });
        }

      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
.wrap {
  &__user {
    display: flex;
    padding: 30rpx;
    background: url('@/static/image/doctor_detail_img.jpg') no-repeat center bottom;
    background-size: 100%;
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
      color: #ffffff;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10rpx;
        .name {
          font-size: 32rpx;
        }
        .share {
          display: flex;
          align-items: center;
          &_icon {
            width: 42rpx;
            margin-right: 20rpx;
            &:last-child {
              margin-right: 0;
            }
            .img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
      .subt {
        display: flex;
        margin: 15rpx 0;
        &-zc {
          margin-right: 40rpx;
        }
      }
    }
  }
  &__con {
    &-tab {
      display: flex;
      justify-content: space-evenly;
      background: #ffffff;
      margin-bottom: 15rpx;
      .item {
        position: relative;
        height: 80rpx;
        line-height: 80rpx;
        color: #333333;
        font-size: 26rpx;
        padding: 0 10rpx;
        &.active {
          color: #0ec698;
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
    .register {
      &-list {
        &__cell {
          background: #ffffff;
          .title {
            display: flex;
            align-items: center;
            height: 78rpx;
            border-bottom: 1rpx solid #ededed;
            color: #999999;
            font-size: 26rpx;
            padding: 0 30rpx;
            .date {
              flex: 1;
            }
          }
          .list {
            .item {
              display: flex;
              align-items: center;
              height: 78rpx;
              margin-bottom: 10rpx;
              padding: 0 30rpx;
              &:last-child {
                margin-bottom: 0;
              }
              .date {
                flex: 1;
                color: #333333;
              }
              .price {
                color: #ff8c46;
                margin-right: 5rpx;
              }
              .arrow {
                color: #cdcdcd;
                .iconfont {
                  font-size: 35rpx;
                }
              }
              &-active {
                .date {
                  color: #999999;
                }
                .price {
                  color: #999999;
                }
              }
            }
          }
        }
      }
    }
    &-intr {
      color: #333333;
      font-size: 26rpx;
      padding: 30rpx;
      background: #fff;
      line-height: 50rpx;
    }
  }
  // 下单
  .order-wrap {
    &__info {
      padding: 40rpx 45rpx;
      &-user {
        display: flex;
        .avatar {
          width: 124rpx;
          height: 164rpx;
          margin-right: 40rpx;
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
          &-cell {
            display: flex;
            font-size: 26rpx;
            margin-bottom: 20rpx;
            &:last-child {
              margin-bottom: 0;
            }
            &__label {
              color: #333333;
              font-size: 26rpx;
              margin-right: 15rpx;
            }
            &__text {
              color: #999999;
            }
          }
        }
      }
      &-con {
        padding-top: 30rpx;
        margin-top: 30rpx;
        border-top: 1rpx solid #c8c8c8;
        .bt {
          color: #333333;
          font-size: 26rpx;
        }
        .list {
          display: grid;
          grid-template-columns: repeat(6, 76rpx);
          justify-content: center;
          grid-gap: 20rpx 40rpx;
          margin-top: 30rpx;
          .item {
            height: 76rpx;
            line-height: 76rpx;
            border-radius: 50%;
            color: #ffffff;
            font-size: 26rpx;
            text-align: center;
            background: #0ec698;
            @include textOverflow(1);
            &-add {
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1rpx solid #78d395;
              background: none;
              border-radius: 50%;
              color: #78d395;
            }
          }
        }
      }
    }
    &__btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      color: #ffffff;
      font-size: 26rpx;
      background: #0ec698;
    }
  }
}
</style>