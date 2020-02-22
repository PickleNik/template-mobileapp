import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from './auth-guard'
import GetStartedGuard from './get-started-guard'
import DesignerGuard from './designer-guard'

import GetStarted from '@/components/GetStarted'
import Feed from '@/components/Feed'
import Profile from '@/components/Profile'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Friends from '@/components/Friends'
import newItem from '@/components/newItem'
import Market from '@/components/Market'
import Items from '@/components/Items'
import Cart from '@/components/Cart'
import Wishlist from '@/components/Wishlist'
import Dressing from '@/components/Dressing'
import Settings from '@/components/Settings'
import Aws from '@/components/aws'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/aws',
      name: 'Aws',
      component: Aws
    },
    {
      path: '/',
      name: 'GetStarted',
      component: GetStarted,
      beforeEnter: GetStartedGuard
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/friends',
      name: 'Friends',
      component: Friends,
      beforeEnter: AuthGuard
    },
    {
      path: '/newitem',
      name: 'newItem',
      component: newItem,
      beforeEnter: DesignerGuard
    },
    {
      path: '/market',
      name: 'Market',
      component: Market
    },
    {
      path: '/market/items',
      name: 'items',
      component: Items,
      props: true
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      beforeEnter: AuthGuard
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist,
      beforeEnter: AuthGuard
    },
    {
      path: '/dressing',
      name: 'Dressing',
      component: Dressing,
      beforeEnter: AuthGuard
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: AuthGuard
    }
  ]
})
