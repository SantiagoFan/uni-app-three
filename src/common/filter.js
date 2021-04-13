
import Vue from "vue";
/**
 * 金额格式化
 */
Vue.filter('moneyformat', (value, format = 2) => {
    return parseFloat(value).toFixed(format)
})
/**
 * 隐藏身份证中间号码
 */
Vue.filter('hideIdCard',(val) => {
    if (val) {
      return val.replace(/^(.{1})(?:\d+)(.{1})$/, '$1************$2')
    }
    return ''
})
/**
 * 隐藏姓名
 */
Vue.filter('hideIdRealName',(val)=>{
  if (val) {
    let str = val.substr(val.length-1,1)
    for (let index = 0; index < val.length-1; index++) {
      str="*"+str;
    }
    return str
  }
  return ''
})

Vue.filter('hideIdPhone',(val) => {
  if (val) {
    return val.replace(/^(.{3})(?:\d+)(.{2})$/, '$1*******$2')
  }
  return ''
})