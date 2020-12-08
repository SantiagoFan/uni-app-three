import axios from 'axios'
import {setToken } from '@/utils/auth'
// const qs = require('qs')

let baseURL = ''
//开发环境下 development
// process.env.NODE_ENV == 'production' 生产环境
if (process.env.NODE_ENV == 'development') {
  baseURL = '/api'
} else {
  baseURL = 'http://nmggls.com/api'
}

// if (process.env.NODE_ENV === 'development') {
//   baseURL = '/api'
// } else if (process.env.NODE_ENV === 'production') {
//   baseURL = 'http://tianze.lingji.vip/api'
// }

// 创建axios实例
const service = axios.create({
  baseURL: baseURL, // api 的 base_url
  timeout: 20000 // 请求超时时间
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request拦截器
service.interceptors.request.use(
  config => {
    // if(config.method === 'post') {
    //   config.data = qs.stringify(config.data);
    // }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    if(response.data.code == 51000){
      setToken("");
      var url = 'http://nmggls.com/api/Login/wxLogin?callback='+sessionStorage.getItem("mobilecallback");
      var userid = sessionStorage.getItem("userid");
      if(userid){
        url += '&userid='+userid;
      }
      window.location.href = url;
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service