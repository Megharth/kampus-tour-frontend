import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HotelRegistration from './views/hotel/register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hotel/register',
      name: 'hotel-register',
      component: HotelRegistration
    }
  ]
})
