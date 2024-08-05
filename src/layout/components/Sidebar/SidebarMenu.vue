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
import { useStore } from 'vuex'

import { filterRouters, generateMenus } from '@/utils/route'

import SidebarItem from './SidebarItem'

const router = useRouter()
const store = useStore()

const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())

  return generateMenus(filterRoutes)
})

const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})

const cssVar = computed(() => {
  console.log(store.getters.cssVar)
  return store.getters.cssVar
})
</script>

<style lang="scss" scoped>
.el-menu {
  --el-menu-text-color: v-bind(cssVar.menuText);
  --el-menu-active-color: v-bind(cssVar.menuActiveText);
  --el-menu-hover-text-color: v-bind(cssVar.menuActiveText);
  --el-menu-bg-color: v-bind(cssVar.menuBg);
  --el-menu-hover-bg-color: v-bind(cssVar.menuHover);
}
</style>
