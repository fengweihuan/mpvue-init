<template>
  <div class="xt-select">
    <van-cell :title="title" :is-link="!readonly" @click="clickHandle">
      <div class="value_wrap" v-if="multiple">
        <template  v-for="(list, index) in selectLabel">
          <div class="value_list van-hairline--surround"
            :key="list.value"
            v-if="index === 0 || !collapseTags"
          >{{ list.label }}<van-icon name="clear" @click.stop="deleteHandle(list)" /></div>
        </template>
        <div class="value_list van-hairline--surround" v-if="collapseTags && selectLabel.length > 1">{{ '+ ' + (selectLabel.length - 1) }}</div>
      </div>
      <div class="value_wrap" v-else>{{ selectLabel }}</div>
    </van-cell>
    <van-popup
      :show="showPopup"
      custom-style="height: 40%"
      position="bottom"
      closeable
      round
      @close="showPopup = false"
    >
      <div class="popup_main">
        <div class="title">{{ title }}</div>
        <div class="popup_content">
          <div class="empty_text" v-if="options.length === 0">暂无数据!</div>
          <div class="popop_list"
            v-for="list in options"
            :key="list.value"
            :class="list.select ? 'active' : ''"
            @click="ckeckHandle(list)"
          >{{ list.label }}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'xt-select',
  data () {
    return {
      showPopup: false
    }
  },
  computed: {
    selectLabel () {
      if (this.multiple) {
        let arr = this.options.filter(item => this.value.includes(item.value))
        return arr
      } else {
        if (this.value) {
          let row = this.options.find(item => item.value === this.value)
          return row.label
        } else {
          return ''
        }
      }
    }
  },
  props: {
    value: {
      type: [String, Array],
      required: true
    },
    title: {
      type: String,
      default: '请选择'
    },
    options: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteHandle (list) {
      let newValue = this.value.filter(item => item !== list.value)
      this.value = newValue
    },
    ckeckHandle (list) {
      let newValue
      if (this.multiple) {
        list.select = !list.select
        if (this.value.includes(list.value)) {
          newValue = this.value.filter(item => item !== list.value)
        } else {
          newValue = [...this.value, list.value]
        }
      } else {
        this.options.map(item => {
          if (item.value === list.value) {
            item.select = !item.select
          } else {
            item.select = false
          }
        })
        newValue = this.value === list.value ? '' : list.value
        this.showPopup = false
      }
      this.value = newValue
    },
    clickHandle () {
      if (!this.readonly) {
        this.showPopup = true
      }
    },
    async confirmHandle () {
      let selectArr = this.relatedArr.filter(list => list.select)
      if (selectArr.length === 0) {
        this.$toast('请至少选中一项')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.xt-select{
  .value_wrap{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    text-align: right;
    .value_list{
      display: flex;
      align-items: center;
      padding: 0px 4px;
      background-color: #f4f4f5;
      border-radius: 4px;
      margin-left: 4px;
      white-space: nowrap;
      .van-icon{
        margin-left: 4px;
      }
    }
  }
}
.popup_main{
  height: 100%;
  position: relative;
  .title{
    padding: 15px;
    font-size: 18px;
    color: #333333;
  }
  .popup_content{
    display: flex;
    flex-wrap: wrap;
    min-height: 100px;
  }
  ::v-deep .van-field__input--textarea{
    color: #666;
  }
  ::v-deep .van-uploader__upload{
    background-color: #fff;
  }
  .popop_list{
    font-size: 13px;
    border-radius: 4px;
    background-color: #F8F8F8;
    margin: 10px 10px 0 10px;
    display: inline-block;
    height: 30px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: center;
    color: #727272;
    &.active{
      background-color: #006EE9;
      color: #fff;
    }
  }
  .reply_conten{
    margin: 10px;
    background-color: #F5F5F5;
    border-radius: 4px;
  }
  .tips{
    margin-left: 15px;
    font-size: 12px;
    color: #888888;
  }
}
</style>
