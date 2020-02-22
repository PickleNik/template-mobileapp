<template>
  <v-container fill-height fluid class="pa-0">

    <drawer :left="left"></drawer>

    <v-toolbar fixed app class="b elevation-0" height="44">
      <v-toolbar-side-icon @click="left = !left" class="f--text"></v-toolbar-side-icon>
      <v-toolbar-title class="mx-auto enly" style="cursor: pointer">Enly</v-toolbar-title>
      <v-btn icon flat to="/settings"><v-icon>settings</v-icon></v-btn>
    </v-toolbar>

    <v-layout column class="round1 b3 scroll-y">
      <v-flex class="text-xs-center round1 scroll-y">
        <v-layout column class="text-xs-center round1 scroll-y">
          <v-flex class="b round1">
            <v-layout column>
              <v-layout row class="pa-3">
                <v-avatar size="7em" class="rollIn b3" :style="{ backgroundImage: 'url(' + photoSRC + ')' }" :loading="loading" style="background-size: cover">
                  <input style="display: none;" type="file" accept="image/*" @change="onImageInput" ref="imageInput">
                  <v-btn v-if="editProfile" large icon flat color="primary" @click.native="$refs.imageInput.click()"><v-icon large>edit</v-icon></v-btn>
                </v-avatar>
                <v-layout v-if="!editProfile" column class="text-xs-left my-4 ml-3">
                  <h2 class="primary--text">{{ user.name }}</h2>
                  <span class="text--text">online <v-icon small color="pink">phone_iphone</v-icon></span>
                </v-layout>
                <v-spacer></v-spacer>
                <v-flex xs6 sm8 md6 lg8 v-if="editProfile" class="pa-3"><v-text-field clearable label="Username" v-model="user.name"></v-text-field></v-flex>
                <v-spacer></v-spacer>
                <v-btn v-if="!editProfile" fab flat class="my-4" color="primary" @click="editProfile = !editProfile"><v-icon>edit</v-icon></v-btn>
                <v-btn v-if="editProfile && !photo" fab flat class="my-4" color="error" @click="editProfile = !editProfile"><v-icon>close</v-icon></v-btn>
                <v-btn v-if="editProfile && photo" fab flat class="my-4" color="success" @click="photoChange" :loading="loading" :disabled="loading"><v-icon>done</v-icon></v-btn>
              </v-layout>
              <!-- <v-btn round outline color="text">Edit Profile</v-btn> -->
              <v-layout row class="py-2 px-2" style="overflow-x: scroll;">
                <v-flex style="min-width: 5em;" class="mx-2"><v-layout column>
                  <h2>420</h2>
                  <span>Friends</span>
                </v-layout></v-flex>
                <v-flex style="min-width: 5em;" class="mx-2"><v-layout column>
                  <h2>240</h2>
                  <span>Followers</span>
                </v-layout></v-flex>
                <v-flex style="min-width: 5em;" class="mx-2"><v-layout column>
                  <h2>1</h2>
                  <span>Posts</span>
                </v-layout></v-flex>
                <v-flex style="min-width: 5em;" class="mx-2"><v-layout column>
                  <h2>0</h2>
                  <span>Outfits</span>
                </v-layout></v-flex>
                <v-flex style="min-width: 5em;" class="mx-2"><v-layout column>
                  <h2>{{ Object.keys(wish).length }}</h2>
                  <span>Wishes</span>
                </v-layout></v-flex>
                <v-flex style="min-width: 5em;" class="mx-2"><v-layout column>
                  <h2>{{ Object.keys(cart).length }}</h2>
                  <span>In Cart</span>
                </v-layout></v-flex>
                <v-flex style="min-width: 5em;" class="mx-2"><v-layout column>
                  <h2>0</h2>
                  <span>In Closet</span>
                </v-layout></v-flex>
              </v-layout>
              <!-- <v-divider class="b mx-2"></v-divider>
              <span class="pa-2 text-xs-left title--text">{{ items.length }} in closet</span>
              <v-layout row class="mb-2 px-2" style="overflow-x: scroll;">
                <v-flex v-if="items" v-for="item in items" :key="item.name" @click="dialog = true" class="d-inline-block mr-2 zoom item" style="min-width:7em;">
                  <v-flex class="img-closet round1 b" :style="{ backgroundImage: 'url(' + item.pics[1] + ')' }"></v-flex>
                </v-flex>
                <v-flex v-if="!items" @click="dialog = true" class="d-inline-block mr-2 zoom item" style="min-width:7em;">
                  <v-flex class="img-closet round1 b" ></v-flex>
                </v-flex>
              </v-layout> -->
            </v-layout>
          </v-flex>

          <v-divider class="b3 py-1"></v-divider>

          <v-flex class="b round1">
            <v-layout column>
              <v-layout row>
                <v-avatar size="4em" class="b3 ma-3" :style="{ backgroundImage: 'url(' + user.photo + ')' }" style="background-size: cover"></v-avatar>
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
                <v-avatar size="4em" :style="{ backgroundImage: 'url(' + user.photo + ')' }" style="background-size: cover"></v-avatar>
                <v-layout column class="pa-2">
                  <h3 class="pink--text">{{ user.name }}</h3>
                  <span class="text--text">Jun 22 at 4:20</span>
                </v-layout>
                <v-btn @click="sheet=!sheet" icon flat color="pink" class="ma-0"><v-icon>more_horiz</v-icon></v-btn>
              </v-layout>
              <span class="px-3">Low prices!</span>
              <v-layout class="px-3 mt-2">
                <v-avatar size="4em" style="background: url('https://image.flaticon.com/icons/png/128/236/236831.png'); background-size: cover;"></v-avatar>
                <v-layout column class="pa-2">
                  <h3 class="pink--text"><v-icon small class="grey--text mb-1">reply</v-icon> Designer</h3>
                  <span class="text--text">Feb 8 at 4:20PM</span>
                </v-layout>
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
                <v-btn icon flat class="mx-auto" color="title" dark><v-icon>favorite_border</v-icon></v-btn>
              </v-layout>
            </v-layout>
          </v-flex>

          <v-divider class="b3 py-1"></v-divider>

          <v-flex class="b round1 b3--text pa-5"><h1>The End ?</h1></v-flex>

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
      editProfile: false,
      photo: null,
      like: false,
      left: false,
      right: false
    }
  },
  methods: {
    onImageInput (event) {
      this.photo = new Blob([event.target.files[0]], {type: 'image/jpg'})
    },
    photoChange () {
      this.$store.dispatch('userChangePhoto', this.photo)
      this.editProfile = false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
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
    photoSRC () {
      return this.photo ? URL.createObjectURL(this.photo) : this.$store.getters.user.photo
    }
  }
}
</script>

<style scoped>
.img-closet{
  background-size: contain;
  background-position: center;
  height: 7em;
  width: 7em;
}
</style>
