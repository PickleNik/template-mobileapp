<template>
  <v-container fill-height fluid class="pa-0" style="overflow-x:hidden !important;">
    <drawer :left="left" ></drawer>

    <v-toolbar fixed app class="b elevation-0" height="44">
      <v-toolbar-side-icon @click="left = !left"></v-toolbar-side-icon>
      <v-toolbar-title class="mx-auto" style="cursor: pointer">Wishlist</v-toolbar-title>
      <v-btn icon to="/cart"><v-icon>shopping_cart</v-icon></v-btn>
    </v-toolbar>

    <v-layout column>
      <v-layout row class="round1 b scroll-y">
        <v-flex xs12 class="round1 scroll-y" style="overflow-x: hidden">
          <v-layout row wrap class="text-xs-center round1 scroll-y" style="margin: -4px; overflow-x: hidden;" >
            <item class="item zoom" v-if="Object.keys(wish).length > 0" v-for="item in wish" :key="item.name" :item="item" @click.native="openItem = item, dialog = true"></item>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-flex v-if="Object.keys(wish).length <= 0" class="px-3 pt-3 text-xs-center" style="max-height: 96px;">
        <v-layout row class="px-3"><h3 class="text--text">Wishlist is empty</h3></v-layout>
        <v-btn to="/market" large color="primary" class="zoom mx-auto b--text" depressed round style="width: 100%;"><v-icon left>shopping_basket</v-icon> <b>Go find something</b> <v-icon right>keyboard_arrow_right</v-icon></v-btn>
      </v-flex>
    </v-layout>

    <v-dialog fullscreen v-model="dialog" content-class="b text-xs-center mb-5 pb-5">
      <v-btn fixed style="left: 0;" fab flat class="ma-1" color="primary" @click="dialog = false">
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fixed fab flat :loading="loading" class="ma-1" color="primary" style="right:56px;">
        <v-icon>share</v-icon>
      </v-btn>
      <v-btn fixed fab flat :loading="loading" class="ma-1" color="primary" style="right:0;">
        <v-icon>accessibility_new</v-icon>
      </v-btn>
      <item-dialog :item="openItem"></item-dialog>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      dialog: false,
      openItem: { sizes: [''], colors: [''], pics: [''], price: '', creator: '', name: '', sale: true, id: -420 }
    }
  },
  computed: {
    wish () {
      return this.$store.getters.wish
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="css" scoped></style>
