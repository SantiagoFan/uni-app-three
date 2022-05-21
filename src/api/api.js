export default {
  ADD_PATIENT: '/patient/addPatient', //添加就诊码
  GET_TOKEN: '/auth/login', //查询用户
  GET_USERINFO:'/auth/getUserInfo', // 获取授权详情信息
  UPDATE_USERINFO: '/user/updateUserInfo', //提交用户信息
  PATIENT_LIST: '/patient/getPatientList', //就诊码列表
  PATINET_DETAIL: '/patient/getPatientDetail', //就诊人详情
  PATIENT_DELETE: '/patient/delPatient', //删除就诊人
  LIVE_PATIENT_ADD: '/live_patient/addLivePatient', //添加住院人
  LIVE_PAATIENT_LIST: '/live_patient/livePatientList', //住院人列表
  DEFAULT_PATIENT: '/patient/getDefaultPatient', //获取默认就诊人信息
  CHANGE_DEFAULT_PATIENT: '/patient/changePatientDefault', //切换默认就诊人
  DEFAULT_LIVE_PATIENT: '/live_patient/getDefaultLivePatient', //获取默认住院人信息
  CHANGE_DEFAULT_LIVE_PATIENT: '/live_patient/changeLivePatientDefault', //切换默认住院人
  LIVE_PATIENT_DETAIL: '/live_patient/getLivePatientDetail', //住院人详情
  LIVE_DAILY_ORDER: '/live_daily_order/getDetail', //住院日清单
  DEPARTMENT_CATEGORY: '/department_category/getList', //科室分类列表
  DEPARTMENT_LIST: '/department/getListAndCate', //科室列表
  COLLECT_DOCTOR: '/collect_doctor/getList', //收藏医生
  DOCTOR_LIST: '/scheme/getDoctorByScheme', //根据科室获取排班的医生
  DOCTOR_DETAIL: '/doctor/getDetailById', //医生详情
  ADD_COLLECT: '/collect_doctor/addCollect', //添加收藏
  SCHEME_LIST: '/scheme/getSchemeList', //根据科室获取排班
  REGISTER_HISTORY: '/register/getDoctorList', //挂号历史
  DOCTOR_SEARCH: '/doctor/search', //搜索医生
  DEPARTMENT_SEARCH: '/department/search', //搜索科室
  LIVE_PATIENT_DELETE: '/live_patient/deleteLivePatient', //删除住院人
  MEMBER_INDEX: '/member/getIndex', //个人中心就诊码数量
  HOSPITAL_INFO: '/hospital_info/getInfo', //医院信息
  BANNER: '/hospital_info/getBanner', //医院信息
  FLOOR_LIST: '/department/getFloorList', //楼层列表
  DEPARTMENT_AREA: '/department/getDepartmentArea', //科室分布
  NEWS_CATE: '/news/getCateList', //健康指导分类
  NEWS_LIST: '/news/getNewsList', //健康指导列表
  DEPARTMENT_INFO: '/department/getDepartmentList', //科室列表全部
  DEPARTMENT_ALL_LIST: '/department/getAllListAndCate', //科室列表全部包含分类
  DEPARTMENT_INFO_DETAIL: '/department/getDepartmentInfo', //科室介绍详情
  DOCTOR_INFO: '/doctor/getDoctorInfo', //医生介绍-医生详情
  DOCTOR_INFO_LIST: '/doctor/getDoctorList', //医生列表
  DEPARTMENT_NAME: '/doctor/getDepartmentName', //获取科室名称
  QUESTION_LIST: '/questionnaire/getList', //调查问卷列表
  QUESTION_DETAIL: '/questionnaire/getDetail', //调查问卷详情
  SAVE_ANSWER: '/questionnaire/saveAnswer', //保存答案
  REGISTER_RECORD_LIST: '/register/getRecordList', //挂号记录
  SEARCH: '/search/search', //搜索
  LIVE_PAY_RECORD: '/live_deposit_order/getLivePayRecord', //住院缴费记录
  REPORT_LIST: '/report/getReportList', //检验检查报告
  JY_REPORT_DETAIL: '/report/getJyDetail', //检验报告详情
  JC_REPORT_DETAIL: '/report/getJcDetail', //检验报告详情
  // LIVE_PAY_RECORD_DETAIL: '/live_patient/getLivePayRecordDetail', //住院缴费记录详情
  SCHEME_DETAIL: '/scheme/getDetailByScheme', //号源详情
  SCHEME_DETAIL_RAW: '/scheme/getDetailBySchemeRaw', //号源详情
  CREATE_REGISTER: '/register/createRegister', //创建挂号订单
  ORDER_DETAIL: '/register/getOrderDetail', //订单详情
  REGISTER_PAY: '/register/payOrder', //挂号支付
  EXAMINATION: '/examination/getExamination', //门诊代缴费项目
  REGISTER_ORDER_DETAIL: '/register/getRegisterOrderDetail', //记录详情
  GET_TEMPLATE_ID: '/message/getTemplateId', //查询通知
  REGISTER_SETTINGS: '/register/getSettings', //挂号设置 锁号时间、提醒内容
  HOSPITAL_NAME: '/register/getHospital', //医院名称
  UPDATE_HEALTH_CODE: '/patient/updateHealthCode', //刷新健康码
  IS_COLLECT: '/collect_doctor/isCollect', //是否收藏
  CANCEL_REGISTER: '/register/refundOrder', //取消挂号
  WAIT_DETAIL: '/wait_detail/getDetail', //排队候诊
  NEWS_DETAIL: '/news/getNewsDetail', //新闻详情
  EXAMINATION_RECORD: '/examination/getExaminationRecord', //门诊缴费记录
  LIVE_DEPOSIT_RULE: '/live_deposit_order/getRule', //押金缴费规则
  LIVE_DEPOSIT_ORDER: '/live_deposit_order/payOrder', //押金缴费
  LIVE_DEPOSIT_ORDER_DETAIL: '/live_deposit_order/getLivePayRecordDetail', //押金缴费记录详情
  EXAMINATION_ORDER: '/examination/payOrder', //门诊待缴费项目支付
  // 新版 号源核酸
  NUCLEICACID_SOURCE: '/nucleic_acid/getSourceList', // 核酸号源
  NUCLEICACID_APPLY_SOURCE: '/nucleic_acid/applySource', // 申请核酸号源
  NUCLEICACID_QUERY_OPTIONS: '/nucleic_acid/QueryOptions', //查询核酸检测项目
  NUCLEICACID_SAVE_ORDER: '/nucleic_acid/saveOrder', //保存流调表并创建订单
  // 旧版本
  NUCLEICACID_SETTINGS: '/inspection_order/getNucleicAcidSettings', //核酸检测设置 提醒内容
  INSPECTION_QUERY_OPTIONS: '/inspection_order/QueryOptions', //查询核酸检测项目
  INSPECTION_CREATE_ORDER: '/inspection_order/CreateOrder', //一建核酸检测预约

  GET_PDF: '/report/getPdf', //获取pdf
  GET_JY_PDF: '/report/get_pdf',
  
  REGISTER_SUCCESS: '/register/getSuccessRegisterList', //获取成功挂号的列表
  QUERY_HEALTH_CARD:'/health_Card/Query' //健康码查询
}
