export default {
	ADD_PATIENT: '/patient/addPatient',//添加就诊卡
	BIND_PATIENT: '/patient/bindPatient',//绑定就诊卡
	GET_TOKEN: '/auth/wxLogin',//查询用户
	UPDATE_USERINFO:'/user/updateUserInfo',//提交用户信息
	PATIENT_LIST: '/patient/getPatientList',//就诊卡列表
	PATINET_DETAIL: '/patient/getPatientDetail',//就诊人详情
	PATIENT_DELETE: '/patient/delPatient',//删除就诊人
	LIVE_PATIENT_ADD: '/live_patient/addLivePatient',//添加住院人
	LIVE_PAATIENT_LIST: '/live_patient/livePatientList',//住院人列表
	DEFAULT_PATIENT: '/patient/getDefaultPatient',//获取默认就诊人信息
	CHANGE_DEFAULT_PATIENT:'/patient/changePatientDefault',//切换默认就诊人
	DEFAULT_LIVE_PATIENT: '/live_patient/getDefaultLivePatient',//获取默认住院人信息
	CHANGE_DEFAULT_LIVE_PATIENT:'/live_patient/changeLivePatientDefault',//切换默认住院人
	LIVE_PATIENT_DETAIL: '/live_patient/getLivePatientDetail',//住院人详情
	LIVE_DAILY_ORDER: '/live_daily_order/getDetail',//住院日清单
	DEPARTMENT_CATEGORY: '/department_category/getList',//科室分类列表
	DEPARTMENT_LIST: '/department/getListByCate',//科室列表
	COLLECT_DOCTOR: '/collect_doctor/getList',//收藏医生
	DOCTOR_LIST: '/doctor/getListByDepartmentId',//根据科室id获取医生列表
	DOCTOR_DETAIL: '/doctor/getDetailById',//医生详情
	ADD_COLLECT: '/collect_doctor/addCollect',//添加收藏
	SCHEME_LIST: '/scheme/getSchemeList',//根据科室获取排班
	REGISTER_HISTORY: '/register/getDoctorList',//挂号历史
	DOCTOR_SEARCH: '/doctor/search',//搜索医生
	DEPARTMENT_SEARCH: '/department/search',//搜索科室
	LIVE_PATIENT_DELETE: '/live_patient/deleteLivePatient',//删除住院人
	MEMBER_INDEX: '/member/getIndex',//个人中心就诊卡数量
	HOSPITAL_INFO: '/hospital_info/getInfo',//医院信息
	FLOOR_LIST: '/department/getFloorList',//楼层列表
	DEPARTMENT_AREA: '/department/getDepartmentArea',//科室分布
	NEWS_CATE: '/news/getCateList',//健康指导分类
	NEWS_LIST: '/news/getNewsList',//健康指导列表
	DEPARTMENT_INFO: '/department/getDepartmentList',//科室介绍
	DEPARTMENT_INFO_DETAIL: '/department/getDepartmentInfo',//科室介绍详情
	DOCTOR_INFO: '/doctor/getDoctorInfo',//医生介绍-医生详情
	DOCTOR_INFO_LIST: '/doctor/getDoctorList',//医生列表
	DEPARTMENT_NAME: '/doctor/getDepartmentName',//获取科室名称
	QUESTION_LIST: '/questionnaire/getList',//调查问卷列表
	QUESTION_DETAIL: '/questionnaire/getDetail',//调查问卷详情
	SAVE_ANSWER: '/questionnaire/saveAnswer'

	
}
