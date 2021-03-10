// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/storage'
// import 'firebase/database'
// import { Storage } from 'aws-amplify'

export default {
  state: {
    user: {
            id: 'randomid',
            email: 'random@email.com',
            name: 'Dummy User',
            photo: '',
            gender: false,
            closet: [],
            outfits: []
          }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    changeItem ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      let gender = ''
      if (payload.gender) gender = 'clothes_female'
      else gender = 'clothes'
      firebase.database().ref('/users/user2/' + gender).child(payload.slot).set([payload.name])
      .then(data => {
        console.log(gender + ':' + payload.slot + ':' + payload.name)
        firebase.database().ref('/users/user2/sys').child('clothes_update').set(1)
        .then(commit('setLoading', false))
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
          commit('setError', error.message)
        })
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
        commit('setError', error.message)
      })
    },
    changeHair ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      let gender = ''
      if (payload.gender) gender = 'clothes_female'
      else gender = 'clothes'
      firebase.database().ref('/users/user2/' + gender).child('Hair').set([payload.name])
      .then(data => {
        console.log(gender + ':Hair:' + payload.name)
        firebase.database().ref('/users/user2/sys').child('clothes_update').set(1)
        .then(commit('setLoading', false))
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
          commit('setError', error.message)
        })
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
        commit('setError', error.message)
      })
    },
    switchTeams ({commit, getters}) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.database().ref('/users/user2/sys').child('gender').once('value')
      .then(data => {
        let team = data.val() === 'HumanMale' ? 'HumanFemale' : 'HumanMale'
        firebase.database().ref('/users/user2/sys').child('gender').set(team)
        .then(data => {
          commit('setUser', {
            id: getters.user.id,
            email: getters.user.email,
            name: getters.user.name,
            photo: getters.user.photo,
            gender: !getters.user.gender,
            closet: [],
            outfits: []
          })
          console.log('New gender: ' + team)
        })
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
        commit('setError', error.message)
      })
    },
    sendSize ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.database().ref('/users/user2/dna').child(payload.name).set(payload.val)
      .then(
        firebase.database().ref('/users/user2/sys').child('dna_update').set(1)
        .then(commit('setLoading', false))
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
          commit('setError', error.message)
        })
      )
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
        commit('setError', error.message)
      })
    },
    userChangeEmail ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.auth().currentUser.updateEmail(payload)
      .then(getters.user.email = payload, commit('setLoading', false))
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },
    userChangePassword ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.auth().currentUser.updatePassword(payload)
      .then(commit('setLoading', false))
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },
    userChangePhoto ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.storage().ref('/users/' + getters.user.id).child('avatar').put(payload)
      .then(data => {
        firebase.storage().ref('/users/' + getters.user.id).child('avatar').getDownloadURL()
        .then(url => {
          getters.user.photo = url
          firebase.auth().currentUser.updateProfile({
            photoURL: url
          })
        })
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },
    userChangeName ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.database().ref('/users/' + getters.user.id).child('username').set(payload)
      .then(commit('setLoading', false))
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },
    userVerify ({commit, getters}, payload) {},
    userSignUp ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      Storage.remove('FaceDJ-pictures/avatar.png')
      .then(result => console.log(result))
      .catch(err => console.log(err))
      Storage.remove('FaceDJ-output/avatar.jpg')
      .then(result => console.log(result))
      .catch(err => console.log(err))
      Storage.remove('FaceDJ-output/avatar.obj')
      .then(result => console.log(result))
      .catch(err => console.log(err))
      Storage.remove('FaceDJ-output/avatar.mlt')
      .then(result => console.log(result))
      .catch(err => console.log(err))
      Storage.put('FaceDJ-pictures/avatar.png', payload.awsFile, {
        customPrefix: { public: 'FaceDJ/', protected: 'protected', private: 'private' },
        contentType: 'image/png'
      })
      .then(result => console.log(result))
      .catch(err => console.log(err))

      Storage.put('inputs.txt', `username: ${payload.username},\nheight: ${payload.height}, \nweight: ${payload.weight}, \nage: ${payload.age}, \nsex: ${payload.bt}, \nsystem: ${payload.ms}`, {
        contentType: 'text'
      })
      .then(result => console.log(result))
      .catch(err => console.log(err))
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        let user = data.user
        let uid = data.user.uid
        let gender = ''
        if (payload.bt) gender = 'HumanFemale'
        else gender = 'HumanMale'
        firebase.database().ref('/users/user2/sys').child('new_user').set(1)
        firebase.database().ref('/users/user2/sys').child('face_update').set(1)
        firebase.database().ref('/users/user2/sys').child('gender').set(gender)
        firebase.storage().ref('/users/' + uid).child('avatar').put(payload.photo)
        .then(data => {
          firebase.storage().ref('/users/' + uid).child('avatar').getDownloadURL()
          .then(url => {
            user.updateProfile({
              displayName: payload.username,
              photoURL: url
            })
            .catch(error => {
              commit('setLoading', false)
              console.log(error)
              commit('setError', error.message)
            })
          })
          .catch(error => {
            commit('setLoading', false)
            console.log(error)
            commit('setError', error.message)
          })
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error.message)
        })
        firebase.database().ref('/users/' + uid).set({
          email: data.user.email,
          name: payload.username,
          theme: true,
          age: payload.age,
          ms: payload.ms,
          bt: payload.bt,
          height: payload.height,
          weight: payload.weight
        })
        .then(data => {
          firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(data => {
            commit('setUser', {
              id: uid,
              email: payload.email,
              name: payload.username,
              photo: URL.createObjectURL(payload.photo),
              gender: payload.bt,
              closet: [],
              outfits: []
            })
            commit('setLoading', false)
          })
          .catch(error => {
            commit('setLoading', false)
            commit('setError', error.message)
          })
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error.message)
        })
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        let uid = data.user.uid
        let email = data.user.email
        let photo = data.user.photoURL
        firebase.database().ref('/users/' + uid + '/').once('value')
        .then(data => {
          let cart = {}
          if (data.val().cart) {
            cart = data.val().cart
          }
          let wish = {}
          if (data.val().wish) {
            wish = data.val().wish
          }
          let name = ''
          if (data.val().name) {
            name = data.val().name
          }
          let theme = ''
          if (data.val().theme) {
            theme = data.val().theme
          }
          let gender = ''
          if (data.val().bt) {
            gender = data.val().bt
          }
          commit('setTheme', theme)
          commit('changeTheme')
          commit('changeTheme')
          commit('setCart', cart)
          commit('setWish', wish)
          commit('setUser', {
            id: uid,
            email: email,
            name: name,
            photo: photo,
            gender: gender,
            closet: [],
            outfits: []
          })
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error.message)
        })
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },
    userFetch ({commit}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      let uid = payload.uid
      let email = payload.email
      let photo = payload.photoURL
      firebase.database().ref('/users/' + uid + '/').once('value')
      .then(data => {
        let cart = {}
        if (data.val().cart) {
          cart = data.val().cart
        }
        let wish = {}
        if (data.val().wish) {
          wish = data.val().wish
        }
        let name = ''
        if (data.val().name) {
          name = data.val().name
        }
        let theme = ''
        if (data.val().theme) {
          theme = data.val().theme
        }
        let gender = ''
        if (data.val().bt) {
          gender = data.val().bt
        }
        commit('setTheme', theme)
        commit('changeTheme')
        commit('changeTheme')
        commit('setCart', cart)
        commit('setWish', wish)
        commit('setUser', {
          id: uid,
          email: email,
          name: name,
          photo: photo,
          gender: gender
        })
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },
    userLogout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    userDelete ({commit, getters}) { // to be done with payload for password confirmation
      commit('setLoading', true)
      const user = getters.user
      firebase.storage().ref('/users/' + user.id + '/avatar').delete()
      .then(commit('setLoading', false))
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
      firebase.database().ref('/users/' + user.id)
      .remove()
      .then(commit('setLoading', false))
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
      firebase.auth().currentUser.delete()
      .then(commit('setUser', null))
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
