<template>
  <div id="app">
    <TutoresModel msg="UAU DOG - Banho e Tosa"/>
  </div>
</template>

<script>
import TutoresModel from './components/TutoresModel.vue'

export default {
  name: 'App',
  components: {
    TutoresModel
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
