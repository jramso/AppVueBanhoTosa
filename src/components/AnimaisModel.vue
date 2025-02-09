<template>
    <div>
      <h1>{{ msg }}</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Raça</th>
            <th>Tutor ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="animal in Animais" :key="animal.id">
            <td>{{ animal.id }}</td>
            <td>{{ animal.nome }}</td>
            <td>{{ animal.tipo === 0 ? 'Cachorro' : 'Gato' }}</td>
            <td>{{ animal.tipo === 0 ? animal.racaCachorro : animal.racaGato }}</td>
            <td>{{ animal.tutorId }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    name: 'AnimaisModel',
    props: {
      msg: String
    },
    data() {
      return {
        Animais: []
      };
    },
    methods: {
      lista() {
        axios.get("/Animal")
          .then((res) => {
            console.log(res.data);
            this.Animais = res.data;
          })
          .catch((error) => {
            console.error("Erro ao buscar animais:", error);
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