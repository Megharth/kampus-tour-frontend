<template>
  <div id="dashboard">
    <headerComponent @edit="edit"></headerComponent>
    <div class="container">
      <transition name="slide-down">
        <b-alert show v-if="editMode">You are now in edit mode. <span class="disableEdit" @click="disableEdit">click here to disable</span></b-alert>
      </transition>
      <h1 class="heading">{{user.agencyName}}</h1>
      <h5 class="heading">A {{user.agencyType}} Company</h5>
      <hr>
      <div class="owner-info">
        <h3>Owner Details</h3>
        <div v-for="owner in user.ownerInfo">
          <div class="row">
            <div class="col-sm-4">
              <div class="row"><div class="col">First Name</div></div>
              <div class="row"><div class="col"><inputComponent v-model="owner.firstName" :required="true"></inputComponent></div></div>
            </div>
            <div class="col-sm-2"></div>
            <div class="col-sm-4">
              <div class="row"><div class="col">Last Name</div></div>
              <div class="row"><div class="col"><inputComponent v-model="owner.lastName" :required="true"></inputComponent></div></div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="row"><div class="col">Email</div></div>
              <div class="row"><div class="col"><inputComponent v-model="user.email" :required="true"></inputComponent></div></div>
            </div>
            <div class="col-sm-2"></div>
            <div class="col-sm-4">
              <div class="row"><div class="col">Mobile Number</div></div>
              <div class="row"><div class="col"><inputComponent v-model="owner.mobileNumber" :required="true"></inputComponent></div></div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="row"><div class="col">Whatsapp Number</div></div>
              <div class="row"><div class="col"><inputComponent v-model="owner.whatsappNumber" :required="true"></inputComponent></div></div>
            </div>
            <div class="col-sm-2"></div>
            <div class="col-sm-4">
              <div class="row"><div class="col">Landline Number</div></div>
              <div class="row"><div class="col"><inputComponent v-model="owner.landlineNumber" :required="true"></inputComponent></div></div>
            </div>
          </div>
          <hr>
        </div>
      </div>
      <div class="adh-info">
        <h3>Account Division Head</h3>
        <div class="row">
          <div class="col-sm-4">
            <div class="row"><div class="col">Name</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.accountDivisionHead.name"></inputComponent></div></div>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Email</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.accountDivisionHead.email"></inputComponent></div></div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="row"><div class="col">Mobile Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.accountDivisionHead.mobileNumber"></inputComponent></div></div>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Whatsapp Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.accountDivisionHead.whatsappNumber"></inputComponent></div></div>
          </div>
        </div>
      </div>
      <hr>
      <div class="pdh-info">
        <h3>Purchase Division Head</h3>
        <div class="row">
          <div class="col-sm-4">
            <div class="row"><div class="col">Name</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.purchaseDivisionHead.name"></inputComponent></div></div>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Email</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.purchaseDivisionHead.email"></inputComponent></div></div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="row"><div class="col">Mobile Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.purchaseDivisionHead.mobileNumber"></inputComponent></div></div>
          </div>
          <div class="col-sm-2"></div>
          <div class="col-sm-4">
            <div class="row"><div class="col">Whatsapp Number</div></div>
            <div class="row"><div class="col"><inputComponent type="text" v-model="user.purchaseDivisionHead.whatsappNumber"></inputComponent></div></div>
          </div>
        </div>
      </div>
      <hr>
      <div class="address">
        <h3>Address</h3>
        {{user.address}}, {{user.city}}, {{user.state}}, {{user.country}}
      </div>
      <hr>
      <div class="iata-info" v-if="user.isIATA">
        <h3>IATA Details</h3>
        <div>IATA Number: {{user.IATANumber}}</div>
      </div>
      <hr>
      <div v-if="user.isPartOfTravelGroup" class="travel-groups">
        <h3>Affiliated Travel Groups</h3>
        <span v-for="group in user.travelGroups" class="travel-group">{{group}}</span>
      </div>
      <hr>
      <div class="gst-pan">
        <h3>GST & PAN Information</h3>
        <div class="row">
          <div class="col">GST Number: {{ user.agentGST}}</div>
          <div class="col">PAN Number: {{ user.agentPAN}}</div>
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
    name: "agent-dashboard",
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

        let ownerError = Object.values(this.user.ownerInfo).map(function(el) {
          return Object.values(el).indexOf(null) !== -1 || Object.values(el).indexOf("") !== -1;
        })

        if (
          ownerError.indexOf(true) === -1
          && Object.values(this.user).indexOf(null) === -1 && Object.values(this.user).indexOf("") === -1
          && Object.values(this.user.accountDivisionHead).indexOf(null) && Object.values(this.user.accountDivisionHead).indexOf("")
          && Object.values(this.user.purchaseDivisionHead).indexOf(null) && Object.values(this.user.purchaseDivisionHead).indexOf("")
        ) {
          this.$http.put(process.env.VUE_APP_API_URL + "/agent/", this.user, {
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
          alert("Complete the form before submitting")

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

<style scoped lang="sass">
@import '../../sass/dashboard'
#dashboard
  background: #36558F

.travel-group
  text-transform: capitalize
</style>