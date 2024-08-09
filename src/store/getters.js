import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

const getters = {
  token: (state) => state.user.token,
  // 用户信息是否存在
  hasUserInfo: (state) => {
    // true 存在，false 不存在
    const { userInfo } = state.user
    return JSON.stringify(userInfo) === '{}'
  },
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
  tagsViewList: (state) => state.app.tagsViewList
}

export default getters
