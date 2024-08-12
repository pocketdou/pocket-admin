<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInput"
      type="file"
      class="excel-upload-input"
      accept=".xlsx,.xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragOver"
      @dragenter.stop.prevent="handleDragOver"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

import { ElMessage } from 'element-plus'
import XLSX from 'xlsx'

import { getHeaderRow, isExcel } from './utils'

const props = defineProps({
  // 上传之前回调
  beforeUpload: Function,

  // 上传成功回调
  onSuccess: Function
})

const loading = ref(false)
const excelUploadInput = ref(null)

// 点击上传
const handleChange = (e) => {
  const file = e.target.files
  const rawFile = file[0]
  if (!rawFile) return

  upload(rawFile)
}

const handleUpload = () => {
  excelUploadInput.value.click()
}

// 上传时间
const upload = (rawFile) => {
  excelUploadInput.value = null

  // 未指定上传前回调
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }

  // 指定上传前回调
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

// 异步读取数据
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // 读取操作完成时
    reader.onload = (e) => {
      // 1.获取解析后的数据
      const data = e.target.result
      // 2.利用XLSX解析数据
      const workBook = XLSX.read(data, { type: 'array' })
      // 3.获取第一张表格名称
      const firstSheetName = workBook.SheetNames[0]
      // 4.读取sheet1的数据
      const workSheet = workBook.Sheets[firstSheetName]
      // 5.解析数据表头
      const header = getHeaderRow(workSheet)
      // 6.解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7.传入解析后的数据
      generateData({ header, results })
      // 8.处理loading
      loading.value = false
      // 9.成功回调
      resolve()
    }

    reader.readAsArrayBuffer(rawFile)
  })
}

// 根据导入内容,生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

// 拖拽上传
const handleDrop = (e) => {
  // 上传中
  if (loading.value) return

  const files = e.dataTransfer.files

  if (files.length !== 1) {
    ElMessage.error('只能上传一个文件')
    return
  }

  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是.xlsx,.xls或csv格式')
    return
  }

  upload(rawFile)
}

const handleDragOver = (e) => {
  // 生成拖拽副本
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
    .el-icon--upload {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
