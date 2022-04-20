<template>
  <view class="container">
    <PatientCard
      :need-patient="true"
      @change="loadData"
      :showMessage="false"
    ></PatientCard>
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
          <view class="item-total">价格：¥{{ item.price | moneyformat }}</view>
        </view>
      </view>
      <!-- 号源信息 -->
      <view class="register">
        <view class="register-list">
          <empty v-if="sourceList.length === 0" :title="'暂无排班'"></empty>
          <view class="register-list__cell" v-if="sourceList.length > 0">
            <view class="list">
              <view
                :class="[
                  'item',
                  {
                    'item-active': item.count > item.reg_count,
                    checked: item.checked,
                  },
                ]"
                v-for="(item, index) in sourceList"
                :key="index"
                @click="selectRange(item, index)"
              >
                <view class="date">{{ item.time }}</view>
                <view class="rest_source" v-if="item.count > item.reg_count"
                  >余：{{ item.count - item.reg_count }}</view
                >
                <view class="rest_source" v-else>约满</view>

                <view class="arrow" v-if="item.count > item.reg_count">
                  <text class="iconfont icon-arrowb"></text>
                </view>
              </view>
            </view>
          </view>
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
    <u-modal v-model="show_message">
      <view class="message_content">
        <richtext :content="reminder_message"></richtext>
      </view>
    </u-modal>
  </view>
</template>

<script>
import richtext from "@/components/common/richtext.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: [],
      sourceList: [],
      selected: null,
      selectedRange: null,
      reminder_message: "",
      show_message: false,
      flag:false,
      apply_date:null
    };
  },
   onLoad(query){
    // #ifdef MP-ALIPAY
    this.$reportCmPV_YL({ title: '核酸检测预约', query })
    // #endif
  },
  components: { richtext },
  computed: {
    ...mapState(["patientInfo"]),
    amount() {
      return this.list.reduce((pre, res) => {
        return (
          parseFloat(pre) + (res.checked ? parseFloat(res.price) : 0)
        ).toFixed(2);
      }, 0);
    },
    allSelect() {
      return this.selectedRange != null && this.selectedRange != null;
    },
  },
  mounted() {
    this.getSettings();
    this.getSourceList();
    this.loadOptions();
  },
  methods: {
    getSourceList() {
      this.$http.post(this.API.NUCLEICACID_SOURCE, {}).then((res) => {
        res.data.list.forEach((element) => {
          element.checked = false;
        });
        this.sourceList = res.data.list;
        this.apply_date = res.data.date;
      });
    },
    getSettings() {
      this.$http.post(this.API.NUCLEICACID_SETTINGS).then((res) => {
        this.reminder_message = res.data.reminder_message;
        this.show_message = res.data.reminder_show;
      });
    },
    loadOptions() {
      this.$http.post(this.API.NUCLEICACID_QUERY_OPTIONS, {}).then((res) => {
        res.data.forEach((element) => {
          element.checked = false;
        });
        if (res.data.length > 0) {
          res.data[0].checked = true;
          this.selected = res.data[0];
        }
        this.list = res.data;
      });
    },
    selectRange(item, index) {
      if (item.reg_count >= item.count) {
        return;
      }
      this.sourceList[index].checked = true;
      for (let i = 0; i < this.sourceList.length; i++) {
        if (i == index) {
          this.sourceList[i].checked = true;
        } else {
          this.sourceList[i].checked = false;
        }
      }
      this.selectedRange = item;
    },
    createOrder() {
      if (!this.allSelect) {
        uni.showToast({
          title: "请选择检查项目和时间段",
          icon: "none",
        });
        return;
      }

      let formData = {
        project: this.selected,
        apply_range: this.selectedRange.time,
        apply_date:this.apply_date,
        patient_code:this.patientInfo.patient_code
      };
      uni.showModal({
        title: "温馨提示",
        content: "核酸检测预约需先进行信息登记，是否前往登记",
        success: (res) => {
          if (this.flag) {
            return false
          }
          this.flag = true
          let starttime=moment();
          this.$http
            .post(this.API.NUCLEICACID_APPLY_SOURCE, formData)
            .then((res) => {
              if ((res.code = 20000)) {
                formData['order_no'] = res.data.order_no
                this.$Router.push({ name: "nucleicAcidSurvey",query:formData });
                // #ifdef MP-ALIPAY
                this.$monitor.api({api:"核酸检测预约",success:true,c1:"taSR_YL",time:moment().diff(starttime)})
                // #endif
              }
              else{
                // #ifdef MP-ALIPAY
                this.$monitor.api({api:"核酸检测预约",success:false,c1:"taSR_YL",time:moment().diff(starttime)})
                // #endif
              }
            }).catch(()=>{
              // #ifdef MP-ALIPAY
                this.$monitor.api({api:"核酸检测预约",success:false,c1:"taSR_YL",time:moment().diff(starttime)})
                // #endif
            })
            .finally(()=>{
              this.flag = false
            });
        },
      });
    },
    handleChoose(index) {
      this.list[index].checked = true;
      for (let i = 0; i < this.list.length; i++) {
        if (i == index) {
          this.list[i].checked = true;
        } else {
          this.list[i].checked = false;
        }
      }
      console.info(this.list);
      this.selected = this.list[index];
    },
  },
};
</script>

<style lang="scss" scoped>
.message_content {
  padding: 25rpx;
}
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
    .register {
      &-list {
        &__cell {
          background: #ffffff;
          .title {
            display: flex;
            align-items: center;
            height: 86rpx;
            border-bottom: 1rpx solid #ededed;
            color: #999999;
            font-size: 30rpx;
            padding: 0 30rpx;
            .date {
              flex: 1;
            }
            .arrow {
              transition: all 0.5s;
              &.active {
                transform: rotate(-90deg);
              }
            }
          }
          .wrap_con__date {
            // display: flex;
            position: relative;
            margin-bottom: 20rpx;
            background: #ffffff;
            padding: 20rpx 0;
            border-top: 2rpx solid #e4e4e4;
            border-bottom: 2rpx solid #e4e4e4;
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
                font-size: 32rpx;
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
                  width: 80rpx;
                  height: 80rpx;
                  border-radius: 50%;
                  .count {
                    color: #666666;
                    font-size: 32rpx;
                  }
                  .status {
                    color: #bcbcbc;
                    font-size: 26rpx;
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
              background: rgba($color: #ffffff, $alpha: 0.7);
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
                transition: all 0.5s;
                .iconfont {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  font-size: 20rpx;
                }
                &.active {
                  transform: rotate(180deg);
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
              height: 90rpx;
              margin-bottom: 10rpx;
              padding: 0 30rpx;
              border-bottom: 2rpx solid #e9e9e9;
              &:last-child {
                margin-bottom: 0;
              }
              .date {
                flex: 1;
                color: #999999;
                font-size: 34rpx;
              }
              .rest_source {
                margin-right: 20rpx;
                font-size: 28rpx;
              }
              .price {
                color: #ff8c46;
                margin-right: 5rpx;
                font-size: 32rpx;
              }
              .arrow {
                color: #cdcdcd;
                .iconfont {
                  font-size: 35rpx;
                }
              }
              &.checked {
                background-color: #0ec698;
                .date {
                  color: #ffffff;
                }
                .rest_source {
                  color: #ffffff;
                  font-weight: bold;
                }
              }
              &-active {
                .date {
                  color: #000;
                }
                .rest_source {
                  color: #000;
                  font-weight: bold;
                }
              }
            }
            .nodata {
              min-height: 800rpx;
              text-align: center;
              .img {
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
