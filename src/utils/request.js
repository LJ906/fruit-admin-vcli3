import axios from 'axios'
import router from '../router'
import store from '@/store'
import _ from 'lodash'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000
})

// request interceptor
service.interceptors.request.use(
  config => {
    // showFullScreenLoading()
    if (config.url === '/a/login') {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    } else if (config.url.indexOf('/import') >= 0 || config.url.indexOf('/upload') >= 0) {
      config.headers = {
      }
    } else {
      config.data = JSON.stringify(config.data)
      config.headers = {
        'Content-Type': 'application/json'
      }
    }
    return config
  },
  error => {
    // tryHideFullScreenLoading()
    this.$message({ message: '请求超时！', type: 'error' })
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const headers = response.headers
    let conType = headers['content-type'].toLowerCase()
    if (conType.indexOf('application/octet-stream') >= 0 || conType.indexOf('application/vnd.ms-excel') >= 0 || conType.indexOf('text/plain') >= 0 || conType.indexOf('application/msword') >= 0) {
      return response
    }

    const data = response.data

    console.log('interceptors-data', data)
    // 登录认证失败返回登录页面
    if (data.code === 401) {
      store.dispatch('user/resetToken').then(() => {
        // location.reload()
        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath }
        })
      })
      // return data
    } else {
      return data
    }
  }, error => {
    console.log('baocuo', error)
    return Promise.reject(error)
  }
)

// 导出service
export default service

// post请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    service({
      url,
      data,
      method: 'POST'
    }).then(response => {
      response ? resolve(response) : resolve()
    }, err => {
      reject(err)
    })
  })
}

// get请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service({
      url,
      params,
      method: 'GET'
    }).then(response => {
      response ? resolve(response) : resolve()
    }, err => {
      reject(err)
    })
  })
}

export function formSubmit(url, params) {
  let form = document.createElement('form')
  form.action = url
  form.method = 'post'
  form.style.display = 'none'
  _.keys(params, o => {
    let inputElement = document.createElement('input')
    inputElement.type = 'hidden'
    inputElement.setAttribute('name', o)
    inputElement.setAttribute('value', params[o])
    form.appendChild(inputElement)
  })

  document.body.appendChild(form)
  form.submit()

  document.body.removeChild(form)
}

export function download(url, params) {
  service({
    url: url,
    method: 'post',
    data: params,
    responseType: 'arraybuffer'
  }).then(res => {
    if (res.status !== 200) {
      return this.$message.error('下载失败')
    }
    const blob = new Blob([res.data])
    let fileNameUrl = res.headers['content-disposition'] ? res.headers['content-disposition'] : ''
    fileNameUrl = fileNameUrl.replace(/\+/g, '%20')
    fileNameUrl = decodeURIComponent(fileNameUrl)
    let fileName = fileNameUrl !== '' ? fileNameUrl.split('')[1].split('filename=')[1] : ''
    if (fileName === '') {
      this.$message({ message: '下载失败：无法获取文件名！', type: 'error' })
    } else {
      fileName = fileName.startsWith('"') ? fileName.substring(1) : fileName
      fileName = fileName.endsWith('"') ? fileName.substring(0, fileName.length - 1) : fileName
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    }
  }).catch(e => {
    this.$message.error('下载失败')
  })
}
