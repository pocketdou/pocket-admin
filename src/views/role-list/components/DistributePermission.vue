<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      :props="defaultProps"
      v-loading="isLoading"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
      check-on-click-node
    ></el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'

import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { distributePermission, rolePermission } from '@/api/role'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

const i18n = useI18n()
const emits = defineEmits(['update:modelValue'])

const treeRef = ref(null)
const isLoading = ref(true)
const allPermission = ref([])
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))

  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 获取所有权限
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}

getPermissionList()
watchSwitchLang(getPermissionList)

// 当前角色权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)

  isLoading.value = false
}

watch(
  () => props.modelValue,
  (val) => {
    isLoading.value = true
    if (val) getRolePermission()
  }
)
</script>
