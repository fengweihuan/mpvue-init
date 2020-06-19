<template>
  <div class="statistics">
    <div class="count_wrap card">
      <div class="header">
        <div><span class="ban"></span> 产能统计</div>
        <view style="font-size:14px;" >
          <span class="list" @click="popOnClick" style="margin-left:30px;">{{timeChose + '年'}}<van-icon class="search_icon" :name="showAction ? 'arrow-up' : 'arrow-down'" /></span>
        </view>
      </div>
      <div class="count_item" style="width:100%">
        <chart :option="option" canvasId="myCanvas" ref="myCanvas" height="300px" />
      </div>
    </div>
    <van-action-sheet
      :show="showAction"
      :actions="timeList"
      @close="cancelHandle"
      @select="onSelect"
    />
  </div>
</template>

<script>
import chart from '@/components/chart'
export default {
  name: 'statistics',
  components: {
    chart
  },
  data () {
    return {
      timeChose: 2020,
      timeList: [
        { name: 2020 },
        { name: 2019 },
        { name: 2018 },
        { name: 2017 }
      ],
      option: {
        title: {
          show: true,
          text: '单位：片',
          textStyle: {
            fontSize: '12',
            color: '#565656'
          }
        },
        color: [ '#0077FF', '#FF8800', '#6FC843' ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['图纸数量', '理论消耗', '实际消耗'],
          right: '4%',
          top: '6%'
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '图纸数量',
            type: 'line',
            data: [0, 15, 35, 22, 58, 97, 124, 156, 226, 289, 205, 235]
          },
          {
            name: '理论消耗',
            type: 'line',
            data: [14, 25, 20, 40, 55, 46, 77, 120, 68, 225, 256, 205]
          },
          {
            name: '实际消耗',
            type: 'line',
            data: [0, 32, 43, 59, 72, 99, 102, 89, 156, 190, 250, 240]
          }
        ]
      },
      showAction: false
    }
  },
  methods: {
    onSelect (event) {
      this.timeChose = event.mp.detail.name
      this.getData()
      this.showAction = false
      this.$refs.myCanvas.show()
    },
    cancelHandle () {
      this.showAction = false
      this.$refs.myCanvas.show()
    },
    async popOnClick () {
      await this.$refs.myCanvas.hide()
      this.showAction = true
    },
    getData () {
      console.log('获取数据!')
    }
  }
}
</script>

<style scoped lang="scss">
.statistics{
  padding: 0;
  .count_wrap{
    margin-top: 10px;
    .header{
      padding: 8px 10px;
      font-size: 16px;
      display: flex;
      align-items: center;
      font-weight: bold;
      justify-content: space-between;
      padding-bottom: 10px;
      .ban{
        display: inline-block;
        width: 4px;
        height: 17px;
        background-color: #FFB300;
        margin-right: 8px;
      }
    }
    .tips{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      font-size: 12px;
      height: 38px;
      .unit{
        color: #565656;
      }
      .list{
        display: flex;
        align-items: center;
        .ban{
          display: inline-block;
          width: 18px;
          height: 8px;
          border-radius: 6px;
          margin-right: 8px;
        }
      }
    }
  }
  .main:after,.count_item{
    content: "";
    flex: auto;
  }
}
</style>
