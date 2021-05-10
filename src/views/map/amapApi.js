import AMap from 'AMap'
export default {
  calcDistance(p1, p2) {
    return Math.round(AMap.GeometryUtil.distance(p1, p2))
  }
}
