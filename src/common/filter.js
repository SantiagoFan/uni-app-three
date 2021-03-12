
import Vue from "vue";
/**
 * 金额格式化
 */
Vue.filter('moneyformat', (value, format = 2) => {
    return parseFloat(value).toFixed(format)
})