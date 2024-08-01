<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <transition-group name="breadbrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">
          {{ item.meta.title }}
        </span>
        <!-- 可点击 -->
        <span class="redirect" v-else @click="onLinkClick(item)">
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const router = useRouter()

// 生成数组数据
const breadcrumbData = ref([])
const getBreadbrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

watch(
  route,
  () => {
    getBreadbrumbData()
  },
  {
    immediate: true
  }
)

// 跳转
const onLinkClick = (item) => {
  console.log(item)
  router.push(item.path)
}
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
}
.redirect:hover {
  color: v-bind(linkHoverColor);
}
.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>
