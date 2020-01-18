import store from '../store'
var Fly = require('flyio/dist/npm/wx')
let fly = new Fly()
// 设置超时
fly.config.timeout = 10000
fly.config.baseURL = 'http://dev.t/serv/'
// fly.config.baseURL = 'https://xxxxx.com/serv/'
// 添加请求拦截器
fly.interceptors.request.use(
  config => {
    // 给所有请求添加自定义header
    const token = mpvue.getStorageSync('token')
    if (token) {
      config.headers['X-Token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// response 拦截器
fly.interceptors.response.use(
  response => {
    // 给所有请求添加自定义header
    const res = response.data
    if (res.code !== 0) {
      mpvue.hideLoading()
      mpvue.showToast({
        title: res.msg || '未知错误!',
        icon: 'none',
        duration: 2000
      })

      //  -100:Token 过期了;
      if (res.code === '-100') {
        mpvue.showModal({
          title: '登录已失效',
          content: '确定登出',
          success (res) {
            if (res.confirm) {
              console.log('重新登录')
              store.dispatch('LogOut').then(() => {
                mpvue.reLaunch({
                  url: '/pages/login/main'
                })
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    mpvue.hideLoading()
    mpvue.showToast({
      title: error.msg || '未知错误!',
      icon: 'none',
      duration: 2000
    })
    return Promise.reject(error)
  }
)
export default fly
