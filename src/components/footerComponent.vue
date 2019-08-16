<template>
  <div id="footer">
    <div class="copyright">© Kontree</div>
    <div class="contact">
      <div class="phone row">
        <div class="col">
          <img src="../assets/phone.png" alt="" class="img-fluid">
        </div>
        <div class="col">+0123456789</div>
      </div>
      <div class="email row">
        <div class="col">
          <img src="../assets/email.png" alt="" class="img-fluid">
        </div>
        <div class="col">abc@gmail.com</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer-component'
  }
</script>

<style scoped lang="sass">
#footer
  position: fixed
  bottom: 0
  background: #2b2d2f
  width: 100%
  height: 60px
  color: white
  .copyright
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
  .contact
    .phone, .email
      position: absolute
      top: 50%
      transform: translate(-50%, -50%)
      img
        width: 20px
      .col
        padding: 5px
    .phone
      left: 125px
    .email
      right: -20px

@media (min-width: 320px) and (max-width: 500px)
  #footer
    height: 70px
  .copyright
    top: 25% !important
  .phone
    left: 95px !important
    top: 70% !important
  .email
    right: -50px !important
    top: 70% !important

</style>