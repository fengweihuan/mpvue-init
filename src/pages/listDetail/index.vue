<template>
  <div class="listDetail">
    <nav-bar ext-class="nav_bar" backgroundColorTop="#EBEBEB" iconTheme="white" back home title="详情" background="#4B53C2" color="#ffffff" @back="backHandle" @home="homeHandle"></nav-bar>
    <div class="wrap">自定义navBar</div>
  </div>
</template>

<script>
export default {
  name: 'listDetail',
  data () {
    return {
      id: ''
    }
  },
  onLoad (options) {
    this.$toast('参数id为' + options.id)
    this.id = options.id
  },
  onShow () {
    this.getData()
  },
  methods: {
    backHandle () {
      mpvue.navigateBack()
    },
    homeHandle () {
      mpvue.reLaunch({
        url: '/pages/index/main'
      })
    },
    getData () {}
  }
}
</script>

<style lang="scss" scoped>
.listDetail{
  padding: 0;
}
</style>
