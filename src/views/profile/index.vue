<template>
  <div class="my-container">
    <el-row :gutter="0">
      <el-col :span="6">
        <project-card class="project-card" :features="featureData" />
      </el-col>
      <el-col :span="18">
        <el-tabs v-model="activeName">
          <el-tab-pane
            key="1"
            tab="feature"
            :label="$t('msg.profile.feature')"
            name="feature"
          >
            <Feature :features="featureData" />
          </el-tab-pane>
          <el-tab-pane
            key="2"
            tab="chapter"
            :label="$t('msg.profile.chapter')"
            name="chapter"
          >
            <Chapter />
          </el-tab-pane>
          <el-tab-pane
            key="3"
            tab="author"
            :label="$t('msg.profile.author')"
            name="author"
          >
            <Author />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { feature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

import Author from './components/Author.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import ProjectCard from './components/ProjectCard.vue'

const activeName = ref('feature')
const featureData = ref([])

const getFeatureData = async () => {
  featureData.value = await feature()
}

getFeatureData()
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
