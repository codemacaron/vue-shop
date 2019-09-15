import Vue from 'vue'
import Router from 'vue-router'
// import Main from '@/components/Main'
// import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/view/Main')
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: () => import('@/view/Detail')
    },
    {
      path: '/My',
      name: 'My',
      component: () => import('@/view/My')
    }
  ]
})
