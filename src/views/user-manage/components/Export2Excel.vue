<template>
  <el-dialog
    width="30%"
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }} </el-button>
        <el-button type="primary" :loading="loading" @click="onConfirm">
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'

import { useI18n } from 'vue-i18n'

import { dateFilter } from '@/filter'
import { getUserManageAllList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

import { USER_RELATIONS } from './Export2ExcelConstants'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const i18n = useI18n()

let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')

watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

const emits = defineEmits(['update:modelValue'])
const loading = ref(false)

const closed = () => {
  emits('update:modelValue', false)
}

const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  const excel = await import('@/utils/Export2Excel')

  const data = formatJson(USER_RELATIONS, allUser)

  excel.export_json_to_excel({
    // 表头
    header: Object.keys(USER_RELATIONS),
    // 数据
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName
    // 是否自动列宽
    // 文件类型
  })

  closed()
}

const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色是数组
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }

      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
