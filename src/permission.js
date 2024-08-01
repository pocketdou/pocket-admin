import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

// 处理路由前置守卫
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 用户已经登录,不允许进入登录页
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户信息是否存在，不存在则获取用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
