import axios from 'axios'
import { ElMessage } from 'element-plus'

import configs from '@/config/index'
import store from '@/store'

import { isCheckTiemout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (isCheckTiemout()) {
        // 退出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token失效'))
      }

      config.headers.Authorization = `Bearer ${store.getters.token}`
    }

    config.headers.icode = configs.ICODE
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // token失效
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)

    return Promise.reject(new Error(error))
  }
)

export default service
