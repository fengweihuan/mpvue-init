<template >
  <van-popup class="data-picker" :show="showPopup" position="bottom" @close="showPopup = false">
    <van-datetime-picker 
      :value="currentDate"
      :type="type"
      :min-date="minDate"
      :max-date="maxDate"
      cancel-button-text="清除"
      @confirm="confirmHandle"
      @cancel="cancelHandle"
    >
    </van-datetime-picker>
  </van-popup>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'data-picker',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    minDate: {
      type: Number,
      default: dayjs().subtract(10, 'year').valueOf()
    },
    maxDate: {
      type: Number,
      default: dayjs().add(10, 'year').valueOf()
    }
  },
  data () {
    return {
      showPopup: false,
      currentDate: ''
    }
  },
  methods: {
    show (value) {
      let current = value || new Date()
      if (this.type === 'time') {
        this.currentDate = value || dayjs().format('HH:mm')
      } else {
        this.currentDate = dayjs(current).toDate()
      }
      this.showPopup = true
    },
    confirmHandle (e) {
      let value = e.mp.detail
      let formatValue
      if (this.type === 'time') {
        formatValue = value
      } else if (this.type === 'date') {
        formatValue = dayjs(value).format('YYYY-MM-DD')
      } else if (this.type === 'datetime') {
        formatValue = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      } else if (this.type === 'year-month') {
        formatValue = dayjs(value).format('YYYY-MM')
      }
      this.$emit('confirm', formatValue)
      this.showPopup = false
    },
    cancelHandle () {
      this.showPopup = false
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="scss">
.data-picker{
  padding: 0
}
</style>
