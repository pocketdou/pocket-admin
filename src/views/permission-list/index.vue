<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermission"
        style="width: 100%"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hashChildren: 'hasChilren' }"
      >
        <el-table-column
          width="280"
          prop="permissionName"
          :label="$t('msg.permission.name')"
        ></el-table-column>
        <el-table-column
          width="280"
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
        ></el-table-column>

        <el-table-column
          width="280"
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const allPermission = ref([])

const getPerissionList = async () => {
  allPermission.value = await permissionList()
}

getPerissionList()
watchSwitchLang(getPerissionList)
</script>

<style lang="scss" scoped></style>
