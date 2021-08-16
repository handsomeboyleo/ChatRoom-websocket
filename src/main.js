import Vue from 'vue'
import App from './App.vue'
import HUI from 'hui'
import router from './router'
import store from './store'
import 'hui/lib/hui.css'

Vue.use(HUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
