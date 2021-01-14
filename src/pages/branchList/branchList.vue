<template>
  <view class="u-wrap">
    <u-top-tips ref="uTips"></u-top-tips>
    <view class="u-search-box">
      <navigator url="/pages/branchSearch/branchSearch" class="u-search-inner">
        <u-icon name="search" color="#909399" :size="28"></u-icon>
        <text class="u-search-text">搜索科室、医生</text>
      </navigator>
    </view>
    <view class="u-menu-wrap">
      <scroll-view
        scroll-y
        scroll-with-animation
        class="u-tab-view menu-scroll-view"
        :scroll-top="scrollTop"
      >
        <view
          class="u-tab-item"
          :class="[current == 0 ? 'u-tab-item-active' : '']"
          @tap.stop="swichMenu(0)"
        >
          <view class="icon">
            <image class="img" mode="widthFix" src="@/static/image/doctor_icon6.png" />
          </view>
          <text class="u-line-1">历史挂号</text>
        </view>
        <view
          class="u-tab-item"
          :class="[current == 1 ? 'u-tab-item-active' : '']"
          @tap.stop="swichMenu(1)"
        >
          <view class="icon">
            <image class="img" mode="widthFix" src="@/static/image/doctor_icon7.png" />
          </view>
          <text class="u-line-1">收藏的医生</text>
        </view>
        <view
          v-for="(item, index) in cateList"
          :key="index"
          class="u-tab-item"
          :class="[current == index+2 ? 'u-tab-item-active' : '']"
          :data-current="index+2"
          @tap.stop="swichMenu(index+2)"
        >
          <view class="icon">
            <image class="img" mode="widthFix" src="@/static/image/doctor_icon1.png" />
          </view>
          <text class="u-line-1">{{ item.name }}</text>
        </view>
      </scroll-view>
      <block v-for="(item, index) in cateList" :key="index">
        <scroll-view scroll-y class="right-box">
          <view class="page-view">
            <view class="class-item">
              <view class="item-container">
                <view class="doctor-s" v-if="current === 0 || current === 1">
                  <view
                    @click="handleClickDetail(item.id)"
                    class="doctor-wrap"
                    v-for="(item,index) in collectList"
                    :key="index"
                  >
                    <view class="doctor-wrap__avatar">
                      <image
                        class="img"
                        mode="aspectFill"
                        :src="item.headimg"
                      />
                    </view>
                    <view class="doctor-wrap__info">
                      <view class="doctor-wrap__info-name">{{item.name}}</view>
                      <view class="doctor-wrap__info-subt">{{item.speciality}}</view>
                    </view>
                    <view class="doctor-wrap__arrow">
                      <text class="iconfont icon-arrowb"></text>
                    </view>
                  </view>
                </view>
                <template v-else>
                  <view
                    class="thumb-box"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="handleClickDetail(item.id)"
                  >
                    <view class="item-menu-name">{{ item.name }}</view>
                    <view class="arrow">
                      <text class="iconfont icon-arrowb"></text>
                    </view>
                  </view>
                </template>
              </view>
            </view>
          </view>
        </scroll-view>
      </block>
    </view>
    <u-keyboard
      ref="uKeyboard"
      v-model="show"
      @change="change"
      @backspace="backspace"
    ></u-keyboard>
  </view>
</template>

<script>
import classifyData from "@/common/classify.data.js";
export default {
  data() {
    return {
      tabbar: classifyData,
      scrollTop: 0, //tab标题的滚动条位置
      current: 0, // 预设当前项的值
      menuHeight: 0, // 左边菜单的高度
      menuItemHeight: 0, // 左边菜单item的高度
      show: false,
      val: "",
      type: "", // 0、科室信息 1、医生介绍
      cateList: [],
      list: [],
      collectList: []
    };
  },
  onLoad(options = {}) {
    console.log(111);
    // type : 0、科室信息 1、医生介绍
    const { type } = options;
    console.log("options", options);
    this.type = type;
    this.getCateList();
  },
  methods: {
    focusPrice() {
      console.log("11");
    },
    // 点击详情
    handleClickDetail(departmentid) {
      if(this.type==0){
        this.$Router.push( '/pages/branchInfo/branchInfo' );
      }else{
        this.$Router.push({path:'/pages/branchDetail/branchDetail',query:{departmentid:departmentid}});
      }
    },
    change(e) {
      let inputVal = this.val;
      let lastStr = inputVal.charAt(inputVal.length - 1);
      let isExistRadix = inputVal.indexOf(".") != -1;

      // 处理数字
      if (isExistRadix && e == ".") {
        this.val = inputVal;
      } else if (inputVal == "" && e == ".") {
        this.val = "0.";
      } else if (inputVal.length === 1 && inputVal === "0") {
        this.val = e !== "." ? String(e) : inputVal + e;
      } else if (inputVal.length < 6) {
        let newStr = inputVal + e;
        let lastNewStr =
          newStr.indexOf(".") === -1
            ? newStr
            : newStr.substring(0, newStr.indexOf(".") + 3);
        this.val = lastNewStr;
      }
    },
    backspace(e) {
      this.val = this.val.substr(0, this.val.length - 1);
    },
    getImg() {
      return Math.floor(Math.random() * 35);
    },
    // 点击左边的栏目切换
    async swichMenu(index) {
      if (index == this.current) return;
      this.current = index;
      // 如果为0，意味着尚未初始化
      if (this.menuHeight == 0 || this.menuItemHeight == 0) {
        await this.getElRect("menu-scroll-view", "menuHeight");
        await this.getElRect("u-tab-item", "menuItemHeight");
      }
      // 将菜单菜单活动item垂直居中
      this.scrollTop =
        index * this.menuItemHeight +
        this.menuItemHeight / 2 -
        this.menuHeight / 2;
        if(index==1){
          this.getCollectList();
        }
    },
    // 获取一个目标元素的高度
    getElRect(elClass, dataVal) {
      new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery().in(this);
        query
          .select("." + elClass)
          .fields({ size: true }, (res) => {
            // 如果节点尚未生成，res值为null，循环调用执行
            if (!res) {
              setTimeout(() => {
                this.getElRect(elClass);
              }, 10);
              return;
            }
            this[dataVal] = res.height;
          })
          .exec();
      });
    },
    getCateList(){
      this.$http.post(this.API.DEPARTMENT_CATEGORY).then(res=>{
        this.cateList = res.data;
      }).then(response=>{
        if(this.cateList.length>0){
          this.$http.post(this.API.DEPARTMENT_LIST,{cateid:this.cateList[0]['id']}).then(res=>{
            this.list = res.data;
          })
        }
       
      })
    },
    getCollectList(){
      this.$http.post(this.API.COLLECT_DOCTOR).then(res=>{
        this.collectList = res.data;
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.u-wrap {
  height: calc(100vh);
  /* #ifdef H5 */
  height: calc(100vh - var(--window-top));
  /* #endif */
  display: flex;
  flex-direction: column;
  font-size: 26rpx;
}
.u-search-box {
  padding: 30rpx;
  background: #ffffff;
}
.u-menu-wrap {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.u-search-inner {
  display: flex;
  align-items: center;
  height: 70rpx;
  background-color: #f5f5f5;
  padding: 0 20rpx;
  border-radius: 10rpx;
}
.u-search-text {
  font-size: 26rpx;
  color: #666666;
  margin-left: 10rpx;
}
.u-tab-view {
  flex: 1;
  height: 100%;
}
.u-tab-item {
  height: 96rpx;
  background: #f6f6f6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 26rpx;
  padding: 0 30rpx;
  color: #666666;
  font-weight: 400;
  line-height: 1;
  .icon {
    width: 35rpx;
    margin-right: 10rpx;
    .img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.u-tab-item-active {
  background: #fff;
}

.right-box {
  color: #333333;
  background-color: #ffffff;
}

.class-item {
  padding-right: 30rpx;
}

.thumb-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 96rpx;
  padding-left: 30rpx;
  border-bottom: 1rpx solid #f3f3f3;
}
.doctor-s {
  padding-top: 80rpx;
  .doctor-wrap {
    display: flex;
    align-items: center;
    padding: 16rpx 0 16rpx 30rpx;
    border-bottom: 1rpx solid #f3f3f3;
    &__avatar {
      width: 85rpx;
      height: 110rpx;
      margin-right: 20rpx;
      border-radius: 6rpx;
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &__info {
      flex: 1;
      &-name {
        color: #333333;
        font-size: 32rpx;
        @include textOverflow(1);
      }
      &-subt {
        color: #989898;
        font-size: 26rpx;
        margin-top: 20rpx;
        @include textOverflow(1);
      }
    }
  }
}
</style>
