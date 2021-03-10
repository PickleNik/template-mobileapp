
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
// import firebase from 'firebase/app'
// import 'firebase/auth'

import App from './App'
import router from './router'
import { store } from './store'

import Drawer from './components/Shared/Drawer'
import Item from './components/Shared/Item'
import ItemDialog from './components/Shared/ItemDialog'
import Alert from './components/Shared/Alert'

Vue.component('drawer', Drawer)
Vue.component('item', Item)
Vue.component('item-dialog', ItemDialog)
Vue.component('alert', Alert)

Vue.use(Vuetify, {theme: {
  primary: '#e91e63',
  title: '#aaa',
  text: '#888',
  b: '#fff',
  b2: '#fff',
  b3: '#f8f8f8'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
//    firebase.initializeApp({
//      apiKey: 'AIzaSyBnk7WsiPlHUqiXkQPiLV1-9we4DruOV1A',
//      authDomain: 'enly-app.firebaseapp.com',
//      databaseURL: 'https://enly-app.firebaseio.com',
//      projectId: 'enly-app',
//      storageBucket: 'enly-app.appspot.com',
//      messagingSenderId: '585428434741'
//    })
//    firebase.auth().onAuthStateChanged((user) => {
//      if (user) {
//        console.log(user)
//        this.$store.dispatch('userFetch', user)
//      }
//    })
  }
})
