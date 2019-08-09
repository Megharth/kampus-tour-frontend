<template>
  <div id="register">
    <div class="container">
      <h1>Group Hotels Registration</h1>
      <b-form>

        <div class="form">

          <b-row class="labels">
            <b-col>
              <h5>General Information</h5>
            </b-col>
          </b-row>

          <!--GROUP NAME-->
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="Group Name" v-model="group.name" :required="true" @blur="verifyEmail"></inputComponent>
            </b-col>
          </b-row>

          <!--EMAIL-->
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="email" placeholder="Email Address" v-model="group.email" :state="validateEmail" @blur="verifyEmail"></b-form-input>
                <b-form-invalid-feedback :state="validateEmail">
                  This is a required field
                </b-form-invalid-feedback>
                <div class="error" v-if="emailExists">
                  Email ID already Exists
                </div>
              </b-form-group>
            </b-col>
          </b-row>

          <!--PASSWORD-->
          <b-row>
            <b-col>
              <inputComponent type="password" placeholder="Password" v-model="group.password" :required="true"></inputComponent>
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

          <!--COUNTRY SALES HEAD-->
          <b-row class="labels">
            <b-col>
              <h5>Country Sales Head</h5>
            </b-col>
          </b-row>

          <!--NAME AND NUMBER-->
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="Name" v-model="countrySalesHeadInfo.name" :required="false"></inputComponent>
            </b-col>
            <b-col>
              <inputComponent type="number" placeholder="Number" v-model="countrySalesHeadInfo.number" :required="true"></inputComponent>
            </b-col>
          </b-row>

          <!--EMAIL-->
          <b-row>
            <b-col>
              <inputComponent type="email" placeholder="Email Address" v-model="countrySalesHeadInfo.email" :required="false"></inputComponent>
            </b-col>
          </b-row>

          <!--REGIONAL SALES HEAD-->
          <b-row class="labels">
            <b-col>
              <h5>Regional Sales Head</h5>
            </b-col>
          </b-row>

          <!--NAME AND NUMBER-->
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="Name" v-model="regionalSalesHeadInfo.name" :required="false"></inputComponent>
            </b-col>
            <b-col>
              <inputComponent type="number" placeholder="Number" v-model="regionalSalesHeadInfo.number" :required="true"></inputComponent>
            </b-col>
          </b-row>

          <!--EMAIL-->
          <b-row>
            <b-col>
              <inputComponent type="email" placeholder="Email Address" v-model="regionalSalesHeadInfo.email" :required="false"></inputComponent>
            </b-col>
          </b-row>

          <!--CITY SALES HEAD-->
          <b-row class="labels">
            <b-col>
              <h5>City Sales Head</h5>
            </b-col>
          </b-row>

          <!--NAME AND NUMBER-->
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="Name" v-model="citySalesHeadInfo.name" :required="false"></inputComponent>
            </b-col>
            <b-col>
              <inputComponent type="number" placeholder="Number" v-model="citySalesHeadInfo.number" :required="true"></inputComponent>
            </b-col>
          </b-row>

          <!--EMAIL-->
          <b-row>
            <b-col>
              <inputComponent type="email" placeholder="Email Address" v-model="citySalesHeadInfo.email" :required="false"></inputComponent>
            </b-col>
          </b-row>

          <!--LIST OF HOTELS-->
          <b-row class="labels">
            <b-col>
              <h5>Add Hotels</h5>
            </b-col>
          </b-row>

          <b-row v-if="group.listOfHotels.length >= 1" class="hotel-list">
            <b-col>
              <div v-for="hotel in group.listOfHotels" class="hotel-div"><span class="hotel-name">{{hotel.name}}</span></div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="5">
              <b-form-group>
                <b-form-input list="hotel-options" type="text" placeholder="Hotel Name" v-model="hotel.name" @blur="getCity"></b-form-input>
                <b-form-datalist id="hotel-options" :options="hotelOptions"></b-form-datalist>
              </b-form-group>
            </b-col>
            <b-col sm="5">
              <b-form-group>
                <b-form-input type="text" placeholder="City" v-model="hotel.city"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="2">
              <b-btn variant="success" @click="addHotel">Add</b-btn>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-btn class="mx-auto d-block submit-btn" variant="primary" @click="create">Submit</b-btn>
            </b-col>
          </b-row>
        </div>
      </b-form>
      <b-alert variant="success" show v-if="success" align="center">Thank you for the response. Your response has been recorded</b-alert>
    </div>
  </div>
</template>

<script>
  import inputComponent from '../../components/inputComponent'

  export default {
    name: "Group-Register",
    components: {
      inputComponent
    },
    data() {
      return {
        group: {
          email: null,
          password: null,
          name: null,
          countrySalesHead: [],
          regionalSalesHead: [],
          citySalesHead: [],
          listOfHotels: []
        },
        confirmPassword: null,
        countrySalesHeadInfo: {
          name: null,
          number: null,
          email: null
        },
        regionalSalesHeadInfo: {
          name: null,
          number: null,
          email: null
        },
        citySalesHeadInfo: {
          name: null,
          number: null,
          email: null
        },
        hotel: {
          name: null,
          city: null
        },
        hotelOptions: [],
        hotelCities: [],
        success: false,
        emailExists: false,
        countryCheck: false,
        regionCheck: false,
        cityCheck: false
      }
    },
    computed: {
      validateConfPass() {
        if(this.confirmPassword === null)
          return null
        else
          return this.confirmPassword === this.group.password
      },
      validateEmail() {
        if(this.group.email === "")
          return false
      }
    },
    methods: {
      addHotel() {
        this.group.listOfHotels.push({
          name: this.hotel.name,
          city: this.hotel.city
        })
        let i = this.hotelOptions.indexOf(this.hotel.name)
        if(i !== -1){
          this.hotelOptions.splice(i, 1)
          this.hotelCities.splice(i ,1)
        }
        this.hotel.name = null
        this.hotel.city = null

      },
      getCity() {
        let i = this.hotelOptions.indexOf(this.hotel.name)
        if(i !== -1)
          this.hotel.city = this.hotelCities[i]
        else
          this.hotel.city = null
      },
      async verifyEmail() {
        let agentEmailExists = false, groupEmailExists = false, hotelEmailExists = false, self = this
        await this.$http.get(process.env.VUE_APP_API_URL + "/agent/verifyEmail/" + this.hotel.email).then(function(response) {
          agentEmailExists = response.body.message === "Email ID already exists"
        })
        await this.$http.get(process.env.VUE_APP_API_URL + "/hotel/verifyEmail/" + this.hotel.email).then(function(response) {
          hotelEmailExists = response.body.message === "Email ID already exists"
        })
        await this.$http.get(process.env.VUE_APP_API_URL + "/group/verifyEmail/" + this.hotel.email).then(function(response) {
          groupEmailExists = response.body.message === "Email ID already exists"
        })

        if(hotelEmailExists || agentEmailExists || groupEmailExists)
          this.emailExists = true
        if(!hotelEmailExists && !agentEmailExists && !groupEmailExists)
          this.emailExists = false
      },
      create() {
        if(this.countrySalesHeadInfo.name)
          this.group.countrySalesHead.push(this.countrySalesHeadInfo)

        if(this.regionalSalesHeadInfo.name)
          this.group.regionalSalesHead.push(this.regionalSalesHeadInfo)

        if(this.citySalesHeadInfo.name)
          this.group.citySalesHead.push(this.citySalesHeadInfo)

        let group = this.group
        if(group.name && group.email && group.password && this.confirmPassword && !this.emailExists) {
          this.$http.post("https://kampus-tour.herokuapp.com/group/create", group).then(function(response) {
            document.querySelector(".submit-btn").setAttribute('disabled', true)
            let inputs = document.querySelectorAll("input")
            inputs.forEach(function(el) {
              el.setAttribute('disabled', true)
            })
            this.success = true
          })
        }
      }
    },
    created() {
      let self = this
      this.$http.get("https://kampus-tour.herokuapp.com/hotel/list/all").then(function(res) {
        res.body.forEach(function(hotel) {
          self.hotelOptions.push(hotel.name)
          self.hotelCities.push(hotel.city)
        })
      })
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../sass/register'
</style>