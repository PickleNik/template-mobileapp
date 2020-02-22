<template>
  <v-container fill-height fluid class="pa-0">

    <drawer :left="left" class="round1"></drawer>

    <v-navigation-drawer v-model="right" touchless
      :width="dWidth" style="min-height: 100vh;"
      class="grey darken-4 elevation-0"
      :class="{ margin: xsm, b: xsm, transparent: !xsm }"
      hide-overlay floating right fixed app>
      <h1 class="hidden-sm-and-down enly pa-3 text-xs-right">Select Outfit</h1>
      <v-layout row class="py-5 b scroll-y" style="overflow-x: hidden; min-height: 100%">
        <v-flex xs12 class="text-xs-center scroll-y" style="overflow-x: hidden">
          <v-layout column class="text-xs-center scroll-y" style="margin: -4px; overflow-x: hidden;" >
            <v-list>
              <v-list-group prepend-icon="change_history" active-class="primary--text">
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>Closet</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-layout v-if="closet" row style="overflow-x: scroll; overflow-y: hidden;">
                  <v-btn round depressed small color="primary b--text">All</v-btn>
                  <v-btn round flat small>Tops</v-btn>
                  <v-btn round flat small>Shoes</v-btn>
                </v-layout>

                <v-container fluid class="pa-0">
                  <v-layout row style="overflow-x: scroll;" class="pa-3">
                    <h2 v-if="!items" class="mx-auto title--text my-4">Empty</h2>
                    <item v-for="item in items" v-if="items && item.uma && (user.gender ? item.woman : item.man)" @click.native="changeItem(item)" style="min-width: 13em;" :key="item.name" :item="item"></item>
                  </v-layout>
                </v-container>
              </v-list-group>

              <v-list-group prepend-icon="star" active-class="primary--text">
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>Wishlist</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-container fluid class="pa-0">
                  <v-layout row style="overflow-x: scroll;" class="pa-3">
                    <h2 v-if="Object.keys(wish).length <= 0" class="mx-auto title--text my-4">Empty</h2>
                    <item v-for="item in wish" v-if="Object.keys(wish).length > 0" @click="changeItem(item)" style="min-width: 13em;" :key="item.name" :item="item"></item>
                  </v-layout>
                </v-container>
              </v-list-group>

              <v-list-group prepend-icon="shopping_cart" active-class="primary--text">
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>Cart</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-container fluid class="pa-0">
                  <v-layout row style="overflow-x: scroll;" class="pa-3">
                    <h2 v-if="Object.keys(cart).length <= 0" class="mx-auto title--text my-4">Empty</h2>
                    <v-flex xs12 sm6 v-for="item in cart" v-if="Object.keys(cart).length > 0" class="item zoom d-inline-block" style="min-width: 26em;" :key="item.name">
                      <v-layout row wrap class="ma-1 round1 b3">

                        <v-flex xs4>
                          <v-img class="round1 mr-2 text-xs-left" @click="openItem = item, dialog = true" :src="item.pics[0]" aspect-ratio="0.78">
                            <!-- <v-btn flat icon class="ma-0" color="primary" @click.native.stop="openItem = item, remove = true"><v-icon small>close</v-icon></v-btn> -->
                          </v-img>
                        </v-flex>

                        <v-flex xs8 class="pa-2">
                          <v-layout row>
                            <h3 style="font-size: 1.3em;" class="title--text">{{ item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name }}</h3>
                            <v-spacer></v-spacer>
                            <b style="font-size: 1.3em;" class="round1 px-2 mb-2" :class="item.sale ? 'pink b--text' : 'text--text'">${{ item.price }}</b>
                          </v-layout>
                          <v-layout row wrap>
                            <v-btn @click="item.on ? item.on = false : item.on = true, changeItem(item)" color="primary" :disabled="!item.uma" block round depressed outline><b>{{ item.on ? 'Remove' : 'Select' }}</b></v-btn>
                          </v-layout>

                          <!-- <v-divider></v-divider> -->

                          <v-layout class="px-2 pt-2">
                            <v-menu :disabled="item.sizes.length < 2">
                              <v-btn :disabled="item.sizes.length < 2" right class="b3 px-2 text--text text-xs-left ma-0" round depressed slot="activator">
                                <v-icon left class="primary--text">accessibility_new</v-icon><b>{{ item.size ? item.size : item.sizes[0] }}</b><v-spacer></v-spacer>
                              </v-btn>
                              <v-list class="b2 round1">
                                <v-list-tile v-for="s in item.sizes" :key="s"  >
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
                                <v-list-tile v-for="c in item.colors" :key="c" >
                                  <v-list-tile-title>{{ c }}</v-list-tile-title>
                                </v-list-tile>
                              </v-list>
                            </v-menu>
                          </v-layout>
                        </v-flex>

                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-list-group>

              <v-list-group prepend-icon="accessibility_new" no-action active-class="primary--text">
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>Uma</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-layout column class="px-4 pt-4 scroll-y" style="max-height: 50vh;">
                  <v-slider @change="sendSize({ name: 'headSize', val: .45 + headSize / 1000 })" v-model="headSize" always-dirty label="headSize" thumb-label="always"></v-slider>
                  <v-slider @change="sendSize({ name: 'headWidth', val: .45 + headWidth / 1000 })" v-model="headWidth" always-dirty label="headWidth" thumb-label="always"></v-slider>
                  <v-slider @change="sendSize({ name: 'armLength', val: .45 + armLength / 1000 })" v-model="armLength" always-dirty label="armLength" thumb-label="always"></v-slider>
                  <v-slider @change="sendSize({ name: 'legsSize', val: .45 + legsSize / 1000 })" v-model="legsSize" always-dirty label="legsSize" thumb-label="always"></v-slider>
                  <v-slider @change="sendSize({ name: 'upperMuscle', val: .45 + upperMuscle / 1000 })" v-model="upperMuscle" always-dirty label="upperMuscle" thumb-label="always"></v-slider>
                  <v-slider @change="sendSize({ name: 'waist', val: .45 + waist / 1000 })" v-model="waist" always-dirty label="waist" thumb-label="always"></v-slider>
                  <v-slider @change="sendSize({ name: 'height', val: .45 + height / 1000 })" v-model="height" always-dirty label="height" thumb-label="always"></v-slider>
                  <v-slider @change="sendSize({ name: 'neckThickness', val: .45 + neckThickness / 1000 })" v-model="neckThickness" always-dirty label="neckThickness" thumb-label="always"></v-slider>
                  <!-- <v-slider @change="sendSize({ name: 'forearmLength', val: forearmLength / 100 })" v-model="forearmLength" always-dirty label="forearmLength" thumb-label="always"></v-slider> -->
                  <!-- <v-slider @change="sendSize({ name: 'armWidth', val: armWidth / 100 })" v-model="armWidth" always-dirty label="armWidth" thumb-label="always"></v-slider> -->
                  <!-- <v-slider @change="sendSize({ name: 'forearmWidth', val: forearmWidth / 100 })" v-model="forearmWidth" always-dirty label="forearmWidth" thumb-label="always"></v-slider> -->
                  <!-- <v-slider @change="sendSize({ name: 'handsSize', val: handsSize / 100 })" v-model="handsSize" always-dirty label="handsSize" thumb-label="always"></v-slider> -->
                  <!-- <v-slider @change="sendSize({ name: 'feetSize', val: feetSize / 100 })" v-model="feetSize" always-dirty label="feetSize" thumb-label="always"></v-slider> -->
                  <!-- <v-slider @change="sendSize({ name: 'legSeparation', val: legSeparation / 100 })" v-model="legSeparation" always-dirty label="legSeparation" thumb-label="always"></v-slider> -->
                  <!-- <v-slider @change="sendSize({ name: 'lowerMuscle', val: lowerMuscle / 100 })" v-model="lowerMuscle" always-dirty label="lowerMuscle" thumb-label="always"></v-slider> -->
                  <v-slider @change="sendSize({ name: 'upperWeight', val: .45 + upperWeight / 1000 })" v-model="upperWeight" always-dirty label="upperWeight" thumb-label="always"></v-slider>
                  <v-slider @change="sendSize({ name: 'lowerWeight', val: .45 + lowerWeight / 1000 })" v-model="lowerWeight" always-dirty label="lowerWeight" thumb-label="always"></v-slider>
                  <!-- <v-slider @change="sendSize({ name: 'gluteusSize', val: gluteusSize / 100 })" v-model="gluteusSize" always-dirty label="gluteusSize" thumb-label="always"></v-slider> -->
                  <v-slider @change="sendSize({ name: 'belly', val: .45 + belly / 1000 })" v-model="belly" always-dirty label="belly" thumb-label="always"></v-slider>
                  <!-- <v-slider @change="sendSize({ name: 'breastSize', val: breastSize / 100 })" v-model="breastSize" always-dirty label="breastSize" thumb-label="always"></v-slider> -->
                </v-layout>
              </v-list-group>
              <v-list-group prepend-icon="face" no-action active-class="primary--text">
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>Haircut</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-container fluid class="pa-0">
                  <v-layout row style="overflow-x: scroll;" class="pa-3">
                    <v-flex xs6 sm4 md6 lg4 xl2 class="d-inline-block round1" style="min-width:10em;">
                      <v-layout column class="ma-1 b3 round1 text-xs-left">
                        <v-img v-ripple @click="changeHair('Nothing')" class="round1 mb-2 grey" style="padding-bottom: -5px;" :src="user.gender ? 'https://cdn3.iconfinder.com/data/icons/female-hairstyles/96/25-128.png' : 'https://cdn1.iconfinder.com/data/icons/male-hairstyles/96/01-128.png'"  aspect-ratio="0.8"></v-img>
                        <span class="text--text px-2 pb-2">
                          <h3 class="title--text" style="height: 2em;">Bald</h3>
                        </span>
                      </v-layout>
                    </v-flex>
                  <v-flex xs6 sm4 md6 lg4 xl2 class="d-inline-block round1" style="min-width:10em;">
                    <v-layout column class="ma-1 b3 round1 text-xs-left">
                      <v-img v-ripple @click="user.gender ? changeHair('FemaleLongHair_Recipe') : changeHair('MaleShortHair_Recipe')" class="round1 mb-2 grey" style="padding-bottom: -5px;" :src="user.gender ? 'https://cdn3.iconfinder.com/data/icons/female-hairstyles/96/15-128.png' : 'https://cdn1.iconfinder.com/data/icons/male-hairstyles/96/03-128.png'"  aspect-ratio="0.8"></v-img>
                      <span class="text--text px-2 pb-2">
                        <h3 class="title--text" style="height: 2em;">Hair1</h3>
                      </span>
                    </v-layout>
                  </v-flex>
                  </v-layout>
                </v-container>
              </v-list-group>
            </v-list>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar absolute dark style="z-index: 99;"
      class="elevation-0 transparent grey--text"
      height="44">
      <v-toolbar-side-icon @click="left = !left" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="mx-auto enly" style="cursor: pointer">Enly</v-toolbar-title>
      <v-btn icon @click="right = !right" class="grey--text"><v-icon>change_history</v-icon></v-btn>
    </v-toolbar>

    <v-layout column>
        <v-img class="mx-auto" src="../../static/logo.svg"></v-img>
        <v-flex style="margin-left: calc(50% - 75px); margin-top: -100px;">
          <v-icon size="150" class="spin grey--text" style="position: absolute;z-index: 0;">settings</v-icon>
          <v-icon class="grey b--text round2 pa-2" size="60" style="position: absolute;z-index: 1;margin-top: 38px; margin-left: 38px;">build</v-icon>
          <h1 class="grey--text" style="position: absolute;z-index: 1;margin-top: 6em; margin-left: -13px;">Coming Soon</h1>
        </v-flex>
    </v-layout>
    <!-- <iframe src="https://uma-hosting.firebaseapp.com/" :width="width" :height="windowHeight" frameborder="0" style="position: absolute; top:0; left:0;"></iframe> -->

  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headSize: 0,
      headWidth: 0,
      armLength: 0,
      upperMuscle: 0,
      legsSize: 0,
      waist: 0,
      neckThickness: 0,
      forearmLength: 0,
      height: 0,
      armWidth: 0,
      forearmWidth: 0,
      handsSize: 0,
      feetSize: 0,
      legSeparation: 0,
      upperWeight: 0,
      lowerMuscle: 0,
      lowerWeight: 0,
      belly: 0,
      gluteusSize: 0,
      breastSize: 0,
      // sizes above
      windowHeight: window.innerHeight, // document.documentElement.clientHeight
      baseUrl: process.env.BASE_URL,
      left: false,
      right: false,
      closet: false,
      selected: false,
      openItem: { sizes: ['error'], colors: ['error'], pics: ['error'], price: 'error', creator: 'error', name: 'error', sale: true, id: -420 }
    }
  },
  mounted () {
    this.$store.dispatch('setItems3D')
  },
  methods: {
    sendSize (payload) {
      this.$store.dispatch('sendSize', { name: payload.name, val: payload.val })
    },
    changeItem (payload) {
      this.$store.dispatch('changeItem', { name: payload.uma.name, slot: payload.uma.slot, gender: this.user.gender })
    },
    changeHair (payload) {
      this.$store.dispatch('changeHair', { name: payload, gender: this.user.gender })
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    cart () {
      return this.$store.getters.cart
    },
    wish () {
      return this.$store.getters.wish
    },
    items () {
      return this.$store.getters.items
    },
    loading () {
      return this.$store.getters.loading
    },
    val () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return this.right
        case 'sm': return this.right
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
    dWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return window.innerWidth
        case 'sm': return window.innerWidth / 2
        case 'md': return window.innerWidth / 4
        case 'lg': return window.innerWidth / 4
      }
    },
    width () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return window.innerWidth
        case 'sm': return window.innerWidth
        case 'md': return window.innerWidth - this.dWidth * 2
        case 'lg': return window.innerWidth - this.dWidth * 2
        case 'xl': return window.innerWidth - this.dWidth * 2
      }
    }
  }
}
</script>

<style scoped>
.spin{
  animation: spin 10s linear infinite;
}
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
