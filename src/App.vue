<template>
  <v-app app :dark="!theme" class="b app" :class="{ lightTheme: theme }">

    <v-content style="max-height: 100vh"><router-view></router-view></v-content>

    <v-bottom-nav app height="62" v-if="user" fixed :value="xsm" class="pa-2 footer elevation-0 transparent">
      <v-btn v-ripple="false" to="/market" class="pa-0 mx-auto text--text v-btn--active">
        <v-icon>shopping_basket</v-icon>
      </v-btn>
      <v-btn v-ripple="false" to="/dressing" class="pa-0 mx-auto text--text v-btn--active">
        <v-icon>accessibility_new</v-icon>
      </v-btn>
      <v-btn v-ripple="false" to="/profile" class="pa-0 mx-auto text--text v-btn--active">
        <v-icon>person</v-icon>
      </v-btn>
      <v-btn v-ripple="false" to="/friends" class="pa-0 mx-auto text--text v-btn--active hidden-xs-only">
        <v-icon>group</v-icon>
      </v-btn>
      <v-btn v-ripple="false" to="/feed" class="pa-0 mx-auto text--text v-btn--active">
        <v-icon>dashboard</v-icon>
      </v-btn>
        <v-btn v-ripple="false" to="/cart" class="pa-0 mx-auto text--text v-btn--active">
          <v-badge color="primary" overlap :value="Object.keys(cart).length > 0" >
            <v-icon>shopping_cart</v-icon>
            <b slot="badge" class="f--text primary">{{ Object.keys(cart).length }}</b>
          </v-badge>
        </v-btn>
    </v-bottom-nav>

    <alert class="round2" style="position:fixed; bottom:0; left:0; width: calc(100% - 1em);z-index:999999;"></alert>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        nav: 3,
        offset: 0
      }
    },
    watch: {
      theme (value) {
        if (value === false) {
          document.getElementById('html').style.backgroundColor = '#222'
          this.$vuetify.theme.text = '#ddd'
          this.$vuetify.theme.title = '#aaa'
          this.$vuetify.theme.b = '#222'
          this.$vuetify.theme.b2 = '#333'
          this.$vuetify.theme.b3 = '#333'
        } else {
          document.getElementById('html').style.backgroundColor = '#000'
          this.$vuetify.theme.text = '#888'
          this.$vuetify.theme.title = '#aaa'
          this.$vuetify.theme.b = '#fff'
          this.$vuetify.theme.b2 = '#fff'
          this.$vuetify.theme.b3 = '#f8f8f8'
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      cart () {
        return this.$store.getters.cart
      },
      theme () {
        return this.$store.getters.theme
      },
      loading () {
        return this.$store.getters.loading
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
      // navWidth () {
      //   switch (this.$vuetify.breakpoint.name) {
      //     case 'xs': return '100%'
      //     case 'sm': return '50%'
      //     case 'md': return '30%'
      //     case 'lg': return '30%'
      //     case 'xl': return '20%'
      //   }
      // }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Kaushan+Script');
@import url('https://fonts.googleapis.com/css?family=Quicksand');
  *{
    font-family: 'Quicksand', sans-serif;
  }
  .enly {
    font-family: 'Kaushan Script', sans-serif;
  }
  :root {
    --primary: #e91e63;
    --title: #aaa;
    --text: #ddd;
    --background: #111;
  }
  .lightTheme {
    --text: #888;
  }
  .v-image__image{
    /* oh boy I love the next two lines */
    -webkit-transform: translate3d(0, 0, 0) translateZ(0);
    transform: translate3d(0, 0, 0) translateZ(0);
  }
  .scroll-y {
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-transform: translateZ(0);
    overflow-y: scroll; /* has to be scroll, not auto */
    -webkit-overflow-scrolling: touch;
  }
  html, body {
    height:100%;
    width: 100%;
    position: relative;
    overflow: hidden !important;
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    padding-bottom: constant(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-top);
    padding-left: constant(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
  }

  body {
    position: fixed;
  }
  html {
    background: #000;
  }
  .app{
    transition-duration: 1s;
    transition-timing-function:ease-in-out;
    transition-property: background-color;
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    padding-bottom: constant(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-top);
    padding-left: constant(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
  }
  /* IPHONE 6/7/8 */
  @media only screen
  and (min-device-width : 375px)
  and (max-device-width : 667px) {
    body {
      border-radius: 1em;
    }
    .app{
      border-radius: 1em;
    }
  }
  /* IPHONE 6/7/8 -S PLUS*/
  @media only screen
  and (min-device-width : 414px)
  and (max-device-width : 736px) {
    body {
      border-top-left-radius: 1em;
      border-radius: 1em;
    }
    .app{
      border-radius: 1em;
    }
  }
  /* Ipone X*/
  @media only screen
  and (device-width : 375px)
  and (device-height : 812px)
  and (-webkit-device-pixel-ratio : 3) {
    body {
    border-radius: 2em;
    }
    .app{
    border-radius: 2em;
    }
    /* .footer{
      margin-bottom: 1em;
      max-height: calc(50px - 1em) !important;
      padding: 0em !important;
    } */
  }
  @media only screen
  and (device-width : 414px)
  and (device-height : 896px)
  and (-webkit-device-pixel-ratio : 2) {
    body {
    border-radius: 2em;
    }
    .app{
    border-radius: 2em;
    }
    /* .footer{
      margin-bottom: 1em;
      max-height: calc(50px - 1em) !important;
      padding: 0em !important;
    } */
  }
  @media only screen
  and (device-width : 375px)
  and (device-height : 812px)
  and (-webkit-device-pixel-ratio : 3) {
    body {
    border-radius: 2em;
    }
    .app{
    border-radius: 2em;
    }
    /* .footer{
      margin-bottom: 1em;
      max-height: calc(50px - 1em) !important;
      padding: 0em !important;
    } */
  }
  @media only screen
  and (device-width : 414px)
  and (device-height : 896px)
  and (-webkit-device-pixel-ratio : 3) {
    body {
    border-radius: 2em;
    }
    .app{
    border-radius: 2em;
    }
    /* .footer{
      margin-bottom: 1em;
      max-height: calc(50px - 1em) !important;
      padding: 0em !important;
    } */
  }
  .v-btn:before {
    border-radius: 2em;
  }
  .v-bottom-nav .v-btn{
    min-width: 0 !important;
    max-width: calc( (100vw / 5) - 2em );
  }
  .v-btn--active::before{

  }
  .v-menu__content{
    border-radius: 1em;
  }
  .ava {
    background: url('https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png')100% 100%;
    background-size: cover;
  }
  .shadow {
    box-shadow: 0 0 3px -1px #333;
  }
    .stepper__wrapper{
      height: 100vh;
      width: 100vw;
    }
    .round2 {
      border-radius: 2em;
    }
    .round1 {
      border-radius: 1em;
    }
    .round05{
      border-radius:0.5em;
    }
    .img2{
      background-size: cover;
      background-position: center;
      transition: all .5s ease;
      height:13em;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .centerX{margin-left:50%;transform:translateX(-50%);}
    ::-webkit-scrollbar{
      width: 0;
    }
    .setting {
      transition: 2s ease all;
    }
    .setting:hover {
      transform: rotateZ(360deg);
    }
    .gradient {
      /* background: linear-gradient(90deg, #12c2e9, #c471ed, #f64f59); */
      background: #000;
    	background-size: 300% 300%;
    	-webkit-animation: Gradient 15s ease infinite;
    	-moz-animation: Gradient 15s ease infinite;
    	animation: Gradient 15s ease infinite;
    }
    .item:nth-of-type(1){
      animation-delay: 0.1s;
    }
    .item:nth-of-type(2){
      animation-delay: 0.2s;
    }
    .item:nth-of-type(3){
      animation-delay: 0.3s;
    }
    .item:nth-of-type(4){
      animation-delay: 0.4s;
    }
    .item:nth-of-type(5){
      animation-delay: 0.5s;
    }
    .item:nth-of-type(6){
      animation-delay: 0.6s;
    }
    .item:nth-of-type(7){
      animation-delay: 0.7s;
    }
    .item:nth-of-type(8){
      animation-delay: 0.8s;
    }
    .item:nth-of-type(9){
      animation-delay: 0.9s;
    }
    .item:nth-of-type(10){
      animation-delay: 1s;
    }
    .item:nth-of-type(11){
      animation-delay: 1.1s;
    }
    .item:nth-of-type(12){
      animation-delay: 1.2s;
    }
    .item:nth-of-type(13){
      animation-delay: 1.3s;
    }
    .item:nth-of-type(14){
      animation-delay: 1.4s;
    }
    .item:nth-of-type(15){
      animation-delay: 1.5s;
    }
    .item:nth-of-type(16){
      animation-delay: 1.6s;
    }
    .item:nth-of-type(17){
      animation-delay: 1.7s;
    }
    .item:nth-of-type(18){
      animation-delay: 1.8s;
    }
    .item:nth-of-type(19){
      animation-delay: 1.9s;
    }
    @keyframes Gradient {
    	0% {
    		background-position: 0% 50%
    	}
    	50% {
    		background-position: 100% 50%
    	}
    	100% {
    		background-position: 0% 50%
    	}
    }
    @keyframes slideIni1{
      from {
        transform: translate3d(-100%, 100%, 0) rotateZ(-45deg) translateX(-20%);
        visibility: visible;
      }

      to {
        transform: translate3d(0, 0, 0) rotateZ(-45deg) translateX(-20%);
        opacity: 1;
      }
    }
    @keyframes slideIni2 {
      from {
        transform: translate3d(100%, -100%, 0) rotateZ(-225deg) translateX(-22%);
        visibility: visible;
      }

      to {
        transform: translate3d(0, 0, 0) rotateZ(-225deg) translateX(-22%);
        opacity: 1;
      }
    }
    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
      }
      50% {
        opacity: 1;
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
    .zoom {
      opacity: 0;
      animation: zoomIn .5s ease 1 forwards;
    }
    @keyframes slideInLeft {
      from {
        transform: translate3d(100%, 0, 0);
        visibility: visible;
      }

      to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
    .slideL {
      opacity: 0;
      animation: slideInLeft .5s ease 1 forwards;
    }
    @keyframes slideInRight {
      from {
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
      }

      to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
    .slideR {
      opacity: 0;
      animation: slideInRight .5s ease 1 forwards;
    }
    @keyframes slideInUp {
      from {
        transform: translate3d(0, 100%, 0);
        visibility: visible;
      }

      to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
    @keyframes slideInUp2 {
      from {
        transform: translate3d(-50%, 100%, 0);
        visibility: visible;
      }

      to {
        transform: translate3d(-50%, 0, 0);
        opacity: 1;
      }
    }
    .slideU1 {
      opacity: 0;
      animation: slideInUp .5s ease 1 forwards;
    }
    .slideU2 {
      opacity: 0;
      animation: slideInUp2 .5s ease 1 forwards;
    }
    @keyframes slideInDown {
      from {
        transform: translate3d(-50%, -100%, 0);
        visibility: visible;
      }

      to {
        transform: translate3d(-50%, 0, 0);
        opacity: 1;
      }
    }
    .slideD{
      opacity: 0;
      animation: slideInDown .5s ease 1 forwards;
    }
    @keyframes rubberBand {
      from {
        transform: scale3d(1, 1, 1);
      }

      30% {
        transform: scale3d(1.25, 0.75, 1);
      }

      40% {
        transform: scale3d(0.75, 1.25, 1);
      }

      50% {
        transform: scale3d(1.15, 0.85, 1);
      }

      65% {
        transform: scale3d(.95, 1.05, 1);
      }

      75% {
        transform: scale3d(1.05, .95, 1);
      }

      to {
        transform: scale3d(1, 1, 1);
      }
    }

    .rubberBand {
      animation: rubberBand 1s ease 1;
    }
    @keyframes rollIn {
      from {
        opacity: 0;
        transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
      }

      to {
        opacity: 1;
        transform: none;
      }
    }

    .rollIn {
      animation: rollIn 1s ease 1;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
    .fadeIn {
      animation: fadeIn .5s ease 1;
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }

    .fadeOut {
      animation: fadeOut .5s ease 1;
    }
</style>
