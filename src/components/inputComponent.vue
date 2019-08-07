<template>
  <div>
    <div v-if="required">
      <b-form-group v-if="type !== 'number'">
        <b-form-input :type="type" :placeholder="placeholder" v-model="inputVal" :state="validateText"></b-form-input>
        <b-form-invalid-feedback :state="validateText">
          This is a required field
        </b-form-invalid-feedback>
      </b-form-group>
    </div>
    <b-form-group v-if="type === 'number'">
      <b-form-input :type="type" :placeholder="placeholder" v-model="inputVal" :state="validateNumber"></b-form-input>
      <b-form-invalid-feedback :state="validateNumber">
        Number should be of 10 digits
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group v-if="!required">
      <b-form-input :type="type" :placeholder="placeholder" v-model="inputVal"></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
  export default {
    name: "InputComponent",
    props: [
      'value',
      'placeholder',
      'type',
      'required'
    ],
    data() {
      return {
        inputVal: this.value
      }
    },
    watch: {
      inputVal(val) {
        this.$emit('input', val)
      }
    },
    computed: {
      validateText() {
        if(this.inputVal === "")
          return false
      },
      validateNumber() {
        if(this.inputVal === null)
          return null
        else
          return this.inputVal.length === 10
      }
    }
  }
</script>