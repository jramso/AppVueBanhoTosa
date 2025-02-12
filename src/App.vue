<template>
  <div id="app">
    <AnimalForm msg="UAU DOG - Banho e Tosa"/>
  </div>
</template>

<script>
//import AgendamentoForm from './components/Agendamento/AgendamentoForm.vue';
import AnimalForm from './components/Animal/AnimalForm.vue';
//import TutorForm from './components/Tutor/TutorForm.vue';
//import TutoresModel from './components/TutoresModel.vue'

export default {
  name: 'App',
  components: {
    AnimalForm
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
