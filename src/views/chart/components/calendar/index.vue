<template>
  <div class="container" :body-style="{ padding: 0 }">
    <el-calendar class="calendar" v-model="currentDate">
      <template #date-cell="{ data }">
        <p
          :class="[
            data.isSelected ? 'is-selected' : '',
            calendarItemBgClass(data.day)
          ]"
        >
          <!-- 显示的内容 -->
          {{ data.day.split('-').slice(2).join('') }}

          <br />
          <!-- 当日金额 -->
          <span class="amount" v-if="getTadayAmount(data.day)">
            {{ getTadayAmount(data.day) }}
          </span>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import emitter from '@/utils/eventHub.js'
import { getChartCalendar } from '@/api/chart'

const currentDate = ref(new Date())
const calendarListData = ref([])
const dateAmountObj = ref({})

const getCalendarListData = async () => {
  const { result } = await getChartCalendar()
  calendarListData.value = result
}

getCalendarListData()

const getTadayAmount = (date) => {
  if (dateAmountObj.value[date]) return dateAmountObj.value[date]

  const tadayData = calendarListData.value.find((item) => item.date === date)
  if (!tadayData) return 0

  const tadayAmount = tadayData.amount

  // 缓存数据
  dateAmountObj.value[date] = tadayAmount

  return tadayAmount
}

/**
 * 返回日历的背景类
 * */
const calendarItemBgClass = (day) => {
  if (getTadayAmount(day) > 0) {
    return 'profit'
  } else if (getTadayAmount(day) < 0) {
    return 'loss'
  }
  return ''
}

// 监听日期变化
watch(currentDate, (val) => {
  emitter.emit('calendarChange', val)
})
</script>

<style lang="scss" scoped>
.container {
  height: 443px;
  .calendar {
    :deep(.el-calendar__body) {
      padding: 0 12px 12px;
      font-size: 14px;
    }
    :deep(.el-calendar-day) {
      height: 66px !important;
      padding: 0 !important;
      p {
        height: 100%;
        padding: 8px;
      }
      // 金额样式
      .amount {
        font-size: 12px;
      }
      // 正收益
      .profit {
        background-color: #f3fff3;
        span {
          color: #649840;
        }
      }
      // 负收益
      .loss {
        background-color: #ffe7e7;
        span {
          color: #b65d59;
        }
      }

      .is-selected {
        background-color: #d6f2ff;
      }
    }
  }
}
</style>
