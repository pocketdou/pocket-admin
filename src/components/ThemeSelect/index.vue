<template>
  <el-dropdown
    class="theme"
    v-bind="$attrs"
    trigger="click"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip effect="dark" :content="$t('msg.navBar.themeChange')">
        <svg-icon id="guide-theme" icon="change-theme"> </svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import SelectColor from './components/SelectColor.vue'

// dialog
const selectColorVisible = ref(false)

const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
