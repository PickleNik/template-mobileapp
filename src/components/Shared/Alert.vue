<template>
  <v-alert :value="error" color="pink" class="ma-2 pa-1" style="border-radius: 1em;">
    <v-layout>
      <v-flex xs10>
        <h3 class="pa-2" style="text-align: justify">{{ error }}</h3>
      </v-flex>
      <v-btn fixed right icon @click="dismiss" color="pink darken-2"><v-icon>close</v-icon></v-btn>
    </v-layout>
  </v-alert>
</template>

<script>
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  methods: {
    dismiss () {
      this.$store.dispatch('setError', false)
    }
  }
}
</script>

<style scoped>
</style>
