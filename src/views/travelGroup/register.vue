<template>
  <div id="register">
    <headerComponent></headerComponent>
    <div class="container">
      <h1>Travel Group Registration</h1>
      <b-form>
        <div class="form">
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Travel Group Name" v-model="tg.Name" :state="validateName" @blur="verifyName"></b-form-input>
                <b-form-invalid-feedback :state="validateName">
                  This is a required field
                </b-form-invalid-feedback>
                <div class="error" v-if="tgNameExists">
                  Travel Group Name already Exists
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="email" placeholder="Email Address" v-model="tg.email" :state="validateEmail" @blur="verifyEmail"></b-form-input>
                <b-form-invalid-feedback :state="validateEmail">
                  This is a required field
                </b-form-invalid-feedback>
                <div class="error" v-if="emailExists">
                  Email ID already Exists
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <inputComponent type="password" v-model="tg.password" :required="true" placeholder="Password"></inputComponent>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="password" placeholder="Confirm Password" required v-model="confirmPassword" :state="validateConfPass"></b-form-input>
                <b-form-invalid-feedback :state="validateConfPass">
                  Password does not match
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-btn class="d-block mx-auto submit-btn" variant="success" @click="create">Submit</b-btn>
            </b-col>
          </b-row>
        </div>
      </b-form>
      <b-alert variant="success" show v-if="success" align="center">Thank you for the response. Your response has been recorded</b-alert>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
  import inputComponent from '../../components/inputComponent'
  import headerComponent from '../../components/headerCompnent'
  import footerComponent from '../../components/footerComponent'

  export default {
    name: 'TG-Register',
    components: {
      inputComponent,
      headerComponent,
      footerComponent
    },
    data() {
      return {
        tg: {
          email: null,
          password: null,
          name: null
        },
        confirmPassword: null,
        emailExists: false,
        tgNameExists: false,
        success: false
      }
    },
    computed: {
      validateConfPass() {
        if(this.confirmPassword === null)
          return null
        else
          return this.confirmPassword === this.tg.password
      },
      validateEmail() {
        if(this.tg.email === "")
          return false
      },
      validateName() {
        if(this.tg.Name === "")
          return false
      }
    },
    methods: {
      async verifyEmail() {
        let agentEmailExists = false, groupEmailExists = false, hotelEmailExists = false, tgEamilExists = false
        await Promise.all([
          await this.$http.get(process.env.VUE_APP_API_URL + "/agent/verifyEmail/" + this.tg.email).then(function(response) {
            agentEmailExists = response.body.message === "Email ID already exists"
          }),
          await this.$http.get(process.env.VUE_APP_API_URL + "/hotel/verifyEmail/" + this.tg.email).then(function(response) {
            hotelEmailExists = response.body.message === "Email ID already exists"
          }),
          await this.$http.get(process.env.VUE_APP_API_URL + "/group/verifyEmail/" + this.tg.email).then(function(response) {
            groupEmailExists = response.body.message === "Email ID already exists"
          }),
          await this.$http.get(process.env.VUE_APP_API_URL + "/tg/verifyEmail/" + this.tg.email).then(function(response) {
            tgEamilExists = response.body.message === "Email ID already exists"
          })
        ])

        if(hotelEmailExists || agentEmailExists || groupEmailExists || tgEamilExists)
          this.emailExists = true
        if(!hotelEmailExists && !agentEmailExists && !groupEmailExists && !tgEamilExists)
          this.emailExists = false
      },
      async verifyName() {
        this.$http.get(process.env.VUE_APP_API_URL + "/tg/tgName/" + this.tg.Name).then(function(response) {
          this.tgNameExists = response.body.message === "TG Name already exists"
        })
      },
      create() {
        if(this.tg.Name && this.tg.password && this.confirmPassword && this.tg.email && !this.emailExists && !this.tgNameExists) {
          this.tg.Name = this.tg.Name.toLowerCase()
          this.$http.post(process.env.VUE_APP_API_URL + "/tg/create", this.tg).then(function(response) {
            document.querySelector(".submit-btn").setAttribute('disabled', true)
            let inputs = document.querySelectorAll("input")
            inputs.forEach(function(el) {
              el.setAttribute('disabled', true)
            })
            this.success = true
            console.log(response)
          })
        }
        else {
          alert("Please complete the form before submitting")
        }

      }
    }
  }
</script>

<style lang="sass" scoped>
@import '../../sass/register'
#register
  height: 100vh
  background: #397367

.container
  width: 40%
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  .form
    margin-top: 50px

@media (min-width: 320px) and (max-width: 840px)
  .container
    width: 90%
</style>