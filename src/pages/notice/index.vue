<template>
  <div class="notice">
    <div class="empty" v-if="dataList.length === 0">暂无数据!</div>
    <div class="item" v-for="item in dataList" :key="item"  v-show="activeTab === 'all' || item.unread">
      <van-swipe-cell :disabled="!item.unread" :right-width="70">
        <div class="content" @click="clickHandle(item)">
          <div class="lists">
            <span class="msg">{{ item.msg }}</span>
            <span class="createTime">{{ item.createTime }}</span>
          </div>
          <span class="name">{{ item.name }}</span>
          <span class="read"  v-if="item.unread"></span>
          <van-icon name="arrow" size="26" />
        </div>
        <view slot="right" class="right_button" @click="signHandle(item)">标记已读</view>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice',
  data () {
    return {
      page: 1,
      pageSize: 15,
      total: 0,
      dataList: []
    }
  },
  onShow () {
    this.dataList = []
    this.getData()
    this.getNotice()
  },
  onReachBottom () {
    if (this.dataList.length < this.total) {
      this.getData()
    } else {
      mpvue.showToast({
        title: '已经是最后一页了!',
        icon: 'none',
        duration: 1000
      })
    }
  },
  methods: {
    signHandle (item) {
      this.$http.get('pour/Yjz/msg_read_sign', { id: item.id })
      item.unread = false
    },
    async clickHandle (item) {
      let res = await this.$http.get('pour/Yjz/msg_read', { id: item.id })
      item.unread = false
      mpvue.navigateTo({
        url: `/pages/placingDetail/main?id=${res.result.data.id}`
      })
    },
    getNotice () {
      mpvue.removeTabBarBadge({
        index: 2
      })
    },
    async getData () {
      this.$loading()
      let params = {
        page: this.page,
        pageSize: this.pageSize
      }
      let res = await this.$http.get('http://dsffffsdfsd.com', params)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="scss">
.notice{
  .item{
    background-color: #fff;
    border-bottom: 1px solid #DFDFDF;
    position: relative;
    font-size: 13px;
    color: #6E6E6E;
    .content{
      padding: 10px 30px 10px 15px;
      position: relative;
    }
    .read{
      display: inline-block;
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #EB1919;
      left: 8px;
      top: 0px;
    }
    .lists{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .msg{
        color: #6E6E6E;
        font-size: 15px;
        font-weight: bold;
      }
    }
    .name{
      display: inline-block;
      margin-top: 6px;
    }
    .createTime{
      width: 80px;
      text-align: right;
    }
    ._van-icon{
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%)
    }
  }
  .right_button{
    background-color: #7D63D5;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #fff;
    width: 70px;
  }
}
</style>

