<template>
  <v-container fill-height fluid class="pa-0 round1 scroll-y" >
    <drawer :left="left" ></drawer>

    <v-toolbar fixed app class="transparent elevation-0" height="44">
      <v-toolbar-side-icon @click="left = !left"></v-toolbar-side-icon>
      <v-toolbar-title class="mx-auto enly" style="cursor: pointer">Enly</v-toolbar-title>
      <v-btn icon @click="right = !right"><v-icon>pages</v-icon></v-btn>
    </v-toolbar>

    <v-layout column class="scroll-y round2">


    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
