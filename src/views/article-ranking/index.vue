<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :value="item.label"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>

    <el-card>
      <el-table ref="tableRef" :data="tableData" border style="width: 100%">
        <el-table-column
          class="table-column"
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>

          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-pagination
      class="pagination"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="size"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script setup>
import { onActivated, onMounted, ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { deleteArticle, getArtList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'

import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { initSortTable, tableRef } from './sortable'

const i18n = useI18n()
const router = useRouter()

const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

const getListData = async () => {
  const result = await getArtList({
    page: page.value,
    size: size.value
  })

  tableData.value = result.list
  total.value = result.total
}

getListData()
watchSwitchLang(getListData)
onActivated(getListData)

// 初始化initSortTable
onMounted(() => {
  initSortTable(tableData, getListData)
})

const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}

const onRemoveClick = async (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteArticle(row._id)
      ElMessage.success(i18n.t('msg.article.removeSuccess'))
      getListData()
    })
    .catch(() => {})
}

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
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .table-column {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  :deep(.el-table__row) {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
