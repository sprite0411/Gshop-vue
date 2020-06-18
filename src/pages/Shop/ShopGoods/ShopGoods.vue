<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li class="menu-item" v-for="(good, index) in goods"
              :key="index" :class="{current: index === currentIndex}" @click="clickLeftItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-show="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>

            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="foodShow"></Food>
  </div>

</template>
<script>
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    import Food from '../../../components/Food/Food.vue'
    import ShopCart from '../../../components/ShopCart/ShopCart.vue'
    export default {
        mounted() {
            this.$store.dispatch('getGoods',() => {
                this.$nextTick(() => {
                  this._initBScroll()
                  this._initTops()
                })
            })

        // 一个 store.dispatch 在不同模块中可以触发多个 action 函数。
        // 在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

        },

        data () {
            return {
                scrollY: 0, //右侧纵向滚动，滚动过程中重新赋值，需要绑定监听
                tops: [], //右侧一级分类li的高度的累加的数组，列表第一次显示后统计
                food: {}, //用在FoodShow中显示的对象
            }
        },

        computed: {
          ...mapState({
            goods: state => state.shop.goods
          }),
          //当前分类的下标
          currentIndex() {
              const {scrollY, tops} = this
//              scrollY {top, nextTop) top对应的index即为currentIndex

              //得到当前新的下标位置
              const index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1])

            //判断index的值发生了变化,并且leftBScroll有值
            if(this.index != index && this.leftBScroll){
                //保存index到this组件对象，用于比较
                this.index = index
                //得到index对应的分类项li
                const li = this.$refs.leftUl.children[index]
                //滑动右侧列表到指定元素处
                this.leftBScroll.scrollToElement(li,500)
            }
              return index
          }
        },

        methods: {
            _initBScroll() {
              this.leftBScroll =  new BScroll('.menu-wrapper', {})
              this.rightBScroll = new BScroll('.foods-wrapper', {
                probeType: 1
              })

              this.rightBScroll.on('scroll',({x,y})=> {
//                  console.log('scroll', event.x, event.y)
                  this.scrollY = Math.abs(y)

              })
              this.rightBScroll.on('scrollEnd',({x,y}) => {
//                  console.log('scrollEnd', event.x, event.y)
                  this.scrollY = Math.abs(y)

              })
            },

            _initTops () {
                const tops = []
                let top = 0
                tops.push(top)
                const lis = this.$refs.rightUl.children
                Array.prototype.slice.call(lis).forEach(li => {
                    top += li.clientHeight
                    tops.push(top)
                })
              this.tops = tops
//              console.log('tops',tops)
            },

            clickLeftItem(index) {
                //得到目标位置对应的top
                const top = this.tops[index]

                //立即更新scrollY为最终位置的坐标
                this.scrollY = top

                this.rightBScroll.scrollTo(0, -top, 500)
            },

            //显示指定food
            showFood(food) {
                //1.更新food状态
                this.food = food
                //2.显示foodShow组件界面
                this.$refs.foodShow.toggleShow()
            }
        },

        components:{
          ShopCart,
          Food
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


