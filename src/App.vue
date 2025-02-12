<template>
  <div id="app">
    <AgendamentoForm msg="UAU DOG - Banho e Tosa"/>
  </div>
</template>

<script>
import AgendamentoForm from './components/AgendamentoForm.vue';
//import TutoresModel from './components/TutoresModel.vue'

export default {
  name: 'App',
  components: {
    AgendamentoForm
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
