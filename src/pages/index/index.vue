<template>
  <div class="index_main">
    <div class="page_header"></div>
    <div class="main_wrap card">
      <div class="header" @click="clickHandle">
        <span class="title">累计消耗</span>
        <van-icon name="arrow" /> 
      </div>
      <div class="main">
        <div class="item">
          <span class="value">{{ num1 }}</span>
          <span class="name">实际消耗总计(方)</span>
        </div>
        <div class="item">
          <span class="value">{{ num2 }}</span>
          <span class="name">理论消耗总计(方)</span>
        </div>
        <div class="item">
          <span class="value">{{ num3 }}</span>
          <span class="name">图纸数量总计(方)</span>
        </div>
      </div>
    </div>
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
import { mapGetters } from 'vuex'
import chart from '@/components/chart'
export default {
  computed: {
    ...mapGetters(['userinfo', 'token'])
  },
  components: {
    chart
  },
  data () {
    return {
      num1: 0,
      num2: 0,
      num3: 0,
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
  onShow () {
    this.getData()
    this.getNotice()
  },
  methods: {
    clickHandle () {
      // mpvue.navigateTo({
      //   url: '/pages/indexDetail/main'
      // })
    },
    getData () {
      console.log('获取数据!')
    },
    getNotice () {
      mpvue.setTabBarBadge({
        index: 2,
        text: '23'
      })
    },
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
    }
  }
}
</script>

<style lang="scss">
.toolbar{
  font-size: 14px !important;
}
.page_header{
  background-color: #4B53C2;
  height: 90px;
}
.wx-swiper-dots{
  position: relative;
  top: 70%;
}
.card{
  border-radius: 8px;
  width: 355px;
  margin-left: 10px;
  background-color: #fff;
}
.index_main{
  padding-bottom: 15px;
  .main_wrap{
    position: relative;
    margin-top: -75px;
    height: 130px;
    color: #fff;
    background:linear-gradient(225deg,rgba(69,187,248,1) 0%,rgba(139,26,238,1) 100%);
    box-shadow:0px 0px 10px rgba(0,0,0,0.16);
    .header{
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      padding: 0 10px;
    }
  }
  .main{
    display: flex;
    flex-wrap: nowrap;
    padding: 0 10px;
    align-items: center;
    .item{
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      align-items: center;
      .value{
        font-size: 18px;
      }
      .name{
        font-size: 12px;
        margin-top: 6px;
        white-space: nowrap;
      }
    }
    .item:first-child{
      color: #FFEE00;
      margin-right: 18px;
      .value{
        font-size: 24px;
      }
    }
  }
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
  .search_icon{
    position: relative;
    top: 2px;
    margin-left: 4px;
  }
}
</style>
