import AMapLoader from '@amap/amap-jsapi-loader'
export const getAMapInstance = () => {
  return new Promise((resolve, reject) => {
    AMapLoader.load({
      'key': 'Y7f82cd2bbf4e3762d4e9e8610beae464', // 申请好的Web端开发者Key，首次调用 load 时必填
      'version': '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      'plugins': [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      'AMapUI': { // 是否加载 AMapUI，缺省不加载
        'version': '1.1', // AMapUI 缺省 1.1
        'plugins': [] // 需要加载的 AMapUI ui插件
      },
      'Loca': { // 是否加载 Loca， 缺省不加载
        'version': '1.3.2' // Loca 版本，缺省 1.3.2
      }
    }).then(AMap => {
      resolve(AMap)
    }).catch(e => {
      reject(e)
      console.log(e)
    })
  })
}

export const AMapCalcDistance = (p1, p2) => {
  return new Promise((resolve, reject) => {
    getAMapInstance().then(AMap => {
      resolve(Math.round(AMap.GeometryUtil.distance(p1, p2)))
    }).catch(e => {
      reject(e)
      console.log(e)
    })
  })
}
