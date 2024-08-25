import { ElMessage } from 'element-plus'

import { createArticle, editorArticle } from '@/api/article'
import i18n from '@/i18n'

const t = i18n.global.t

export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}

export const editArticle = async (data) => {
  const res = await editorArticle(data)
  ElMessage.success(t('msg.article.editSuccess'))
  return res
}
