import App from './App.vue'
import i18n from './i18n'
import store from './store'
import router from './router'

import { createApp } from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import installDirective from '@/directives'
import installElementPlus from '@/plugins/element'
import installFilter from '@/filter'
import installIcons from '@/icons'

import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import './permission'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

installIcons(app)
installElementPlus(app)
installFilter(app)
installDirective(app)

app.use(store).use(router).use(i18n).mount('#app')
