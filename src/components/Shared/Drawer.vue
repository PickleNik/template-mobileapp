<template>
  <v-navigation-drawer v-model="val"
    :height="height" :width="width"
    class="elevation-0" :class="{ margin: xsm, b: xsm, transparent: !xsm }"
    hide-overlay floating left fixed app>
    <v-layout column>
      <h1 class="hidden-sm-and-down enly pa-3">Enly</h1>
      <v-layout column>
        <v-btn block flat class="text--text" active-class="active" v-for="i in icons" :key="i.link" :to="i.link">
          <v-icon left>{{ i.name }}</v-icon>
          <v-list-tile-title><b>{{ i.link.substring(1,2).toUpperCase() + i.link.substring(2, i.link.length) }}</b></v-list-tile-title>
        </v-btn>
      </v-layout>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['left'],
  data () {
    return {
      icons: [
        { name: 'person', link: '/profile' },
        { name: 'group', link: '/friends' },
        { name: 'dashboard', link: '/feed' },
        { name: 'shopping_cart', link: '/cart' },
        { name: 'star', link: '/wishlist' },
        { name: 'shopping_basket', link: '/market' },
        { name: 'accessibility_new', link: '/dressing' },
        { name: 'settings', link: '/settings' }
      ]
    }
  },
  computed: {
    val () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return this.left
        case 'sm': return this.left
        case 'md': return true
        case 'lg': return true
      }
    },
    xsm () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        case 'md': return false
        case 'lg': return false
        case 'xl': return false
      }
    },
    width () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return window.innerWidth / 2
        case 'sm': return window.innerWidth / 2
        case 'md': return window.innerWidth / 4
        case 'lg': return window.innerWidth / 4
      }
    },
    height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return window.innerHeight - 106
        case 'sm': return window.innerHeight - 106
        case 'md': return window.innerHeight
        case 'lg': return window.innerHeight
      }
    }
  }
}
</script>

<style scoped>
.margin{
  margin-top: 44px !important;
}
.active{
  color: var(--primary) !important;
}
.v-btn{
  text-transform: none !important;
}
.v-btn:before{
  border-radius: 0;
}
a {
  margin: 0;
  padding-top: 1.7em;
  padding-bottom: 1.7em;
  border-radius: 0em !important;
}
</style>
