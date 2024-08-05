<template>
  <div @click="ontoggle">
    <svg-icon
      :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import screenfull from 'screenfull'

const isFullScreen = ref(false)

const ontoggle = () => {
  screenfull.toggle()
  isFullScreen.value = !isFullScreen.value
}
</script>

<style lang="scss" scoped></style>
