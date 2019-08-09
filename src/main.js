import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import './registerServiceWorker'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueResource)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
