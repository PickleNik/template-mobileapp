<template lang="html">
  <v-container fill-height fluid class="pa-0 round1">

    <drawer :left="left" ></drawer>
    <v-toolbar fixed app class="b elevation-0" height="44">
      <v-toolbar-side-icon @click="left = !left" class="f--text"></v-toolbar-side-icon>
      <v-toolbar-title class="mx-auto" style="cursor: pointer">Friends</v-toolbar-title>
      <v-btn icon color="f--text" class="setting"><v-icon>add</v-icon></v-btn>
    </v-toolbar>
    <v-layout row class="round1 scroll-y">
      <v-flex class="text-xs-center round1 scroll-y">
        <v-text-field class="px-3 pt-2" placeholder="Search" prepend-icon="search"></v-text-field>
        <v-list subheader class="b">
          <v-subheader>Recent chat</v-subheader>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            avatar
            @click=""
          >
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon :color="item.active ? 'primary' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list subheader class="b">
          <v-subheader>A</v-subheader>

          <v-list-tile
            v-for="item in items2"
            :key="item.title"
            avatar
            @click=""
          >
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>

        <v-list subheader class="b">
          <v-subheader>T</v-subheader>

          <v-list-tile
            v-for="item in items3"
            :key="item.title"
            avatar
            @click=""
          >
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false,
      items: [
        { active: true, title: 'Andrew Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: true, title: 'Thomas Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Alice Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
      ],
      items2: [
        // { title: 'Ahmed Ahmedov', avatar: 'https://static-secure.guim.co.uk/sys-images/Guardian/Pix/pictures/2000/10/24/Osama.gif' },
        { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { active: true, title: 'Andrew Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' }
      ],
      items3: [
        { active: true, title: 'Thomas Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        // { title: 'Trump Donald', avatar: 'https://i.pinimg.com/236x/9f/55/b9/9f55b9acf55fc8d45c6601f0d203dacf--kiss-face-donald-trump.jpg' },
        { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
