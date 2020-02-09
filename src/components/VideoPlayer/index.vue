<template>
  <video-player
    class="video-player-box"
    :ref="'videoPlayer'"
    :options="playerOptions"
    :playsinline="true"
  ></video-player>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
// 支持的视频格式 mpeg4（推荐）， webm（少），  ogg(少)
export default {
  components: {
    videoPlayer
  },
  props: {
    source: Array,
    poster: {
      type: String
    },
    width: {
      type: String,
      default: '818'
    },
    height: {
      type: String,
      default: '433'
    }
  },
  data () {
    return {
      playerOptions: {
        height: this.height || '433',
        width: this.width || '818',
        autoplay: false,
        controls: true,
        muted: true,
        loop: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          // {
          //   type: 'video/mp4',
          //   src:
          //     'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          // },
          // {
          //   type: 'video/mp4',
          //   src: 'http://vjs.zencdn.net/v/oceans.mp4'
          // }
        ],
        poster:
          'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg'
      }
    }
  },
  mounted () {
    this.$nextTick(_ => {
      if (this.player) {
        this.playerOptions.sources = this.source
      }
    })
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style lang="scss" scoped>
.video-player-box {
  width: 100%;
  /deep/ .video-js .vjs-big-play-button {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
