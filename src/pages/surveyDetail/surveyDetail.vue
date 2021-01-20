<template>
  <view class="wrap">
    <view class="wrap-head">
      <view class="wrap-head__art1">
        <view class="title">{{ model.name }}</view>
        <view class="date"
          >有效期：{{ model.start_time }} 至 {{ model.end_time }}</view
        >
      </view>
      <view class="wrap-head__art2">
        <view class="title" v-if="model.description">{{
          model.description
        }}</view>
        <view class="subt">发布单位：{{ model.author }}</view>
      </view>
    </view>
    <form @submit="formSubmit">
      <view class="wrap-con">
        <view class="wrap-con__item" v-for="(item, index) in list" :key="index">
          <view :class="['label', { active: item.is_answer }]">{{
            item.name
          }}</view>
          <!-- 选择 -->
          <view class="textarea" v-if="item.type == 1">
            <u-input
              type="textarea"
              v-model="item.answer"
              name="answer"
              :height="60"
              :placeholder="'请在此输入（最多' + item.description + '字）'"
            />
          </view>
          <view class="radio-list" v-else>
            <u-radio-group
              v-model="item.answer"
              :wrap="true"
              :size="35"
              :icon-size="24"
              v-if="item.type == 2"
            >
              <u-radio
                v-for="(obj, index1) in item.editredios"
                :key="index1"
                class="radio"
                :name="obj.name"
                active-color="#0ec698"
                >{{ obj.name }}</u-radio
              >
            </u-radio-group>
            <u-checkbox-group v-else @change="checkboxGroupChange">
              <u-checkbox
                v-model="obj.checked"
                v-for="(obj, index1) in item.editredios"
                :key="index1"
                :name="obj.name"
                >{{ obj.name }}</u-checkbox
              >
            </u-checkbox-group>
          </view>
        </view>
      </view>
      <button class="wrap-btn" form-type="submit">提交</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: 'orange',
      list: [],
      model: {
        name: '',
        start_time: '',
        end_time: '',
        description: '',
        author: '',
      },
      flag: false,
    }
  },

  onShow() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http
        .post(this.API.QUESTION_DETAIL, {
          questionnaireid: this.$Route.query.id,
        })
        .then((res) => {
          let list = res.data.list
          list.forEach((item) => {
            item['answer'] = ''
            if(item.type==3){
              item.editredios.forEach((obj)=>{
                obj['checked'] = false;
              })
            }
          })
          this.list = list
          this.model = res.data.model
        })
    },
    checkboxGroupChange(e) {
      this.list.forEach((item) => {
        if(item.type==3){
          item['answer'] = ''
          item.editredios.forEach((obj)=>{
            if(obj.checked){
              item['answer'] = item['answer']==''?obj.name:item['answer']+','+obj.name
            }
          })
        }
      })
    },
    formSubmit(e) {
      console.log(this.list);
      var index = this.list.findIndex(item=>item.is_answer&&item.answer.trim()=='')
      if(index!=-1){
        uni.showToast({
              title: '必填项答案不能为空',
              duration: 2000,
              icon: 'none',
            })
        return false
      }
      if (this.flag) {
        return false
      }
      this.flag = true
      this.$http
        .post(this.API.SAVE_ANSWER, { answer: this.list })
        .then((res) => {
          uni.showToast({
            title: res.message,
            duration: 2000,
            icon: 'none',
          })
          if (res.code == 20000) {
            setTimeout(() => {
              this.$Router.back(1)
            }, 1000)
          } else {
            this.flag = false
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20rpx;
  &-head {
    padding: 0 30rpx;
    background: #ffffff;
    border-radius: 10rpx;
    &__art1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: 1rpx solid #dfdfdf;
      .title {
        color: #333333;
        font-size: 34rpx;
        font-weight: bold;
      }
      .date {
        color: #898989;
        font-size: 24rpx;
        margin-top: 20rpx;
      }
    }
    &__art2 {
      display: flex;
      flex-direction: column;
      padding: 30rpx 0;
      .title {
        color: #484848;
        font-size: 28rpx;
      }
      .subt {
        color: #a8a8a8;
        font-size: 24rpx;
        margin-top: 20rpx;
      }
    }
  }
  &-con {
    margin-top: 20rpx;
    &__item {
      padding: 30rpx;
      margin-bottom: 20rpx;
      background: #ffffff;
      border-radius: 10rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .label {
        position: relative;
        color: #484848;
        font-size: 28rpx;
        &.active::before {
          display: inline-block;
          margin-right: 4rpx;
          color: #ff4d4f;
          font-size: 14px;
          font-family: SimSun, sans-serif;
          line-height: 1;
          content: '*';
        }
      }
      .radio-list {
        margin-top: 20rpx;
        &::v-deep .u-radio {
          line-height: 2.2;
        }
        &::v-deep .u-radio__label {
          margin-left: 20rpx;
        }
      }
      .textarea {
        margin-top: 30rpx;
        font-size: 26rpx;
      }
    }
  }
  &-btn {
    height: 80rpx;
    line-height: 80rpx;
    color: #ffffff;
    font-size: 30rpx;
    text-align: center;
    margin-top: 30rpx;
    background: #0ec698;
    border-radius: 10rpx;
  }
}
</style>
