import Vue from 'vue'
import Router from 'vue-router'

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
    },
    {
      path: '/shop/veggies',
      name: 'Veggies',
      component: () => import('@/view/Shops/Veggies')
    },
    {
      path: '/shop/fruits',
      name: 'Fruits',
      component: () => import('@/view/Shops/Fruits')
    },
    {
      path: '/shop/sauces',
      name: 'Sauces',
      component: () => import('@/view/Shops/Sauces')
    }
  ]
})
