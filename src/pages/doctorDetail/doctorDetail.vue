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
            <view class="title" @click="openDate">
              <view class="date">{{selectDate}}   {{selectWeek}}</view>
              <view class="text">{{dateName}}</view>
              <view :class="['arrow', {active: isShow}]">
                <text class="iconfont icon-arrowb"></text>
              </view>
            </view>
            <view class="wrap_con__date active" v-if="isShow">
              <view class="week-box">
                <view class="week-box__item" v-for="(item,index) in week" :key="index">{{item}}</view>
              </view>
              <view class="list active">
                <view  class="item" v-for="(item, index) in schemeList" :key="index" @click="changeScheme(index)" >
                  <view v-if='item' :class="['con', {active: item.date==selectDate}]">
                    <view class="count" :style="{color: item.is_exist == 1?'#0ec698': ''}">{{item.day}}</view>
                    <view class="status">{{item.is_exist==1?'有':'无'}}</view>
                  </view>
                </view>
              </view>
            </view>
            <view class="list">
              <view :class="['item',item.has_source==0?'':'item-active']" v-for="(item,index) in list" :key="index" @click="goRegister(index)">
                <view class="date">{{item.time}}</view>
                <view class="price" v-if="item.has_source==0">¥{{item.price}}</view>
                <view class="price" v-else>已无号</view>
                <view class="arrow" v-if="item.has_source==0">
                  <text class="iconfont icon-arrowb"></text>
                </view>
              </view>
              <view class="nodata" v-if="list.length<=0">
                  <image class="img" mode="widthFix" src="@/static/image/nodata.png" />
                  <text class="notext">暂无更多</text>
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
              <image class="img" mode="aspectFill" :src="model.headimg" />
            </view>
            <view class="info">
              <view class="info-cell">
                <view class="info-cell__label">医师：</view>
                <view class="info-cell__text">{{model.name}}</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__label">科室：</view>
                <view class="info-cell__text">{{model.department_name}}</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__label">费用：</view>
                <view class="info-cell__text">{{model.price}}</view>
              </view>
              <view class="info-cell">
                <view class="info-cell__label">时段：</view>
                <view class="info-cell__text">{{model.date}} {{model.week}}   {{timeStatus}} <br> {{time}}</view>
              </view>
            </view>
          </view>
          <view class="order-wrap__info-con">
            <view class="bt">请点击下方加号添加就诊人</view>
            <view class="list">
              <view class="item" v-for="(item,index) in patientList" :key="index">{{getName(item.name)}}</view>
              <view class="item-add" @click="addPatient">
                <text class="iconfont icon-hao"></text>
              </view>
            </view>
          </view>
        </view>
        <view class="order-wrap__btn" @click="createOrder">确认挂号</view>
      </view>
		</u-popup>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tabIndex: 0,
      orderPopupStatus: false,
      model: {headimg:"",name: "",position:"",professional:"",speciality:""},
      list: [],
      time: "",
      timeStatus: "",
      patientList: [],
      isShow: false,
      schemeList: [],
      week:["周一","周二","周三","周四","周五","周六","周日"],
      selectDate:"",
      selectWeek: "",
      dateName: "更多日期"
    }
  },
  computed: {
    ...mapState(["patientInfo"]),
  },
  onLoad() {
    // this.getDetail();
    this.selectDate = this.$Route.query.date;
    this.getPatientList();
    this.getSchemeList();
  },
  methods: {
    // 修改tab 索引
    handleSwitchItem(index) {
      this.tabIndex = index
    },
    getSchemeList(){
      this.$http.post(this.API.SCHEME_LIST,{departmentid:this.$Route.query.departmentid}).then(res=>{
        // var newArray = (res.data).filter(value => Object.keys(value).length!== 0);
        this.schemeList = res.data;
      }).then(res=>{
        this.getDetail();
      })
    },
    getDetail(){
      var data = {
        id: this.$Route.query.id,
        date: this.selectDate
      };
      this.$http.post(this.API.DOCTOR_DETAIL,data).then(res=>{
        this.model = res.data;
        this.list = res.list;
        var date = new Date(this.selectDate);
        this.selectWeek = "星期" + "日一二三四五六".charAt(date.getDay());
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
    },
    goRegister(index){
      this.time = this.list[index]['time'];
      this.timeStatus = this.list[index]['time_status']=='AM'?'上午':'下午';
      this.orderPopupStatus = true;
    },
    getPatientList(){
      this.$http.post(this.API.PATIENT_LIST).then(res=>{
        this.patientList = res.data;
      })
    },
     addPatient(){
      this.$Router.push("/pages/medicalCardLogin/medicalCardLogin")
    },
    createOrder(){
      this.$Router.push("/pages/payment/payment");
    },
    getName(str){
      if(str.length>2){
        return str.substr(-2,2);
      }else{
        return str;
      }
    },
    openDate(){
      this.isShow = !this.isShow;
      this.dateName = this.isShow?"收起日期":"更多日期";
    },
    changeScheme(index){
      this.selectDate = this.schemeList[index]['date'];
      this.getDetail();
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
            .arrow {
              transition: all .5s;
              &.active {
                transform: rotate(-90deg);
              }
            }
          }
        .wrap_con__date{
            // display: flex;
            position: relative;
            margin-bottom: 20rpx;
            background: #ffffff;
            padding: 20rpx 0;
            border-top: 2rpx solid #e4e4e4;
            .week-box {
              display: flex;
              text-align: center;
              margin-bottom: 10rpx;
              padding-bottom: 20rpx;
              border-bottom: 2rpx solid #e4e4e4;
              &__item {
                flex: 1;
              }
            }
            .list {
              // display: flex;
              // width: 660rpx;
              // overflow-x: auto;
              // white-space: nowrap;
              &::-webkit-scrollbar {
                display: none;
              }
              .item {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                // width: 110rpx;
                flex-basis: 110rpx;
                flex-shrink: 0;
                // height: 126rpx;
                font-size: 22rpx;
                white-space: nowrap;
                .week {
                  color: #666666;
                  margin-bottom: 10rpx;
                }
                .con {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  width: 65rpx;
                  height: 65rpx;
                  border-radius: 50%;
                  .count {
                    color: #666666;
                    font-size: 24rpx;
                  }
                  .status {
                    color: #bcbcbc;
                  }
                  &.active {
                    background: #0ec698;
                    .count {
                      color: #ffffff;
                    }
                    .count {
                      color: #ffffff !important;
                    }
                    .status {
                      color: #ffffff;
                    }
                  }
                }
              }
            }
            .arrow {
              position: absolute;
              right: 0;
              top: 0;
              display: flex;
              width: 90rpx;
              height: 100%;
              background: rgba($color: #ffffff, $alpha: .7);
              border-left: 1rpx solid #e9e9e9;
              .icon {
                position: relative;
                width: 36rpx;
                height: 36rpx;
                margin: auto;
                color: #ffffff;
                text-align: center;
                background: #0ec698;
                border-radius: 50%;
                transition: all .5s;
                .iconfont {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%,-50%);
                  font-size: 20rpx;
                }
                &.active {
                  transform: rotate(180deg)
                }
              }
            }
            &.active {
              .arrow {
                height: 94rpx;
                top: -94rpx;
                border-left: none;
              }
              .list {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                width: 100%;
                margin-top: -10rpx;
                .item {
                  margin-top: 10rpx;
                }
              }
            }
        }
          & > .list {
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
            .nodata{
              min-height: 800rpx;
              text-align: center;
              .img{
                display: block;
                width: 194rpx;
                height: 171rpx;
                margin: 100rpx auto 0 auto;
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
            overflow: hidden;
            // @include textOverflow(1);
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