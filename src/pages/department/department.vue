<template>
  <view class="department">
    <view class="u-wrap">
      <view class="u-menu-wrap">
      <scroll-view
        scroll-y
        scroll-with-animation
        class="u-tab-view menu-scroll-view"
        :scroll-top="scrollTop"
        style="width:25%"
      >
        <view
          v-for="(item, index) in list"
          :key="index"
          class="u-tab-item"
          :class="[current == index ? 'u-tab-item-active' : '']"
          :data-current="index"
          @tap.stop="swichMenu(index)"
        >
          <view class="icon">
            <image
              class="img"
              mode="widthFix"
              src="@/static/image/doctor_icon1.png"
            />
          </view>
          <text class="u-line-1">{{ item.name }}</text>
        </view>
      </scroll-view>
      <block v-for="(item, index) in list" :key="index">
        <scroll-view scroll-y class="right-box" v-if="current == index">
          <view class="page-view">
            <view class="class-item">
              <view class="item-container">
                <template>
                  <view
                    class="thumb-box"
                    v-for="(obj, index1) in item.child"
                    :key="index1"
                    @click="toDetail(obj.department_id,obj.department_name)"
                  >
                    <view class="item-menu-name">{{
                      obj.department_name
                    }}</view>
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
    </view>
    <!-- <view class="department_list">
      <view
        @click="toDetail(item.department_id,item.department_name)"
        v-for="(item, index) in list"
        :key="index"
        class="department_list_item"
      >
        <text>{{ item.department_name }}</text>
        <text class="iconfont icon-arrowb"></text>
      </view>
    </view> -->
  </view>
</template>
<script>
export default {
  data() {
    return {
      scrollTop: 0, //tab标题的滚动条位置
      current: 0, // 预设当前项的值
      menuHeight: 0, // 左边菜单的高度
      menuItemHeight: 0, // 左边菜单item的高度
      show: false,
      show_message:false,// 挂号指南信息
      reminder_message:'',
      val: '',
      cateList: [],
      list: [],
      collectOrRegisterList: [],
      keyword: '',

      list: [],
      isDoctor: 0,
    }
  },
  onLoad() {
    this.isDoctor = this.$Route.query.isDoctor
    this.getList()
  },
  methods: {
    getList() {
      this.$http.post(this.API.DEPARTMENT_ALL_LIST).then((res) => {
        if (res.code == 20000) {
          this.list = res.data
        }
      })
    },
    toDetail(id,name) {
      if (this.isDoctor) {
        this.$Router.push({ name: 'doctor', params: { departmentid: id,departmentname: name} })
      } else {
        this.$Router.push({ name: 'departmentDetail', params: { id: id } })
      }
    },
    // 点击左边的栏目切换
    async swichMenu(index) {
      if (index == this.current) return
      this.current = index
      // 如果为0，意味着尚未初始化
      if (this.menuHeight == 0 || this.menuItemHeight == 0) {
        await this.getElRect('menu-scroll-view', 'menuHeight')
        await this.getElRect('u-tab-item', 'menuItemHeight')
      }
      // 将菜单菜单活动item垂直居中
      this.scrollTop =
        index * this.menuItemHeight +
        this.menuItemHeight / 2 -
        this.menuHeight / 2
    },
    // 获取一个目标元素的高度
    getElRect(elClass, dataVal) {
      new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery().in(this)
        query
          .select('.' + elClass)
          .fields({ size: true }, (res) => {
            // 如果节点尚未生成，res值为null，循环调用执行
            if (!res) {
              setTimeout(() => {
                this.getElRect(elClass)
              }, 10)
              return
            }
            this[dataVal] = res.height
          })
          .exec()
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.department {
  &_list {
    &_item {
      font-size: 30rpx;
      margin-left: 40rpx;
      line-height: 100rpx;
      display: flex;
      justify-content: space-between;
      border-bottom: 1upx solid #e0e0e0;
    }
  }
  .iconfont {
    color: #c7c7c7;
    margin-right: 30rpx;
  }
}
.u-wrap {
  height: calc(100vh);
  /* #ifdef H5 */
  height: calc(100vh - var(--window-top));
  /* #endif */
  display: flex;
  flex-direction: column;
  font-size: 30rpx;
}
.u-menu-wrap {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.u-tab-view {
  // flex: 1;
  height: 100%;
}
.u-tab-item {
  height: 96rpx;
  background: #f6f6f6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 30rpx;
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
  flex: 1;
  color: #333333;
  padding-left: 30rpx;
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
  // padding-left: 30rpx;
  border-bottom: 1rpx solid #f3f3f3;
}
</style>
