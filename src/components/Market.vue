<template>
  <v-container fill-height fluid class="pa-0" style="overflow-x: hidden;">

    <drawer :left="left" ></drawer>

    <v-navigation-drawer v-model="val"
      :width="width" height="calc(100vh - 150px)"
      class="px-2 py-0 text-xs-right elevation-0" :class="{ b: xsm, transparent: !xsm }"
      hide-overlay right :absolute="xsm" :fixed="!xsm" app>
      <h2 class="hidden-sm-and-down pa-3 enly">Filter</h2>
      <v-text-field class="hidden-sm-and-down px-3 pt-2" placeholder="Search" hint="Filter by name" prepend-icon="beach_access" append-icon="search"></v-text-field>
      <v-layout class="hidden-sm-and-down round1 mx-2" style="margin:0 -1em; overflow-x: scroll; -webkit-overflow-scrolling: touch;  overflow-y: hidden !important;">
        <v-btn class="ml-3" round depressed :color="home ? 'primary b--text' : ''" small @click="home = true, categories = false">home</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="mr-3" round depressed :color="categories ? 'primary b--text' : ''"  small @click="categories = true, home = false">Categories</v-btn>
      </v-layout>
    </v-navigation-drawer>
    <!-- scroll-off-screen :scroll-threshold="1" scroll-target="#marketplace" -->
    <v-toolbar v-if="xsm" fixed app class="transparent elevation-0" height="44">
      <v-toolbar-side-icon @click="left = !left"></v-toolbar-side-icon>
      <v-btn v-if="!search" icon disabled></v-btn>
      <v-toolbar-title v-if="!search" class="mx-auto enly">Enly</v-toolbar-title>

      <v-text-field hide-details autofocus single-line full-width height="10" v-if="search" class="pa-0" placeholder="Search"></v-text-field>
      <v-btn icon @click="search ? byCreator('id') : search = true"><v-icon>search</v-icon></v-btn>
      <v-menu offset-y transition="scale-transition" origin="top right">
        <v-btn icon slot="activator"><v-icon>wc</v-icon></v-btn>
         <v-list class="b2 round1">
           <v-list-tile
             v-for="j in ['Men', 'Women']"
             :key="j"
             @click="gender = ( j == 'Women' )"
           >
             <v-list-tile-title>{{ j }}</v-list-tile-title>
           </v-list-tile>
         </v-list>
       </v-menu>

       <v-layout slot="extension" style="margin:0 -1em; overflow-x: scroll; -webkit-overflow-scrolling: touch;  overflow-y: hidden !important;">
         <v-btn class="ml-3" round depressed :color="home ? 'primary b--text' : ''" small @click="home = true, categories = false">home</v-btn>
         <v-spacer></v-spacer>
         <v-btn class="mr-3" round depressed :color="categories ? 'primary b--text' : ''"  small @click="categories = true, home = false">Categories</v-btn>
       </v-layout>
    </v-toolbar>

    <v-layout row class="round1 scroll-y" style="overflow-x: hidden;">
      <v-flex class="text-xs-center scroll-y" style="overflow-x: hidden">
        <v-layout column class="text-xs-center scroll-y" style="margin: -4px; overflow-x: hidden;" >

          <v-flex v-if="home">
            <v-layout row wrap>
              <v-flex xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Everything', gender: gender } })" class="d-inline-block pa-1" style="height: 13em">
                <v-img v-ripple class="round1" height="100%" src="https://ak4.picdn.net/shutterstock/videos/12199724/thumb/1.jpg" lazy-src="https://ak4.picdn.net/shutterstock/videos/12199724/thumb/1.jpg">
                  <v-layout slot="placeholder" fill-height align-center justify-center>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                  <v-layout column style="height: 100%;">
                    <b class="white--text" style="position: absolute; left: 1em; top: 0.7em;text-shadow: 0 0 1em black;"><v-icon size="20" color="white">add</v-icon> 21 new collections</b>
                    <b class="white--text px-2 pink round1" style="position: absolute; left: 1em; bottom: 0.7em;">Sales! </b>
                    <h1 class="mx-auto my-auto white--text" style="font-size: 2em;">Shop Everything</h1>
                  </v-layout>
                </v-img>
              </v-flex>
              <v-flex v-if="gender" xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Prom Dresses', gender: gender } })" class="d-inline-block pa-1" style="height: 13em">
                <v-img v-ripple class="round1" height="100%" src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2019%2F02%2Fgettyimages-963399902_0.jpg%3Fitok%3DLUZ18rcK&q=85" lazy-src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2019%2F02%2Fgettyimages-963399902_0.jpg%3Fitok%3DLUZ18rcK&q=85">
                  <v-layout slot="placeholder" fill-height align-center justify-center>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                  <v-layout column style="height: 100%;">
                    <b class="white--text" style="position: absolute; left: 1em; top: 0.7em;text-shadow: 0 0 1em black;"><v-icon size="20" color="white">warning</v-icon> new collection</b>
                    <span class="white--text" style="position: absolute; right: 0em;text-shadow: 0 0 1em black;">from <b>Someone</b><v-avatar class="ma-2" size="30"><img src="https://www.shareicon.net/download/2016/05/26/771191_man_512x512.png"/></v-avatar></span>
                    <h1 class="mx-auto my-auto white--text" style="font-size: 2em; text-shadow: 0 0 1em black;">Prom Dresses</h1>
                  </v-layout>
                </v-img>
              </v-flex>
              <v-flex v-if="gender" xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Spring Style', gender: gender } })" class="d-inline-block pa-1" style="height: 13em">
                <v-img v-ripple class="round1" height="100%" src="https://images.unsplash.com/photo-1490023859957-aaf2fcc67fd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" lazy-src="https://images.unsplash.com/photo-1490023859957-aaf2fcc67fd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
                  <v-layout slot="placeholder" fill-height align-center justify-center>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                  <v-layout column style="height: 100%;">
                    <b class="white--text" style="position: absolute; left: 1em; top: 0.7em;text-shadow: 0 0 1em black;"><v-icon size="20" color="white">alarm</v-icon> limited edition</b>
                    <span class="white--text" style="position: absolute; right: 0em;text-shadow: 0 0 1em black;">from <b>Someone</b><v-avatar class="ma-2" size="30"><img src="https://mycs.net.au/wp-content/uploads/2016/03/person-icon-flat.png"/></v-avatar></span>
                    <b class="white--text px-2 pink round1" style="position: absolute; left: 1em; bottom: 0.7em;">Sales! </b>
                    <h1 class="mx-auto my-auto white--text" style="font-size: 2em; text-shadow: 0 0 1em black;">Spring Style</h1>
                  </v-layout>
                </v-img>
              </v-flex>
              <v-flex v-if="!gender" xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Prom Tuxedos', gender: gender } })" class="d-inline-block pa-1" style="height: 13em">
                <v-img v-ripple class="round1" height="100%" src="https://www.tttux.com/wp-content/uploads/2018/03/tux-guide.jpg" lazy-src="https://www.tttux.com/wp-content/uploads/2018/03/tux-guide.jpg">
                  <v-layout slot="placeholder" fill-height align-center justify-center>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                  <v-layout column style="height: 100%;">
                    <b class="white--text" style="position: absolute; left: 1em; top: 0.7em;text-shadow: 0 0 1em black;"><v-icon size="20" color="white">warning</v-icon> new collection</b>
                    <span class="white--text" style="position: absolute; right: 0em;text-shadow: 0 0 1em black;">from <b>Someone</b><v-avatar class="ma-2" size="30"><img src="https://www.shareicon.net/download/2016/05/26/771191_man_512x512.png"/></v-avatar></span>
                    <h1 class="mx-auto my-auto white--text" style="font-size: 2em; text-shadow: 0 0 1em black;">Prom Tuxedos</h1>
                  </v-layout>
                </v-img>
              </v-flex>
              <v-flex v-if="!gender" xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Beach Week', gender: gender } })" class="d-inline-block pa-1" style="height: 13em">
                <v-img v-ripple class="round1" height="100%" src="https://images.unsplash.com/photo-1554437040-2029bdb9e13c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" lazy-src="https://images.unsplash.com/photo-1554437040-2029bdb9e13c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
                  <v-layout slot="placeholder" fill-height align-center justify-center>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                  <v-layout column style="height: 100%;">
                    <b class="white--text" style="position: absolute; left: 1em; top: 0.7em;text-shadow: 0 0 1em black;"><v-icon size="20" color="white">shopping_basket</v-icon> 27 new items</b>
                    <span class="white--text" style="position: absolute; right: 0em;text-shadow: 0 0 1em black;">from <b>Designer</b><v-avatar class="ma-2" size="30"><img src="https://image.flaticon.com/icons/png/128/236/236831.png"/></v-avatar></span>
                    <h1 class="mx-auto my-auto white--text" style="font-size: 2em; text-shadow: 0 0 1em black;">Beach Week</h1>
                  </v-layout>
                </v-img>
              </v-flex>
              <v-flex v-if="gender" xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Party Collection', gender: gender } })" class="d-inline-block pa-1" style="height: 13em">
                <v-img v-ripple class="round1" height="100%" src="https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
                  <v-layout slot="placeholder" fill-height align-center justify-center>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                  <v-layout column style="height: 100%;">
                    <b class="white--text" style="position: absolute; left: 1em; top: 0.7em;text-shadow: 0 0 1em black;"><v-icon size="20" color="white">alarm</v-icon> limited edition</b>
                    <span class="white--text" style="position: absolute; right: 0em;text-shadow: 0 0 1em black;">from <b>Hexant</b><v-avatar class="ma-2 black" size="30"><img src="https://hexant-apparel.firebaseapp.com/favicon.png"/></v-avatar></span>
                    <b class="white--text px-2 pink round1" style="position: absolute; left: 1em; bottom: 0.7em;">Sales! </b>
                    <h1 class="mx-auto my-auto white--text" style="font-size: 2em; text-shadow: 0 0 1em black;">Party Collection</h1>
                  </v-layout>
                </v-img>
              </v-flex>
              <v-flex xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Colour Splash', gender: gender } })" class="d-inline-block pa-1" style="height: 13em">
                <v-img v-ripple class="round1" height="100%" src="https://images.unsplash.com/photo-1504060765228-f97d1772ff9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" lazy-src="https://images.unsplash.com/photo-1504060765228-f97d1772ff9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
                  <v-layout slot="placeholder" fill-height align-center justify-center>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                  <v-layout column style="height: 100%;">
                    <b class="white--text" style="position: absolute; left: 1em; top: 0.7em;text-shadow: 0 0 1em black;"><v-icon size="20" color="white">warning</v-icon> new collection</b>
                    <span class="white--text" style="position: absolute; right: 0em;text-shadow: 0 0 1em black;">from <b>Someone</b><v-avatar class="ma-2" size="30"><img src="https://www.shareicon.net/download/2016/05/26/771191_man_512x512.png"/></v-avatar></span>
                    <h1 class="mx-auto my-auto white--text" style="font-size: 2em; text-shadow: 0 0 1em black;">Colour Splash</h1>
                  </v-layout>
                </v-img>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex class="round1 text-xs-left" v-if="categories">
            <v-layout column>
              <v-layout row class="pa-3 red white--text" @click="$router.push({ name: 'items', params: { designer: 'Sale', gender: gender } })" style="background: url('https://us.123rf.com/450wm/geckly/geckly0908/geckly090800036/5415350-sale-background-in-red-tints.jpg?ver=6') 50% 50%; background-size:cover;"><h1>Sale</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 deep-orange white--text" @click="$router.push({ name: 'items', params: { category: 'New In', gender: gender } })"><h1>New in</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 orange white--text" @click="$router.push({ name: 'items', params: { category: 'Featured', gender: gender } })"><h1>Featured</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 amber white--text" @click="$router.push({ name: 'items', params: { designer: '3D Clothing', gender: gender } })"><h1>3D Clothing</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 lime white--text" @click="$router.push({ name: 'items', params: { category: 'Shoes', gender: gender } })"><h1>Shoes</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 green white--text" @click="$router.push({ name: 'items', params: { category: 'Activewear', gender: gender } })"><h1>Activewear</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 teal white--text" @click="$router.push({ name: 'items', params: { category: 'Swimwear', gender: gender } })"><h1>Swimwear</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 cyan white--text" @click="$router.push({ name: 'items', params: { category: 'Brands', gender: gender } })"><h1>Brands</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 light-blue white--text" @click="$router.push({ name: 'items', params: { category: 'Outlet', gender: gender } })"><h1>Outlet</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 blue white--text" @click="$router.push({ name: 'items', params: { category: 'Accesories', gender: gender } })"><h1>Accesories</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 indigo white--text" @click="$router.push({ name: 'items', params: { category: 'Handbags', gender: gender } })"><h1>Handbags</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
              <v-layout row class="pa-3 purple white--text" @click="$router.push({ name: 'items', params: { category: 'Jewelry', gender: gender } })"><h1>Jewelry</h1> <v-spacer></v-spacer> <v-icon color="white">keyboard_arrow_right</v-icon></v-layout>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-flex>
    </v-layout>
    <v-btn fixed style="bottom:0; height: 44px !important;" block v-if="!user" to="/" large class="my-0 primary b--text" light :loading="loading"><b>Get Started</b></v-btn>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      search: false,
      home: true,
      categories: false,
      designer: '',
      category: '',
      gender: null,
      left: false,
      right: false
    }
  },
  mounted () {
    this.gender = this.user.gender
    console.log(this.user)
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    },
    width () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return window.innerWidth
        case 'sm': return window.innerWidth
        case 'md': return window.innerWidth / 4
        case 'lg': return window.innerWidth / 4
      }
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
    }
  },
  methods: {
    byCategory () {
    },
    byCreator () {
      this.$store.dispatch('setItemsByCreator', {creator: 'id', gender: this.gender})
    }
  }
}
</script>

<style scoped>
.home {
 background-position:center;
 background-size: cover;
}
.v-toolbar__content{
  padding: 0 0 !important;
}
</style>
