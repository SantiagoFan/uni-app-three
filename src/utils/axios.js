import axios from "axios";

let baseURL = "";
//开发环境下 development
// process.env.NODE_ENV == 'production' 生产环境
if (process.env.NODE_ENV == "development") {
  baseURL = "/api";
} else {
  baseURL = "http://api.medical.lingjikeji.cn/api";
}

// 创建axios实例
const service = axios.create({
  baseURL: baseURL, // api 的 base_url
  timeout: 20000, // 请求超时时间
});

service.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.token = uni.getStorageSync("token") || "";
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
