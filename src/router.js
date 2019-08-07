import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HotelRegistration from './views/hotel/register'
import AgentRegistration from './views/agent/register'
import GroupRegistration from './views/group/register'

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
    },
    {
      path: '/agent/register',
      name: 'agent-register',
      component: AgentRegistration
    },
    {
      path: '/group/register',
      name: 'group-register',
      component: GroupRegistration
    }
  ]
})
