<template>
  <div class="index_main">
    <div class="page_header"></div>
    <div class="main_wrap card">
      <div class="header">
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
    <van-button type="primary" size="small" @click="clickHandle">前往分包页面</van-button>
    <van-button type="primary" size="small" @click="clickHandle">前往分包页面</van-button>
    <van-cell title="选择时间" is-link :value="time" @click="$refs.dataPicker.show(time)"></van-cell>
    <data-picker
      ref="dataPicker"
      type="year-month"
      @cancel="time = ''"
      :min-date="minDate"
      @confirm="confirmHandle"
    ></data-picker>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dataPicker from '@/components/data-pick'
import dayjs from 'dayjs'
export default {
  components: {
    dataPicker
  },
  computed: {
    ...mapGetters(['userinfo', 'token'])
  },
  data () {
    return {
      num1: 0,
      num2: 0,
      num3: 0,
      time: '',
      minDate: dayjs().valueOf()
    }
  },
  onShow () {
    this.getData()
    this.getNotice()
  },
  methods: {
    confirmHandle (value) {
      this.time = value
    },
    clickHandle () {
      mpvue.navigateTo({
        url: '/pages/statistics/main'
      })
    },
    getData () {
      console.log('获取数据!')
    },
    getNotice () {
      mpvue.setTabBarBadge({
        index: 2,
        text: '23'
      })
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
  .search_icon{
    position: relative;
    top: 2px;
    margin-left: 4px;
  }
}
</style>
