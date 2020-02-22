<template>
  <v-layout column class="text-xs-left">
    <v-layout class="pa-3">
      <v-avatar size="4em" class="ava"></v-avatar>
      <v-layout column class="pa-2">
        <h3 class="pink--text">User Name</h3>
        <span>Jun 22 at 4:20</span>
      </v-layout>
      <v-btn icon flat color="pink" class="ma-0"><v-icon>more_horiz</v-icon></v-btn>
    </v-layout>
    <span class="px-3">Watch my perfect outfit</span>
    <img class="mt-2" style="max-width: 100vw;" src="https://i.pinimg.com/originals/8f/f4/47/8ff44710fdfa2222fcf6a3e29f1419ef.gif">
    <v-layout>
      <v-btn icon flat class="mx-auto" color="pink" dark><v-icon>favorite</v-icon></v-btn>
      <v-btn icon flat class="mx-auto" color="a" dark><v-icon>comment</v-icon></v-btn>
      <v-btn icon flat class="mx-auto" color="a" dark><v-icon>share</v-icon></v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
