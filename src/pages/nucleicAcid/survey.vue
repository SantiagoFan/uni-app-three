<template>
  <view class="wrap">
    <u-form :model="formData" ref="uForm" label-position="top" label-width="130rpx">
      <view class="wrap-head" >
        <!-- <view class="wrap-head__art1">
          <view class="title">标题</view>
          <view class="date">有效期： 至 </view>
        </view> -->
        <PatientCard :need-patient="true" :showMessage="false"></PatientCard>
        <view class="">
          <u-form-item prop="patient_name" label="姓名" label-position="left"><u-input disabled  input-align="right" v-model="formData.patient_name" /></u-form-item>
          <u-form-item prop="idcard" label="证件号码" label-position="left"><u-input disabled  input-align="right" v-model="formData.idcard" /></u-form-item>
          <u-form-item prop="gender" label="性别" label-position="left"><u-input disabled  input-align="right" v-model="formData.gender" /></u-form-item>
        </view>
      </view>
      
      <view class="wrap-con">
        <!-- 职业 -->
        <view class="wrap-con__item">
          <u-form-item prop="phone" label="手机号码" label-position="left"><u-input disabled  input-align="right" v-model="formData.phone" /></u-form-item>
          <u-form-item prop="profession" label="职业" label-position="left"><u-input  input-align="right" v-model="formData.profession" /></u-form-item>
          <u-form-item prop="address" label="现居住地址"><u-input type="textarea" v-model="formData.address" /></u-form-item>
          <u-form-item prop="temperature" label="来院温度" label-position="left"><u-input input-align="right" type="digit" placeholder="请输入预约人来院温度" v-model="formData.temperature" /></u-form-item>
        </view>
        <view class="wrap-con__item">
          <u-form-item prop="detection_reason" label="核酸检测原因">
            <u-radio-group  v-model="formData.detection_reason" width="100%">
              <u-radio name="自愿检测">自愿检测</u-radio>
              <u-radio name="应检尽检">应检尽检</u-radio>
              <u-radio name="外地回呼">外地回呼</u-radio>
              <u-radio name="赴外地">赴外地</u-radio>
              <u-radio name="其他原因">其他原因</u-radio>
              <u-radio name="全员核酸检测">全员核酸检测</u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item prop="group_category" label="检测登记人群类别">
            <u-input  type="select" :select-open="group_category_show" v-model="formData.group_category" placeholder="请选择性别" @click="group_category_show = true"></u-input>
            <u-select @confirm="selectConfirm($event,'group_category')" v-model="group_category_show" :list="group_category_list"></u-select>
          </u-form-item>
        </view>
        <view class="wrap-con__item">
          <text>是否有以下接触史</text>
          <u-form-item prop="high_risk_history" label="1.是否有境外、最新新冠肺炎高中风险区域、鼠疫高风险地区及其他有病例报告地区旅居史或者居住史？">
            <u-radio-group v-model="formData.high_risk_history">
              <u-radio name="1">是</u-radio>
              <u-radio name="0">否</u-radio>
            </u-radio-group>
          </u-form-item>

          <u-form-item v-show="formData.high_risk_history==1" label="国内旅居省市区（县）"><u-input v-model="formData.high_risk_address" /></u-form-item>
          <u-form-item label-position="left" v-show="formData.high_risk_history==1" label="回呼时间">
            <u-input input-align="right" type="select" :select-open="time_picker_show" v-model="formData.entry_nmg_time" placeholder="请选择回呼时间" @click="time_picker_show = true"></u-input>
            <u-picker @confirm="pickerConfirm($event,'entry_nmg_time')" v-model="time_picker_show" mode="time"></u-picker>
          </u-form-item>
          <u-form-item v-show="formData.high_risk_history==1" label="入境前旅居史的国家或地区"><u-input v-model="formData.abroad_address" /></u-form-item>          
          <u-form-item label-position="left" v-show="formData.high_risk_history==1" label="入境时间">
            <u-input input-align="right" type="select" :select-open="time_picker_show2" v-model="formData.entry_time" placeholder="请选择入境时间" @click="time_picker_show2 = true"></u-input>
            <u-picker @confirm="pickerConfirm($event,'entry_time')" v-model="time_picker_show2" mode="time"></u-picker>
          </u-form-item>

          <u-form-item label="2.是否接触过中高风险区域或者境外回国人员？">
            <u-radio-group v-model="formData.exposure_high_risk_person">
              <u-radio name="1">是</u-radio>
              <u-radio name="0">否</u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="3.是否可能接触过病例或无症状感染者？">
            <u-radio-group v-model="formData.exposure_patient">
              <u-radio name="1">是</u-radio>
              <u-radio name="0">否</u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="4.是否接触过发热和/或有呼吸道症状的患者">
            <u-radio-group v-model="formData.exposure_fever_patient">
              <u-radio name="1">是</u-radio>
              <u-radio name="0">否</u-radio>
            </u-radio-group>
          </u-form-item>

          <u-form-item label="5.是否在周围小范围内（如家庭、办公室、学校或托幼机构、车间等集体场所）出现2例及以上发热和/或呼吸道症状的病例？">
            <u-radio-group v-model="formData.nearby_fever_patient">
              <u-radio name="1">是</u-radio>
              <u-radio name="0">否</u-radio>
            </u-radio-group>
          </u-form-item>

          <u-form-item label="6.是否有猎取或剥食野兔、旱獭等野生动物的情况">
            <u-radio-group v-model="formData.eat_wild_animals">
              <u-radio name="1">是</u-radio>
              <u-radio name="0">否</u-radio>
            </u-radio-group>
          </u-form-item>

        <u-form-item label="7.是否有如下表现，若有，用√标注">
          <u-checkbox-group width="100%" @change="checkboxGroupChange($event,'symptom')">
            <u-checkbox v-for="item in symptoms" v-model="item.checked" :key="item.value" :name="item.value">{{item.value}}</u-checkbox>
          </u-checkbox-group>
        </u-form-item>
        </view>
      </view>
      <button class="wrap-btn" @click="formSubmit">提交</button>
    </u-form>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['patientInfo']),
  },
  onLoad(){
    this.formData.project = this.$Route.query.project
    this.formData.order_no = this.$Route.query.order_no
    this.formData.apply_date = this.$Route.query.apply_date
    this.formData.apply_range = this.$Route.query.apply_range
  },
  watch:{
    "patientInfo":{
      handler(){
        if(this.patientInfo){
          this.formData.patient_name = this.patientInfo.name
          this.formData.idcard = this.patientInfo.idcard
          this.formData.gender = this.patientInfo.gender
          this.formData.patient_code = this.patientInfo.patient_code
          this.formData.phone = this.patientInfo.phone
        }
      },
      deep:true,
      immediate:true
    }
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
  data() {
    return {
      formData:{
        address:'',
        temperature:null,
        profession:'',
        detection_reason:'',
        symptom:'',
        eat_wild_animals:0,
        high_risk_history:0,
        exposure_high_risk_person:0,
        exposure_patient:0,
        exposure_fever_patient:0,
        nearby_fever_patient:0,
        high_risk_address:'',
        abroad_address:'',
        entry_time:'',
        entry_nmg_time:'',
        //基础信息
        order_no:'',
        user_id:'',
        patient_code:'',
        apply_date:'',
        apply_range:'',
        idcard:'',
        patient_name:'',
        gender:'',
        group_category:null

// ,
// create_time,
// sub_time,
// sub_time_range,
// price,
// register_no

      },
      rules: {
        profession: [{ required: true, message: '请输入职业',	trigger: ['change','blur'] }],
				address: [{ required: true, message: '请输入姓名',	trigger: ['change','blur'] }],
        temperature:[{ required: true, message: '请输入预约人来院温度',	trigger: ['change','blur'] }],
        detection_reason:[{ required: true, message: '请选择检测原因',	trigger: ['change','blur'] }],
        group_category:[{ required: true, message: '请选择人群类别',	trigger: ['change','blur'] }],
        high_risk_history:[
          {
            validator:(rule, value, callback)=>{
              if(value){
                if(!this.formData.abroad_address && !this.formData.high_risk_address){
                  return callback(`回呼前地址和入境前地址不能同时为空`);
                }
                if(!this.formData.entry_time && !this.formData.entry_nmg_time){
                  return callback(`回呼时间和入境时间不能同时为空`);
                }
                if(this.formData.high_risk_address && !this.formData.entry_nmg_time){
                  return callback(`回呼地址填写后，回呼时间不能为空`);
                }
                if(this.formData.abroad_address && !this.formData.entry_time){
                  return callback(`入境前地址填写后，入境时间不能为空`);
                }
              }
              callback();
            }
          }
        ]
			},

      group_category_show:false,
      group_category_list:[
        {	label:'医疗机构工作人员',value: '医疗机构工作人员' },
        {	label:'就诊患者',value: '就诊患者' },
        {	label:'住院陪护人员',value: '住院陪护人员' },
        {	label:'口岸检验和边检工作人员',value: '口岸检验和边检工作人员' },
        {	label:'进口冷链食品从业人员',value: '进口冷链食品从业人员' },
        {	label:'集中隔离场所服务管理人员',value: '集中隔离场所服务管理人员' },
        {	label:'分流国际航班工作人员',value: '分流国际航班工作人员' },
        {	label:'农贸市场从业人员',value: '农贸市场从业人员' },
        {	label:'快递、外卖从业人员',value: '快递、外卖从业人员' },
        {	label:'交通运输服务人员',value: '交通运输服务人员' },
        {	label:'在校学生、教师及学校工作人员',value: '在校学生、教师及学校工作人员' },
        {	label:'建筑工地工作人员',value: '建筑工地工作人员' },
        {	label:'其他人群',value: '其他人群' },
				
      ],
      symptoms:[
        {'value':'发热',checked:false},
        {'value':'干咳',checked:false},
        {'value':'乏力',checked:false},
        {'value':'咽痛',checked:false},
        {'value':'肌痛',checked:false},
        {'value':'腹泻',checked:false},
        {'value':'呼吸困难',checked:false},
        {'value':'淋巴结肿大',checked:false},
        {'value':'其他',checked:false}
      ],
      time_picker_show:false,
      time_picker_show2:false,
      flag:false
    }
  },

  onShow() {
  },
  methods: {
    // -----------------------------------表单处理方法-----------------------------------
    pickerConfirm(value,field){
      this.formData[field] = value.year+"-"+value.month+"-"+value.day
    },
    selectConfirm(value,field){
      this.formData[field] = value[0].value
    },
    checkboxGroupChange(value,field) {
      this.formData[field] = value.join(',')
    },
    formSubmit() {
      console.info(this.formData)
      this.$refs.uForm.validate(valid => {
				if (valid==1) {
          if (this.flag) {
            return false
          }
          this.flag = true
          this.$http.post(this.API.NUCLEICACID_SAVE_ORDER, this.formData).then((res) => {
            if(res.code=20000){
              uni.showModal({
                title: '提示',
                content: '预约成功，请前往缴费',
                showCancel:false,
                success: (res)=> {
                  this.$Router.push({ name: 'awaitPay' })
                }
              });
            }
            else{
              uni.showToast({ title:res.message,icon: "none",});
            }
          }).finally(()=>{
            this.flag = false
          })
				}
			});
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
        font-size: 36rpx;
        font-weight: bold;
      }
      .date {
        color: #898989;
        font-size: 28rpx;
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
        font-size: 36rpx;
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
    }
  }
  &-btn {
    height: 90rpx;
    line-height: 90rpx;
    color: #ffffff;
    font-size: 36rpx;
    text-align: center;
    margin-top: 30rpx;
    background: #0ec698;
    border-radius: 10rpx;
  }
}
</style>
