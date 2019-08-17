<template>
  <transition name="slide-up">
    <div id="register" key="register">
      <headerComponent></headerComponent>
      <div class="container">
        <h1>Agent Registration</h1>
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
                  <b-form-input type="email" placeholder="Email Address" v-model="agent.email" :state="validateEmail" @blur="verifyEmail"></b-form-input>
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
                <inputComponent type="password" v-model="agent.password" :required="true" placeholder="password"></inputComponent>
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
                <b-form-group>
                  <b-form-input type="text" placeholder="Agency Name as per GST" v-model="agent.agencyName" :state="validateAgencyName" @blur="verifyAgencyName"></b-form-input>
                  <b-form-invalid-feedback :state="validateAgencyName">
                    This is a required field
                  </b-form-invalid-feedback>
                  <div class="error" v-if="agencyNameExists">
                    Agency Name already Exists
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Agency Type">
                  <b-form-select v-model="agent.agencyType" :options="agencyTypeOptions"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="labels">
              <b-col>
                <h5>Owner Information</h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <inputComponent type="text" v-model="ownerDetails.firstName" :required="true" placeholder="First Name"></inputComponent>
              </b-col>
              <b-col>
                <inputComponent type="text" v-model="ownerDetails.lastName" :required="true" placeholder="Last Name"></inputComponent>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <inputComponent type="number" v-model="ownerDetails.mobileNumber" :required="true" placeholder="Mobile Number"></inputComponent>
              </b-col>
              <b-col>
                <inputComponent type="number" v-model="ownerDetails.whatsappNumber" :required="true" placeholder="Whatsapp Number"></inputComponent>
              </b-col>
              <b-col>
                <inputComponent type="number" v-model="ownerDetails.landlineNumber" :required="true" placeholder="Landline Number"></inputComponent>
              </b-col>
            </b-row>
            <div class="second-owner" v-if="agent.agencyType !== 'Proprietary'">
              <b-btn variant="success" @click="secondPerson = true" id="add-second-person" v-if="!secondPerson">Add details of second person</b-btn>
              <div v-if="secondPerson">
                <hr>
                <b-row>
                  <b-col>
                    <inputComponent type="text" v-model="secondOwnerDetails.firstName" :required="false" placeholder="First Name"></inputComponent>
                  </b-col>
                  <b-col>
                    <inputComponent type="text" v-model="secondOwnerDetails.lastName" :required="false" placeholder="Last Name"></inputComponent>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <inputComponent type="number" v-model="secondOwnerDetails.mobileNumber" :required="false" placeholder="Mobile Number"></inputComponent>
                  </b-col>
                  <b-col>
                    <inputComponent type="number" v-model="secondOwnerDetails.whatsappNumber" :required="false" placeholder="Whatsapp Number"></inputComponent>
                  </b-col>
                  <b-col>
                    <inputComponent type="number" v-model="secondOwnerDetails.landlineNumber" :required="false" placeholder="Landline Number"></inputComponent>
                  </b-col>
                </b-row>
              </div>
            </div>
            <b-row class="labels">
              <b-col>
                <h5>Registered Address</h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <inputComponent type="text" v-model="agent.address" :required="true" placeholder="Address"></inputComponent>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Location (City, State, Country)">
                  <vue-google-autocomplete @placechanged="getLocation" v-model=location autocomplete="off" id="map" classname="form-control" placeholder="City, State, Country" types="(cities)"></vue-google-autocomplete>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="labels">
              <b-col>
                <h5>Purchase Division Head</h5>
              </b-col>
            </b-row>
            <b-row class="checkbox-row">
              <b-col>
                <b-form-checkbox v-model="purchaseCheck" :value="true" :unchecked-value="false" @change="modifyInfo">Check if information of the person is same as above</b-form-checkbox>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <inputComponent type="text" placeholder="Name" v-model="agent.purchaseDivisionHead.name" :required="true"></inputComponent>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <inputComponent type="number" placeholder="Mobile Number" v-model="agent.purchaseDivisionHead.mobileNumber" :required="true"></inputComponent>
              </b-col>
              <b-col>
                <inputComponent type="number" placeholder="Whatsapp Number" v-model="agent.purchaseDivisionHead.whatsappNumber" :required="true"></inputComponent>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <inputComponent type="email" placeholder="Email" v-model="agent.purchaseDivisionHead.email" :required="true"></inputComponent>
              </b-col>
            </b-row>
            <b-row class="labels">
              <b-col>
                <h5>Account Division Head</h5>
              </b-col>
            </b-row>
            <b-row class="checkbox-row">
              <b-col>
                <b-form-checkbox v-model="accountCheck" :value="true" :unchecked-value="false" @change="modifyInfoAccount">Check if information of the person is same as above</b-form-checkbox>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <inputComponent type="text" placeholder="Name" v-model="agent.accountDivisionHead.name" :required="true"></inputComponent>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <inputComponent type="number" placeholder="Mobile Number" v-model="agent.accountDivisionHead.mobileNumber" :required="true"></inputComponent>
              </b-col>
              <b-col>
                <inputComponent type="number" placeholder="Whatsapp Number" v-model="agent.accountDivisionHead.whatsappNumber" :required="true"></inputComponent>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <inputComponent type="email" placeholder="Email" v-model="agent.accountDivisionHead.email" :required="true"></inputComponent>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <h5>Are you part of any Travel Group?</h5>
              </b-col>
              <b-col>
                <b-row>
                  <b-col><b-form-radio v-model="agent.isPartOfTravelGroup" :value="true">Yes</b-form-radio></b-col>
                  <b-col><b-form-radio v-model="agent.isPartOfTravelGroup" :value="false">No</b-form-radio></b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row v-if="agent.isPartOfTravelGroup">
              <b-col>
                <h5>Name of the Travel Group</h5>
              </b-col>
              <b-col>
                <b-form-group>
                  <b-form-input type="text" list="group-options" placeholder="Name of Group" v-model="selectedTravelGroup"></b-form-input>
                  <b-form-datalist id="group-options" :options="travelGroupOptions"></b-form-datalist>
                </b-form-group>
                <b-btn class="add-btn" variant="success" @click="addGroup">Add</b-btn>
              </b-col>
            </b-row>
            <b-row v-if="agent.travelGroups.length > 0">
              <b-col offset="6">
                <div v-for="name in agent.travelGroups" class="group-div"><span class="group-name">{{name}}</span></div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <h5>Are you an IATA Agent?</h5>
              </b-col>
              <b-col>
                <b-row>
                  <b-col><b-form-radio v-model="agent.isIATA" :value="true">Yes</b-form-radio></b-col>
                  <b-col><b-form-radio v-model="agent.isIATA" :value="false">No</b-form-radio></b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row v-if="agent.isIATA">
              <b-col>
                <h5>Enter your IATA Number</h5>
              </b-col>
              <b-col>
                <b-form-input type="text" placeholder="IATA Number" v-model="agent.IATANumber"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="labels">
              <b-col>
                <h5>GST & PAN Details</h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group>
                  <b-form-input type="text" v-model="agent.agentGST" placeholder="GST Number"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group>
                  <b-form-input type="text" v-model="agent.agentPAN" placeholder="PAN Number"></b-form-input>
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
      <footerComponent></footerComponent>
    </div>
  </transition>
</template>

<script>
  import inputComponent from '../../components/inputComponent'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import headerComponent from '../../components/headerCompnent'
  import footerComponent from '../../components/footerComponent'

  export default {
    name: 'Agent-Register',
    components: {
      VueGoogleAutocomplete,
      inputComponent,
      headerComponent,
      footerComponent
    },
    data() {
      return {
        agent: {
          email: null,
          password: null,
          agencyName: null,
          ownerInfo: [],
          agencyType: "Proprietary",
          address: null,
          city: null,
          state: null,
          country: "India",
          purchaseDivisionHead: {
            name: null,
            mobileNumber: null,
            whatsappNumber: null,
            email: null
          },
          accountDivisionHead: {
            name: null,
            mobileNumber: null,
            whatsappNumber: null,
            email: null
          },
          isPartOfTravelGroup: false,
          travelGroups: [],
          isIATA: false,
          IATANumber: null,
          agentGST: "",
          agentPAN: "",
        },
        ownerDetails: {
          firstName: null,
          lastName: null,
          mobileNumber: null,
          whatsappNumber: null,
          landlineNumber: null
        },
        secondOwnerDetails: {
          firstName: null,
          lastName: null,
          mobileNumber: null,
          whatsappNumber: null,
          landlineNumber: null
        },
        emailExists: false,
        agencyNameExists: false,
        confirmPassword: null,
        secondPerson: false,
        success: false,
        selectedTravelGroup: null,
        travelGroupOptions: [],
        purchaseCheck: false,
        accountCheck: false,
        agencyTypeOptions: ["Proprietary", "Partnership", "PPL", "PVT LTD", "LTD"],
        location: null
      }
    },
    methods: {
      addGroup() {
        this.agent.travelGroups.push(this.selectedTravelGroup.toLowerCase())
        let i = this.travelGroupOptions.indexOf(this.selectedTravelGroup)
        this.travelGroupOptions.splice(i, 1)
        this.selectedTravelGroup = null
      },
      modifyInfo() {
        if(!this.purchaseCheck){
          this.agent.purchaseDivisionHead.name = this.ownerDetails.firstName + ' ' + this.ownerDetails.lastName
          this.agent.purchaseDivisionHead.email = this.agent.email
          this.agent.purchaseDivisionHead.mobileNumber = this.ownerDetails.mobileNumber
          this.agent.purchaseDivisionHead.whatsappNumber = this.ownerDetails.whatsappNumber
        }
        else {
          this.purchaseDivisionHead.name = null
          this.purchaseDivisionHead.email = null
          this.purchaseDivisionHead.mobileNumber = null
          this.purchaseDivisionHead.whatsappNumber = null
        }
      },
      modifyInfoAccount() {
        if(!this.accountCheck){
          this.agent.accountDivisionHead.name = this.ownerDetails.firstName + ' ' + this.ownerDetails.lastName
          this.agent.accountDivisionHead.email = this.agent.email
          this.agent.accountDivisionHead.mobileNumber = this.ownerDetails.mobileNumber
          this.agent.accountDivisionHead.whatsappNumber = this.ownerDetails.whatsappNumber
        }
        else {
          this.agent.accountDivisionHead.name = null
          this.agent.accountDivisionHead.email = null
          this.agent.accountDivisionHead.mobileNumber = null
          this.agent.accountDivisionHead.whatsappNumber = null
        }
      },
      getLocation(addressData, placeResultData, id) {
        this.location = placeResultData.formatted_address
      },
      verifyAgencyName() {
        this.$http.get(process.env.VUE_APP_API_URL + "/agent/agencyName/" + this.agent.agencyName).then(function(response) {
          this.agencyNameExists = response.body.message === "Agency Name already exists"
        })
      },
      async verifyEmail() {
        let agentEmailExists = false, groupEmailExists = false, hotelEmailExists = false, tgEamilExists = false
        await Promise.all([
          await this.$http.get(process.env.VUE_APP_API_URL + "/agent/verifyEmail/" + this.agent.email).then(function(response) {
            agentEmailExists = response.body.message === "Email ID already exists"
          }),
          await this.$http.get(process.env.VUE_APP_API_URL + "/hotel/verifyEmail/" + this.agent.email).then(function(response) {
            hotelEmailExists = response.body.message === "Email ID already exists"
          }),
          await this.$http.get(process.env.VUE_APP_API_URL + "/group/verifyEmail/" + this.agent.email).then(function(response) {
            groupEmailExists = response.body.message === "Email ID already exists"
          }),
          await this.$http.get(process.env.VUE_APP_API_URL + "/tg/verifyEmail/" + this.agent.email).then(function(response) {
            groupEmailExists = response.body.message === "Email ID already exists"
          })
        ])

        if(hotelEmailExists || agentEmailExists || groupEmailExists || tgEamilExists)
          this.emailExists = true
        if(!hotelEmailExists && !agentEmailExists && !groupEmailExists && !tgEamilExists)
          this.emailExists = false
      },
      create() {
        this.agent.ownerInfo.push(this.ownerDetails)
        if(this.secondOwnerDetails.firstName)
          this.agent.ownerInfo.push(this.secondOwnerDetails)


        if(this.location) {
          let location = this.location.split(",")
          this.agent.city = location[0]
          this.agent.state = location[1]
          this.agent.country = location[2]
        }

        let agent = this.agent
        if(agent.agencyName && agent.email && agent.password && this.confirmPassword && agent.agencyType && this.ownerDetails.firstName && this.ownerDetails.lastName && this.ownerDetails.mobileNumber && this.ownerDetails.whatsappNumber && this.ownerDetails.landlineNumber && agent.address && agent.city && agent.state && agent.country && agent.accountDivisionHead.name && agent.accountDivisionHead.mobileNumber && agent.accountDivisionHead.whatsappNumber && agent.accountDivisionHead.email && agent.purchaseDivisionHead.name  && agent.purchaseDivisionHead.mobileNumber && agent.purchaseDivisionHead.whatsappNumber && agent.purchaseDivisionHead.email && !this.emailExists && !this.agencyNameExists){

          this.agent.agencyName = this.agent.agencyName.toLowerCase()
          this.$http.post(process.env.VUE_APP_API_URL + "/agent/create", agent).then(function(res) {
            document.querySelector(".submit-btn").setAttribute('disabled', true)
            let inputs = document.querySelectorAll("input")
            inputs.forEach(function(el) {
              el.setAttribute('disabled', true)
            })
            this.success = true
          })
        }
        else {
          console.log(agent)
          alert("Please Complete the form before submitting")
        }
      }
    },
    computed: {
      validateEmail() {
        if(this.agent.email === "")
          return false
      },
      validateConfPass() {
        if(this.confirmPassword === null)
          return null
        else
          return this.confirmPassword === this.agent.password
      },
      validateAgencyName() {
        if(this.agent.agencyName === "")
          return false
      }
    },
    created() {
      let self = this
      this.$http.get(process.env.VUE_APP_API_URL + '/tg/').then(function(response) {
        response.body.forEach(function(element) {
          self.travelGroupOptions.push(element.Name)
        })
      })
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../sass/register'
  .slide-up-enter-active
    animation: slide-up 1s ease-in-out

  @keyframes slide-up
    0%
      transform: translateY(100%)
      opacity: 0
    100%
      transform: translateY(0)
      opacity: 1
  #register
    background: #36558F
  .add-btn
    margin-bottom: 10px

  .group-div
    display: inline-block
    margin: 5px 2px
    .group-name
      background: #aaaaaa
      padding: 5px
      border-radius: 5px
      color: white
</style>