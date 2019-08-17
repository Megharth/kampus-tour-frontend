import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HotelRegistration from './views/hotel/register'
import AgentRegistration from './views/agent/register'
import GroupRegistration from './views/group/register'
import TGRegister from './views/travelGroup/register'
import AgentDashboard from './views/agent/dashboard'
import GroupDashboard from './views/group/dashboard'
import HotelDashboard from './views/hotel/dashboard'
import TGDashboard from './views/travelGroup/dashboard'
import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },

    //HOTEL ROUTES
    {
      path: '/hotel/register',
      name: 'hotel-register',
      component: HotelRegistration
    },
    {
      path: '/hotel/dashboard',
      name: 'hotel-dashboard',
      component: HotelDashboard,
      beforeEnter: (destination, source, next) => {
        if(!store.state.user)
          if(localStorage.getItem('user'))
            next()
          else
            next('/')
        else
          next()
      }
    },

    //AGENT ROUTES
    {
      path: '/agent/register',
      name: 'agent-register',
      component: AgentRegistration
    },
    {
      path: '/agent/dashboard',
      name: 'agent-dashboard',
      component: AgentDashboard,
      beforeEnter: (destination, source, next) => {
        if(!store.state.user)
          if(localStorage.getItem('user'))
            next()
          else
            next('/')
        else
          next()
      }
    },

    //GROUP ROUTES
    {
      path: '/group/register',
      name: 'group-register',
      component: GroupRegistration
    },
    {
      path: '/group/dashboard',
      name: 'group-dashboard',
      component: GroupDashboard,
      beforeEnter: (destination, source, next) => {
        if(!store.state.user)
          if(localStorage.getItem('user'))
            next()
          else
            next('/')
        else
          next()
      }
    },

    //TRAVEL GROUP ROUTES
    {
      path: '/tg/register',
      name: 'tg-register',
      component: TGRegister
    },
    {
      path: '/tg/dashboard',
      name: 'tg-dashboard',
      component: TGDashboard,
      beforeEnter: (destination, source, next) => {
        if(!store.state.user)
          if(localStorage.getItem('user'))
            next()
          else
            next('/')
        else
          next()
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0}
  }
})
