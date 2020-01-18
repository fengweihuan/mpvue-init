import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => mpvue.getStorageSync(key),
        setItem: (key, value) => mpvue.setStorageSync(key, value),
        removeItem: key => () => {}
      }
    })
  ]
})

export default store
