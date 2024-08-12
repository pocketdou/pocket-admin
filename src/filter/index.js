import dayjs from 'dayjs'

const dateFilter = (value, format = 'YYYY-MM-DD') => {
  if (!isNaN(value)) {
    value = parseInt(value)
  }
  return dayjs(value).format(format)
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
