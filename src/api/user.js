import request from '@/utils/request'

/* 获取项目功能 */
export const feature = () => {
  return request({
    url: '/user/feature'
  })
}

/* 获取章节 */
export const chapter = () => {
  return request({
    url: '/user/chapter'
  })
}

//* 获取作者 */
export const author = () => {
  return request({
    url: '/user/author'
  })
}
