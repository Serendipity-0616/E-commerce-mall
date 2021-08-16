import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast'
import LazyLoad from 'vue-lazyload'

import FastClick from 'fastclick'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(Toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

Vue.use(LazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
