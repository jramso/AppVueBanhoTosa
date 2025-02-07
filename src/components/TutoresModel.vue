<template>
  <div>
    <h1>{{ msg }}</h1>
    
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Endereço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tutor in Tutores" :key="tutor.id">
          <td>{{ tutor.id }}</td>
          <td>{{ tutor.nome }}</td>
          <td>{{ tutor.telefone }}</td>
          <td>{{ tutor.endereco }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TutoresModel',
  props: {
    msg: String
  },
  data() {
    return {
      Tutores: []
    };
  },
  methods: {
    lista() {
      axios.get("/Tutor")
        .then((res) => {
          console.log(res.data);
          this.Tutores = res.data; // Corrigido para atualizar o array corretamente
        })
        .catch((error) => {
          console.error("Erro ao buscar tutores:", error);
        });
    }
  },
  created() {
    this.lista();
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
