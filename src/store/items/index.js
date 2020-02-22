import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: {
    items: null
  },
  mutations: {
    setItems (state, payload) {
      state.items = payload
    },
    itemCreate (state, payload) {
      // if user.designer
    },
    itemUpdate (state, payload) {
      // if user.designer
    }
  },
  actions: {
    setItemsByCreator ({commit}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.database().ref('items').once('value')
        .then((data) => {
          const items = []
          const item = data.val()
          for (let key in item) {
            if (item[key].creator === payload.creator && (payload.gender ? item[key].woman : item[key].man)) {
              items.push({
                id: key,
                name: item[key].name,
                pics: item[key].pics,
                price: item[key].price,
                sale: item[key].sale,
                sizes: item[key].sizes,
                colors: item[key].colors,
                types: item[key].types,
                categories: item[key].categories,
                creator: item[key].creator,
                uma: item[key].uma,
                man: item[key].man,
                woman: item[key].woman
              })
            }
          }
          commit('setItems', items)
          commit('setLoading', false)
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error.message)
          }
        )
    },
    setItemsByCategory ({commit}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.database().ref('items').once('value')
        .then((data) => {
          console.log(data.val())
          const items = []
          const item = data.val()
          for (let key in item) {
            // instead filter with findIndex
            if (item[key].category === payload.category) {
              items.push({
                id: key,
                name: item[key].name,
                pics: item[key].pics,
                price: item[key].price,
                sale: item[key].sale,
                sizes: item[key].sizes,
                colors: item[key].colors,
                types: item[key].types,
                categories: item[key].categories,
                creator: item[key].creator,
                uma: item[key].uma,
                man: item[key].man,
                woman: item[key].woman
              })
            }
          }
          commit('setItems', items)
          commit('setLoading', false)
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error.message)
          }
        )
    },
    setItemsByName ({commit}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.database().ref('items').once('value')
        .then((data) => {
          console.log(data.val())
          const items = []
          const item = data.val()
          for (let key in item) {
            if (item[key].name === payload.name) {
              items.push({
                id: key,
                name: item[key].name,
                pics: item[key].pics,
                price: item[key].price,
                sale: item[key].sale,
                sizes: item[key].sizes,
                colors: item[key].colors,
                types: item[key].types,
                categories: item[key].categories,
                creator: item[key].creator,
                uma: item[key].uma,
                man: item[key].man,
                woman: item[key].woman
              })
            }
          }
          commit('setItems', items)
          commit('setLoading', false)
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error.message)
          }
        )
    },
    setItemsOnSale ({commit}) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.database().ref('items').once('value')
        .then((data) => {
          console.log(data.val())
          const items = []
          const item = data.val()
          for (let key in item) {
            if (item[key].sale === true) {
              items.push({
                id: key,
                name: item[key].name,
                pics: item[key].pics,
                price: item[key].price,
                sale: item[key].sale,
                sizes: item[key].sizes,
                colors: item[key].colors,
                types: item[key].types,
                categories: item[key].categories,
                creator: item[key].creator,
                uma: item[key].uma,
                man: item[key].man,
                woman: item[key].woman
              })
            }
          }
          commit('setItems', items)
          commit('setLoading', false)
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error.message)
          }
        )
    },
    setItems3D ({commit}) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.database().ref('items').once('value')
        .then((data) => {
          console.log(data.val())
          const items = []
          const item = data.val()
          for (let key in item) {
            if (item[key].uma) {
              items.push({
                id: key,
                name: item[key].name,
                pics: item[key].pics,
                price: item[key].price,
                sale: item[key].sale,
                sizes: item[key].sizes,
                colors: item[key].colors,
                types: item[key].types,
                categories: item[key].categories,
                creator: item[key].creator,
                uma: item[key].uma,
                man: item[key].man,
                woman: item[key].woman
              })
            }
          }
          commit('setItems', items)
          commit('setLoading', false)
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error.message)
          }
        )
    },
    itemCreate  ({commit}, payload) {
      // if user.designer
    },
    itemUpdate  ({commit}, payload) {
      // if user.designer
    }
  },
  getters: {
    items (state) {
      return state.items
    },
    itemsByType (state) {
      return (itemType) => {
        return state.items.find((item) => {
          return item.type === itemType
        })
      }
    }
  }
}
