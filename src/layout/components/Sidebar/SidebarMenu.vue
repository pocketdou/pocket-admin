<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :uniqueOpened="true"
    :default-active="activeMenu"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { filterRouters, generateMenus } from '@/utils/route'

import SidebarItem from './SidebarItem'

const router = useRouter()

const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())

  return generateMenus(filterRoutes)
})

const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.el-menu {
  --el-menu-text-color: #{$menuText};
  --el-menu-hover-text-color: #{$menuActiveText};
  --el-menu-bg-color: #{$menuBg};
  --el-menu-hover-bg-color: #{$menuHoverBg};
  --el-menu-active-color: #{$menuActiveText};
}
.el-menu--collapse {
  width: 100px;
}
</style>
