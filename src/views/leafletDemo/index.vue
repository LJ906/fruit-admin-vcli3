<template>
  <div>
    <div class="left" v-for="(item, i) in temp" :key="item">
      <pic-draw
        :ref="'image-map'"
        :mapDOMid="'image-map'+ i"
        :existPoint_bak="existPoint"
        :Background_bak="Background"
        :areaArr_bak="areaList"
        @saveLeaflet="saveLeaflet"
      ></pic-draw>
    </div>
    <!-- <div class="right">
      <pic-draw
        :existPoint_bak="existPoint"
        :Background_bak="Background"
        :areaArr_bak="areaList"
        @saveLeaflet="saveLeaflet"
      ></pic-draw>
    </div> -->
  </div>
</template>

<script>
import picDraw from '@/views/leaflet/index'
export default {
  components: {
    picDraw
  },
  data() {
    return {
      temp: [0, 1],
      Background: require('./img/2.jpg'),
      areaList: {
        kt: '摄像头',
        yt: '报警器',
        ws: '探测器',
        wsj: '周界',
        lt: '门禁',
        rhm: '防盗门',
        sk: '安检',
        zl: '通道'
      },
      // 已有的图层标记
      existPoint: [
        {
          type: 'circle',
          area: '防盗门',
          area_id: 'rhm',
          lat: -582,
          lng: 509.5,
          radius: 6533009.3132760655,
        },
        {
          type: 'marker',
          area: '主卧',
          lat: -209,
          lng: 585,
        },
        {
          type: 'rectangle',
          area: '门禁',
          area_id: 'lt',
          latlngs: [
            {
              lat: -244,
              lng: 409,
            },
            {
              lat: -175,
              lng: 409,
            },
            {
              lat: -175,
              lng: 509,
            },
            {
              lat: -244,
              lng: 509,
            },
          ],
        },
        {
          type: 'polygon',
          area: '安检',
          area_id: 'sk',
          latlngs: [
            {
              lat: -276,
              lng: 438,
            },
            {
              lat: -469,
              lng: 410,
            },
            {
              lat: -469,
              lng: 479,
            },
            {
              lat: -324,
              lng: 476,
            },
          ],
        },
      ]
    }
  },
  mounted() {
    this.$nextTick(_ => {
      console.log('ref', this.$refs['image-map'][0])
      console.log('ref1', this.$refs['image-map'][1])
      // this.$refs['image-map'][0].setup()
      // this.$refs['image-map'][1].setup()
      if (this.temp.length) {
        this.temp.forEach((ref, i) => {
          console.log('ref', this.$refs['image-map'][i])
          // this.$refs['image-map' + i][0].setup()
          this.$refs['image-map'][i].setup()
        })
      } else {
        this.$refs['image-map'].setup()
      }
    })
  },
  methods: {
    updateBg(bg) {
      this.Background = bg
    },
    saveLeaflet(data) {
      console.log('save', data)
    }
  }
}
</script>
