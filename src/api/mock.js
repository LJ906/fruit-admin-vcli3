import request from '@/utils/request'

export function mockdata(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}
export function articlelist(params) {
  return request({
    url: '/articlelist',
    method: 'get',
    params
  })
}
