<template>
  <div class="home">
    <section id="section1">
      <div class="form">
        <b-form>
          <h1>Login</h1>
          <div class="container">
            <div class="inputs" @enter.native="login">
              <inputComponent type="email" placeholder="Email Address" :required="true" v-model="email"></inputComponent>
              <inputComponent type="password" placeholder="Password" :required="true" v-model="password"></inputComponent>
              <button class="d-block mx-auto submit-btn" @click="login">Login</button>
            </div>
          </div>
        </b-form>
      </div>
    </section>
    <section id="section2">
      <h1>Who are you?</h1>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="user-card mx-auto" id="user-card-1" @click="$router.push({ path: '/agent/register' })">
              <h1>Travel Agent</h1>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="user-card mx-auto" id="user-card-2" @click="$router.push('/tg/register')">
              <h1>Travel Group</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6" @click="$router.push({ path: '/hotel/register' })">
            <div class="user-card mx-auto" id="user-card-3">
              <h1>Hotel</h1>
            </div>
          </div>
          <div class="col-sm-12 col-md-6" @click="$router.push('/group/register')">
            <div class="user-card" id="user-card-4">
              <h1>Hotel Group</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
import inputComponent from '../components/inputComponent'
import footerComponent from '../components/footerComponent'

export default {
  name: 'home',
  components: {
    inputComponent,
    footerComponent
  },
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    async login(event) {
      event.preventDefault()
      if(this.email && this.password) {
        let agentEmailExists = false, groupEmailExists = false, hotelEmailExists = false, tgEmailExists = false, path = null

        await Promise.all([
          this.$http.get(process.env.VUE_APP_API_URL + "/agent/verifyEmail/" + this.email).then(function(response) {
            agentEmailExists = response.body.message === "Email ID already exists"
            if(agentEmailExists)
              path = "agent"
          }),
          this.$http.get(process.env.VUE_APP_API_URL + "/hotel/verifyEmail/" + this.email).then(function(response) {
            hotelEmailExists = response.body.message === "Email ID already exists"
            if(hotelEmailExists)
              path = "hotel"
          }),
          this.$http.get(process.env.VUE_APP_API_URL + "/group/verifyEmail/" + this.email).then(function(response) {
            groupEmailExists = response.body.message === "Email ID already exists"
            if(groupEmailExists)
              path = "group"
          }),
          this.$http.get(process.env.VUE_APP_API_URL + "/tg/verifyEmail/" + this.email).then(function(response) {
            tgEmailExists = response.body.message === "Email ID already exists"
            if(tgEmailExists)
              path = "tg"
          })
        ])

        if(path !== null) {
          let email = this.email, password = this.password

          this.$http.post(process.env.VUE_APP_API_URL + "/" + path + "/login/", {
            email, password
          }).then(function(response) {
            document.querySelector(".submit-btn").setAttribute('disabled', true)
            let inputs = document.querySelectorAll("input")
            inputs.forEach(function(el) {
              el.setAttribute('disabled', true)
            })
            this.$store.commit('login', response.body)
            console.log(process.env.VUE_APP_BASE_URL + path + "/dashboard")
            this.$router.push(path + "/dashboard")
          }).catch(function(response) {
            alert(response.body.message)
          })
        }
        else
          alert("Email not found")

      }
      else {
        alert("Please Enter Email and Password")
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../sass/home'

</style>
