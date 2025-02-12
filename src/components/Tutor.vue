<template>
    <div>
      <h1>Gerenciamento de Tutores</h1>
      <form @submit.prevent="adicionarTutor">
        <input v-model="novoTutor.nome" placeholder="Nome" required />
        <input v-model="novoTutor.telefone" placeholder="Telefone" required />
        <input v-model="novoTutor.endereco" placeholder="Endereço" required />
        <button type="submit">Adicionar Tutor</button>
      </form>
      <ul>
        <li v-for="tutor in tutores" :key="tutor.id">
          {{ tutor.nome }} - {{ tutor.telefone }} - {{ tutor.endereco }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tutores: [],
        novoTutor: {
          nome: '',
          telefone: '',
          endereco: ''
        }
      };
    },
    methods: {
      async fetchTutores() {
        try {
          const response = await axios.get('/Tutor');
          this.tutores = response.data;
        } catch (error) {
          console.error('Erro ao buscar tutores:', error);
        }
      },
      async adicionarTutor() {
        try {
          const response = await axios.post('/Tutor', this.novoTutor);
          this.tutores.push(response.data);
          this.novoTutor = { nome: '', telefone: '', endereco: '' };
        } catch (error) {
          console.error('Erro ao adicionar tutor:', error);
        }
      }
    },
    created() {
      this.fetchTutores();
    }
  };
  </script>
  
  <style scoped>
  form {
    margin-bottom: 20px;
  }
  input {
    display: block;
    margin-bottom: 10px;
  }
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    background: #f9f9f9;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
  }
  </style>
  