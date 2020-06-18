/**
 * Created by Sprite on 2020/6/8.
 */

/*import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'*/

//路由懒加载 减少首屏需要加载的js
//使用import函数：被引入的模块会单独打包，生成一个单独的打包文件
//配置的conponent是返回import()得到的模块的函数，只有当请求对应的path，才会执行函数从后台获取对应的包

const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Order = () => import('../pages/Order/Order.vue')



import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

export default [
  {
    path: '',
    redirect: '/msite'
  },
  {
    path: '/msite',
    component: Msite,
    meta: {
      showFooter: true
    }

  },
  {
    path: '/search',
    component: Search
    ,    meta: {
    showFooter: true
  }

  },
  {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    }

  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/shopgoods',
        component: ShopGoods,
      },
      {
        path: '/shop/shopratings',
        component: ShopRatings,
      },
      {
        path: '/shop/shopinfo',
        component: ShopInfo,
      },
      {
        path: '',
        component: ShopGoods,
      },
    ]
  },
]
