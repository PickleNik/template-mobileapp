import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import theme from './theme'
import items from './items'
import cart from './cart'
import wish from './wish'
import closet from './closet'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth: auth,
    theme: theme,
    items: items,
    cart: cart,
    wish: wish,
    closet: closet
  },
  state: {
    loading: null,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
