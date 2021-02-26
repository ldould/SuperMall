import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//FastClick减少点击延迟
//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
