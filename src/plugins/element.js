import ElementPlus from 'element-plus'
import en from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import store from '@/store'

export default (app) => {
  app.use(ElementPlus, {
    locale: store.getters.language === 'zh' ? zhCn : en
  })
}
