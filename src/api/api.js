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
	
}
