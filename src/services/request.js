import axios from 'axios'

// 创建一个独立的 axios 实例
// 为什么要单独封装：
// 1. 以后所有后台接口都从这里走，不用每个页面重复写 baseURL
// 2. 可以统一给请求加管理员 token
// 3. 可以统一处理登录过期、网络错误
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
})

// 请求拦截器：每次请求后台接口前，自动带上管理员 token
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器：统一处理接口返回
request.interceptors.response.use(
  (response) => {
    // 后端真正返回的数据在 response.data 里
    return response.data
  },
  (error) => {
    // token 失效时，清掉本地 token，避免一直拿旧 token 请求
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('admin_token')
      // 主动通知页面回到登录页
      window.dispatchEvent(new Event('admin-auth-expired'))
    }

    return Promise.reject(error.response?.data || error)
  },
)

export default request
