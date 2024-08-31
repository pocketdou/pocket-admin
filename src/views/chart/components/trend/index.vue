<template>
  <el-card class="container">
    <el-row :gutter="32" v-if="chartTrendData.allAmount">
      <el-col :span="6">
        <!-- 数据模块 -->
        <trend-data :data="chartTrendData"> </trend-data>
      </el-col>
      <el-col :span="18">
        <!-- 图表模块 -->
        <trend-chart :data="chartTrendData"></trend-chart>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

import { getChartTrend } from '@/api/chart'

import TrendChart from './trend-chart.vue'
import TrendData from './trend-data.vue'

const chartTrendData = ref({})

const getChartTrendData = async () => {
  chartTrendData.value = await getChartTrend()
}

getChartTrendData()
</script>

<style lang="scss" scoped>
.container {
  height: 286px;
}
</style>
