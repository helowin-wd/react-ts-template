import axios from "axios";

// 创建axios实例
const instance = axios.create({
  baseURL: "http://xue.cnkdl.cn:23683",
  timeout: 3000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
});

// 响应拦截器
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
});

export default instance;