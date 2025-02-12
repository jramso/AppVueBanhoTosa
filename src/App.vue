<template>
  <v-app>
    <v-main>
      <tutores-model />
    </v-main>
  </v-app>
</template>

<script>
import TutoresModel from './components/TutoresModel.vue'

export default {
  name: 'App',
  components: {
    'tutores-model': TutoresModel
  }
}
</script>