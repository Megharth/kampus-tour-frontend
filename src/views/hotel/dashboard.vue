<template>
  <div id="dashboard">
    <headerComponent @edit="edit"></headerComponent>
    <div class="container">
      <transition name="slide-down">
        <b-alert show v-if="editMode">You are now in edit mode. <span class="disableEdit" @click="disableEdit">click here to disable</span></b-alert>
      </transition>
      <h1 class="heading">{{user.hotelName}}</h1>
      <h5>{{user.hotelAddress}}, {{user.hotelCity}}, {{user.hotelState}}, {{user.hotelCountry}}</h5>
      <hr>
      <div class="contact-info">
        <h3>Contact Information</h3>
        <div class="row">
          <div class="col-sm-4">
            <div class="row"><div class="col">Landline</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.hotelContact.hotelLandline"></inputComponent></div></div>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Website</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.hotelContact.hotelWebsite"></inputComponent></div></div>
          </div>
        </div>
      </div>
      <hr>
      <div class="salesIncharge">
        <h3>Sales Incharge</h3>
        <div class="row">
          <div class="col-sm-4">
            <div class="row"><div class="col">Name</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.hotelSalesTeam.hotelSalesIncharge.name"></inputComponent></div></div>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.hotelSalesTeam.hotelSalesIncharge.number"></inputComponent></div></div>
          </div>
        </div>
      </div>
      <hr>
      <div class="regionalHead">
        <h3>Regional Head</h3>
        <div class="row">
          <div class="col-sm-4">
            <div class="row"><div class="col">Name</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.hotelSalesTeam.hotelRegionHead.name"></inputComponent></div></div>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.hotelSalesTeam.hotelRegionHead.number"></inputComponent></div></div>
          </div>
        </div>
      </div>
      <hr>
      <div class="CountryHead">
        <h3>Country Head</h3>
        <div class="row">
          <div class="col-sm-4">
            <div class="row"><div class="col">Name</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.hotelSalesTeam.hotelCountryHead.name"></inputComponent></div></div>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.hotelSalesTeam.hotelCountryHead.number"></inputComponent></div></div>
          </div>
        </div>
      </div>
      <div v-if="user.isPartOfGroup">
        <hr>
        <h3>Affiliated Group</h3>
        <h2 class="group-name">{{user.nameOfGroup}}</h2>
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
    name: 'hotel-dashboard',
    data() {
      return {
        user: null,
        editMode: false
      }
    },
    components: {
      inputComponent,
      headerComponent,
      footerComponent
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
        let contactError = false, salesInchargeError = false, regionHeadError = false, countryHeadError = false
        if(Object.values(this.user.hotelContact).indexOf("") !== -1 || Object.values(this.user.hotelContact).indexOf(null) !== -1)
          contactError = true
        if(Object.values(this.user.hotelSalesTeam.hotelSalesIncharge).indexOf("") !== -1 || Object.values(this.user.hotelSalesTeam.hotelSalesIncharge).indexOf(null) !== -1)
          salesInchargeError = true
        if(Object.values(this.user.hotelSalesTeam.hotelRegionHead).indexOf("") !== -1 || Object.values(this.user.hotelSalesTeam.hotelRegionHead).indexOf(null) !== -1)
          regionHeadError = true
        if(Object.values(this.user.hotelSalesTeam.hotelCountryHead).indexOf("") !== -1 || Object.values(this.user.hotelSalesTeam.hotelCountryHead).indexOf(null) !== -1)
          countryHeadError = true

        if(!contactError && !salesInchargeError && !regionHeadError && !countryHeadError){
          this.$http.put(process.env.VUE_APP_API_URL + "/hotel/", this.user, {
            headers: {
              Authorization: this.user.token
            }
          }).then(function(response) {
            localStorage.setItem('user', JSON.stringify(this.user))
            alert('Your details are updated!')
            this.$router.go()
          }).catch(function(error) {

            if(error.body.message === "jwt expired"){
              alert("Session Expired")
              this.$store.commit('logout')
              this.$router.push('/')
            }
            alert(error.body.message)
            this.$router.go()
          })
        }
        else
          alert("Complete the form before submitting!")
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
  background: #6969B3
.group-name
  text-transform: capitalize
</style>