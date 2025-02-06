<template>
  <div>
    <h1>{{ msg }}</h1>
    
    <table>
      <thead>
        <tr v-for="tutor in Tutores" v-bind:key="tutor.id">
          <th>
            ID:
          </th>
          <th>
            Nome:
          </th>
          <th>
            Telefone:
          </th>
          <th>
            Endereço:
          </th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="tutor in Tutores" v-bind:key="tutor.id">
          <td>
            {{ Tutor.id }}
          </td>
          <td>
            {{ Tutor.nome }}
          </td>
          <td>
            {{ Tutor.telefone }}
          </td>
          <td>
            {{ Tutor.endereco }}
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: 'TutoresModel',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

