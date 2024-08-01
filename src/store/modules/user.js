import md5 from 'md5'

import { getItem, removeAllItem, setItem } from '@/utils/storage'
import { getUserInfo, login } from '@/api/sys'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
import { TOKEN } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 用户登录动作
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            this.commit('user/setToken', data.token)
            // 跳转
            router.push('/')
            setTimeStamp()
            resolve(data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },

    // 退出登录
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()

      router.push('/login')
    }
  },
  getters: {}
}
