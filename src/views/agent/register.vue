<template>
  <div id="register">
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
              <b-form-group>
                <b-form-input type="password" placeholder="Password" required v-model="agent.password" :state="validatePass"></b-form-input>
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
              <b-form-group>
                <b-form-input type="text" placeholder="Agency Name" v-model="agent.agencyName" :state="validateAgencyName"></b-form-input>
                <b-form-invalid-feedback :state="validateAgencyName">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Agency Type" v-model="agent.agencyType" :state="validateAgencyType"></b-form-input>
                <b-form-invalid-feedback :state="validateAgencyType">
                  This is a required field
                </b-form-invalid-feedback>
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
              <b-form-group>
                <b-form-input type="text" v-model="agent.ownerInfo.firstName" placeholder="First Name" :state="validateOwnerFName"></b-form-input>
                <b-form-invalid-feedback :state="validateOwnerFName">
                  This is a required Field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="agent.ownerInfo.lastName" placeholder="Last Name" :state="validateOwnerLName"></b-form-input>
                <b-form-invalid-feedback :state="validateOwnerLName">
                  This is a required Field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="agent.ownerInfo.mobileNumber" placeholder="Mobile Number" :state="validateOwnerMobile"></b-form-input>
                <b-form-invalid-feedback :state="validateOwnerMobile">
                  Number should be of 10 digits
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="agent.ownerInfo.whatsappNumber" placeholder="Whatsapp Number" :state="validateOwnerWhatsapp"></b-form-input>
                <b-form-invalid-feedback :state="validateOwnerWhatsapp">
                  Number should be of 10 digits
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="agent.ownerInfo.landlineNumber" placeholder="Landline Number" :state="validateOwnerLandline"></b-form-input>
                <b-form-invalid-feedback :state="validateOwnerLandline">
                  Number should be of 10 digits
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Address Information</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Address" v-model="agent.address" :state="validateAddress"></b-form-input>
                <b-form-invalid-feedback :state="validateAddress">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Country" v-model="agent.country" :state="validateCountry"></b-form-input>
                <b-form-invalid-feedback :state="validateCountry">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="State" v-model="agent.state" :state="validateState"></b-form-input>
                <b-form-invalid-feedback :state="validateState">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="City" v-model="agent.city" :state="validateCity"></b-form-input>
                <b-form-invalid-feedback :state="validateCity">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Purchase Division Head</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Name" v-model="purchaseDivisionHeadInfo.name"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="purchaseDivisionHeadInfo.mobileNumber" placeholder="Mobile Number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="purchaseDivisionHeadInfo.whatsappNumber" placeholder="Whatsapp Number"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="email" placeholder="Email" v-model="purchaseDivisionHeadInfo.email"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="labels">
            <b-col>
              <h5>Account Division Head</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" placeholder="Name" v-model="accountDivisionHeadInfo.name"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="accountDivisionHeadInfo.mobileNumber" placeholder="Mobile Number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-input type="text" v-model="accountDivisionHeadInfo.whatsappNumber" placeholder="Whatsapp Number"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <b-form-input type="email" placeholder="Email" v-model="accountDivisionHeadInfo.email"></b-form-input>
              </b-form-group>
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
                <b-form-input type="text" placeholder="Name of Group" v-model="travelGroup"></b-form-input>
              </b-form-group>
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
  </div>
</template>

<script>
  export default {
    name: 'Agent-Register',
    data() {
      return {
        agent: {
          email: null,
          password: null,
          agencyName: null,
          ownerInfo: {
            firstName: null,
            lastName: null,
            mobileNumber: null,
            whatsappNumber: null,
            landlineNumber: null
          },
          agencyType: null,
          address: null,
          city: null,
          state: null,
          country: null,
          purchaseDivisionHead: [],
          accountDivisionHead: [],
          isPartOfTravelGroup: false,
          travelGroups: [],
          isIATA: false,
          agentGST: "",
          agentPAN: ""
        },
        purchaseDivisionHeadInfo: {
          name: null,
          mobileNumber: null,
          whatsappNumber: null,
          email: null
        },
        accountDivisionHeadInfo: {
          name: null,
          mobileNumber: null,
          whatsappNumber: null,
          email: null
        },
        emailExists: false,
        confirmPassword: null,
        success: false,
        travelGroup: null
      }
    },
    computed: {
      validateEmail() {
        if(this.agent.email === "")
          return false
      },
      validatePass() {
        if(this.agent.password === "")
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
      },
      validateOwnerFName() {
        if(this.agent.ownerInfo.firstName === "")
          return false
      },
      validateOwnerLName() {
        if(this.agent.ownerInfo.lastName === "")
          return false
      },
      validateOwnerMobile() {
        if(this.agent.ownerInfo.mobileNumber === null)
          return null
        else
          return this.agent.ownerInfo.mobileNumber.length === 10
      },
      validateOwnerWhatsapp() {
        if(this.agent.ownerInfo.whatsappNumber === null)
          return null
        else
          return this.agent.ownerInfo.whatsappNumber.length === 10
      },
      validateOwnerLandline() {
        if(this.agent.ownerInfo.landlineNumber === null)
          return null
        else
          return this.agent.ownerInfo.landlineNumber.length === 10
      },
      validateAgencyType() {
        if(this.agent.agencyType === "")
          return false
      },
      validateAddress() {
        if(this.agent.address === "")
          return false
      },
      validateCity() {
        if(this.agent.city === "")
          return false
      },
      validateState() {
        if(this.agent.state === "")
          return false
      },
      validateCountry() {
        if(this.agent.country === "")
          return false
      }
    },
    methods: {
      verifyEmail() {
        this.$http.post("https://kampus-tour.herokuapp.com/agent/verifyEmail", {
          email: this.agent.email
        }).then(function(response) {
          this.emailExists = response.body.message === "Email ID already exists";
        })
      },
      create() {
        if(this.travelGroup)
          this.agent.travelGroups.push(this.travelGroup)
        if(this.accountDivisionHeadInfo.name)
          this.agent.accountDivisionHead.push(this.accountDivisionHeadInfo)
        if(this.purchaseDivisionHeadInfo.name)
          this.agent.purchaseDivisionHead.push(this.purchaseDivisionHeadInfo)

        let agent = this.agent
        if(agent.agencyName && agent.email && agent.password && this.confirmPassword && agent.agencyType && agent.ownerInfo.firstName && agent.ownerInfo.lastName && agent.ownerInfo.mobileNumber && agent.ownerInfo.whatsappNumber && agent.ownerInfo.whatsappNumber && agent.address && agent.city && agent.state && agent.country && !this.emailExists){
          this.$http.post("https://kampus-tour.herokuapp.com/agent/create", agent).then(function(res) {
            document.querySelector(".submit-btn").setAttribute('disabled', true)
            let inputs = document.querySelectorAll("input")
            inputs.forEach(function(el) {
              el.setAttribute('disabled', true)
            })
            this.success = true
          })
        }
      }
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