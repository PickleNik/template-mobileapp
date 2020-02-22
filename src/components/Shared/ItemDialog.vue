<template lang="html">
  <v-layout column>
    <v-layout row class="round1 scroll-y" style="max-height: calc(100vh - 56px);">
      <v-flex xs12 class="round1 scroll-y" style="overflow-x: hidden;">
        <v-layout column class="round1 scroll-y" style="overflow-x: hidden;">
          <v-tabs fixed-tabs hide-slider class="b" id="top">
            <v-tabs-items style="margin-top: -48px;border-radius: 1em !important;">
              <v-tab-item v-for="pic in item.pics.length" :value="pic" v-touch.passive="{left: () => picture=2, right: () => picture=1}" :key="pic">
                <v-img class="round1" :src="item.pics[pic-1]" :lazy-src="item.pics[pic-1]" aspect-ratio="0.78">
                  <v-layout slot="placeholder" fill-height align-center justify-center>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                </v-img>
              </v-tab-item>
              <v-layout row style="position: absolute; bottom: 0.5em; left: 50%; transform:translateX(-50%);">
                <v-flex v-for="i in item.pics.length" :key="i" :class="i == picture ? 'primary' : 'b darken-2'" class="py-1 round1 mx-1" style="min-width: 3em;"></v-flex>
              </v-layout>
            </v-tabs-items>
          </v-tabs>
          <v-layout row class="mx-3 my-3">
            <v-flex xs9 class="text-xs-left">
              <span class="title--text pr-3" style="text-align:justify; font-size:1.3em;">
                {{ item.name }}
              </span>
            </v-flex>
            <v-flex xs3 class="text-xs-right my-auto pl-3">
              <s v-if="item.sale" class="px-2" style="font-size:1.3em;">$ {{ item.price+99 }}</s><br v-if="item.sale">
              <b class="round1 px-2" style="font-size:1.3em;" :class="item.sale ? 'pink b--text' : 'text--text'">$ {{ item.price }}</b>
            </v-flex>
          </v-layout>
          <v-layout class="mx-3">
            <v-btn class="ma-0 mr-1 b3" :disabled="item.sizes.length < 2" :class="size ? 'text--text' : 'grey--text'" flat round large style="width: calc(50vw - 20px);" @click="sizeSheet = true">
              <v-icon left right class="primary--text">accessibility_new</v-icon>
              <b>{{ item.sizes.length < 2 ? item.sizes[0] : size ? size : 'Size' }}</b><v-spacer></v-spacer>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="ma-0 ml-1 b3" :disabled="item.colors.length < 2" :class="color ? 'text--text' : 'grey--text'" flat round large style="width: calc(50vw - 20px);" @click="colorSheet = true">
              <v-spacer></v-spacer><b>{{ item.colors.length < 2 ? item.colors[0] : color ? color : 'Color' }}</b>
              <v-icon left right class="primary--text">color_lens</v-icon>
            </v-btn>
          </v-layout>
          <v-divider class="mt-3 pa-1"></v-divider>
          <v-list class="transparent">
            <v-list-tile-sub-title>Product Info</v-list-tile-sub-title>
            <v-list-tile>
              <v-list-tile-title>Free Shipping !</v-list-tile-title>
              <v-list-tile-action><v-icon color="primary">money_off</v-icon></v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Cotton</v-list-tile-title>
              <v-list-tile-action>80%</v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Polyester</v-list-tile-title>
              <v-list-tile-action>20%</v-list-tile-action>
            </v-list-tile>
            <v-list-group append-icon="">
              <v-list-tile slot="activator">
                <v-list-tile-title>More Info</v-list-tile-title>
                <v-list-tile-action><v-icon>more_horiz</v-icon></v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Short Sleeves</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Crew neck</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Soft-touch jersey</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Regular fit - true to size</v-list-tile-title>
              </v-list-tile>
            </v-list-group>
            <v-list-group append-icon="">
              <v-list-tile slot="activator">
                <v-list-tile-title>Returns*</v-list-tile-title>
                <v-list-tile-action><v-icon>keyboard_arrow_down</v-icon></v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Blah Blah Blah</v-list-tile-title>
              </v-list-tile>
            </v-list-group>
          </v-list>
          <v-divider class="mt-3 pa-1"></v-divider>

          <v-list-tile-sub-title class="my-2" v-if="items">More by <b>Designer</b></v-list-tile-sub-title>

          <v-layout row style="overflow-x:scroll;">
            <item v-for="i in items" @click.native="i/*change to item*/ = i, dialog = false, dialog = true" :key="i.name" :item="i" style="min-width: 13em;"></item>
          </v-layout>

        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row style="position: fixed; bottom: 0; width: 100%;" class="b px-2">
      <v-btn large icon flat class="d-inline-block ml-0" color="amber" @click="!inWish ? wishAdd(item) : wishRemove(item)"><v-icon>{{ inWish ? 'star' : 'star_outline' }}</v-icon></v-btn>
      <v-btn block v-if="!inWish" large round depressed :loading="loading" @click="cartAdd(item)" class="d-inline-block" color="green b--text">
        <b>Add To Cart</b>
        <v-spacer></v-spacer>
        <v-badge v-if="inCart" overlap color="primary">
          <span slot="badge">{{ cart[item.id].qty }}</span>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
        <v-icon v-if="!inCart">add_shopping_cart</v-icon>
      </v-btn>
      <v-btn block v-if="!inCart && inWish" large round depressed :loading="loading" @click="wishRemove(item), cartAdd(item)" color="green b--text">
        <b>Move To Cart</b>
        <v-spacer></v-spacer>
        <v-icon>star</v-icon><v-icon>keyboard_arrow_right</v-icon><v-icon>shopping_cart</v-icon>
      </v-btn>
    </v-layout>

    <v-bottom-sheet v-model="sizeSheet">
      <v-list class="round1 pt-0">
        <v-layout row>
          <v-subheader>Choose Size</v-subheader>
          <v-spacer></v-spacer>
          <v-btn @click="sizeSheet = false" icon flat color="primary"><v-icon>close</v-icon></v-btn>
        </v-layout>
        <v-list-tile v-for="s in item.sizes" :key="s" @click="size = s, sizeSheet = false">
          <v-list-tile-title>{{ s }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="colorSheet">
      <v-list class="round1 pt-0">
        <v-layout row>
          <v-subheader>Choose Color</v-subheader>
          <v-spacer></v-spacer>
          <v-btn @click="colorSheet = false" icon flat color="primary"><v-icon>close</v-icon></v-btn>
        </v-layout>
        <v-list-tile v-for="c in item.colors" :key="c" @click="color = c, colorSheet = false" >
          <v-list-tile-title>{{ c }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>

  </v-layout>
</template>

<script>
export default {
  props: ['item', 'items'],
  data () {
    return {
      picture: 1,
      colorSheet: false,
      sizeSheet: false,
      color: '',
      size: '',
      inWish: '',
      inCart: ''
    }
  },
  watch: { // Do I even need that ? -_-
    wish (value) {
      console.log(value)
      this.inWish = value.hasOwnProperty(this.item.id)
    },
    cart (value) {
      console.log(value)
      this.inCart = value.hasOwnProperty(this.item.id)
    }
  },
  updated () {
    this.inWish = this.wish.hasOwnProperty(this.item.id)
    this.inCart = this.cart.hasOwnProperty(this.item.id)
  },
  computed: {
    cart () {
      return this.$store.getters.cart
    },
    wish () {
      return this.$store.getters.wish
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    wishAdd (payload) {
      this.$store.dispatch('wishAdd', payload)
      this.$store.dispatch('cartRemove', payload)
    },
    wishRemove (payload) {
      this.$store.dispatch('wishRemove', payload)
    },
    cartAdd (payload, color, size) {
      if (!this.inCart) {
        console.log(payload)
        this.$store.dispatch('cartAdd', { item: payload, color: this.color, size: this.size, qty: 1 })
      } else this.$store.dispatch('cartAdd', { item: payload, color: this.color, size: this.size, qty: this.cart[payload.id].qty + 1 })
    }
  }
}
</script>

<style scoped>
.gradient{
  background: linear-gradient(rgba(0, 0, 0, 0.7) 0%,rgba(0, 0, 0, 0.0) 30%);
}
</style>
