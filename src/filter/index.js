import 'dayjs/locale/zh-cn'

import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'

import store from '@/store'

export const dateFilter = (value, format = 'YYYY-MM-DD') => {
  if (!isNaN(value)) {
    value = parseInt(value)
  }
  return dayjs(value).format(format)
}

/**
 * 相对时间处理
 */
dayjs.extend(rt)

function relativeTime(value) {
  if (!isNaN(value)) {
    value = parseInt(value)
  }

  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(value))
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
