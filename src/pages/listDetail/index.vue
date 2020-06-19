<template>
  <div class="listDetail">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      fixed
      @clickLeft="backHandle"
    />
    <div class="wrap">自定义navBar</div>
    <xt-select
      ref="select1"
      title="多项选择"
      :options="options"
      multiple
      collapse-tags
      :value="selectValue"
    ></xt-select>
  </div>
</template>

<script>
import xtSelect from '@/components/xt-select'
export default {
  name: 'listDetail',
  components: {
    xtSelect
  },
  data () {
    return {
      id: '',
      selectValue: '',
      options: [
        { label: '选项一', value: '111', select: false },
        { label: '选项二', value: '222', select: false },
        { label: '选项三', value: '333', select: false },
        { label: '选项四', value: '444', select: false }
      ]
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
  padding-top: 70px;
}
</style>
