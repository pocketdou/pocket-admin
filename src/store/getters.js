import variables from '@/styles/variables.scss'

const getters = {
  token: (state) => state.user.token,
  // 用户信息是否存在
  hasUserInfo: (state) => {
    // true 存在，false 不存在
    const { userInfo } = state.user
    return JSON.stringify(userInfo) === '{}'
  },
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => variables,
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language
}

export default getters
