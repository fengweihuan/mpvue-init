<template>
  <div class="chart_wrap" :style="{ width, height }">
    <view class="chart_list" v-show="showCanvas" style="width: 100%;height: 100%">
      <mpvue-echarts ref="echarts"  :echarts="echarts" :onInit="onInit" :canvasId="canvasId" />
    </view>
    <view class="chart_list" v-show="!showCanvas" style="width: 100%;height: 100%">
      <image class='canvasImg' style="width: 100%;height: 100%" :src="canvasImg" mode="widthFix"></image>
    </view>
  </div>
</template>

<script>
import echarts from 'static/echarts.min'
import mpvueEcharts from 'mpvue-echarts'
export default {
  components: {
    mpvueEcharts
  },
  props: {
    canvasId: {
      type: String,
      default: 'demo-canvas'
    },
    option: {
      require: true,
      type: Object
    },
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data () {
    const vm = this
    return {
      echarts,
      onInit: vm.initChart,
      canvasImg: '',
      showCanvas: true
    }
  },
  watch: {
    option: {
      handler (value) {
        this.setChart()
      },
      deep: true
    }
  },
  mounted () {
    this.setChart()
  },
  methods: {
    show () {
      this.$nextTick(() => {
        this.showCanvas = true
      })
    },
    hide () {
      const vm = this
      return new Promise((resolve, reject) => {
        mpvue.canvasToTempFilePath({
          canvasId: vm.canvasId,
          success (res) {
            vm.canvasImg = res.tempFilePath
            vm.$nextTick(() => {
              vm.showCanvas = false
              vm.$nextTick(() => {
                resolve()
              })
            })
          },
          fail (err) {
            vm.showCanvas = false
            reject(err)
          }
        })
      })
    },
    setChart () {
      this.$refs.echarts.init()
    },
    initChart (canvas, width, height) {
      let chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      chart.setOption(this.option)
      return chart
    }
  }
}
</script>

<style lang="scss">
.chart_wrap {
  .chart_list{
    width: 100%;
    height: 100%;
  }
}
</style>
