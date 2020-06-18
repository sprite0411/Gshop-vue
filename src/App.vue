<template>
    <div>
      <router-view></router-view>
      <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
</template>
<script>
//  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
//  import {reqAddress} from './api'

    export default {

      mounted() {
          this.$store.dispatch('getAddress')

          this.$store.dispatch('getUser')

      },

//      components: {
//          FooterGuide,
//      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
