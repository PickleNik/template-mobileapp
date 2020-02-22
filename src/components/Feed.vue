<template>
  <v-container fill-height fluid class="pa-0">

    <drawer :left="left" ></drawer>

    <v-toolbar fixed app v-if="xsm" class="transparent elevation-0" height="44">
      <v-toolbar-side-icon @click="left = !left" class="text--text"></v-toolbar-side-icon>
      <v-toolbar-title class="mx-auto" style="cursor: pointer">
        <v-menu offset-y transition="slide-y-transition">
           <v-btn flat v-ripple="false" slot="activator">
             Friends <v-icon>keyboard_arrow_down</v-icon>
           </v-btn>
           <v-list class="b2 round1">
             <v-list-tile
               v-for="f in feeds"
               :key="f.name"
               @click=""
             >
               <v-list-tile-title>{{ f.name }}</v-list-tile-title>
             </v-list-tile>
           </v-list>
         </v-menu>
      </v-toolbar-title>
      <v-btn icon color="f--text"><v-icon>search</v-icon></v-btn>
    </v-toolbar>

    <v-layout class="round1 b3 scroll-y">
      <v-flex xs12 md6 class="text-xs-center round1 scroll-y">
        <v-layout column class="text-xs-center round1 scroll-y">
          <v-flex class="b round1">
            <v-layout column>
              <v-layout row>
                <v-avatar size="4em" class="ma-3" :style="{ backgroundImage: 'url(' + user.photo + ')' }" style="background-size: cover"></v-avatar>
                <v-flex xs5 class="mx-auto"><v-text-field box background-color="b" class="text-xs-center" placeholder="New Post"></v-text-field></v-flex>
                <v-btn fab flat color="pink" class="mt-3"><v-icon>add</v-icon></v-btn>
              </v-layout>
              <v-layout row>
                <v-btn icon flat color="title" class="mx-auto"><v-icon>photo_camera</v-icon></v-btn>
                <v-btn icon flat color="title" class="mx-auto"><v-icon>accessibility_new</v-icon></v-btn>
                <v-btn icon flat color="title" class="mx-auto"><v-icon>change_history</v-icon></v-btn>
                <v-btn icon flat color="title" class="mx-auto"><v-icon>group</v-icon></v-btn>
                <v-btn icon flat color="title" class="mx-auto"><v-icon>settings</v-icon></v-btn>
              </v-layout>
            </v-layout>
          </v-flex>

          <v-divider class="b3 py-1"></v-divider>

          <v-flex class="b round1">
            <v-layout column class="text-xs-left">
                <v-layout class="px-3 pt-3">
                  <v-avatar size="4em" style="background: url('https://image.flaticon.com/icons/png/128/236/236831.png'); background-size: cover;"></v-avatar>
                  <v-layout column class="pa-2">
                    <h3 class="pink--text">Designer</h3>
                    <span class="text--text">Feb 8 at 4:20PM</span>
                  </v-layout>
                <v-btn @click="sheet=!sheet" icon flat color="pink" class="ma-0"><v-icon>more_horiz</v-icon></v-btn>
              </v-layout>
              <span class="px-3">My New Beach Week Collection!</span>
              <v-flex xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Beach Week', gender: false } })" class="d-inline-block pa-1" style="height: 13em">
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
              <v-layout>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>share</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>comment</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark @click="like = !like"><v-icon :class="{ 'primary--text': like }">{{ like ? 'favorite' : 'favorite_border' }}</v-icon></v-btn>
              </v-layout>
            </v-layout>
          </v-flex>

          <v-divider class="b3 py-1"></v-divider>

          <v-flex class="b round1">
            <v-layout column class="text-xs-left">
                <v-layout class="px-3 pt-3">
                  <v-avatar size="4em" style="background: url('https://cdn0.iconfinder.com/data/icons/avatar-78/128/7-512.png'); background-size: cover;"></v-avatar>
                  <v-layout column class="pa-2">
                    <h3 class="pink--text">Average User</h3>
                    <span class="text--text">Apr 20 at 4:20PM</span>
                  </v-layout>
                <v-btn @click="sheet=!sheet" icon flat color="pink" class="ma-0"><v-icon>more_horiz</v-icon></v-btn>
              </v-layout>
              <span class="px-3">Found my perfect prom dress</span>
              <v-img class="mt-2 mx-1 round1" style="max-width: 100vw; border-bottom-right-radius: 0em !important; border-bottom-left-radius: 0em !important;" src="https://www.dressywomen.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/4/04016509.jpg"></v-img>

              <v-flex xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Prom Dresses', gender: 'true' } })" class="d-inline-block pa-1" style="height: 13em">
                <v-img v-ripple class="round1" style="border-top-right-radius: 0em !important;border-top-left-radius: 0em !important;" height="100%" src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2019%2F02%2Fgettyimages-963399902_0.jpg%3Fitok%3DLUZ18rcK&q=85" lazy-src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2019%2F02%2Fgettyimages-963399902_0.jpg%3Fitok%3DLUZ18rcK&q=85">
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
              <v-layout>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>share</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>comment</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark @click="like = !like"><v-icon :class="{ 'primary--text': like }">{{ like ? 'favorite' : 'favorite_border' }}</v-icon></v-btn>
              </v-layout>
            </v-layout>
          </v-flex>

          <v-divider class="b3 py-1"></v-divider>

          <v-flex class="b round1">
            <v-layout column class="text-xs-left">
              <v-layout class="px-3 pt-3">
                <v-avatar size="4em" class="ava"></v-avatar>
                <v-layout column class="pa-2">
                  <h3 class="pink--text">Designer</h3>
                  <span>Jul 80 at 4:20AM</span>
                </v-layout>
                <v-btn @click="sheet=!sheet" icon flat color="pink" class="ma-0"><v-icon>more_horiz</v-icon></v-btn>
              </v-layout>

              <span class="px-3">Sales on my new collection</span>

              <v-layout row style="overflow-x:scroll;">
                <item style="min-width: 15em;" v-for="item in items" @click.native="openItem = item, dialog = true" :key="item.name" :item="item"></item>
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
              </v-layout>

              <v-layout>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>share</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>comment</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark @click="like = !like"><v-icon :class="{ 'primary--text': like }">{{ like ? 'favorite' : 'favorite_border' }}</v-icon></v-btn>
              </v-layout>
            </v-layout>
          </v-flex>

          <v-divider class="b3 py-1"></v-divider>

          <v-flex class="b round1">
            <v-layout column class="text-xs-left">
              <v-layout class="px-3 pt-3">
                <v-avatar size="4em" :style="{ backgroundImage: 'url(' + user.photo + ')' }" style="background-size: cover"></v-avatar>
                <v-layout column class="pa-2">
                  <h3 class="pink--text">{{ user.name }}</h3>
                  <span class="text--text">Jun 22 at 4:20</span>
                </v-layout>
                <v-btn @click="sheet=!sheet" icon flat color="pink" class="ma-0"><v-icon>more_horiz</v-icon></v-btn>
              </v-layout>
              <span class="px-3">Text</span>
              <v-img class="mt-2 round1" style="max-width: 100vw;" src="https://i.pinimg.com/originals/8f/f4/47/8ff44710fdfa2222fcf6a3e29f1419ef.gif"></v-img>
              <v-layout>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>share</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>comment</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark @click="like = !like"><v-icon :class="{ 'primary--text': like }">{{ like ? 'favorite' : 'favorite_border' }}</v-icon></v-btn>
              </v-layout>
            </v-layout>
          </v-flex>

          <v-divider class="b3 py-1"></v-divider>

          <v-flex class="b round1">
            <v-layout column class="text-xs-left">
              <v-layout class="px-3 pt-3">
                <v-avatar size="4em" :style="{ backgroundImage: 'url(' + 'https://scontent-cdg2-1.cdninstagram.com/vp/17038a5539154a8c6e223bf1d506a9e4/5D3DCD59/t51.2885-19/s150x150/50055471_619994218422235_7211194968373723136_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com' + ')' }" style="background-size: cover"></v-avatar>
                <v-layout column class="pa-2">
                  <h3 class="pink--text">☭ Valentyn Bolotin ☭</h3>
                  <span class="text--text">July 1 at 4:20</span>
                </v-layout>
                <v-btn @click="sheet=!sheet" icon flat color="pink" class="ma-0"><v-icon>more_horiz</v-icon></v-btn>
              </v-layout>
              <span class="px-3">Love is love, #betrue 🏳️‍🌈</span>
              <v-layout>
                <v-img class="mt-2 ml-1" style="max-width: 100vw;border-top-left-radius: 1em;" src="https://pp.userapi.com/c855628/v855628592/8b2ab/ePxbMY-EoQ0.jpg"></v-img>
                <v-img class="mt-2 ml-1 mr-1" style="max-width: 100vw;border-top-right-radius: 1em;" src="https://pp.userapi.com/c850036/v850036592/1c5d74/OrqdWfIOrH4.jpg"></v-img>
              </v-layout>
              <v-flex xs12 sm6 md6 xl4 @click="$router.push({ name: 'items', params: { designer: 'Prom Dresses', gender: 'true' } })" class="d-inline-block pa-1" style="height: 13em">
                <v-img v-ripple gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.33)" class="round1" style="border-top-right-radius: 0em !important;border-top-left-radius: 0em !important;" height="100%" src="https://s2.reutersmedia.net/resources/r/?m=02&d=20190630&t=2&i=1403161250&r=LYNXNPEF5T10E&w=940" lazy-src="https://s2.reutersmedia.net/resources/r/?m=02&d=20190630&t=2&i=1403161250&r=LYNXNPEF5T10E&w=940">
                  <v-layout slot="placeholder" fill-height align-center justify-center>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                  <v-layout column style="height: 100%;">
                    <b class="white--text" style="position: absolute; left: 1em; top: 0.7em;text-shadow: 0 0 1em black;"><v-icon size="20" color="white">alarm</v-icon> limited edition</b>
                    <h1 class="mx-auto my-auto white--text" style="font-size: 2em; text-shadow: 0 0 1em black;">All Pride Gear</h1>
                  </v-layout>
                </v-img>
              </v-flex>
              <v-layout>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>share</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>comment</v-icon></v-btn>
                <v-btn icon flat class="mx-auto" color="title" dark @click="like = !like"><v-icon :class="{ 'primary--text': like }">{{ like ? 'favorite' : 'favorite_border' }}</v-icon></v-btn>
              </v-layout>
            </v-layout>
          </v-flex>

          <v-divider class="b3 py-1"></v-divider>

          <v-flex class="text-xs-center b--text pa-3"><h1><v-icon color="b" class="mb-1" size="30">done_all</v-icon> End of the Feed <v-icon color="b" class="mb-1" size="30">tag_faces</v-icon></h1></v-flex>

        </v-layout>
      </v-flex>
    </v-layout>

    <v-bottom-sheet v-model="sheet">
      <v-list class="round1 pt-0">
        <v-layout row>
          <v-subheader>Options</v-subheader>
          <v-spacer></v-spacer>
          <v-btn @click="sheet = false" icon flat color="primary"><v-icon>close</v-icon></v-btn>
        </v-layout>
        <v-list-tile>
          <v-list-tile-action><v-icon color="blue">edit</v-icon></v-list-tile-action>
          <v-list-tile-title>Edit Post</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action><v-icon color="success">person_pin</v-icon></v-list-tile-action>
          <v-list-tile-title>Tag People</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action><v-icon color="amber">bookmark_outline</v-icon></v-list-tile-action>
          <v-list-tile-title>Save to Bookmarks</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action><v-icon color="orange">link</v-icon></v-list-tile-action>
          <v-list-tile-title>Copy link</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action><v-icon color="error">delete_outline</v-icon></v-list-tile-action>
          <v-list-tile-title>Delete Post</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>

  </v-container>
</template>

<script>
export default {
  data () {
    return {
      sheet: false,
      dialog: false,
      openItem: { sizes: ['error'], colors: ['error'], pics: ['error'], price: 'error', creator: 'error', name: 'error', sale: true, id: -420 },
      color: '', // to be removed
      size: '', // same as color
      like: false,
      left: false,
      right: false,
      feeds: [
        { name: 'All News' },
        { name: 'Friends' },
        { name: 'Designers' },
        { name: 'Popular' },
        { name: 'Salses' }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('setItemsByCreator', {creator: 'id'})
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    user () {
      return this.$store.getters.user
    },
    items () {
      return this.$store.getters.items
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
  }
}
</script>

<style scoped>
</style>
