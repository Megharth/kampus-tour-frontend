<template>
  <div id="dashboard">
    <headerComponent @edit="edit"></headerComponent>
    <div class="container">
      <transition name="slide-down">
        <b-alert show v-if="editMode">Edit mode is not available for your section</b-alert>
      </transition>
      <div>
        <h1 class="heading">{{user.name}}</h1>
        <h5 v-if="agents">Agents in your Group: {{agents.length}}</h5>
      </div>
      <hr>
      <h3>Agents</h3>
      <div class="row agent-row" v-for="(value, key) in cityReport">
        <div class="col-sm-3">{{key}}</div>
        <div class="col-sm-3">{{value}}</div>
        <div class="col-sm-3"><button class="btn" @click="createReport(key)">Get Report</button></div>
        <!--<div class="agent col-sm-3 mx-auto" v-for="agent in agents">
          <h4 class="name">{{agent.agencyName}}</h4>
          <div class="address">{{agent.address}}, {{agent.city}}, {{agent.state}}, {{agent.country}}</div>
          <hr>
          <div class="owners">
            <span class="owner-label">Owner(s)</span>
            <div class="owner" v-for="owner in agent.ownerInfo">{{owner.firstName}} {{owner.lastName}}</div>
          </div>
        </div>--><!--<div class="agent col-sm-3 mx-auto" v-for="agent in agents">
          <h4 class="name">{{agent.agencyName}}</h4>
          <div class="address">{{agent.address}}, {{agent.city}}, {{agent.state}}, {{agent.country}}</div>
          <hr>
          <div class="owners">
            <span class="owner-label">Owner(s)</span>
            <div class="owner" v-for="owner in agent.ownerInfo">{{owner.firstName}} {{owner.lastName}}</div>
          </div>
        </div>-->
      </div>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
  import inputComponent from '../../components/inputComponent'
  import headerComponent from '../../components/headerCompnent'
  import footerComponent from '../../components/footerComponent'
  import pdfMake from 'pdfmake/build/pdfmake.js';
  import pdfFonts from 'pdfmake/build/vfs_fonts.js';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;


  export default {
    name: 'tg-dashboard',
    data() {
      return {
        user: null,
        editMode: false,
        agents: null,
        cityReport: {}
      }
    },
    components: {
      inputComponent,
      headerComponent,
      footerComponent
    },
    methods: {
      edit() {
        this.editMode = !this.editMode
      },
      createReport(city) {
        /*let wb = xlsx.utils.book_new()
        wb.Props = {
          Title: city + " Agent List",
          Author: "Kontree"
        }*/
        // wb.SheetNames.push("Agents")
        /*let ws_data = [
          ["Agency Name", "Owner Name", "Email", "Contact"]
        ]*/

        /*let ws = xlsx.utils.aoa_to_sheet(ws_data)
        wb.Sheets["Agents"] = ws

        let wbOut = xlsx.write(wb, {bookType:'xlsx', type:'binary'})
        saveAs(new Blob((ws_data), {type: 'text/plain;charset=utf-8'}), city + " Agent List.txt")

        */

        const document = {
          content: [
            {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                width: ['20%', '30%', '35%', '15%'],
                body: [
                        ['Agency Name', 'Owner Name', 'Email', 'Contact']
                ]
              }
            }
          ]
        }

        this.agents.forEach(function(agent) {
          if(agent.city === city)
            document.content[0].table.body.push(
                    [agent.agencyName.toUpperCase(), agent.ownerInfo[0].firstName + " " + agent.ownerInfo[0].lastName, agent.email, agent.ownerInfo[0].mobileNumber]
            )
        })

        console.log()

        pdfMake.createPdf(document).download(city + " Agent List")

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
      let self = this
      this.$http.get(process.env.VUE_APP_API_URL + '/agent/travelGroup/' + this.user.name.toLowerCase()).then(function(response) {
        self.agents = response.body.message
        let cities = this.agents.map(function(agent) {
          return agent.city
        })

        cities.forEach(function(city) {
          self.cityReport[city] = 0
        })
        cities.forEach(function(city) {
          self.cityReport[city]++
        })

      })

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
h1, h3
  color: lighten($agentHeading, 8%) !important
#dashboard
  background: #397367
.update-btn
  color: #397367
.agent-row
  text-align: center
  padding: 10px
.agent
  background: white
  margin: 5px
  border-radius: 5px
  color: black
  padding: 10px
  box-shadow: 0 3px 6px #2b2d2f
  h4, .owner-label
    color: #397367
    font-weight: bold
  .address
    height: 80px
    color: #555555
  hr
    box-shadow: none !important
  .name
    text-transform: capitalize
  .owners
    margin-top: 5px
    .owner
      color: #555555

</style>