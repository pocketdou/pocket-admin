<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        naxlength="20"
        clearable
      ></el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <Markdown
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></Markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="edit">
          <Editor
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></Editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { articleDetail } from '@/api/article'

import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'

const route = useRoute()
const router = useRouter()

const articleId = route.params.id

const title = ref('')
const activeName = ref('markdown')
const detail = ref({})

const onSuccess = () => {
  title.value = ''
  if (articleId) {
    router.push(`/article/${articleId}`)
  } else {
    router.push('/article/ranking')
  }
}

const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  title.value = detail.value.title
}

if (articleId) {
  getArticleDetail()
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
