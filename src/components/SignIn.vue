<template>
  <v-container fluid fill-height class="text-xs-center scroll-y">
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 class="zoom text-xs-center">
      <v-avatar size="200" class="logo mb-3"></v-avatar>
      <v-text-field
        class="my-3"
        type="email"
        v-model="email"
        placeholder="Email"
        prepend-icon="alternate_email"
        clearable>
      </v-text-field>
      <v-text-field
        class="my-3"
        v-model="password"
        placeholder="Password"
        hint="Forgot? Use other sign in method!"
        prepend-icon="lock"
        :append-icon="visible ? 'visibility' : 'visibility_off'"
        @click:append="() => (visible = !visible)"
        :type="visible ? 'password' : 'text'">
      </v-text-field>
      <span>Don't have an account ? - <router-link to="/signup" class="primary--text" style="text-decoration: underline;">Sign Up</router-link></span><br><br>
      <!-- <v-btn color="primary" icon outline @click="GoogleSignIn" :loading="loading" :disabled="loading">G</v-btn>
      <v-btn color="primary" icon outline @click="GithubSignIn" :loading="loading" :disabled="loading">H</v-btn>
      <v-btn color="primary" icon outline @click="TwitterSignIn" :loading="loading" :disabled="loading">T</v-btn>
      <v-btn color="primary" icon outline @click="FacebookSignIn" :loading="loading" :disabled="loading">F</v-btn> -->
      <v-btn @click="submit" round color="primary b--text" :loading="loading" :disabled="loading">sign in</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {
      email: '',
      password: '',
      visible: true
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/market')
      }
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('userSignIn', {email: this.email, password: this.password})
    },
    GithubSignIn () {
      this.$store.dispatch('userProvider', new firebase.auth.GithubAuthProvider())
    },
    GoogleSignIn () {
      this.$store.dispatch('userProvider', new firebase.auth.GoogleAuthProvider())
    },
    TwitterSignIn () {
      this.$store.dispatch('userProvider', new firebase.auth.TwitterAuthProvider())
    },
    FacebookSignIn () {
      this.$store.dispatch('userProvider', new firebase.auth.FacebookAuthProvider())
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
  .logo {
    background: url('../assets/enly.png') no-repeat;
    background-size: contain;
    background-position: center;
  }
</style>
