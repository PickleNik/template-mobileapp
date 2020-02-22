<template>
  <v-flex xs6 sm4 md6 lg4 xl2 class="d-inline-block round1" style="min-width:10em;">
    <v-layout column class="ma-1 b3 round1 text-xs-left">
      <v-img v-ripple class="round1 mb-2" style="padding-bottom: -5px;" :src="item.pics[0]"  aspect-ratio="0.78">
        <v-layout slot="placeholder" fill-height align-center justify-center>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-layout>
        <div style="position: absolute; bottom: 0; right: 0; text-shadow: 0 0 1em black;">
          <b class="white--text">Designer</b>
          <v-avatar class="ma-2" size="30" style="box-shadow: 0 0 1em black;"><img src="https://image.flaticon.com/icons/png/128/236/236831.png"/></v-avatar>
        </div>
      </v-img>
      <span class="text--text px-2 pb-2">
        <h3 class="title--text" style="height: 2em;">{{ item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name }}</h3>
        <v-layout row>
          <v-icon small v-if="item.uma" class="pink--text">accessibility_new</v-icon>
          <v-icon small v-if="inCart" class="pink--text ml-1">shopping_cart</v-icon>
          <v-icon small v-if="inWish" class="pink--text ml-1">star</v-icon>
          <v-spacer></v-spacer>
          <s v-if="item.sale">$ {{ item.price+99 }}</s>
          <b class="round1 px-2 ml-2" :class="item.sale ? 'pink b--text' : 'text--text'">$ {{ item.price }}</b>
        </v-layout>
      </span>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
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
  }
}
</script>

<style scoped></style>
