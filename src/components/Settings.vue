<template>
  <v-container fill-height fluid class="pa-0 round1" style="border-radius: 2em !improtant;height: calc(100vh - 100px);">

    <drawer :left="left" ></drawer>

    <v-toolbar fixed app class="transparent elevation-0" height="44">
      <v-toolbar-side-icon @click="left = !left" class="text--text"></v-toolbar-side-icon>
      <v-toolbar-title class="mx-auto" style="cursor: pointer">Settings</v-toolbar-title>
      <v-btn icon color="transparent" disabled></v-btn>
    </v-toolbar>

    <v-layout row class="round1 scroll-y">
      <v-flex class="text-xs-center round1 scroll-y">
        <v-layout column class="text-xs-center round1 scroll-y">
          <v-list expand class="transparent">
            <v-list-tile class="py-2" avatar>
              <v-list-tile-avatar>
                <img :src="user.photo" alt="">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                <v-list-tile-sub-title>Go to Profile</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn color="primary" to="/profile" icon flat><v-icon large>keyboard_arrow_right</v-icon></v-btn>
              </v-list-tile-action>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile class="py-2">
              <v-list-tile-action><v-icon>alternate_email</v-icon></v-list-tile-action>
              <v-list-tile-content>Email</v-list-tile-content>
              <v-list-tile-action><v-icon class="text--text">keyboard_arrow_right</v-icon></v-list-tile-action>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile class="py-2">
              <v-list-tile-action><v-icon>lock</v-icon></v-list-tile-action>
              <v-list-tile-content>Password</v-list-tile-content>
              <v-list-tile-action><v-icon class="text--text">keyboard_arrow_right</v-icon></v-list-tile-action>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile class="py-2">
              <v-list-tile-action><v-icon>accessibility_new</v-icon></v-list-tile-action>
              <v-list-tile-content>Avatar</v-list-tile-content>
              <v-list-tile-action><v-icon class="text--text">keyboard_arrow_right</v-icon></v-list-tile-action>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile class="py-2" @click="themeChange">
              <v-list-tile-action><v-icon>{{ theme ? 'brightness_7' : 'brightness_3' }}</v-icon></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Theme: {{ theme ? 'Light' : 'Dark' }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action><v-icon small class="text--text">edit</v-icon></v-list-tile-action>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile v-ripple class="py-2" @click="switchTeams">
              <v-list-tile-action><v-icon>accessibility_new</v-icon></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.gender ? 'Female': 'Male' }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action><v-icon small class="text--text">edit</v-icon></v-list-tile-action>
            </v-list-tile>

            <v-divider></v-divider>

          </v-list>
          <v-btn round outline color="primary b--text" class="mt-4 mx-auto" @click="logout"><b>Logout</b><v-icon right>exit_to_app</v-icon></v-btn>
          <v-btn round outline color="primary b--text" class="mt-5 mx-auto" @click="userDelete"><b>Delete Account</b><v-icon right>delete</v-icon></v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  },
  methods: {
    logout () {
      this.$router.push('/')
      this.$store.dispatch('userLogout')
    },
    userDelete () {
      this.$router.push('/')
      this.$store.dispatch('userDelete')
    },
    themeChange () {
      this.$store.dispatch('themeChange')
    },
    switchTeams () {
      this.$store.dispatch('switchTeams')
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    },
    theme () {
      return this.$store.getters.theme
    }
  }
}
</script>

<style lang="css">
</style>
