<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    // let token
    // if (mpvuePlatform === 'my') {
    //   token = mpvue.getStorageSync({key: 'token'}).data || ''
    // } else {
    //   token = mpvue.getStorageSync('token') || ''
    // }
    // if (!token) {
    //   mpvue.reLaunch({
    //     url: 'pages/login/main'
    //   })
    // }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
@import './style/iconfont/iconfont.css';
@import "../static/vant/common/index.wxss";
page{
  height: 100%;
  background-color: #EBEBEB;
  font-size: 14px;
  color: #333333;
}
canvas {
  z-index: 1;
}
van-button + van-button{
  margin-left: 10px;
}
.van-cell {
  align-items: center;
}
.empty_text{
  background-color: #EBEBEB;
  color: #999;
  font-size: 15px;
  text-align: center;
  position: relative;
  top: 30px;
}
.van-tabs--card .van-tabs__wrap{
  border-radius: 20px;
  overflow: hidden;
}
.van-tabs__scroll--card{
  border: none !important;
}
.van-tabs__nav--card .van-tab{
  color: #666666 !important;
}
.van-tabs__nav--card .van-tab.van-tab--active{
  color: #fff !important;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
.empty{
  margin: 20px auto;
  text-align: center;
  color: #999;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
