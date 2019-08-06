<template>
  <div id="register">
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
              <b-form-group>
                <b-form-input type="text" placeholder="Name of Your Hotel" v-model="hotel.hotelName" :state="validateName"></b-form-input>
                <b-form-invalid-feedback :state="validateName">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
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
              <b-form-group>
                <b-form-input type="password" placeholder="Password" required v-model="hotel.password" :state="validatePass"></b-form-input>
                <b-form-invalid-feedback :state="validatePass">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
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
              <h5>Are you part of any Hotel Group?</h5>
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
              <b-form-group>
                <b-form-input type="text" placeholder="Address" v-model="hotel.hotelAddress" :state="validateAddress"></b-form-input>
                <b-form-invalid-feedback :state="validateAddress">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Country" v-model="hotel.hotelCountry" :state="validateCountry"></b-form-input>
                <b-form-invalid-feedback :state="validateCountry">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="State" v-model="hotel.hotelState" :state="validateState"></b-form-input>
                <b-form-invalid-feedback :state="validateState">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="City" v-model="hotel.hotelCity" :state="validateCity"></b-form-input>
                <b-form-invalid-feedback :state="validateCity">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Landline Number" v-model="hotel.hotelContact.hotelLandline":state="validateLandline"></b-form-input>
                <b-form-invalid-feedback :state="validateLandline">
                  Number should be of 10 digits
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Website" v-model="hotel.hotelContact.hotelWebsite"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Hotel Sales Incharge Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Name" v-model="hotel.hotelSalesTeam.hotelSalesIncharge.name" :state="validateSalesInchargeName"></b-form-input>
                <b-form-invalid-feedback :state="validateSalesInchargeName">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Phone Number" v-model="hotel.hotelSalesTeam.hotelSalesIncharge.number" :state="validateSalesInchargeNum"></b-form-input>
                <b-form-invalid-feedback :state="validateSalesInchargeNum">
                  Number should be of 10 digits
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Hotel Country Head Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Name" v-model="hotel.hotelSalesTeam.hotelCountryHead.name" :state="validateCountryHeadName"></b-form-input>
                <b-form-invalid-feedback :state="validateCountryHeadName">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Phone Number" v-model="hotel.hotelSalesTeam.hotelCountryHead.number" :state="validateCountryHeadNum"></b-form-input>
                <b-form-invalid-feedback :state="validateCountryHeadNum">
                  Number should be of 10 digits
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Hotel Region Head Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Name" v-model="hotel.hotelSalesTeam.hotelRegionHead.name" :state="validateRegionHeadName"></b-form-input>
                <b-form-invalid-feedback :state="validateRegionHeadName">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Phone Number" v-model="hotel.hotelSalesTeam.hotelRegionHead.number":state="validateRegionHeadNum"></b-form-input>
                <b-form-invalid-feedback :state="validateRegionHeadNum">
                  Number should be of 10 digits
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h5>GST & PAN Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="hotel.hotelGST" placeholder="GST Number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="hotel.hotelPAN" placeholder="PAN Number"></b-form-input>
              </b-form-group>
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
  export default {
    name: 'Hotel-Register',
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
        emailExists: false
      }
    },
    computed: {
      validateName() {
        if(this.hotel.hotelName === "")
          return false
      },
      validateEmail() {
        if(this.hotel.email === "")
          return false
      },
      validatePass() {
        if(this.hotel.password === "")
          return false
      },
      validateConfPass() {
        if(this.confirmPassword === null)
          return null
        else
          return this.confirmPassword === this.hotel.password
      },
      validateAddress() {
        if(this.hotel.hotelAddress === "")
          return false
      },
      validateCity() {
        if(this.hotel.hotelCity === "")
          return false
      },
      validateState() {
        if(this.hotel.hotelState === "")
          return false
      },
      validateCountry() {
        if(this.hotel.hotelCountry === "")
          return false
      },
      validateLandline() {
        if(this.hotel.hotelContact.hotelLandline === null)
          return null
        else
          return this.hotel.hotelContact.hotelLandline.length === 10
      },
      validateSalesInchargeName() {
        if(this.hotel.hotelSalesTeam.hotelSalesIncharge.name === "")
          return false
      },
      validateSalesInchargeNum() {
        if(this.hotel.hotelSalesTeam.hotelSalesIncharge.number === null)
          return null
        else
          return this.hotel.hotelSalesTeam.hotelSalesIncharge.number.length === 10
      },
      validateCountryHeadName() {
        if(this.hotel.hotelSalesTeam.hotelCountryHead.name === "")
          return false
      },
      validateCountryHeadNum() {
        if(this.hotel.hotelSalesTeam.hotelCountryHead.number === null)
          return null
        else
          return this.hotel.hotelSalesTeam.hotelCountryHead.number.length === 10
      },
      validateRegionHeadName() {
        if(this.hotel.hotelSalesTeam.hotelRegionHead.name === "")
          return false
      },
      validateRegionHeadNum() {
        if(this.hotel.hotelSalesTeam.hotelRegionHead.number === null)
          return null
        else
          return this.hotel.hotelSalesTeam.hotelRegionHead.number.length === 10
      }
    },
    methods: {
      verifyEmail() {
        this.$http.post("https://kampus-tour.herokuapp.com/hotel/verifyEmail", {
          email: this.hotel.email
        }).then(function(response) {
          this.emailExists = response.body.message === "Email ID already exists";
        })
      },
      create() {
        let hotel = this.hotel

        if(this.hotel.hotelName && this.hotel.email && this.hotel.password && this.confirmPassword && this.hotel.hotelAddress && this.hotel.hotelCity && this.hotel.hotelState && this.hotel.hotelCountry && this.hotel.hotelContact.hotelLandline && this.hotel.hotelSalesTeam.hotelSalesIncharge.name && this.hotel.hotelSalesTeam.hotelSalesIncharge.number && this.hotel.hotelSalesTeam.hotelCountryHead.name && this.hotel.hotelSalesTeam.hotelCountryHead.number && this.hotel.hotelSalesTeam.hotelRegionHead.name && this.hotel.hotelSalesTeam.hotelRegionHead.number && !this.emailExists) {

          this.$http.post('https://kampus-tour.herokuapp.com/hotel/create', hotel ).then( (res) => {
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
              this.$http.post('https://kampus-tour.herokuapp.com/hotel/login', {
                email: hotel.email,
                password: hotel.password
              }).then(function(res) {
                authToken = res.body.token
                console.log(authToken)
                self.$http.post('https://kampus-tour.herokuapp.com/group/add-hotel', {
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
      }
    },
    created() {
      let self = this
      this.$http.get('https://kampus-tour.herokuapp.com/group').then(function(res) {
        res.body.forEach(function(el) {
          self.groupOptions.push(el.name)
          self.groupIds.push(el._id)
        })
      })
    }
  }
</script>

<style lang="sass" scoped>
#register
  padding-bottom: 20px
  padding-top: 20px
  background: #2b8ebb
  overflow-x: hidden

.form
  box-shadow: 0 0 8px 4px #454545
  border-radius: 5px
  padding: 10px
  background: white

h1
  text-align: center
  font-weight: bold
  color: white


.labels
  margin-top: 20px
  margin-bottom: 10px

.error
  color: red
  font-weight: bold

.alert-success
  margin-top: 20px
</style>