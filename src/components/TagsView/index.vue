<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ tag.title }}
      <svg-icon
        class="close-icon"
        v-show="!isActive(tag)"
        icon="close"
        @click.prevent.stop="onCloseClick(index)"
      ></svg-icon>
    </router-link>

    <context-menu v-show="visable" :style="menuStyle" :index="selectIndex">
    </context-menu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import ContextMenu from './ContextMenu.vue'

const route = useRoute()
const store = useStore()

const visable = ref(false)

const menuStyle = ref({
  left: 0,
  top: 0
})

const selectIndex = ref(0)

const isActive = (tag) => tag.path === route.path

const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}

const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectIndex.value = index
  visable.value = true
}

const closeMenu = () => {
  visable.value = false
}

watch(visable, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .close-icon {
      padding-top: 5px;
      margin-left: 3px;
    }
  }
}
</style>
