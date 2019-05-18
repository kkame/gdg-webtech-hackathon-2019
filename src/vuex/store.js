import Vue from 'vue'
import Vuex from 'vuex'
import Common from './Common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Common
  },
  strict: true
})
