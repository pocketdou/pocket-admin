import { ref } from 'vue'

import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'

import { articleSort } from '@/api/article'
import i18n from '@/i18n'

export const tableRef = ref(null)

export const initSortTable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper table > tbody'
  )[0]

  /*
   *  el:要拖拽的元素
   *  options:拖拽的配置
   */
  Sortable.create(el, {
    // 拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event

      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })

      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))

      tableData.value = []

      cb && cb()
    }
  })
}
