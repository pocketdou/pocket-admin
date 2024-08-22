<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList" v-loading="isLoading">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :value="item.title"
      >
        {{ item.title }}
      </el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue'

import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { roleList } from '@/api/role'
import { updateRole, userRoles } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const i18n = useI18n()

const allRoleList = ref([])
// 当前所有角色
const userRoleTitleList = ref([])
const isLoading = ref(true)

const emits = defineEmits(['update:modelValue', 'updateRole'])

const closed = () => {
  emits('update:modelValue', false)
}

const onConfirm = async () => {
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  await updateRole(props.userId, roles)

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))

  // 更新角色
  emits('updateRole')

  closed()
}

// 获取所有角色
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
watchSwitchLang(getListData)

// 获取当前用户角色
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
  isLoading.value = false
}

watch(
  () => props.userId,
  (val) => {
    isLoading.value = true
    if (val) {
      getUserRoles()
    }
  }
)
</script>

<style lang="scss" scoped></style>
