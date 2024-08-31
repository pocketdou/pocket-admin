import { createRouter, createWebHashHistory } from 'vue-router'

import layout from '@/layout/index'
import store from '@/store'

import Article from './modules/Article'
import ArticleCreate from './modules/ArticleCreate'
import PermissionList from './modules/PermissionList'
import RoleList from './modules/RoleList'
import UserManage from './modules/UserManage'

// 私有路由表
export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Article,
  ArticleCreate
]

// 公开路由表
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    redirect: '/profile',
    component: layout,
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'personnel'
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: () =>
          import(/* webpackChunkName: "chart" */ '@/views/chart/index'),
        meta: {
          title: 'chart',
          icon: 'chart'
        }
      },
      // 404
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router
