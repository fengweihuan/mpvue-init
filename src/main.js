import Vue from 'vue'
import App from './App'
import request from './utils/request'
import store from './store'
import { tosat, dialog, loading } from './utils'
// Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.prototype.$store = store
Vue.prototype.$toast = tosat
Vue.prototype.$dialog = dialog
Vue.prototype.$loading = loading
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
