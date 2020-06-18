/**
 * Created by Sprite on 2020/6/14.
 */


import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
} from '../../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutation-types.js'

const state = {
  latitude: 40.10038, //纬度
  longitude: 116.36867, //经度
  address: {}, //当前地址信息对象
  categorys: [], //食品分类对象
  shops: [], //商家列表
}
const mutations = {
  [RECEIVE_ADDRESS](state,address) {
    // console.log('执行了啊?')
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,shops) {
    state.shops = shops
  },
}
const actions = {
  async getAddress ({commit,state}) {
    const {longitude,latitude} = state
    const result = await reqAddress(longitude,latitude)

    if(result.code === 0){
      commit(RECEIVE_ADDRESS, result.data)
    }
  },

  async getCategorys ({commit}) {
    const result = await reqFoodCategorys()

    if(result.code === 0){
      commit(RECEIVE_CATEGORYS, result.data)
    }
  },

  async getShops ({commit,state}) {
    const {longitude,latitude} = state
    const result = await reqShops({longitude,latitude})

    if(result.code === 0){
      commit(RECEIVE_SHOPS, result.data)
    }
  },
}
const getters = {

}


export default {
  state,
  mutations,
  actions,
  getters
}
