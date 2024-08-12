<template>
  <div class="">
    <upload-excel :onSuccess="onSuccess"></upload-excel>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import UploadExcel from '@/components/UploadExcel'
import { userBatchImport } from '@/api/user-manage'

import { formatDate, USER_RELATIONS } from './utils'

const i18n = useI18n()

const router = useRouter()

const onSuccess = async ({ header, results }) => {
  const uploadData = generateData(results)
  await userBatchImport(uploadData)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))

  router.push('/user/manage')
}

// 筛选数据
const generateData = (results) => {
  const arr = []

  results.forEach((item) => {
    const userInfo = {}

    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })

    arr.push(userInfo)
  })

  return arr
}
</script>

<style lang="scss" scoped></style>
