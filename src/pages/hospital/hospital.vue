<template>
  <view class="hospital">
    <view class="hospital-m">
      <view class="hospital-m__pic">
        <image class="img" mode="widthFix" src="@/static/image/hos_pic.jpg" />
      </view>
      <view class="hospital-m__wrap">
        <view class="hospital-m__wrap-info">
          <view class="logo">
            <image class="img" mode="widthFix" src="@/static/image/hos_logo.jpg" />
            <view class="tag">三级甲等</view>
          </view>
          <view class="menu">
            <view class="menu-item">
              <view class="menu-item__icon">
                <text class="iconfont icon-dianhua"></text>
              </view>
              <view class="menu-item__text">0471-6935602</view>
            </view>
            <view class="menu-item">
              <view class="menu-item__icon">
                <text class="iconfont icon-weizhi"></text>
              </view>
              <view class="menu-item__text">内蒙古呼和浩特市赛罕区包头东街9号</view>
            </view>
          </view>
        </view>
        <u-gap height="20" bg-color="#f3f3f3"></u-gap>
        <view class="hospital-m__wrap-sta">
          <view class="bt">功能清单</view>
          <view class="menu">
            <navigator url="/pages/branchList/branchList?type=0" hover-class="none" class="menu-item">
              <view class="icon">
                <image class="img" mode="widthFix" src="@/static/image/hos_icon1.jpg" />
              </view>
              <view class="text">科室介绍</view>
            </navigator>
            <navigator url="/pages/branchList/branchList?type=1" hover-class="none" class="menu-item">
              <view class="icon">
                <image class="img" mode="widthFix" src="@/static/image/hos_icon2.jpg" />
              </view>
              <view class="text">医生介绍</view>
            </navigator>
            <navigator url="/pages/branchPlace/branchPlace" hover-class="none" class="menu-item">
              <view class="icon">
                <image class="img" mode="widthFix" src="@/static/image/hos_icon3.jpg" />
              </view>
              <view class="text">科室分布</view>
            </navigator>
          </view>
        </view>
        <u-gap height="20" bg-color="#f3f3f3"></u-gap>
        <view class="hospital-m__wrap-intr">
          <view class="bt">本院介绍</view>
          <view class="centent">
            <p>我院原名呼和浩特市中蒙医医院(原呼和浩特市中蒙医院)，成立于1962年，是一所以蒙医、中医为主的综合性医疗机构。五十多年来，在党的民族政策的保护和扶持下，医院得到健康的发展。</p>
            <p>医院占地130亩，建筑面积8.5万平方米，开放床位700张。现有在职职工901人，其中卫技人员640人，博士学历专业人员10人，硕士学历专业人员90人，自治区名蒙医、名中医7人。享受国务院特殊津贴1人。拥有国家重点专科1个（蒙医五疗科），全国名老中医专家传承工作室2个（温启宗传承工作室、黄海波传承工作室）、自治区重点专科5个（脾胃科、针灸科、脑病科、心病科、蒙医针灸推拿科），市重点专科5个（蒙医肝胆科、蒙医肺病科、治未病中心、老年病科、肾病科）。医院设有蒙、中、西医门诊科室67个，病区12个，医技科室6个。配置有1.5T核磁、64排螺旋CT、血管造影机等大型先进诊疗设备及蒙中医特色治疗设备。    
            为使我市的民族医药得到更好的继承和弘扬，市委市政府高瞻远瞩，于2012年批准我院的新建项目，并将此项目列为全市重要民生工程和自治区成立70周年献礼工程予以重点支持。新医院建筑面积8.5万平方米，设置床位720张。经4年努力，新医院于2016年12月竣工交付使用，12月28日医院完成整体搬迁，同日更名为呼和浩特市蒙医中医医院。  
            2017年初，经市政府批准，呼市医养中心建设项目又落户我院。此项目位于医院东北侧，建筑面积约15万平方米，拟设床位1000张，目前已启动项目立项、施工图纸设计、建设资金筹集等工作，预计2018年破土动工。届时，医院无论规模上，还是学科发展上，都将达到自治区领先水平。   
            新医院开诊4个月来，各项工作渐入正规，病床使用率达到96%，医院以民族医疗特色和优质服务赢得了群众的信任和好评。  
            我们有理由相信，随着医院学科建设的不断加强和业务工作的日益繁荣，随着医养结合项目的建设和启用，医院将会迎来新一轮的高速发展。奋进中的呼市蒙医中医医院将秉承蒙中医为主、蒙中西医相结合的办院方针，坚持一体两翼发展思路（一体指医疗为主体，两翼指蒙中医医养康复和蒙中医养生保健相配合），为国内外群众提供优质、便捷、价廉、满意的服务。</p>
          </view>
        </view>
        <u-gap height="20" bg-color="#f3f3f3"></u-gap>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.hospital {
  &-m {
    &__pic {
      .img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    &__wrap {
      margin-top: -30rpx;
      .bt {
        display: flex;
        align-items: center;
        color: #040404;
        font-size: 28rpx;
        padding-left: 20rpx;
        &::before {
          display: block;
          width: 12rpx;
          height: 12rpx;
          border-radius: 50%;
          margin-right: 15rpx;
          background: #0ec698;
          content: '';
        }
      }
      &-info {
        padding: 30rpx;
        background: #ffffff;
        border-radius: 34rpx 34rpx 0 0;
        .logo {
          position: relative;
          width: 385rpx;
          margin-left: 20rpx;
          .img {
            width: 100%;
            height: auto;
            display: block;
          }
          .tag {
            position: absolute;
            color: #0ec698;
            font-size: 22rpx;
            left: 84rpx;
            bottom: -15rpx;
            line-height: 34rpx;
            padding: 0 10rpx;
            border: 1rpx solid #0ec698;
            border-radius: 6rpx;
          }
        }
        .menu {
          margin-top: 50rpx;
          &-item {
            display: flex;
            align-items: center;
            color: #333333;
            font-size: 26rpx;
            margin-bottom: 25rpx;
            padding-left: 30rpx;
            &:last-child {
              margin-bottom: 0;
            }
            &__icon {
              width: 40rpx;
              height: 40rpx;
              line-height: 40rpx;
              text-align: center;
              margin-right: 10rpx;
              color: #0ec698;
              .iconfont {
                font-size: 35rpx;
              }
            }
          }
        }
      }
      &-sta {
        padding: 30rpx;
        background: #ffffff;
        .menu {
          display: flex;
          justify-content: space-around;
          text-align: center;
          margin-top: 10rpx;
          &-item {
            .icon {
              width: 144rpx;
              .img {
                width: 100%;
                height: auto;
                display: block;
              }
            }
            .text {
              color: #161616;
              font-size: 28rpx;
              margin-top: 10rpx;
            }
          }
        }
      }
      &-intr {
        padding: 30rpx 30rpx 50rpx 30rpx;
        background: #ffffff;
        .centent {
          color: #333333;
          font-size: 24rpx;
          margin-top: 30rpx;
          p {
            text-indent: 2em;
            line-height: 45rpx;
          }
        }
      }
    }
  }
}
</style>