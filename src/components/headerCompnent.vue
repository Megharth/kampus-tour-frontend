<template>
  <div id="header">
    <div class="title">Kontree</div>
    
    <div class="menu-tabs row">
      <div class="home col" @click="$router.push('/')" v-if="!userLoggedIn">
        <img src="../assets/home.png" alt="" class="img-fluid">
      </div>
      <div class="home col" @click="edit" v-if="userLoggedIn">
        <img src="../assets/pencil-edit-button.png" alt="" class="img-fluid">
      </div>
      <div class="home col" @click="logout" v-if="userLoggedIn">
        <img src="../assets/power-button-off.png" alt="" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header-component',
    data() {
      return {
        userLoggedIn: false
      }
    },
    methods: {
      logout() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      edit() {
        this.$emit('edit')
      }
    },
    created() {
      if(this.$store.state.user || localStorage.getItem('user')) {
        this.userLoggedIn = true
      }
    }
  }
</script>

<style lang="sass" scoped>
#header
  position: fixed
  top: 0
  height: 50px
  width: 100%
  background: white
  z-index: 2
  box-shadow: 2px 0 6px #2b2d2f
  .title
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    font-size: 22px
  .menu-tabs
    position: absolute
    right: 2%
    top: 50%
    transform: translate(-50%, -50%)
    .col
      padding: 0 0 0 15px
      img
        cursor: pointer
        width: 25px

@media (min-width: 320px) and (max-width: 450px)
  .menu-tabs
    right: 0 !important

</style>