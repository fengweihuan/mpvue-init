<template>
  <div class="login">
    <image class='background' src="../../static/images/logo.png" mode="widthFix"></image>
    <div class="title">易浇筑</div>
    <div class="login_main">
      <van-field
        :value="username"
        custom-style="color: #fff;background:#4B53C2;"
        placeholder-style="color:#dfdfdf"
        input-class="login_input"
        clearable
        @input="inputHandle('errorname', 'username', arguments)"
        :error="errorname"
        left-icon="manager"
        placeholder="请输入用户名"
      />
      <span>&nbsp;</span>
      <van-field
        :value="password"
        type="text"
        :password="!showPass"
        custom-style="color: #fff;background:#4B53C2;"
        placeholder-style="color:#dfdfdf"
        input-class="login_input"
        @input="inputHandle('errorpassword', 'password',  arguments)"
        :error="errorpassword"
        left-icon="lock"
        icon="ss"
        placeholder="请输入密码"
        clearable
      />
        <van-icon class="right_icon" slot="right-icon" @click="clickIcon" :name="showPass ? 'closed-eye' : 'eye-o'" />
      <van-button class="login_button" open-type="getUserInfo" @getuserinfo="getuserinfo" round loading-text="正在登录" :loading="loading" block  @click="submitHandle">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '测试用户',
      password: 'Xata2019.',
      // username: '',
      // password: '',
      showPass: false,
      loading: false,
      errorname: false,
      errorpassword: false
    }
  },
  methods: {
    getuserinfo (e) {
      console.log(e)
    },
    submitHandle () {
      if (this.username.length === 0) {
        this.errorname = true
        return false
      }
      if (this.password.length === 0) {
        this.errorpassword = true
        return false
      }
      this.loading = true
      this.$store.dispatch('Login', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.$store.dispatch('GetInfo').then(() => {
          this.loading = false
          mpvue.reLaunch({
            url: '/pages/index/main'
          })
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.loading = false
      })
    },
    inputHandle (code, props, arg) {
      this[props] = arg[0].mp.detail
      this[code] = arg[0].mp.detail.length === 0
    },
    clickIcon () {
      this.showPass = !this.showPass
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style>
page{
  background-color: #4B53C2; 
}
.login{
  text-align: center;
  padding-top: 10vh;
}
.login_input{
  color: #fff !important;
  padding-left: 15px!important;
}
.background{
  width: 88px;
}
.title{
  margin-top: 10px;
  margin-bottom: 100rpx;
  font-size: 26px;
  color: #fff;
}
.login_main{
  width: 331px;
  margin-left: 22px;
  position: relative;
}
.right_icon{
  position: absolute;
  color: #fff;
  font-size: 20px ;
  right: 0px;
  bottom: 50px;
}
.login_button{
  position: relative;
  top: 20px;
}
.login_button .van-button {
  color: #4B53C2;
  font-size: 16px;
}
</style>
