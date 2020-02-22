import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: {
    wish: {}
  },
  mutations: {
    setWish (state, payload) {
      state.wish = payload
    },
    wishAdd (state, payload) {
      state.wish[payload.id] = payload
      console.log(state.wish)
    },
    wishRemove (state, payload) {
      Reflect.deleteProperty(state.wish, payload.id)
      console.log(state.wish)
    }
  },
  actions: {
    wishAdd ({commit, getters}, payload) {
      commit('setLoading', true)
      console.log(payload)
      const user = getters.user
      firebase.database().ref('/users/' + user.id + '/wish/' + payload.id)
        .set({
          id: payload.id,
          name: payload.name,
          pics: payload.pics,
          price: payload.price,
          sale: payload.sale,
          sizes: payload.sizes,
          colors: payload.colors,
          types: payload.types,
          categories: payload.categories,
          creator: payload.creator
        })
        .then(
          commit('setLoading', false),
          commit('wishAdd', payload)
        )
        .catch(error => {
          commit('setError', error.message)
          console.log(error.message)
          commit('setLoading', false)
        })
    },
    wishRemove ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id + '/wish/' + payload.id)
        .remove()
        .then(
          commit('setLoading', false),
          commit('wishRemove', payload)
        )
        .catch(error => {
          commit('setError', error.message)
          console.log(error.message)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    wish (state) {
      return state.wish
    }
  }
}
