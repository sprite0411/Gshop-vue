/**
 * Created by Sprite on 2020/6/14.
 */
import Vue from 'vue'

import {
  reqGoods,
  reqInfo,
  reqRatings
} from '../../api'

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from '../mutation-types.js'

const state = {
  goods: [], //商品列表
  ratings: [], //商家评价列表
  info: {}, //商家信息
  cartFoods: [] //购物车中所有food的数组
}
const mutations = {
  [RECEIVE_GOODS](state,{goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS](state,{ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO](state,{info}) {
    state.info = info
  },
  [ADD_FOOD_COUNT](state,{food}) {
    if(food.count){
      food.count++
    }else { //food中没有count属性，第一次添加 此时没有数据绑定
      // food.count = 1 //给food添加一个新的属性 count：
      Vue.set(food, 'count', 1)
      //将food添加到购物车（cartFoods）
      state.cartFoods.push(food)
    }
  },
  [REDUCE_FOOD_COUNT](state,{food}) {
    if(food.count>0) {

      food.count--
      if(food.count === 0){
        //当food的数量减少为零时，将其从购物车中移除
        const index = state.cartFoods.indexOf(food)
        state.cartFoods.splice(index,1)
      }

    }

  },

  [CLEAR_CART](state) {
    //将购物车中所有food的count重置为0
    state.cartFoods.forEach(cartFood => cartFood.count = 0)
    //重置购物车数组
    state.cartFoods = []
  }

}
const actions = {
  async getGoods({commit}, callback) {
    const result = await reqGoods()
    if(result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      typeof callback === 'function' && callback()
    }
  },

  async getRatings({commit}, callback) {
    const result = await reqRatings()
    if(result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      typeof callback === 'function' && callback()
    }
  },

  async getInfo({commit}) {
    const result = await reqInfo()
    if(result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO,{info}) //跟mutations中一致，包装成对象
    }
  },

  //更新指定的某种食物的数量
  updateFoodCount({commit},{isAdd,food}) {
    if(isAdd){
      commit(ADD_FOOD_COUNT,{food})
    }else {
      commit(REDUCE_FOOD_COUNT,{food})
    }
  },

  //清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  }

}
const getters = {
  //返回包含所有count>0的food的数组
  /*cartFoods(state) {
    const arr = []

    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if(food.count > 0) {
          arr.push(food)
        }
      })
    })

    return arr
  }*/
  //总数
  totalCount (state) {
    return state.cartFoods.reduce((preTotal,cartfood) => preTotal + cartfood.count, 0)
  },

  //总价
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal,cartfood) => preTotal + cartfood.count * cartfood.price, 0)

  },
  //评价的总数量
  totalRatingCount(state) {
    return state.ratings.length
  },

  //推荐的评价总数量
  totalUpRatingCount(state) {
    return state.ratings.reduce((pre,rating) => pre + (rating.rateType === 0 ? 1 : 0),0)
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
