<template>
  <div
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
    class="app-wrapper"
  >
    <!-- 侧边栏 -->
    <sidebar
      :style="{ backgroundColor: variables.menuBg }"
      class="sidebar-container"
    >
    </sidebar>

    <div class="main-container">
      <!-- navbar -->
      <div class="fix-header">
        <navbar></navbar>
      </div>

      <!-- 内容区 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import variables from '@/styles/variables.scss'

import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar'
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  & {
    position: relative;
    width: 100%;
    height: 100%;
  }

  @include clearfix;
}

.fix-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sidebarDuration};
}

.hideSidebar .fix-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
