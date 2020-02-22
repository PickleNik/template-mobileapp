<template>
  <v-container v-if="!loading" fluid fill-height class="text-xs-center">
    <img src="../assets/lines.png" class="i1" width="200" height="200"/>
    <img src="../assets/lines.png" class="i2" width="200" height="200"/>
    <v-btn to="/market"fixed bottom left right round depressed color="zoom b3 text--text" style="animation-delay: 2s; position: absolute;">Skip to Marketplace</v-btn>
    <v-flex v-if="!loading" xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 class="zoom text-xs-center">
      <v-btn to="/signup" round large color="primary b--text" light>Get Started</v-btn><br>
      <v-btn to="/signin" round outline color="primary dark">Login</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/market')
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="css">
.i1 {
  z-index: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  opacity: 0;
  transform: rotateZ(-45deg) translateX(-20%);
  animation: slideIni1 1s ease 1 forwards;
}
.i2 {
  z-index: 0;
  position: fixed;
  top: 0;
  right: 0;
  opacity: 0;
  transform: rotateZ(-225deg) translateX(-22%);
  animation: slideIni2 1s ease 1 forwards;
}
</style>
