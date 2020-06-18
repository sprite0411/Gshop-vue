/**
 * Created by Sprite on 2020/6/8.
 */


import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'


Vue.use(VueRouter)


export default new VueRouter ({
  mode: 'history',
  routes
})
