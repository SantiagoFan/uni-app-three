import Request from './request'
import { baseUrl } from '../config/index.js'

const http = new Request()

http.setConfig((config) => {
  /* 设置全局配置 */
  config.baseUrl = baseUrl
  console.log(config)
  config.header = {
    ...config.header,
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.request((config, cancel) => {
  /* 请求之前拦截器 */
  config.header = {
    ...config.header,
  }
  try {
    const token = uni.getStorageSync('token') //token
    if (token) {
      config.header['token'] = decodeURIComponent(token)
    }
  } catch (err) {
    console.log(err)
  }

  if (config.custom.loading) {
    uni.showLoading({
      title: '加载中',
    })
  }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

http.interceptor.response(
  (response) => {
    /* 请求之后拦截器 */
    // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    //   return Promise.reject(response)
    // }
    // if (response.config.custom.verification) { // 演示自定义参数的作用
    //   return response.data
    // }

    // if (response.data.code == 100) //需要登录   文西注释 ，api暂时不判断登录状态，否则会连续调用几个api，连续弹出login
    // {
    //   uni.navigateTo({
    //     url: '/pages/login/login'
    //   });
    //   // return false;
    // }

    if (response.config.custom.loading) {
      uni.hideLoading()
    }
    if (response.data.code === 50000) {
      uni.showToast({
        title: response.data.message,
        icon: 'none',
      })
      return Promise.reject(response)
    }

    return response.data
  },
  (response) => {
    // 请求错误做点什么
    return response
  }
)

export { http }
