<template>
  <div class="chart-container">
    <!-- 累计收益趋势图 -->
    <trend-vue></trend-vue>
    <!-- 第二行 -->
    <el-row class="mt-20">
      <el-col :span="16">
        <!-- 日金额分析图 -->
        <horizontal-bar-vue />
      </el-col>
      <el-col :span="8">
        <!-- 日历图 -->
        <calendar-vue></calendar-vue>
      </el-col>
    </el-row>

    <!-- 第三行 -->
    <el-row class="mt-20" :gutter="20">
      <el-col :span="6">
        <div>
          <!-- 饼图 -->
          <pie-vue></pie-vue>
          <!-- 文档云图 -->
          <word-cloud-vue class="mt-20"></word-cloud-vue>
        </div>
      </el-col>
      <el-col :span="18">
        <!-- 地图可视化 -->
        <b-map-vue></b-map-vue>
      </el-col>
    </el-row>

    <!-- s2表格数据 -->
    <table-sheet-vue class="mt-20"></table-sheet-vue>
  </div>
</template>

<script setup>
import BMapVue from './components/b-map'
import CalendarVue from './components/calendar'
import HorizontalBarVue from './components/horizontal-bar'
import PieVue from './components/pie'
import TableSheetVue from './components/table-sheet'
import TrendVue from './components/trend'
import WordCloudVue from './components/word-cloud'
</script>

<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
</style>
