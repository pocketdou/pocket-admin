<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2-vue :data="sheetData"></s2-vue>
    </el-col>
    <el-col :span="6">
      <sheet-label-vue
        class="mb-20"
        v-for="(item, index) in regionsData"
        :key="item.id"
        :data="item"
        :isSelected="currentIndex === index"
        @click="onChangeIndex(index)"
      ></sheet-label-vue>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'

import { getChartRegions, getChartSheet } from '@/api/chart'
import { watchSwitchLang } from '@/utils/i18n'

import S2Vue from './components/s2'
import SheetLabelVue from './components/sheet-label'

const regionsData = ref([])
const currentIndex = ref(0)
const sheetData = ref([])

const getChartRegionsData = async () => {
  const { regions } = await getChartRegions()
  regionsData.value = regions

  getChartSheetData(regionsData.value[0].id)
}

getChartRegionsData()

watchSwitchLang(getChartRegionsData)

const onChangeIndex = (index) => {
  currentIndex.value = index
  // 切换获取大区数据
  getChartSheetData(regionsData.value[currentIndex.value].id)
}

// 大区对应数据
const getChartSheetData = async (id) => {
  const res = await getChartSheet(id)
  sheetData.value = res
}
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
