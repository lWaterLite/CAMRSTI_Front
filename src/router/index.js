import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AddView from '@/views/AddView'
import SearchView from '@/views/SearchView'
import AboutView from '@/views/AboutView'
import CountView from "@/views/CountView";
import CurveView from "@/views/CurveView";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/add',
    name: 'AddView',
    component: AddView
  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView
  },
  {
    path: '/count',
    name: 'CountView',
    component: CountView
  },
  {
    path: '/curve',
    name: 'CurveView',
    component:CurveView
  }
]

const router = new VueRouter({
  routes
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
