import store from '@/store'
// 自定义权限指令
export default {
  inserted: (el, binding, vnode) => {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        // 没有权限
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
