<template>
  <view class="container">
    <PatientCard :need-patient="true" @change="loadData"></PatientCard>
    <view class="wrap">
      <view class="wrap__list">
        <view
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleChoose(index)"
        >
          <view class="item-sta">
            <view :class="['item-sta__icon', { active: item.checked }]">
              <text class="iconfont icon-duihao2"></text>
            </view>
            <view class="item-sta__con">
              <view class="item-sta__con-title">
                {{ item.item_name }}
              </view>
              <!-- <view class="item-sta__con-list">
                <view class="cell">
                  <view class="name"></view>
                  <view class="price">¥</view>
                </view>
              </view> -->
            </view>
          </view>
          <view class="item-total">价格：¥{{ item.price }}</view>
        </view>
      </view>
    </view>
    <view class="fot-box">
      <view class="fot-box__total">
        <text class="text">总额：</text>
        <text class="price">￥{{ amount }}</text>
        <text></text>
      </view>
      <view class="fot-box__btn active" @click="createOrder">
        <text class="text">申请检测</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list: [],
      selected:null
    }
  },
  computed: {
    ...mapState(['patientInfo']),
    amount() {
      return this.list.reduce((pre,res) => {
        return (parseFloat(pre)+( res.checked ? parseFloat(res.price) : 0)).toFixed(2)
      }, 0)
    },
    count() {
      return this.list.reduce((pre,res) => {
        return pre+( res.checked ? 1 : 0)
      }, 0)
    },
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$http.post(this.API.INSPECTION_QUERY_OPTIONS, {}).then((res) => {
        res.data.forEach(element => {
          element.checked = false
        });
        this.list = res.data
      })
    },
    createOrder(){
      if(this.count!=1){
        uni.showToast({
          title: "请选择一项检查项目提交申请",
          icon: "none",
        });
      }else{
        console.info(this.patientInfo)
        console.info(this.selected)
        let formData={
          "template_code":this.selected.formwork_id,
          "group_code":this.selected.combination_id,
          "idcard":this.patientInfo.idcard
        }
        console.info(formData)
        
        this.$http.post(this.API.INSPECTION_CREATE_ORDER, formData).then((res) => {
          if(res.code=20000){
              this.$Router.push({ name: 'awaitPay' })
          }
          else{
            uni.showToast({ title:res.message,icon: "none",});
          }
        })
        //-----
      }
    },
    handleChoose(index) {
      this.list[index].checked = !this.list[index].checked
      this.selected = this.list[index]
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .wrap {
    flex: 1;
    padding: 20rpx;
    overflow-y: auto;
    &__list {
      .item {
        color: #a8a8a8;
        font-size: 26rpx;
        padding: 30rpx;
        margin-bottom: 20rpx;
        background: #ffffff;
        border-radius: 10rpx;
        &:last-child {
          margin-bottom: 0;
        }
        &-sta {
          display: flex;
          padding-bottom: 30rpx;
          &__icon {
            width: 32rpx;
            height: 32rpx;
            line-height: 32rpx;
            text-align: center;
            margin-right: 20rpx;
            border: 1rpx solid;
            border-color: #bebebe;
            border-radius: 50%;
            .iconfont {
              font-size: 25rpx;
              display: none;
            }
            &.active {
              color: #ffffff;
              border-color: #0ec698;
              background: #0ec698;
              .iconfont {
                display: block;
              }
            }
          }
          &__con {
            flex: 1;
            &-title {
              color: #333333;
              font-size: 28rpx;
              margin: 0 0 20rpx 0;
            }
            &-list {
              .cell {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20rpx;
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
        &-total {
          padding-top: 20rpx;
          text-align: right;
          border-top: 1rpx solid #eaeaea;
        }
      }
    }
  }
  .fot-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 104rpx;
    padding-left: 20rpx;
    background: #ffffff;
    &__total {
      display: flex;
      align-items: center;
      color: #a9a9a9;
      font-size: 28rpx;
      .price {
        color: #fa710a;
      }
    }
    &__btn {
      display: flex;
      width: 220rpx;
      height: 100%;
      background: #cfcfcf;
      .text {
        color: #ffffff;
        margin: auto;
        font-size: 28rpx;
      }
      &.active {
        background: #0ec698;
      }
    }
  }
}
</style>
