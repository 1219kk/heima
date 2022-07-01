import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/index.less'
// 一次性把filters/index,js中所有的按需导出全部导出来
// 作为obj的属性
import * as obj from '@/filters'
import MyIcon from '@/components/MyIcon.vue'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.component('MyIcon', MyIcon)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 给页面上所有的元素绑定滚动事件
//  只要谁滚动 就打印出来
// const list = document.querySelectorAll('*')
// list.forEach(item => {
//   item.onscroll = function (e) {
//     console.log(e.target)
//   }
// })
