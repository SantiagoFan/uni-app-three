<template>
  <view class="wrap">
    <view class="wrap__user">
      <view class="avatar">
        <image class="img" mode="aspectFill" src="@/static/image/doctor_avatar.jpg" />
      </view>
      <view class="info">
        <view class="title">
          <view class="name">徐春义</view>
        </view>
        <view class="subt"> 产科门诊 </view>
        <view class="intr">副主任医师</view>
      </view>
    </view>
    <view class="wrap__con">
      <view class="wrap__con-intr">
        科室：国家重点专科蒙医针灸五疗科<br />
        专业职称：主任医师(享受国务院特殊津贴、国家二级教授、硕导)<br />
        科主任介绍：<br />
        &emsp;&emsp;享受国务院特殊津贴、国家二级教授（一级为院士科学家）、硕士生导师、国内外著名针灸专家、迄今为止呼市卫生系统首个唯一的国家重点专科主任、自治区名蒙医、全国百名杰出中医、蒙古国总统令特别功勋奖、全国十大医德楷模、全国五一劳动奖章获得者、内蒙古高级职称评审专家、内蒙古自然科学基金评审专家、内蒙古医疗事故鉴定专家、内蒙古预防接种异常反应鉴定专家、内蒙古医学会及蒙医学会理事、北京奥运会火炬手、呼市政协常委、是建国以来呼和浩特市卫生系统唯一国家重点专科蒙医针灸五疗科负责人，国家一类资质中央新闻网站【环球人物】刊载报道的著名针灸专家，他与医院的发展举足轻重，他创造的社会效益、经济效益为医院之首，呼市卫生系统之首。以蒙医针灸五疗治疗疾病见长，并把针灸超长的应用到内、外、妇、儿科。
        治疗范围：<br />
        1、脑出血、脑梗死疾病引起的肢体偏瘫。<br />
        2、颈、腰椎间盘突出症、骨质增生、风湿、类风湿性关节炎、坐骨神经痛、肩周炎。<br />
        3、高血压、冠心病、支气管哮喘、慢性胃炎、萎缩性胃炎、脂肪肝胆囊炎、肾结石。<br />
        4、药物致耳聋、神经性耳鸣、过敏性鼻炎、慢性咽炎、神经性头痛、闭合性骨折骨伤。<br />
        5、前列腺增生、卵巢囊肿、附件炎、小儿腹泻。<br />
        出诊时间：星期一到星期四全天，星期五凌晨5:00到12：00
      </view>
    </view>
  </view>
</template>


<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.wrap {
  &__user {
    display: flex;
    padding: 30rpx;
    background: url("@/static/image/doctor_detail_img.jpg") no-repeat center
      bottom;
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
    &-intr {
      color: #333333;
      font-size: 26rpx;
      padding: 30rpx;
      background: #fff;
      line-height: 50rpx;
    }
  }
 
}
</style>