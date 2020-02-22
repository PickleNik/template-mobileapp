<template>
  <v-container fill-height fluid class="pa-0" style="overflow-x:hidden !important;">

    <drawer :left="left" ></drawer>

    <v-toolbar fixed app class="b elevation-0" height="44">
      <v-toolbar-side-icon @click="left = !left"></v-toolbar-side-icon>
      <v-toolbar-title class="mx-auto" style="cursor: pointer">Cart</v-toolbar-title>
      <v-btn icon to="/wishlist"><v-icon>star</v-icon></v-btn>
    </v-toolbar>

    <v-layout column>
      <v-layout row class="round1 b scroll-y">
        <v-flex xs12 class="round1 scroll-y" style="overflow-x: hidden">
          <v-layout row wrap class="text-xs-center round1 scroll-y" style="margin: -4px; overflow-x: hidden;" >
            <v-flex xs12 sm6 v-if="Object.keys(cart).length > 0" v-for="item in cart" class="item zoom d-inline-block" :key="item.name">
              <v-layout row wrap class="ma-1 round1 b3">

                <v-flex xs4>
                  <v-img class="round1 mr-2 text-xs-left" @click="openItem = item, dialog = true" :src="item.pics[0]" aspect-ratio="0.78">
                    <v-btn flat icon class="ma-0" color="primary" @click.native.stop="openItem = item, remove = true"><v-icon small>close</v-icon></v-btn>
                  </v-img>
                </v-flex>

                <v-flex xs8 class="pa-2">
                  <v-layout row>
                    <h3 style="font-size: 1.3em;" class="title--text">{{ item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name }}</h3>
                    <v-spacer></v-spacer>
                    <b style="font-size: 1.3em;" class="round1 px-2 mb-2" :class="item.sale ? 'pink b--text' : 'text--text'">${{ item.price }}</b>
                  </v-layout>
                  <v-layout row wrap>
                    <v-layout row class="mx-auto my-2 text-xs-center" align-content-center>
                      <span class="text--text" style="font-size: 1.5em;">Qty:</span>
                      <v-spacer></v-spacer>
                      <v-btn icon :loading="loading" flat color="text" class="my-0 mx-auto" :disabled="item.qty <= 1 || loading" @click="cartAdd(item, item.color, item.size, item.qty-1), total -=item.price"><v-icon>remove</v-icon></v-btn>
                      <b class="mx-3 pink--text" style="font-size: 1.5em;"> {{ item.qty }}</b>
                      <v-btn icon :loading="loading" flat color="primary" class="my-0 mx-auto" :disabled="loading" @click="cartAdd(item, item.color, item.size, item.qty+1), total +=item.price"><v-icon>add</v-icon></v-btn>
                    </v-layout>
                  </v-layout>

                  <v-divider></v-divider>

                  <v-layout class="px-2 pt-2">
                    <v-menu :disabled="item.sizes.length < 2">
                      <v-btn :disabled="item.sizes.length < 2" right class="b3 px-2 text--text text-xs-left ma-0" round depressed slot="activator">
                        <v-icon left class="primary--text">accessibility_new</v-icon><b>{{ item.size ? item.size : item.sizes[0] }}</b><v-spacer></v-spacer>
                      </v-btn>
                      <v-list class="b2 round1">
                        <v-list-tile v-for="s in item.sizes" :key="s" @click="cartAdd(item, item.color, s, item.qty)" >
                          <v-list-tile-title>{{ s }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                    <v-spacer></v-spacer>
                    <v-menu :disabled="item.colors.length < 2" offset-y transition="slide-y-transition">
                      <v-btn :disabled="item.colors.length < 2" class="b3 px-2 text--text text-xs-left ma-0" round depressed slot="activator">
                        <v-spacer></v-spacer><b>{{ item.color ? item.color : item.colors[0] }}</b><v-icon right class="primary--text">color_lens</v-icon>
                      </v-btn>
                      <v-list class="b2 round1">
                        <v-list-tile v-for="c in item.colors" :key="c" @click="cartAdd(item, c, item.size, item.qty)" >
                          <v-list-tile-title>{{ c }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-layout>
                </v-flex>

              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>


      <v-flex class="px-3 pt-3 text-xs-center" style="max-height: 96px;">
        <v-layout v-if="Object.keys(cart).length <= 0" row class="px-3"><h3 class="text--text">Cart is empty</h3></v-layout>
        <v-btn v-if="Object.keys(cart).length <= 0" to="/market" large color="primary" class="zoom mx-auto b--text" depressed round style="width: 100%;"><v-icon left>shopping_basket</v-icon> <b>Go to marketplace</b> <v-icon right>keyboard_arrow_right</v-icon></v-btn>
        <v-layout v-if="Object.keys(cart).length > 0" row class="px-3"><h3 class="text--text">Total: </h3><v-spacer></v-spacer><b>$ {{ total }}</b></v-layout>
        <v-btn v-if="Object.keys(cart).length > 0"  @click="checkout = true" large color="primary" class="zoom mx-auto b--text" depressed round style="width: 100%;"><b>Checkout</b></v-btn>
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

    <v-dialog v-model="remove" content-class="b round2 text-xs-center">
      <v-flex class="pa-3">
        <h2 class="title--text">Remove from the cart ?</h2>
        <v-layout row class="round1 b3 my-3">
          <v-flex xs4>
            <v-img class="round1 mr-2" :src="openItem.pics[1]" aspect-ratio="0.78"></v-img>
          </v-flex>
          <v-flex xs8>
            <h3 class="text--text pa-2" style="text-align: justify;">{{ openItem.name }}</h3>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-btn outline round color="primary" class="mx-1" @click="cartRemove(openItem), remove = false"><v-icon left>delete</v-icon>Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn depressed round color="primary b--text" class="mx-1" @click="wishAdd(openItem), cartRemove(openItem), remove = false"><v-icon left>star_outline</v-icon><b>Wishlist</b></v-btn>
        </v-layout>
      </v-flex>
    </v-dialog>
  </v-container>
</template>

<script>
// MOVE this.total TO BACKEND, connect to database

export default {
  data () {
    return {
      total: 0,
      left: false,
      remove: false,
      dialog: false,
      openItem: { sizes: [''], colors: [''], pics: [''], price: '', creator: '', name: '', sale: true, id: -420 }
    }
  },
  watch: {
    cart (value) {
      this.total = 0
      for (let i in value) { this.total += value[i].price * value[i].qty }
    }
  },
  created () {
    this.total = 0
    for (let i in this.cart) { this.total += this.cart[i].price * this.cart[i].qty }
  },
  computed: {
    cart () {
      return this.$store.getters.cart
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    wishAdd (payload) {
      this.$store.dispatch('wishAdd', payload)
    },
    cartAdd (payload, color, size, qty) {
      this.$store.dispatch('cartAdd', { item: payload, color: color, size: size, qty: qty })
    },
    cartRemove (payload) {
      this.$store.dispatch('cartRemove', payload)
    }
  }
}
</script>

<style scoped></style>
