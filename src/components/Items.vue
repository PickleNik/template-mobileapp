<template>
  <v-container fill-height fluid class="pa-0" style="overflow-x: hidden;">

    <drawer :left="left" ></drawer>

    <v-navigation-drawer v-model="val"
      :width="width" height="calc(100vh - 150px)"
      class="px-2 py-0 text-xs-right elevation-0" :class="{ b: xsm, transparent: !xsm }"
      hide-overlay right :absolute="xsm" :fixed="!xsm" app>
      <h2 class="hidden-sm-and-down pa-3 enly">Filter</h2>
      <v-layout class="hidden-sm-and-down round1 mx-2" style="margin:0 -1em; overflow-x: scroll; -webkit-overflow-scrolling: touch;  overflow-y: hidden !important;">
        <v-btn v-if="market" v-for="type in types" :key="type" round depressed small @click="activeType = type" :color="type === activeType ? 'primary b--text' : ''">{{ type }}</v-btn>
      </v-layout>
        <v-list class="mt-2">
          <v-list-group
          v-for="f in filter"
          v-model="f.active"
          :key="f.title"
          :prepend-icon="f.action"
          no-action active-class="pink--text">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ f.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
            v-for="prop in f.props"
            :key="prop.title"
            @click=""
            >
            <v-list-tile-content>
              <v-list-tile-title>{{ prop.title }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>{{ prop.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar v-if="xsm" fixed app class="b elevation-0" height="44">
      <v-toolbar-side-icon @click="left = !left"></v-toolbar-side-icon>

      <v-toolbar-side-icon v-if="market" @click="$router.go(-1)"><v-icon>keyboard_arrow_left</v-icon></v-toolbar-side-icon>
      <v-toolbar-title v-if="market"  class="enly mx-auto">{{ $route.params.designer ?  $route.params.designer : $route.params.category }}</v-toolbar-title>

      <v-btn icon disabled></v-btn>
      <v-btn icon v-if="market" @click="right = !right"><v-icon>search</v-icon></v-btn>

       <v-layout slot="extension" style="margin:0 -1em; overflow-x: scroll; -webkit-overflow-scrolling: touch;  overflow-y: hidden !important;">
         <v-btn v-if="!market" class="ml-3" round depressed :color="home ? 'primary b--text' : ''" small @click="home = true, categories = false">home</v-btn>
         <v-spacer v-if="!market"></v-spacer>
         <v-btn v-if="!market" class="mr-3" round depressed :color="categories ? 'primary b--text' : ''"  small @click="categories = true, home = false">Categories</v-btn>
         <v-btn v-if="market" v-for="type in types" :key="type" round depressed small @click="activeType = type" :color="type === activeType ? 'primary b--text' : ''">{{ type }}</v-btn>
       </v-layout>
    </v-toolbar>

    <v-layout row class="round1 scroll-y" style="overflow-x: hidden;">
      <v-flex class="text-xs-center scroll-y" style="overflow-x: hidden">
        <v-layout column class="text-xs-center scroll-y" style="margin: -4px; overflow-x: hidden;" >

          <v-flex>
            <v-layout v-if="market && items" row wrap>
              <item class="item zoom" v-for="item in items" :key="item.name" :item="item" @click.native="openItem = item, dialog = true" ></item>
            </v-layout>
          </v-flex>

          <v-flex v-if="loading && market && !items">
            <v-progress-circular class="mt-3" size="300" :width="30" color="primary" indeterminate ></v-progress-circular>
          </v-flex>

        </v-layout>
      </v-flex>
    </v-layout>
    <v-btn fixed style="bottom:0; height: 44px !important;" block v-if="!user" to="/" large class="my-0 primary b--text" light :loading="loading"><b>Get Started</b></v-btn>
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
      <item-dialog :item="openItem" :items="items"></item-dialog>
    </v-dialog>
</v-container>
</template>

<script>

export default {
  props: ['designer', 'gender'],
  data () {
    return {
      market: true,
      activeType: 'View All',
      dialog: false,
      left: false,
      right: false,
      openItem: { sizes: [''], colors: [''], pics: [''], price: '', creator: '', name: '', sale: 0, id: 0 },
      types: ['View All', 'New In', 'Hoodies', 'Jackets', 'Jeans', 'Pants', 'Shorts', 'Shirts', 'Socks', 'Shoes', 'Suits', 'Sweaters', 'Unedrwear'],
      filter: [
        {
          action: 'loyalty',
          title: 'Sales',
          props: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'local_activity',
          title: 'Brand',
          props: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'color_lens',
          title: 'Color',
          props: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'attach_money',
          title: 'Price',
          props: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'open_with',
          title: 'Size',
          props: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'list',
          title: 'Type',
          props: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'brightness_7',
          title: 'Season',
          props: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'account_circle',
          title: 'Designer',
          props: [
            { title: 'List Item' }
          ]
        }
      ]
    }
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
    },
    items () {
      return this.$store.getters.items
    }
  },
  mounted () {
    if (this.designer === 'Sale') this.$store.dispatch('setItemsOnSale')
    else if (this.designer === '3D Clothing') this.$store.dispatch('setItems3D')
    else this.$store.dispatch('setItemsByCreator', {creator: 'id', gender: this.$route.params.gender})
  }
  // methods: {
  //   byCategory () {
  //   },
  //   byCreator () {
  //     this.$store.dispatch('setItemsByCreator', {creator: this.designer})
  //   }
  // }
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
