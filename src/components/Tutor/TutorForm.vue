<template>
    <div class="container">
      <h2>Cadastrar Tutor</h2>
  
      <form @submit.prevent="cadastrar">
        <div class="mb-3">
          <label class="form-label">Nome do Tutor</label>
          <input type="text" v-model="tutor.nome" class="form-control" placeholder="Digite o nome do tutor">
        </div>
  
        <div class="mb-3">
          <label class="form-label">Telefone</label>
          <input type="text" v-model="tutor.telefone" class="form-control" placeholder="Digite o telefone">
        </div>
  
        <div class="mb-3">
          <label class="form-label">Endereço</label>
          <input type="text" v-model="tutor.endereco" class="form-control" placeholder="Digite o endereço">
        </div>
  
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import TutorController from '@/controller/TutorController';
  
  export default {
    data() {
      return {
        tutor: {
          nome: '',
          telefone: '',
          endereco: ''
        },
        loading: false
      };
    },
    methods: {
      async cadastrar() {
        if (!this.tutor.nome || !this.tutor.telefone || !this.tutor.endereco) {
          alert('Preencha todos os campos!');
          return;
        }
  
        this.loading = true;
        try {
          await TutorController.cadastrarTutor(this.tutor);
          alert('Tutor cadastrado com sucesso!');
          this.tutor = { nome: '', telefone: '', endereco: '' }; // Resetar formulário
        } catch (error) {
          alert('Erro ao cadastrar tutor. Tente novamente.');
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #e3f2fd;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .btn-primary {
    width: 100%;
    background-color: #64b5f6;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #42a5f5;
  }
  </style>
  