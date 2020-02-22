import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: {
    cart: {}
  },
  mutations: {
    setCart (state, payload) {
      state.cart = payload
    },
    cartAdd (state, payload) {
      state.cart[payload.id] = payload
    },
    cartRemove (state, payload) {
      Reflect.deleteProperty(state.cart, payload.id)
    }
  },
  actions: {
    cartAdd ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id + '/cart/' + payload.item.id)
        .set({
          qty: payload.qty,
          color: payload.color,
          size: payload.size,
          id: payload.item.id,
          name: payload.item.name,
          pics: payload.item.pics,
          price: payload.item.price,
          sale: payload.item.sale,
          sizes: payload.item.sizes,
          colors: payload.item.colors,
          types: payload.item.types,
          categories: payload.item.categories,
          creator: payload.item.creator,
          uma: payload.item.uma ? payload.item.uma : false
        })
        .then(result => {
          const cartItem = {
            qty: payload.qty,
            color: payload.color,
            size: payload.size,
            id: payload.item.id,
            name: payload.item.name,
            pics: payload.item.pics,
            price: payload.item.price,
            sale: payload.item.sale,
            sizes: payload.item.sizes,
            colors: payload.item.colors,
            types: payload.item.types,
            categories: payload.item.categories,
            creator: payload.item.creator,
            uma: payload.item.uma ? payload.item.uma : false
          }
          commit('setLoading', false)
          commit('cartAdd', cartItem)
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    cartRemove ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id + '/cart/' + payload.id)
        .remove()
        .then(
          commit('setLoading', false),
          commit('cartRemove', payload)
        )
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    cart (state) {
      return state.cart
    }
  }
}
