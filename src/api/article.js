import request from '@/utils/request'

/**
 * 获取所有文章
 */
export const getArtList = (data) => {
  return request({
    url: '/article/list',
    params: data
  })
}

/**
 * 修改排序
 */

export const articleSort = (data) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

/**
 * 文章删除
 */
export const deleteArticle = (articleId) => {
  return request({
    url: `/article/delete/${articleId}`
  })
}

/**
 * 获取文章详情
 */

export const articleDetail = (articleId) => {
  return request({
    url: `/article/${articleId}`
  })
}

/**
 * 创建文章
 */
export const createArticle = (data) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

/**
 * 编辑文章
 */
export const editorArticle = (data) => {
  return request({
    url: 'article/edit',
    method: 'POST',
    data
  })
}
