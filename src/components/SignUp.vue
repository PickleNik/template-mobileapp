<template>
  <v-container fill-height fluid class="pa-0">

    <v-dialog lazy v-model="terms" content-class="b round2 text-xs-center">
      <v-flex class="ma-2">
        <h2 class="primary--text py-3">Terms & Conditions</h2>
        <span> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
        <br><v-btn round light color="primary b--text" @click="terms = false">OK</v-btn>
      </v-flex>
    </v-dialog>

      <v-stepper v-model="step" class="transparent" style="height: 100vh; width: 100vw;">
        <v-stepper-header class="px-4 elevation-0" style="height: 10vh;">
          <v-stepper-step class="round2 pa-0 transparent" :complete="step > 1" step="1" editable color="primary b--text" edit-icon="done">
            Sign Up
          </v-stepper-step>
          <v-stepper-step class="round2 pa-0 transparent" :complete="step > 2" step="2" editable color="primary b--text" edit-icon="done">
            Picture
          </v-stepper-step>
          <v-stepper-step class="round2 pa-0 transparent" :complete="step > 3" step="3" editable color="primary b--text" edit-icon="done">
            Sizes
          </v-stepper-step>
          <v-stepper-step class="round2 pa-0 transparent" :complete="step > 4" step="4" editable color="primary b--text" edit-icon="done">
            Other
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" class="pa-0 text-xs-center" v-touch="{ left: () => step = 2 }">
            <v-container fluid fill-height class="zoom scroll-y round1" style="height:80vh;">
              <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
                <v-avatar size="200" class="logo mb-3"></v-avatar>
                <v-text-field class="my-3"
                  v-model="username" label="Username"
                  prepend-inner-icon="person_outline"
                  :rules="[rules.required, rules.username]"
                  clearable></v-text-field>
                <v-text-field class="my-3"
                  v-model="email" label="Email"
                  type="email"
                  prepend-inner-icon="alternate_email"
                  :rules="[rules.required, rules.email]"
                  validate-on-blur clearable></v-text-field>
                <v-layout>
                  <v-text-field class="d-inlind-block mt-0"
                    v-model="password" label="Password"
                    hint="Use numbers, symbols & uppercase letters."
                    prepend-inner-icon="lock"
                    :type="visible ? 'password' : 'text'"
                    :rules="[rules.required, rules.password]"
                    validate-on-blur loading>
                    <v-progress-linear
                    slot="progress"
                    class="round"
                    :value="strength"
                    color="primary"
                    height="2"
                    ></v-progress-linear>
                  </v-text-field>
                  <v-text-field class="d-inline-block mt-0"
                  v-model="confirm" label="Confirm"
                  hint="Use numbers, symbols & uppercase letters."
                  :append-icon="visible ? 'visibility_off' : 'visibility'"
                  @click:append="() => (visible = !visible)"
                  :type="visible ? 'password' : 'text'"
                  :rules="[rules.required, rules.confirm]"
                  validate-on-blur></v-text-field>
                </v-layout>
                <span>By signing up you agree to our <b class="primary--text" @click="terms =! terms" style="cursor: pointer;">Terms of use</b></span><br>
                <span>Already have an account ? - <router-link to="/signin" class="primary--text" style="text-decoration: underline;">Sign In</router-link></span>
              </v-flex>
            </v-container>
            <v-btn large @click.native="step = 2" :disabled="!this.username || this.username.length > 10 || !this.email || !this.password || !(this.confirm == this.password) " round color="primary b--text">Proceed</v-btn>
          </v-stepper-content>

          <!-- add text when validation failed "We need at least these measurements to provide you with an enhanced shopping experience" -->
          <v-stepper-content step="2" class="pa-0 text-xs-center" v-touch="{ left: () => step = 3, right: () => step = 1 }">
            <v-container fluid fill-height class="zoom scroll-y round1" style="height:80vh;">
              <input style="display: none;" type="file" accept="image/*" @change="onImageInput" ref="imageInput">
              <v-flex>
                <h2 class="title--text" style="text-align:justify;">
                  Please allow the camera access. Picture will be used to create your avatar.
                  <v-icon color="primary">camera</v-icon>
                </h2>
                <img v-if="photo" style="max-height:90vh; max-width:90vw;" class="round2 my-3" :src="this.photoSRC">
              </v-flex>
            </v-container>
            <v-btn v-if="photo" large @click.native="$refs.imageInput.click()" round outline color="primary">Redo</v-btn>
            <v-btn v-if="photo" large @click.native="step = 3" round light color="primary">Proceed</v-btn>

            <v-btn v-if="!photo" large @click="$refs.imageInput.click()" round light color="primary">take a photo</v-btn><br><br>
          </v-stepper-content>

          <v-stepper-content step="3" class="pa-0 text-xs-center" v-touch="{ left: () => step = 4, right: () => step = 2 }">
            <v-container fluid fill-height class="zoom scroll-y round1" style="height:80vh;">
              <!--v-alert on error We need these measurements to provide you with enhanced shopping experience-->
              <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 class="text-xs-center">

                <v-select :menu-props="{contentClass:'round2'}"
                v-model="unit" label="Measurement System"
                :items="units"
                prepend-icon="build"
                :rules="[rules.required]"
                validate-on-blur
                ></v-select>

                <v-layout><v-text-field
                v-model="height1" label="Height"
                :suffix="unit == 'Metric (m,kg)' ? 'm' : 'ft'"
                type="number"
                hint="How tall are you?"
                prepend-icon="vertical_align_top"
                :rules="[rules.required]"
                validate-on-blur></v-text-field>
                <v-text-field
                v-model="height2"
                :suffix="unit == 'Metric (m,kg)' ? 'cm' : 'in'"
                type="number"
                hint="How tall are you?"
                :rules="[rules.required]"
                validate-on-blur></v-text-field>
                </v-layout>
                <v-text-field
                v-model="weight"label="Weight"
                :suffix="unit == 'Metric (m,kg)' ? 'kg' : 'lbs'"
                type="number"
                hint="We won't tell..."
                prepend-icon="restaurant"
                ></v-text-field>
                <v-text-field
                v-model="age" label="Age"
                type="number"
                suffix="years"
                prepend-icon="text_format"
                hint="I don't believe you"
                clearable></v-text-field>

                <v-select :menu-props="{contentClass:'round2'}"
                v-model="bodyType" label="Body Type"
                :items="bodyTypes"
                prepend-icon="wc"
                ></v-select>

              </v-flex>
            </v-container>
            <v-btn large @click.native="step = 4" :loading="loading"
            :disabled="!this.username || this.username > 10 || !this.email || !this.password || !this.confirm || !this.photo || !this.bodyType || !this.age || !this.weight || !this.height1 || !this.height2"
            round color="primary b--text">Proceed</v-btn>
          </v-stepper-content>

          <v-stepper-content step="4" class="pa-0 text-xs-center" v-touch="{ right: () => step = 3 }">
            <v-container fluid fill-height class="zoom scroll-y round1" style="height:80vh;">
              <!--v-alert on error We need these measurements to provide you with enhanced shopping experience-->
              <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 class="text-xs-center">

                <v-layout row wrap>
                  <v-flex xs6 v-for="v in values">
                    <v-text-field :suffix="unit == 'Metric (m,kg)' ? 'cm' : 'in'"
                    v-model="v.value" :label="v.label" class="mx-1"
                    type="number" validate-on-blur></v-text-field>
                  </v-flex>
                </v-layout>

              </v-flex>
            </v-container>
            <v-btn large @click="submit" :loading="loading" :disabled="!this.username || this.username > 10 || !this.email || !this.password || !this.confirm || !this.photo || !this.bodyType || !this.age || !this.weight || !this.height1 || !this.height2" round color="primary b--text">Submit</v-btn>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      step: 1,
      terms: false,
      rules: {
        required: value => !!value || 'Required.',
        username: value => value.length <= 10 || 'Max 10 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password: value => value.length > 5 || 'Min 6 characters',
        confirm: value => value === this.password || 'Passwords do not match'
      },
      username: '',
      email: '',
      password: '',
      confirm: null,
      visible: true,
      photo: null,
      photoSRC: null,
      awsFile: null,
      age: null,
      units: ['Metric (m,kg)', 'Imperial (in,lbs)'],
      unit: null,
      bodyTypes: ['Female', 'Male'],
      bodyType: null,
      height1: null,
      height2: null,
      weight: null,
      bust: null,
      underBust: null,
      waist: null,
      hip: null,
      neckGirth: null,
      bodyHeight: null,
      insideLeg: null,
      shoulder: null,
      values: [
        { label: 'Bust', value: this.bust },
        { label: 'Under Bust', value: this.underBust },
        { label: 'Waist', value: this.waist },
        { label: 'Hip', value: this.hip },
        { label: 'Neck Girth', value: this.neckGirth },
        { label: 'Body Height', value: this.bodyHeight },
        { label: 'Inside Leg', value: this.insideLeg },
        { label: 'Shoulder', value: this.shoulder }
      ]
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/market')
      }
    }
  },
  methods: {
    onImageInput (event) {
      this.awsFile = event.target.files[0]
      this.photo = new Blob([event.target.files[0]], {type: 'image/jpg'})
      this.photoSRC = URL.createObjectURL(this.photo)
    },
    submit () {
      this.$store.dispatch('userSignUp', {
        email: this.email,
        password: this.password,
        username: this.username,
        photo: this.photo,
        age: this.age,
        ms: this.unit,
        bt: this.bodyType != 'Male',
        height: this.height1 + '.' + this.height2,
        weight: this.weight,
        awsFile: this.awsFile
      })
    }
  },
  computed: {
    strength () {
      let p = 0
      if ((this.password.match(/[a-z]/)) && (this.password.match(/[A-Z]/))) { p += 25 }
      if (this.password.match(/\d+/)) { p += 25 }
      if (this.password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) { p += 25 }
      return Math.min(100, p + this.password.length * 3)
    },
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
  .logo {
    background: url('../assets/enly.png') no-repeat;
    background-size: contain;
    background-position: center;
  }
</style>
