<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
        >
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
      <template #footer> </template>
    </el-card>
    <!-- table -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
            >
              {{ $t('msg.excel.show') }}
            </el-button>
            <el-button
              type="info"
              size="small"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
            >
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
            >
              {{ $t('msg.excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <role-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></role-dialog>
  </div>
</template>

<script setup>
import { onActivated, ref, watch } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { deleteUser, getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

import ExportToExcel from './components/Export2Excel.vue'
import RoleDialog from './components/RoleDialog.vue'

const router = useRouter()
const i18n = useI18n()

const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(5)

const exportToExcelVisible = ref(false)
const roleDialogVisible = ref(false)
const selectUserId = ref('')

// 获取用户列表
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

getListData()

watchSwitchLang(getListData)
onActivated(getListData)

// 导入excel
const onImportExcelClick = () => {
  router.push('/user/import')
}

// 导出excel
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

// 删除用户
const onRemoveClick = async (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getListData()
  })
}

// 查看用户详情
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

// 查看用户角色
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})

/* 分页设置 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;
  }
}
</style>
