<template>
  <div class="cad">
    <div :id="mapDOMid" class="image-map">
      <button class="recovery" @click="recoveryToOrign">恢复到最初状态</button>
      <button class="changeBG" @click="onChangeBG">更换地图底图</button>
      <input type="file" name="bgURL" id="BGselector" ref="BGselector" multiple="multiple" accept="image/*" hidden @change="onFileChange" />
      <button class="save" @click="clickSave">保存修改</button>
    </div>
    <!-- <p style="text-align: center">直接将图片拖拽到页面内也可更换底图（注意点击"保存",数据暂时保存在浏览器）</p> -->
    <br />
    <p style="text-align: center">
      当前可选区域(点击删除),
      <span style="color: blue;" class="addArea" @click="handleAddArea">点我添加更多</span>
    </p>
    <div class="areaList">
      <el-button v-for="(v, k) in areaArr" :key="k" type="primary" size="mini" @click="deleteAreaItem(k)">{{v}}</el-button>
    </div>
    <!-- <l-map style="height: 350px" :crs="crs" :options="{zoomControl: false}"> -->
    <!-- <l-image-overlay :url="url" :bounds="bounds"></l-image-overlay> -->
    <!-- <l-feature-group ref="features"> -->
    <!-- <l-control position="bottomleft" > -->
    <!-- </l-map> -->
  </div>
</template>

<script>
/**
 * 文档
 * https://leafletjs.com/reference-1.6.0.html#control
 * http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-toolbar
 */
// import * as leafletLabel from 'leaflet.label'
// import './js/leaflet.label.js'
// import 'leaflet-draw'
// import './js/leaflet.draw-src.js'

import { default as swal } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet.label/dist/leaflet.label.css'
import pinyinUtil from './js/pinyinUtil'
export default {
  props: {
    Background_bak: {
      required: true
    },
    existPoint_bak: { // 初始化的图层
      type: Array
    },
    areaArr_bak: {
      type: Object
    },
    mapDOMid: {
      type: String,
      default: 'image-map1'
    }
  },
  data() {
    var colorList = [
      '#ffbf26',
      '#ff6438',
      '#2cfff5',
      '#c556ff',
      '#ff4c5f',
      '#0bed07',
      '#4d596c',
      '#8AC007',
      '#ccb324',
      '#FFAD5C',
      '#72ff71',
      '#ff78af',
      '#93adff',
      '#ffb3cf'
    ]

    return {
      map: null, // map实例
      drawnItems: null, // 图层容器对象
      // mapDOMid: '',
      existPoint: [], // 已存在的图片层数据
      // existPoint_bak: [], // 已存在的图片层备份
      Background: '', // 背景图
      // Background_bak: '', // 背景图备份，用于恢复原始状态时使用
      areaArr: {}, // 标记名称对象
      // areaArr_bak: {}, // 标记名称对象备份，用于恢复原始状态时使用
      pointAttr: [], // 新旧图层的集合
      savePoint: [], // 保存的最终json
      weight: 2,
      textFontSize_default: 16,
      colorList: colorList
    }
  },
  mounted() {
    // this.$nextTick((_) => {
    //   this.renderData()
    //   this.initTool()
    // })
  },
  methods: {
    setup() {
      this.$nextTick((_) => {
        this.renderData()
        this.initTool()
      })
    },
    /**
     * 准备数据
     * firstData: fase时取本地的， 需要显示的标记， 测试从本地localstorage取，后续从数据库读取
     * pointData: 需要显示的点标记，存在本地local
     * backgroundURL: 地图背景，存在本地local
     */
    renderData() {
      let that = this
      // 数据备份
      this.existPoint = [...this.existPoint_bak] // 操作的的点
      this.Background = this.Background_bak
      this.areaArr = { ...this.areaArr_bak }
      this.init(this.mapDOMid, this.Background, () => {
        that.showPoint(that.existPoint)
      })
    },
    // 初始化map实例并添加工具条
    init(domId, imgUrl, callback) {
      let that = this
      if (typeof that.map !== 'undefined' && that.map != null) {
        // 添加前先删除
        that.map.remove()
      }

      let _tmpIMG = new Image()
      _tmpIMG.src = imgUrl
      _tmpIMG.onload = function() {
        var _tmpThis = this
        var _tmpIMG_width = _tmpThis.width
        var _tmpIMG_height = _tmpThis.height

        // 创建map实例
        that.map = new L.Map(domId, {
          editable: true,
          crs: L.CRS.Simple,
          maxZoom: 5,
          minZoom: -2,
          center: [$('#' + domId).width() / 2, $('#' + domId).height() / 2]
        })
        // 图形对角转化的经纬度坐标，从而设置对应的矩形区域
        var southWest = that.map.unproject([0, 0], that.map.getMinZoom() - 5)
        var northEast = that.map.unproject(
          [_tmpIMG_width, _tmpIMG_height],
          that.map.getMaxZoom() - 5
        )
        // 根据经纬度表示地图上的矩形地理区域
        var bounds = new L.LatLngBounds(southWest, northEast)
        // 创建一个图层
        var image = L.imageOverlay(imgUrl, bounds).addTo(that.map)
        // tell leaflet that the map is exactly as big as the image
        // 设置图层和map一样大
        that.map.setMaxBounds(bounds)
        that.map.fitBounds(bounds)
        // 存储图层容器FeatureGroup is to store editable layers
        that.drawnItems = new L.FeatureGroup()
        that.map.addLayer(that.drawnItems)
        // 创建一个可画编辑的控制条右上角
        var drawControl = new L.Control.Draw({
          position: 'topright',
          draw: {
            polyline: false, // 斜线
            // 多边形
            polygon: {
              allowIntersection: false, // Restricts shapes to simple polygons
              showArea: true,
              drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>错误<strong>，你不能这么画!'
              },
              shapeOptions: {
                weight: that.weight
              }
            },
            // 方形
            rectangle: {
              shapeOptions: {
                /* clickable: false , */
                weight: that.weight
              }
            },
            // 圆形
            circle: {
              shapeOptions: {
                weight: that.weight
              }
            },
            // 点
            // marker: false
            marker: {
              shapeOptions: {
                weight: that.weight
              }
            }
          },
          edit: {
            featureGroup: that.drawnItems,
            poly: {
              allowIntersection: false // 允许交叉
            },
            remove: true
          }
        })
        if (that.map.addControl(drawControl)) {
          callback()
        }

        that.map.on(L.Draw.Event.CREATED, function(e) {
          var type = e.layerType
          var layer = e.layer
          layer.addTo(that.drawnItems)
          if (type === 'marker') {
            swal({
              title: '标记',
              input: 'text',
              showCancelButton: true,
              inputValidator: function(value) {
                return new Promise(function(resolve, reject) {
                  if (value) {
                    resolve()
                  } else {
                    reject('你得填一下你标记了啥！')
                  }
                })
              }
            }).then(
              function(result) {
                that.pointAttr.push({
                  leaflet_id: layer._leaflet_id,
                  type: type,
                  area: result,
                  pop: result
                })
                layer.bindPopup(result) // popup 位置在上面
                layer.bindLabel(result) // 图层label 位置在左边
                swal({
                  type: 'success',
                  html: '您标记了:' + result
                })
              },
              function(dismiss) {
                that.drawnItems.removeLayer(layer)
              }
            )
          } else {
            swal({
              title: '请选择区域',
              input: 'select',
              inputOptions: that.areaArr,
              inputPlaceholder: '请选择',
              showCancelButton: true,
              inputValidator: function(value) {
                return new Promise(function(resolve, reject) {
                  if (value !== '') {
                    resolve()
                  } else {
                    /** eslint ignore */
                    reject('你还没选择呢！')
                  }
                })
              }
            }).then(
              function(result) {
                layer.bindPopup(that.areaArr[result])
                layer.bindLabel(that.areaArr[result])
                // 添加文字
                layer.setText(that.areaArr[result])
                that.pointAttr.push({
                  leaflet_id: layer._leaflet_id,
                  type: type,
                  area: that.areaArr[result],
                  area_id: result,
                  pop: that.areaArr[result]
                })
                swal({
                  type: 'success',
                  html: '您选择了: ' + that.areaArr[result]
                })
              },
              function(dismiss) {
                that.drawnItems.removeLayer(layer)
              }
            )
          }
        })

        that.map.on(L.Draw.Event.EDITED, function(e) {
          var layers = e.layers
          var countOfEditedLayers = 0
          layers.eachLayer(function(layer) {
            countOfEditedLayers++
          })
          console.log('修改了 ' + countOfEditedLayers + ' 个图层')
        })
      }
    },
    /**
     * 显示标记点
     * params {Array} allPoint
     * example: [{area: '防盗门',area_id: "rhm",lat: -582,lng: 509.5,radius: 6533009.3132760655,type: "circle"}]
     */
    showPoint(allPoint) {
      let that = this
      allPoint.forEach(function(n, i) {
        switch (n.type) {
          case 'polygon':
            // 多边形 new L.Polygon(points, {}) 参数：points 是二维数组 [[lat, lng],[lat, lng]]
            // 坐标转二维数组
            let pointsPoly = n.latlngs.map((n) => {
              return [n.lat, n.lng]
            })
            let polygon = new L.Polygon(pointsPoly, {
              weight: that.weight,
              color: that.getColorByRandom()
            })
              .bindLabel(n.area, { autoPan: false })
              .setText(n.area).bindPopup(n.area)

            polygon.addTo(that.drawnItems)

            that.pointAttr.push({
              leaflet_id: polygon._leaflet_id,
              type: n.type,
              area: n.area,
              area_id: n.area_id
            })
            break
          case 'rectangle':
            // 矩形 new L.Rectangle(points, {}) 参数：points 是二维数组 [[lat, lng],[lat, lng]]
            let points = n.latlngs.map((n) => {
              return [n.lat, n.lng]
            })
            var rectangle = new L.Rectangle(points, {
              weight: that.weight,
              color: that.getColorByRandom()
            })
              .bindLabel(n.area, { autoPan: false })
              .setText(n.area).bindPopup(n.area)

            rectangle.addTo(that.drawnItems)
            that.pointAttr.push({
              leaflet_id: rectangle._leaflet_id,
              type: n.type,
              area: n.area,
              area_id: n.area_id
            })
            break
          case 'circle':
            // 矩形 new L.Circle([lat, lng],radius, option:{})
            var circle = new L.Circle([n.lat, n.lng], n.radius, {
              weight: that.weight,
              color: that.getColorByRandom()
            }).bindLabel(n.area, { autoPan: false }).setText(n.area).bindPopup(n.area)

            circle.addTo(that.drawnItems)
            that.pointAttr.push({
              leaflet_id: circle._leaflet_id,
              type: n.type,
              area: n.area,
              area_id: n.area_id
            })
            break
          case 'marker':
            // 矩形 new L.Marker([lat, lng], option:{})
            var marker = new L.Marker([n.lat, n.lng], {
              weight: that.weight,
              color: that.getColorByRandom()
            }).bindLabel(n.area, { autoPan: false }).bindPopup(n.area)
            marker.addTo(that.drawnItems)
            that.pointAttr.push({
              leaflet_id: marker._leaflet_id,
              type: n.type,
              area: n.area
            })
            break
        }
      })
    },
    initTool() {
      let that = this
      // 画圈
      // 解决在使用L.CRS.Simple时，画圆出现的问题
      L.Edit.Circle.include({
        _move: function(latlng) {
          var resizemarkerPoint = this._getResizeMarkerPoint(latlng)

          // Move the resize marker
          this._resizeMarkers[0].setLatLng(resizemarkerPoint)

          // Move the circle
          this._shape.setLatLng(latlng)

          // output the radius, for debugging purpose.
          document.getElementById('radius').innerHTML = this._shape._radius
        }
      })
      // Correct Leaflet L.Circle for use with flat map. Comment the following function to see the original impact on radius when the circle is dragged along the vertical axis.
      L.Circle.include({
        _getLngRadius: function() {
          return this._getLatRadius()
        }
      })

      // 添加文字
      var original_getPathString_circle = L.Circle.prototype.getPathString
      L.Circle.include({
        getPathString: function() {
          var center = this._point
          var r = this._radius
          if (this._textNode && this._textNode.parentNode) {
            this._path.parentNode.removeChild(this._textNode)
            delete this._textNode
          }
          var textNode = L.Path.prototype._createElement('text')

          textNode.setAttribute('text-anchor', 'middle')
          textNode.setAttribute('style', 'font-weight:bold')
          textNode.setAttribute('x', center.x)
          textNode.setAttribute('y', center.y)
          var font_size
          if (this._map.getZoom() > 0) {
            font_size = (that.textFontSize_default + 4) * this._map.getZoom() * 2
          } else {
            font_size = that.textFontSize_default
          }
          textNode.setAttribute('font-size', font_size)

          textNode.appendChild(
            document.createTextNode(this.text ? this.text : '')
          )

          this._path.parentNode.appendChild(textNode)

          this._textNode = textNode

          return original_getPathString_circle.call(this)
        },
        setText: function(text) {
          this.text = text
          return this.redraw()
        }
      })

      // 多边形
      var original_getPathString_polygon = L.Polygon.prototype.getPathString
      L.Polygon.include({
        getPathString: function() {
          console.log('that.map', that.map)
          var center = that.map.latLngToLayerPoint(this.getBounds().getCenter())
          if (this._textNode && this._textNode.parentNode) {
            this._path.parentNode.removeChild(this._textNode)
            delete this._textNode
          }
          var textNode = L.Path.prototype._createElement('text')
          textNode.setAttribute('text-anchor', 'middle')
          textNode.setAttribute('style', 'font-weight:bold')
          textNode.setAttribute('x', center.x)
          textNode.setAttribute('y', center.y)
          var font_size
          if (this._map.getZoom() > 0) {
            font_size = (that.textFontSize_default + 4) * this._map.getZoom() * 2
          } else {
            font_size = that.textFontSize_default
          }
          textNode.setAttribute('font-size', font_size)

          textNode.appendChild(
            document.createTextNode(this.text ? this.text : '')
          )

          this._path.parentNode.appendChild(textNode)

          this._textNode = textNode

          return original_getPathString_polygon.call(this)
        },
        setText: function(text) {
          this.text = text
          return this.redraw()
        }
      })
    },

    clickSave() {
      this.$confirm('区域和选项都将被保存', '确定要保存修改吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.savePoints()
          // localStorage.pointData = JSON.stringify(this.savePoint)
          // localStorage.backgroundURL = this.Background
          // localStorage.areaList = JSON.stringify(this.areaArr)
          this.$message.success('户型图已修改')
        })
        .catch(() => {
          this.$message.error('已取消修改')
        })
    },
    savePoints() {
      let that = this
      that.savePoint = []
      let { pointAttr } = that
      let finalLayers = that.drawnItems._layers
      Object.keys(finalLayers).forEach(function(key) {
        let n = finalLayers[key]
        let attr = {}
        for (var k = 0; k < pointAttr.length; k++) {
          if (n._leaflet_id === pointAttr[k].leaflet_id) {
            attr = pointAttr[k]
            break
          }
        }

        switch (attr.type) {
          case 'marker':
            that.savePoint.push({
              type: attr.type,
              area: attr.area,
              lat: n._latlng.lat,
              lng: n._latlng.lng
            })
            break
          case 'circle':
            that.savePoint.push({
              type: attr.type,
              area: attr.area,
              area_id: attr.area_id,
              lat: n._latlng.lat,
              lng: n._latlng.lng,
              radius: n._mRadius
            })
            break
          case 'polygon':
          case 'rectangle':
            var tmp = n._latlngs && n._latlngs.map(o => {
              return {
                lat: o.lat,
                lng: o.lng
              }
            })
            that.savePoint.push({
              type: attr.type,
              area: attr.area,
              area_id: attr.area_id,
              latlngs: tmp
            })
            break
        }
      })

      that.$emit('saveLeaflet', {
        Background: that.Background,
        savePoint: that.savePoint,
        areaList: that.areaArr
      })
    },
    // 恢复到原始状态
    recoveryToOrign() {
      let that = this
      that.$confirm('区域和选项都恢复到最初状态，需要手动点击保存修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          that.areaArr = { ...that.areaArr_bak }
          that.init(that.mapDOMid, that.Background_bak, () => {
            that.showPoint(that.existPoint_bak)
          })
          this.$message.success('已恢复到最初状态(需要手动保存)')
        }).catch((e) => {
          this.$message.error('已取消')
        })
    },
    handleAddArea() {
      let that = this
      swal.setDefaults({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        animation: false,
        progressSteps: ['1', '2']
      })
      var steps = [
        {
          title: '请输入"名称"',
          text: '请输入要添加的区域"名称",如：周界。已存在的则会被覆盖,可改填：周界2'
        },
        {
          title: '请输入"缩写"',
          text: '请输入刚刚添加的区域名称的"缩写",如：kt。不填则默认取首字母,已存在的会被覆盖,可改填：kt2'
        }
      ]
      // result为steps 1 2输入的值
      swal.queue(steps).then(function(result) {
        swal.resetDefaults()
        result[1] = result[1].toLowerCase()
        // 缩写名称没有 默认用中文的首字母
        if (result[1].trim() === '') {
          result[1] = pinyinUtil.getFirstLetter(result[0].trim(), false).toLowerCase()
        }
        if (result[1] in that.areaArr) {
          swal({
            title: '失败',
            html: '添加失败,缩写"' + result[1] + '"已存在,可尝试："' + result[1] + '+数字"',
            confirmButtonText: '好的',
            showCancelButton: false
          })
          return false
        }

        if (result[0].trim() === '') {
          swal({
            title: '失败',
            html: '添加失败,名称不能为空',
            confirmButtonText: '好的',
            showCancelButton: false
          })
          return false
        }
        // 如果名称已存在
        var nameList = Object.values(that.areaArr)
        if (nameList.includes(result[0])) {
          swal({
            title: '失败',
            html: '添加失败,名称"' + result[0] + '"已存在,可尝试"' + result[0] + '+数字"',
            confirmButtonText: '好的',
            showCancelButton: false
          })
          return false
        }
        // 动态添加到areaArr中更新视图
        that.$set(that.areaArr, result[1], result[0])

        swal({
          title: '成功',
          html: '添加成功,名称：' + result[0] + '、缩写：' + result[1],
          confirmButtonText: '好的',
          showCancelButton: false
        })
      }, function() { // 取消、关闭
        swal.resetDefaults()
      })
    },
    // 点击可选区域按钮删除
    deleteAreaItem(k) {
      let that = this
      that.$confirm('确定要删除该区域吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delete that.areaArr[k]
          this.$message.success('删除成功')
        }).catch((e) => {
          this.$message.error('已取消')
        })
    },
    onChangeBG() {
      // $('#BGselector').trigger('click')
      this.$refs.BGselector.click()
    },
    onFileChange($event) {
      let that = this
      let files = $event.target.files
      var reader = new FileReader()
      if (typeof (files) !== 'undefined' && files.length > 0) {
        reader.readAsDataURL(files[0])
        reader.onload = function(e) {
          that.Background = e.target.result
          $('#BGselector').attr('value', e.target.result)
          that.$emit('on-bg-change', that.Background)
          that.init(that.mapDOMid, that.Background, () => {
            that.existPoint = []
            that.showPoint(that.existPoint)
          })
        }
      }
    },
    // 工具函数： 随机颜色
    getRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    // 工具函数：从定义好的颜色范围内随机抽取一个
    getColorByRandom() {
      var colorList = [
        '#ffbf26',
        '#ff6438',
        '#2cfff5',
        '#c556ff',
        '#ff4c5f',
        '#0bed07',
        '#4d596c',
        '#8AC007',
        '#ccb324',
        '#FFAD5C',
        '#72ff71',
        '#ff78af',
        '#93adff',
        '#ffb3cf'
      ]
      var colorIndex = Math.floor(Math.random() * colorList.length)
      var color = colorList[colorIndex]
      return color
    }
  }
}
</script>

<style lang="scss" scoped>
.image-map {
  /*width:800px;*/
  width: 100%;
  height: 800px;
  position: relative;
  margin: 20px;
  border: 1px solid #ccc;
}

.cad {
  .recovery {
    display: block;
    padding: 5px 10px;
    position: absolute;
    bottom: 10px;
    right: 295px;
    z-index: 233;
    max-width: 150px;
  }
  .addArea {
    color: blue;
    cursor: pointer;
  }
  .changeBG {
    display: block;
    padding: 5px 10px;
    position: absolute;
    bottom: 10px;
    right: 170px;
    z-index: 233;
    max-width: 120px;
  }

  .save {
    display: block;
    padding: 5px 10px;
    position: absolute;
    bottom: 10px;
    right: 20px;
    z-index: 233;
    max-width: 120px;
  }

  .swal2-modal.swal2-show button {
    margin-left: 3px;
    margin-right: 3px;
  }

  .leaflet-control-attribution.leaflet-control {
    display: none;
  }

  .areaList {
    text-align: center;
  }
  /deep/.leaflet-control-attribution {
    display: none;
  }
}

</style>
