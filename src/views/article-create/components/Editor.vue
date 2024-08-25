<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, watch } from 'vue'

import E from 'wangeditor'
import i18next from 'i18next'
import { useStore } from 'vuex'

import { commitArticle, editArticle } from './commit'

const store = useStore()
const props = defineProps({
  detail: {
    type: Object
  },
  title: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['onSuccess'])

let editor
let el
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1

  // 国际化相关处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next

  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'

  editor.create()
}

onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

// 编辑相关
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true
  }
)

const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }

  editor.txt.html('')
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
