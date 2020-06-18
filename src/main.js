/**
 * Created by Sprite on 2020/6/8.
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import Header from './components/Header/Header/Header.vue'
import store from './store'
import Star from  './components/Star/Star.vue'
import './mock/mockSever'
import CartControl from  './components/CartControl/CartControl.vue'
import Split from  './components/Split/Split.vue'
import './filters'
import VueLazyload from 'vue-lazyload'
import loading from './common/loading.c1486d8.gif'



Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('FooterGuide', FooterGuide)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)
Vue.use(VueLazyload, {
  loading,
})

new Vue ({

  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  store,
  router,
  FooterGuide,
  Star,
  CartControl,
  Split
})
