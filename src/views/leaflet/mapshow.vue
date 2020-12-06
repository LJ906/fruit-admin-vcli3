<template>
  <div class="cad">
    <div id="image-map">
      <!-- <button class="recovery" @click="recoveryToOrign">恢复到最初状态</button> -->
      <button class="recovery" @click="handleReturn">返回总厂</button>
      <button class="changeBG" @click="onChangeBG">更换地图底图</button>
      <input type="file" name="bgURL" id="BGselector" ref="BGselector" multiple="multiple" accept="image/*" hidden @change="onFileChange" />
      <button class="save" @click="clickSave">保存修改</button>
    </div>
    <br />
    <p style="text-align: center">
      当前可选区域(点击删除),
      <span style="color: blue;" class="addArea" @click="handleAddArea">点我添加更多</span>
    </p>
    <div class="areaList">
      <el-button v-for="(v, k) in areaArr" :key="k" type="primary" size="mini" @click="deleteAreaItem(k)">{{v}}</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 文档
 * https://leafletjs.com/reference-1.6.0.html#control
 * http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-toolbar
 */

import { default as swal } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet.label/dist/leaflet.label.css'
import pinyinUtil from './js/pinyinUtil'
import { fcPoint, ssPoint, zcPoint } from './mockPoints'
import { dangerIcon, humanIcon, carIcon, centerIcon, cameraIcon, doorIcon, guardIcon, alarmIcon } from './icons'

export default {
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
      mapDOMid: '',
      existPoint: [], // 已存在的图片层数据
      existPoint_bak: [], // 已存在的图片层备份
      Background: '', // 背景图
      Background_bak: '', // 背景图备份，用于恢复原始状态时使用
      areaArr: {
        fc: '分厂',
        yhbw: '要害部位',
        jzw: '建筑物'
      }, // 标记名称对象
      areaArr_bak: {}, // 标记名称对象备份，用于恢复原始状态时使用
      pointAttr: [], // 缓存的layer
      savePoint: [], // 保存的最终json
      weight: 2,
      textFontSize_default: 16,
      colorList: colorList,
      // line线名称选项
      lineArr: {
        xllx: '巡逻路线',
        zj1: '周界1级',
        zj2: '周界2级',
        zj3: '周界3级'
      },
      // marker 名称选项
      markerOptions: {
        yhbw: '要害部位',
        sxj: '摄像机',
        kzzx: '控制中心',
        mj: '门禁',
        bjq: '报警器',
        yf: '营房',
        jwgs: '警卫岗哨',
        rycrk: '人员出入口',
        clcrk: '车辆出入口'
      }
    }
  },
  mounted() {
    this.mapDOMid = 'image-map'
    this.$nextTick((_) => {
      this.initTool()
      this.renderData()
    })
  },
  methods: {
    /**
     * 准备数据
     * firstData: fase时取本地的， 需要显示的标记， 测试从本地localstorage取，后续从数据库读取
     * pointData: 需要显示的点标记，存在本地local
     * backgroundURL: 地图背景，存在本地local
     */
    renderData() {
      let that = this
      // 获取数据库的数据
      if (
        typeof localStorage.firstData === 'undefined' ||
        localStorage.firstData !== 'false'
      ) {
        // 测试期间的初始数据
        localStorage.firstData = 'false'
        // 模拟已存在的标记类型数据格式
        this.existPoint = zcPoint
        this.Background = require('./img/总厂.jpg')
        localStorage.areaList = JSON.stringify(this.areaArr)
      } else {
        // 测试期间从浏览器本地储存提取数据
        if ((typeof (localStorage.pointData) !== 'undefined') && localStorage.pointData != null && localStorage.pointData != '') {
          that.existPoint = JSON.parse(localStorage.pointData)
          that.Background = localStorage.backgroundURL
          that.areaArr = JSON.parse(localStorage.areaList)
        } else {
          // 模拟数据 正式环境删除
          this.existPoint = zcPoint // 临时数据
          this.Background = require('./img/总厂.jpg')
        }
      }

      // 数据备份
      this.existPoint_bak = [...this.existPoint]
      this.Background_bak = this.Background
      this.areaArr_bak = { ...this.areaArr }
      that.init(this.mapDOMid, this.Background, () => {
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
            polyline: {
              shapeOptions: {
                weight: 4
              }
            }, // 斜线
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
            var markersteps = [
              {
                title: '请选择热点类型',
                input: 'select',
                inputOptions: that.markerOptions,
                inputPlaceholder: '请选择',
                showCancelButton: true,
                inputValidator: function(value) {
                  return new Promise(function(resolve, reject) {
                    if (value !== '') {
                      resolve()
                    } else {
                      reject('尚未选择热点类型！')
                    }
                  })
                }
              },
              {
                title: '请输入名称',
                input: 'text',
                text: '请输入要添加的名称，如：摄像机。已存在的则会被覆盖，可改填：摄像机2'
              }
            ]
            swal(markersteps).then(
              function(result) {
                that.pointAttr.push({
                  leaflet_id: layer._leaflet_id,
                  type: type,
                  area: that.markerOptions[result[0]],
                  areaType: result[0],
                  areaName: result[1]
                })
                // layer.bindPopup(result) // popup 位置在上面
                layer.bindLabel(result[1]) // 图层label 位置在左边
                swal({
                  type: 'success',
                  html: '您标记了:' + result[1]
                })
              },
              function(dismiss) {
                that.drawnItems.removeLayer(layer)
              }
            )
          } else if (type === 'polyline') {
            var linesteps = [
              {
                title: '请选择线条类型',
                input: 'select',
                inputOptions: that.lineArr,
                inputPlaceholder: '请选择',
                showCancelButton: true,
                inputValidator: function(value) {
                  return new Promise(function(resolve, reject) {
                    if (value !== '') {
                      resolve()
                    } else {
                      reject('尚未选择线条类型！')
                    }
                  })
                }
              },
              {
                title: '请输入名称',
                input: 'text',
                text: '请输入要添加的名称，如：周界。已存在的则会被覆盖，可改填：周界2'
              }
            ]
            swal.queue(linesteps).then(function(result) {
              that.pointAttr.push({
                leaflet_id: layer._leaflet_id,
                type: type,
                area: that.lineArr[result[0]],
                areaType: result[0],
                areaName: result[1]
              })
              layer.bindLabel(result[1])
              swal({
                type: 'success',
                html: '您标记了:' + result[1]
              })
            }, function(dismiss) {
              that.drawnItems.removeLayer(layer)
            })
          } else {
            let reactsteps = [
              {
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
              },
              {
                title: '请输入区域名称',
                input: 'text',
                text: '请输入要添加的区域名称，如：周界。已存在的则会被覆盖，可改填：周界2'
              }
            ]
            swal.queue(reactsteps).then(
              function(result) {
                swal.resetDefaults()
                result[1] = result[1].toLowerCase()
                // layer.bindPopup(result[1])
                layer.bindLabel(result[1])
                // 添加文字
                layer.setText(result[1])
                that.pointAttr.push({
                  leaflet_id: layer._leaflet_id,
                  type: type,
                  area: that.areaArr[result[0]],
                  areaType: result[0],
                  areaName: result[1],
                  area_id: result[0] + '_' + layer._leaflet_id
                })
                swal({
                  type: 'success',
                  html: '您选择了: ' + result[1]
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
      console.log('showpoit', allPoint)
      let that = this
      // 定义多边形的样式
      let poinstyles = {
        // 线条
        polyline: {
          // 巡逻路线
          xllx: {
            lineWeight: 5,
            lineColor: '#2BE8E4'
          },
          // 一级周界
          zj1: {
            lineWeight: 5,
            lineColor: '#d0021b'
          },
          // 二级周界
          zj2: {
            lineWeight: 3,
            lineColor: '#f56e23'
          },
          // 3级周界
          zj3: {
            lineWeight: 3,
            lineColor: '#417505'
          },
        },
        // 多边形 | 矩形
        polygon: {
          // 分厂
          fc: {
            fillColor: '#72FF71',
            fillOpacity: 0.2,
            color: '#72FF71'
          },
          // 要害部位
          yhbw: {
            fillColor: '#DD7E62',
            fillOpacity: 0.2,
            color: '#DD7E62'
          },
          // 控制中心
          kzzx: {
            fillColor: '#50e3c2',
            fillOpacity: 0.2,
            color: '#50e3c2'
          },
          // 建筑物
          jzw: {
            fillColor: '#eaeaed',
            fillOpacity: 0.2,
            color: '#eaeaed'
          },
        },
        marker: {
          // 区域类型：控制中心
          kzzx: {
            markerIcon: centerIcon,
            popupInfo: '<b>控制中心</b><br>类型：值班室<br>值班人数：2 负责人：XXX 联系电话：00000000'
          },
          // 人员出入口
          rycrk: {
            markerIcon: humanIcon,
            popupInfo: '<b>人员出入口</b><br>类型：日常使用<br>说明：XXXX'
          },
          // 车辆出入口
          clcrk: {
            markerIcon: carIcon,
            popupInfo: '<b>车辆出入口</b><br>类型：日常使用<br>说明：XXXX'
          },
          // 摄像头
          sxj: {
            markerIcon: cameraIcon,
            popupInfo: '<b>摄像头</b><br>品牌：XXX<br>数量：2'
          },
          // 门禁
          mj: {
            markerIcon: doorIcon,
            popupInfo: '<b>门禁</b><br>品牌：XXX<br>数量：3'
          },
          // 警卫岗哨
          jwgs: {
            markerIcon: guardIcon,
            popupInfo: '<b>警卫岗哨</b><br>类型：双哨<br>说明：2小时换岗'
          },
          // 报警器
          bjq: {
            markerIcon: alarmIcon,
            popupInfo: '<b>报警器</b><br>品牌：XXX<br>数量：3'
          },
          // 要害部位
          yhbw: {
            markerIcon: dangerIcon,
            popupInfo: '<b>要害部位</b><br>说明：XXXX'
          }
        }
      }

      allPoint.forEach(function(n, i) {
        switch (n.type) {
          case 'polyline':
            let lineLngArr = n.latlngs.map((n) => {
              return [n.lat, n.lng]
            })
            // 根据不同的线条类型显示不同的样式
            let lineWeight = poinstyles.polyline[n.areaType] && poinstyles.polyline[n.areaType].lineWeight
            let lineColor = poinstyles.polyline[n.areaType] && poinstyles.polyline[n.areaType].lineColor

            let polyline = new L.Polyline(lineLngArr, {
              weight: lineWeight,
              // color : getColorByRandom()
              color: lineColor
            }).bindLabel(n.areaName, { autoPan: false })
            polyline.addTo(that.drawnItems)

            // v动画箭头效果
            // var arrowHead = L.polylineDecorator(polyline).addTo(drawnItems);
            // var arrowOffset = 0;
            // var anim = window.setInterval(function() {
            //     arrowHead.setPatterns([
            //         {offset: arrowOffset+'%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})}
            //     ])
            //     if(++arrowOffset > 100)
            //         arrowOffset = 0;
            // }, 200)

            // 静态箭头效果
            if (n.areaType === 'xllx') {
              L.polylineDecorator(polyline, {
                patterns: [
                  { offset: 25, repeat: 100, symbol: L.Symbol.arrowHead({ pixelSize: 16, pathOptions: { fillOpacity: 1, weight: 0, color: '#1676FF' } }) }
                ]
              }).addTo(that.map)
            }

            that.pointAttr.push({
              leaflet_id: polyline._leaflet_id,
              type: n.type,
              area: n.area,
              areaType: n.areaType,
              areaName: n.areaName,
              area_id: n.area_id
            })
            break
          case 'polygon':
            // 多边形 new L.Polygon(points, {}) 参数：points 是二维数组 [[lat, lng],[lat, lng]]
            // 坐标转二维数组
            let pointsPoly = n.latlngs.map((n) => {
              return [n.lat, n.lng]
            })

            let polygon = new L.Polygon(pointsPoly, {
              weight: that.weight,
              fillColor: poinstyles.polygon[n.areaType].fillColor,
              fillOpacity: poinstyles.polygon[n.areaType].fillOpacity,
              color: poinstyles.polygon[n.areaType].color
              // color: that.getColorByRandom()
            }).bindLabel(n.areaName, { autoPan: false }).setText(n.areaName).bindPopup(n.areaName)

            polygon.addTo(that.drawnItems)

            that.pointAttr.push({
              leaflet_id: polygon._leaflet_id,
              type: n.type,
              area: n.area,
              areaName: n.areaName,
              areaType: n.areaType,
              area_id: n.area_id
            })

            // 点击事件
            polygon.on('click', function() {
              if (n.areaType === 'fc') {
                console.log('click分厂')
                // var fcBackground = require('./img/' + n.areaName + '.jpg')
                var fcBackground = require('./img/一分厂.jpg')
                that.init(that.mapDOMid, fcBackground, function() {
                  that.showPoint(fcPoint)
                })
                // $('#info').html(fcInfo);
                console.log('右侧数据切换成一分厂')
                that.$emit('clickFenchang')
              }
            })
            break
          case 'rectangle':
            // 矩形 new L.Rectangle(points, {}) 参数：points 是二维数组 [[lat, lng],[lat, lng]]
            let points = n.latlngs.map((n) => {
              return [n.lat, n.lng]
            })
            // 根据不同的区域类型显示不同的样式

            var rectangle = new L.Rectangle(points, {
              weight: that.weight,
              // color: that.getColorByRandom(),
              fillColor: poinstyles.polygon[n.areaType].fillColor,
              fillOpacity: poinstyles.polygon[n.areaType].fillOpacity,
              color: poinstyles.polygon[n.areaType].color
            })
              .bindLabel(n.areaName, { autoPan: false })
              .setText(n.areaName).bindPopup(n.areaName)

            rectangle.addTo(that.drawnItems)
            that.pointAttr.push({
              leaflet_id: rectangle._leaflet_id,
              type: n.type,
              area: n.area,
              area_id: n.area_id,
              'areaType': n.areaType,
              'areaName': n.areaName
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
              'areaType': n.areaType,
              'areaName': n.areaName,
              area_id: n.area_id
            })
            break
          case 'marker':
            // 矩形 new L.Marker([lat, lng], option:{})
            var marker = new L.Marker([n.lat, n.lng], {
              weight: that.weight,
              icon: (poinstyles.marker[n.areaType] && poinstyles.marker[n.areaType].markerIcon) || '',
              color: that.getColorByRandom()
            }).bindLabel(n.area, { autoPan: false })
            marker.addTo(that.drawnItems)
            that.pointAttr.push({
              leaflet_id: marker._leaflet_id,
              type: n.type,
              area: n.area,
              'areaType': n.areaType,
              'areaName': n.areaName
            })

            if (poinstyles.marker[n.areaType].popupInfo) {
              marker.bindPopup(poinstyles.marker[n.areaType].popupInfo).openPopup()
            }

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

      // 矩形
      var original_getPathString_rectangle = L.Rectangle.prototype.getPathString
      L.Rectangle.include({
        getPathString: function() {
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

          textNode.appendChild(document.createTextNode((this.text) ? this.text : ''))

          this._path.parentNode.appendChild(textNode)

          this._textNode = textNode

          return original_getPathString_rectangle.call(this)
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
          localStorage.pointData = JSON.stringify(this.savePoint)
          localStorage.backgroundURL = this.Background
          localStorage.areaList = JSON.stringify(this.areaArr)
          this.$message.success('户型图已修改')
        })
        .catch((e) => {
          this.$message.error('已取消修改', e)
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
              areaType: attr.areaType,
              areaName: attr.areaName,
              lat: n._latlng.lat,
              lng: n._latlng.lng
            })
            break
          case 'circle':
            that.savePoint.push({
              type: attr.type,
              area: attr.area,
              areaType: attr.areaType,
              areaName: attr.areaName,
              area_id: attr.area_id,
              lat: n._latlng.lat,
              lng: n._latlng.lng,
              radius: n._mRadius
            })
            break
          case 'polyline':
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
              areaType: attr.areaType,
              areaName: attr.areaName,
              area_id: attr.area_id,
              latlngs: tmp
            })
            break
        }
      })

      console.log('savepoints', that.savePoint)
      console.log('areaArr', that.areaArr)
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
          swal('成功', '已恢复到最初状态(需要手动保存)', 'success')
        }).catch((e) => {
          swal('取消', '已取消', 'error')
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
          that.init(that.mapDOMid, that.Background, () => {
            that.existPoint = []
            that.showPoint(that.existPoint)
          })
        }
      }
    },
    handleReturn() {
      let that = this
      swal({
        title: '确定要返回总厂图吗？',
        text: '返回到总厂图',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function() {
        that.areaArr = { ...that.areaArr_bak }
        that.init(that.mapDOMid, that.Background_bak, () => {
          that.showPoint(that.existPoint_bak)
        })
        swal('成功', '已返回至总厂图', 'success')
      }, function(dismiss) {
        if (dismiss === 'cancel') {
          swal('取消', '已取消', 'error')
        }
      })
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
#image-map {
  /*width:800px;*/
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
