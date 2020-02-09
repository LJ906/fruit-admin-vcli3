import Cookies from 'js-cookie'

// const TokenKey = 'HCL504.session.id'
const TokenKey = '_guid'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// 暂定
setToken('111872281.787292660613641000.1573468132364.5479')
