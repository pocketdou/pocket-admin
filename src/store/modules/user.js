import md5 from 'md5'

import { login } from '@/api/sys'
import { TOKEN } from '@/constant'
import router from '@/router'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
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
            console.log(data)
            this.commit('user/setToken', data.token)
            // 跳转
            router.push('/')
            resolve(data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {}
}
