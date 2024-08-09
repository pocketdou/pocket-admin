<template>
  <div class="">
    <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    />
    <div class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
