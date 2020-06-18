/**
 * Created by Sprite on 2020/6/14.
 */

import {
  reqUser,
  reqLogout,
} from '../../api'

import {
  RECEIVE_USER,
  RESET_USER,
} from '../mutation-types.js'

const state = {
  user: {}, //用户信息对象
}
const mutations = {
  [RECEIVE_USER](state,user) {
    state.user = user
  },
  [RESET_USER](state) {
    state.user = {}
  },
}
const actions = {
  //同步保存用户的action
  saveUser({commit}, user) {
    commit(RECEIVE_USER,user)
  },

  async getUser({commit}) {
    const result = await reqUser()
    if(result.code === 0){
      const user = result.data
      commit(RECEIVE_USER,user)
    }
  },

  async logout({commit}) {
    const result = await reqLogout()
    if(result.code === 0){
      commit(RESET_USER)
    }
  },


}
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters
}
