<template>
  <div class="info_wrap">
    <van-cell title="头像">
      <image
        style="width:35px;height:35px;border-radius:4px"
        src="/static/images/avatar.png"
      />
    </van-cell>
    <van-cell title="用户名称" :value="userinfo.username"></van-cell>
    <van-cell title="年龄" :value="userinfo.age"></van-cell>
    <van-cell title="邮箱" :value="userinfo.email"></van-cell>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'info',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['userinfo'])
  }
}
</script>

<style scoped lang="scss">
.info_wrap{
  padding: 0
}
</style>
