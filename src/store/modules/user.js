// import request from '@/utils/request'
const user = {
  state: {
    token: mpvue.getStorageSync('token'),
    userinfo: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USEINFO: (state, userinfo) => {
      state.userinfo = userinfo
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const token = 'test Token'
        mpvue.setStorageSync('token', token)
        commit('SET_TOKEN', token)
        resolve()
        // request.post('user/Login/in', {
        //   username: username,
        //   password: userInfo.password
        // }).then(response => {
        //   const data = response.result
        //   mpvue.setStorageSync('token', data.access_token)
        //   commit('SET_TOKEN', data.access_token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        const userinfo = {
          username: 'test用户',
          age: 24,
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          email: '1004743308@qq.com'
        }
        commit('SET_USEINFO', userinfo)
        resolve(userinfo)
        // request.get('user/Info/me').then(async response => {
        //   const data = response.result
        //   commit('SET_USEINFO', data)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        mpvue.removeStorageSync('token')
        resolve()
      })
    }
  }
}
export default user
