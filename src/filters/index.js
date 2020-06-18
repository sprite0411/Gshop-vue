
import Vue from 'vue'
import moment from 'moment'

//日期格式化过滤器
Vue.filter('date-format',function(value,fromatStr) {
  return moment(value).format(fromatStr || 'YYYY-MM-DD HH:mm:ss')
})

