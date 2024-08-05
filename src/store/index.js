import { createStore } from 'vuex'

import app from './modules/app'
import getters from './getters'
import theme from './modules/theme'
import user from './modules/user'

export default createStore({
  getters,
  modules: {
    user,
    app,
    theme
  }
})
