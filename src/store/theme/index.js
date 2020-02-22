import firebase from 'firebase/app'
import 'firebase/database'
// import Vue from 'vue'

export default {
  state: {
    theme: true
  },
  mutations: {
    setTheme (state, payload) {
      state.theme = payload
      // if (payload) {
      //   Vue.prototype.$vuetify.theme.text = '#888'
      //   Vue.prototype.$vuetify.theme.title = '#aaa'
      //   Vue.prototype.$vuetify.theme.b = '#fff'
      //   Vue.prototype.$vuetify.theme.b2 = '#fff'
      //   Vue.prototype.$vuetify.theme.b3 = '#f8f8f8'
      // } else {
      //   Vue.prototype.$vuetify.theme.text = '#ddd'
      //   Vue.prototype.$vuetify.theme.title = '#aaa'
      //   Vue.prototype.$vuetify.theme.b = '#222'
      //   Vue.prototype.$vuetify.theme.b2 = '#333'
      //   Vue.prototype.$vuetify.theme.b3 = '#333'
      // }
    },
    changeTheme (state) {
      state.theme = !state.theme
    }
  },
  actions: {
    themeChange ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/theme/')
        .set(!getters.theme)
        .then(data => {
          commit('setLoading', false)
          commit('changeTheme')
        })
        .catch(error => {
          commit('setError', error.message)
          console.log(error.message)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    theme (state) {
      return state.theme
    }
  }
}
