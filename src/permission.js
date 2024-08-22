import router from './router'
import store from './store'

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
        const { permission } = await store.dispatch('user/getUserInfo')

        // 筛选出需要添加的路由
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )

        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })

        // 进行一次主动跳转,进行生效
        return next(to.path)
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
