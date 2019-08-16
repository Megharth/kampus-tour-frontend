<template>
  <div id="dashboard">
    <headerComponent @edit="edit"></headerComponent>
    <div class="container">
      <transition name="slide-down">
        <b-alert show v-if="editMode">You are now in edit mode. <span class="disableEdit" @click="disableEdit">click here to disable</span></b-alert>
      </transition>
      <h1 class="heading">{{user.name}}</h1>
      <hr>
      <div class="city-sh-info">
        <h3>City Sales Head</h3>
        <div class="row" v-for="csh in user.citySalesHead">
          <div class="col-sm-4">
            <div class="row"><div class="col">Name</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="csh.name"></inputComponent></div></div>
          </div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Email</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="csh.email"></inputComponent></div></div>
          </div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="csh.number"></inputComponent></div></div>
          </div>
          <hr>
        </div>
        <hr>
      </div>
      <div class="country-sh-info">
        <h3>Country Sales Head</h3>
        <div class="row" v-for="csh in user.countrySalesHead">
          <div class="col-sm-4">
            <div class="row"><div class="col">Name</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="csh.name"></inputComponent></div></div>
          </div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Email</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="csh.email"></inputComponent></div></div>
          </div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="csh.number"></inputComponent></div></div>
          </div>
          <hr>
        </div>
        <hr>
      </div>
      <div class="regional-sh-info">
        <h3>Regional Sales Head</h3>
        <div class="row" v-for="rsh in user.regionalSalesHead">
          <div class="col-sm-4">
            <div class="row"><div class="col">Name</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="rsh.name"></inputComponent></div></div>
          </div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Email</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="rsh.email"></inputComponent></div></div>
          </div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="rsh.number"></inputComponent></div></div>
          </div>
          <hr>
        </div>
        <hr>
      </div>
      <div class="hotels">
        <h3>Hotels</h3>
        <div class="row">
          <div class="col-sm-2 hotel-card" v-for="hotel in user.listOfHotels">
            <div class="name">{{hotel.name}}</div>
            <div class="location"><img src="../../assets/location.png" alt="" class="img-fluid">{{hotel.city}}</div>
          </div>
        </div>
      </div>
      <button class="update-btn d-block mx-auto btn" v-if="editMode" @click="update">Update</button>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
  import inputComponent from '../../components/inputComponent'
  import headerComponent from '../../components/headerCompnent'
  import footerComponent from '../../components/footerComponent'

  export default {
    name: 'group-dashboard',
    components: {
      inputComponent,
      headerComponent,
      footerComponent
    },
    data() {
      return {
        user: null,
        editMode: false
      }
    },
    methods: {
      edit() {
        let inputs = document.querySelectorAll('input')
        inputs.forEach(function(el) {
          el.removeAttribute('disabled')
        })
        this.editMode = true
      },
      disableEdit() {
        this.$router.go()
      },
      update() {
        let cityshError = this.user.citySalesHead.map(function(el) {
          return Object.values(el).indexOf("") !== -1 || Object.values(el).indexOf(null) !== -1
        })

        let regionshError = this.user.regionalSalesHead.map(function(el) {
          return Object.values(el).indexOf("") !== -1 || Object.values(el).indexOf(null) !== -1
        })

        let countryshError = this.user.countrySalesHead.map(function(el) {
          return Object.values(el).indexOf("") !== -1 || Object.values(el).indexOf(null) !== -1
        })

        if(cityshError.indexOf(true) === -1 && countryshError.indexOf(true) === -1 && regionshError.indexOf(true) === -1) {
          this.$http.put(process.env.VUE_APP_API_URL + "/group/", this.user, {
            headers: {
              Authorization: this.user.token
            }
          }).then(function(response) {
            localStorage.setItem('user', JSON.stringify(this.user))
            alert('Your details are updated!')
            this.$router.go()
          }).catch(function(error) {
            alert(error.body.message)
            this.$router.go()
          })
        }
        else
          alert ("Complete the form before submitting")
      }
    },
    created() {
      if(this.$store.state.user)
        this.user = this.$store.state.user
      else if(localStorage.getItem('user')){
        this.user = JSON.parse(localStorage.getItem('user'))
        this.$store.commit('login', this.user)
      }

      else
        this.$router.push('/')
    },
    mounted() {
      let inputs = document.querySelectorAll('input')
      inputs.forEach(function(el) {
        el.setAttribute('disabled', true)
      })
    }
  }
</script>

<style lang="sass" scoped>
@import '../../sass/dashboard'
#dashboard
  background: #4A6D7C
.update-btn
  color: #4A6D7C
.hotel-card
  background: white
  color: black
  margin: 5px 10px 10px 15px
  padding: 5px
  border-radius: 5px
  .name
    margin-left: 10px
  .location
    margin-left: 10px
    img
      width: 15px
      margin-right: 5px
</style>