import { privateRoutes, publicRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  },
  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      state.routes = [...state.routes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRoutes(context, menus) {
      // 需要添加的路由
      const routes = []

      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })

      // 添加404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)
      return routes
    }
  }
}
