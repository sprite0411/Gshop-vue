/**
 * Created by Sprite on 2020/6/8.
 */

import Vue from 'vue'
import Vuex from 'vuex'

// import state from './state.js'
// import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

import msite from './modules/msite.js'
import shop from './modules/shop.js'
import user from './modules/user.js'


Vue.use(Vuex)

export default new Vuex.Store({
  // state,
  // mutations,
  actions,
  getters,
  modules: {
    msite,
    shop,
    user
  }
})
