import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import list from './modules/list'
import join from './modules/join'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    common,
    list,
    join
  }
})
