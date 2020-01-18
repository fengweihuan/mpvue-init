<template>
  <div class="list_wrap">
    <div class="header">
      <van-search
        :value="searchValue"
        shape="round"
        placeholder="请输入名称"
        use-action-slot
        :background="showFilter ? '#fff': '#4B53C2'"
        @change="onChange"
        @search="searchHandle"
      />
    </div>
    <div class="content">
      <div class="empty_text" v-if="dataList.length === 0">暂无数据!</div>
      <van-cell v-for="(item, index) in dataList" @click="checkDetail(item)"  is-link :key="index" :title="item.title" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue',
  data () {
    return {
      dataList: [],
      searchValue: '',
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  onShow () {
    this.page = 1
    this.dataList = []
    this.getData()
    this.getNotice()
  },
  onReachBottom () {
    if (this.dataList.length < this.total) {
      this.page += 1
      this.getData()
    } else {
      this.$toast('已经是最后一页了!')
    }
  },
  methods: {
    onChange (e) {
      this.searchValue = e.mp.detail
    },
    searchHandle () {
      this.page = 1
      this.dataList = []
      this.getData()
    },
    async getData () {
      this.$loading()
      this.dataList = [
        { title: '数据1', id: 1 },
        { title: '数据2', id: 2 },
        { title: '数据3', id: 3 },
        { title: '数据4', id: 4 }
      ]
      await this.$http.get('http://baidu.com')
    },
    checkDetail (row) {
      mpvue.navigateTo({
        url: `/pages/listDetail/main?id=${row.id}`
      })
    },
    getNotice () {
      mpvue.setTabBarBadge({
        index: 2,
        text: '99'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.list_wrap{
  padding-top: 54px;
  .header{
    background-color: #4B53C2;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 120;
    width: 100%;
    color: #fff;
  }
}
</style>
