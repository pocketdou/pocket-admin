import request from '@/utils/request'

/**
 * 获取所有角色
 * */
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

/**
 * 获取当前角色权限
 * */
export const rolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

/**
 * 修改角色权限
 * */
export const distributePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
