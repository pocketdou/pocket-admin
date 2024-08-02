import { createI18n } from 'vue-i18n'

import store from '@/store'

import enLocale from './lang/en.js'
import zhLocale from './lang/zh.js'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

function getLanguage() {
  return store && store.getters && store.getters.language
}

const local = getLanguage()

const i18n = createI18n({
  legacy: false, // Composition API
  globalInjection: true, // 全局注入t函数
  locale: local,
  messages
})

export default i18n
