<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div class="markdown-box"></div>
    <!-- 按钮 -->
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">
        {{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

import { defineProps, defineEmits, onMounted, watch } from 'vue'

import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'

import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

const store = useStore()

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

const emit = defineEmits(['onSuccess'])

let mkEidtor
let el

const initEditor = () => {
  mkEidtor = new MkEditor({
    el,
    // 样式
    previewStyle: 'vertical',
    // 高度
    height: '500px',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })

  mkEidtor.getMarkdown()
}

onMounted(() => {
  el = document.querySelector('.markdown-box')
  initEditor()
})

watchSwitchLang(() => {
  if (!el) return

  const htmlStr = mkEidtor.getHTML()
  mkEidtor.destroy()

  initEditor()
  mkEidtor.setHTML(htmlStr)
})

const onSubmitClick = async () => {
  if (props.detail && props.detail.content) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEidtor.getHTML()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: mkEidtor.getHTML()
    })
  }

  mkEidtor.reset()
  emit('onSuccess')
}

// 编辑相关
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) mkEidtor.setHTML(val.content)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
