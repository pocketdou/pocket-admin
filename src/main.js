import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import './permission'

import { createApp } from 'vue'

import ElementPlus from 'element-plus'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import installIcons from '@/icons'

import App from './App.vue'
import i18n from './i18n'
import router from './router'
import store from './store'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

installIcons(app)

app.use(store).use(router).use(ElementPlus).use(i18n).mount('#app')
