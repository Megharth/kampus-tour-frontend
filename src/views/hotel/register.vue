<template>
  <div id="register">
    <headerComponent></headerComponent>
    <div class="container">
      <h1>Hotel Registration</h1>
      <b-form>
        <div class="form">
          <b-row class="labels">
            <b-col>
              <h5>General Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="Name Of Hotel as per GST" v-model="hotel.hotelName" :required="true"></inputComponent>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="email" placeholder="Email Address" v-model="hotel.email" :state="validateEmail" @blur="verifyEmail"></b-form-input>
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
              <inputComponent type="password" placeholder="Password" v-model="hotel.password" :required="true"></inputComponent>
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
              <h5>Are you affiliated with any Hotel Group?</h5>
            </b-col>
            <b-col>
              <b-form-group>
                <b-row>
                  <b-col>
                    <b-form-radio v-model="hotel.isPartOfGroup" :value="true">Yes</b-form-radio>
                  </b-col>
                  <b-col>
                    <b-form-radio v-model="hotel.isPartOfGroup" :value="false">No</b-form-radio>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="hotel.isPartOfGroup">
            <b-col>
              <h5>Name of the group</h5>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input list="group-options" type="text" v-model="hotel.nameOfGroup"></b-form-input>
                <b-form-datalist id="group-options" :options="groupOptions"></b-form-datalist>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Address & Contact Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="Address" v-model="hotel.hotelAddress" :required="true"></inputComponent>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Location (City, State, Country)">
                <vue-google-autocomplete @placechanged="getLocation" autocomplete="off" id="map" classname="form-control" placeholder="City, State, Country" types="(cities)"></vue-google-autocomplete>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="contact">
            <b-col>
              <inputComponent type="number" placeholder="Landline Number" v-model="hotel.hotelContact.hotelLandline" :required="true"></inputComponent>
            </b-col>
            <b-col>
              <inputComponent type="text" placeholder="Website" v-model="hotel.hotelContact.hotelWebsite" :required="true"></inputComponent>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Hotel Sales Incharge Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="Name" v-model="hotel.hotelSalesTeam.hotelSalesIncharge.name" :required="true"></inputComponent>
            </b-col>
            <b-col>
              <inputComponent type="number" placeholder="Phone Number" v-model="hotel.hotelSalesTeam.hotelSalesIncharge.number" :required="true"></inputComponent>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Hotel Country Head Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="Name" v-model="hotel.hotelSalesTeam.hotelCountryHead.name" :required="true"></inputComponent>
            </b-col>
            <b-col>
              <inputComponent type="number" placeholder="Phone Number" v-model="hotel.hotelSalesTeam.hotelCountryHead.number" :required="true"></inputComponent>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Hotel Region Head Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="Name" v-model="hotel.hotelSalesTeam.hotelRegionHead.name" :required="true"></inputComponent>
            </b-col>
            <b-col>
              <inputComponent type="number" placeholder="Phone Number" v-model="hotel.hotelSalesTeam.hotelRegionHead.number" :required="true"></inputComponent>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h5>GST & PAN Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <inputComponent type="text" placeholder="GST Number" v-model="hotel.hotelGST" :required="false"></inputComponent>
            </b-col>
            <b-col>
              <inputComponent type="text" placeholder="PAN Number" v-model="hotel.hotelPAN" :required="false"></inputComponent>
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
    <footerComponent></footerComponent>
  </div>
</template>

<script>
  import inputComponent from '../../components/inputComponent'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import headerComponent from '../../components/headerCompnent'
  import footerComponent from '../../components/footerComponent'

  export default {
    name: 'Hotel-Register',
    components: {
      inputComponent,
      VueGoogleAutocomplete,
      headerComponent,
      footerComponent
    },
    data() {
      return {
        hotel: {
          hotelName: null,
          email: null,
          password: null,
          isPartOfGroup: false,
          nameOfGroup: null,
          hotelAddress: null,
          hotelCity: null,
          hotelState: null,
          hotelCountry: null,
          hotelContact: {
            hotelLandline: null,
            hotelWebsite: null
          },
          hotelSalesTeam: {
            hotelSalesIncharge: {
              name: null,
              number: null
            },
            hotelCountryHead: {
              name: null,
              number: null
            },
            hotelRegionHead: {
              name: null,
              number: null
            },
          },
          hotelRoomCategories: [],
          hotelGST: "",
          hotelPAN: ""
        },
        groupOptions: [],
        groupIds: [],
        hotelRoomCategory: {
          categoryName: null,
          rakeRate: null,
          specialRate: null,
          specialRatePeriod: null,
          specialRatePlan: null
        },
        success: false,
        confirmPassword: null,
        emailExists: false,
        location: null
      }
    },
    computed: {
      validateEmail() {
        if(this.hotel.email === "")
          return false
      },
      validateConfPass() {
        if(this.confirmPassword === null)
          return null
        else
          return this.confirmPassword === this.hotel.password
      }
    },
    methods: {
      getLocation(addressData, placeResultData, id) {
        this.location = placeResultData.formatted_address
      },
      async verifyEmail() {
        let agentEmailExists = false, groupEmailExists = false, hotelEmailExists = false, tgEamilExists = false
        await Promise.all([
          await this.$http.get(process.env.VUE_APP_API_URL + "/agent/verifyEmail/" + this.hotel.email).then(function(response) {
            agentEmailExists = response.body.message === "Email ID already exists"
          }),
          await this.$http.get(process.env.VUE_APP_API_URL + "/hotel/verifyEmail/" + this.hotel.email).then(function(response) {
            hotelEmailExists = response.body.message === "Email ID already exists"
          }),
          await this.$http.get(process.env.VUE_APP_API_URL + "/group/verifyEmail/" + this.hotel.email).then(function(response) {
            groupEmailExists = response.body.message === "Email ID already exists"
          }),
          await this.$http.get(process.env.VUE_APP_API_URL + "/tg/verifyEmail/" + this.hotel.email).then(function(response) {
            groupEmailExists = response.body.message === "Email ID already exists"
          })
        ])

        if(hotelEmailExists || agentEmailExists || groupEmailExists || tgEamilExists)
          this.emailExists = true
        if(!hotelEmailExists && !agentEmailExists && !groupEmailExists && !tgEamilExists)
          this.emailExists = false
      },
      create() {
        let hotel = this.hotel
        if(this.location){
          let location = this.location.split(',')
          this.hotel.hotelCity = location[0]
          this.hotel.hotelState = location[1]
          this.hotel.hotelCountry = location[2]
        }
        if(this.hotel.nameOfGroup === null)
          this.hotel.nameOfGroup = ''

        if(this.hotel.hotelName && this.hotel.email && this.hotel.password && this.confirmPassword && this.hotel.hotelAddress && this.hotel.hotelCity && this.hotel.hotelState && this.hotel.hotelCountry && this.hotel.hotelContact.hotelLandline && this.hotel.hotelSalesTeam.hotelSalesIncharge.name && this.hotel.hotelSalesTeam.hotelSalesIncharge.number && this.hotel.hotelSalesTeam.hotelCountryHead.name && this.hotel.hotelSalesTeam.hotelCountryHead.number && this.hotel.hotelSalesTeam.hotelRegionHead.name && this.hotel.hotelSalesTeam.hotelRegionHead.number && !this.emailExists) {

          this.$http.post(process.env.VUE_APP_API_URL + "/hotel/create", hotel ).then( (res) => {
            document.querySelector(".submit-btn").setAttribute('disabled', true)
            let inputs = document.querySelectorAll("input")
            inputs.forEach(function(el) {
              el.setAttribute('disabled', true)
            })
            this.success = true
            let i = this.groupOptions.indexOf(this.hotel.nameOfGroup)
            if(i !== -1) {
              let hotel = this.hotel
              let groupId = this.groupIds[i]
              let authToken = null
              let self = this
              this.$http.post( process.env.VUE_APP_API_URL + '/hotel/login', {
                email: hotel.email,
                password: hotel.password
              }).then(function(res) {
                authToken = res.body.token
                self.$http.post(process.env.VUE_APP_API_URL + '/group/add-hotel', {
                  id: groupId,
                  hotel: {
                    name: hotel.hotelName,
                    city: hotel.hotelCity
                  }
                }, {
                  headers: {
                    Authorization: authToken
                  }
                })
              })
            }
          })
        }
        else {
          alert("Please Complete the form before submitting")
        }
      }

    },
    created() {
      let self = this
      this.$http.get(process.env.VUE_APP_API_URL + '/group').then(function(res) {
        res.body.forEach(function(el) {
          self.groupOptions.push(el.name)
          self.groupIds.push(el._id)
        })
      })
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../sass/register'
  #register
    background: #6969B3
  .contact
    margin-top: 15px
</style>
