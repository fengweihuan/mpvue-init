<template>
  <div class="enter_wrap">
    <div class="header" @click="clickHandle">
      <image class='background' src="../../static/images/avatar.png" mode="widthFix"></image>
      <div class="user">
        <span class="username">{{ userinfo.username }}</span>
        <span class="title">{{ userinfo.age }}</span>
      </div>
      <van-icon name="arrow" color="#929292" size="18px" />
    </div>
    <van-cell title="列表" is-link  />
    <van-cell title="列表" is-link  />
    <van-cell title="列表" is-link  />
    <!-- <div class="item toggle">切换账号</div> -->
    <div class="item  toggle" @click="logout">退出登录</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  methods: {
    ...mapActions(['LogOut']),
    clickHandle () {
      mpvue.navigateTo({
        url: '/pages/info/main'
      })
    },
    async logout () {
      await this.$dialog.confirm('确认要退出登录?')
      await this.LogOut()
      mpvue.reLaunch({
        url: '/pages/login/main'
      })
    }
  }
}
</script>

<style lang="scss">
page{
  background-color: #EBEBEB;
}
.enter_wrap{
  .header{
    background-color: #fff;
    padding: 15px 10px;
    display: flex;
    margin-bottom: 6px;
    align-items: center;
  }
  .background{
    width: 60px;
    height: 60px;
    border-radius: 6px;
    margin-right: 20px;
  }
  .user{
    display: flex;
    flex: 1;
    flex-direction: column;
    .username{
      font-weight: bold;
      margin-top: 6px;
      font-size: 15px;
    }
    .title{
      font-size: 13px;
      margin-top: 10px;
    }
  }
  .item{
    background-color: #fff;
    padding: 10px;
    text-align: center;
    &.toggle{
      margin: 6px 0 10px;
    }
  }
  .info_wrap{
    position: relative;
    .active{
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #DE0606;
      right: -10px;
      top: 0;
      z-index: 6;
    }
  }
}

</style>
