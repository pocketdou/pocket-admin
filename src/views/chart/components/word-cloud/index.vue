<template>
  <el-card :body-style="{ padding: 0 }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import 'echarts-wordcloud'

import { onMounted, ref } from 'vue'

import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'

import { getChartWordCloud } from '@/api/chart'
import { randomRGB } from '@/utils/color'
import { watchSwitchLang } from '@/utils/i18n'
import wordcloudBg from '@/assets/wordcloud.png'

const i18n = useI18n()

const wordCloudData = ref([])
const target = ref(null)

const getWordCloudData = async () => {
  const res = await getChartWordCloud()
  wordCloudData.value = res

  // 临时覆盖 getContext 方法以设置 willReadFrequently
  // 请在使用此方法时谨慎，确保它不会干扰到你的应用中的其他部分
  const originalGetContext = HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext = function (type, attributes) {
    if (type === '2d') {
      attributes = { ...attributes, willReadFrequently: true }
    }
    return originalGetContext.call(this, type, attributes)
  }

  // 渲染图表
  renderChart()

  // 在初始化后恢复 getContext 方法,以避免对页面上的其他 canvas 元素产生影响
  // 使用 setTimeout 确保 ECharts 渲染已经完成
  setTimeout(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext
  }, 1000) // 延时 1000 毫秒后恢复，根据实际情况调整
}
getWordCloudData()

let mChart
onMounted(() => {
  mChart = echarts.init(target.value)
})

const renderChart = () => {
  const maskImage = new Image()
  maskImage.src = wordcloudBg

  const options = {
    title: {
      text: i18n.t('msg.chart.cloudChartTitle')
    },
    series: [
      {
        // 类型
        type: 'wordCloud',
        // 数据映射文本的大小范围
        sizeRange: [4, 80],
        // 文字旋转范围
        rotationRange: [0, 0],
        // 单词之间的间距
        gridSize: 0,
        // 图像轮廓
        maskImage,
        // 渲染动画
        layoutAnimation: true,
        // 字体
        textStyle: {
          // 随机色值
          color: randomRGB
        },
        // 高亮字体
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000'
          }
        },
        // 数据
        data: wordCloudData.value
      }
    ]
  }

  maskImage.onload = function () {
    mChart.setOption(options)
  }
}

watchSwitchLang(getWordCloudData)
</script>

<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>
