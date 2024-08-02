<template>
  <svg-icon
    :icon="icon"
    :style="$store.getters.sidebarOpened ? '' : 'margin-right: 0px'"
  ></svg-icon>

  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'

import { generateTitle } from '@/utils/i18n'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
